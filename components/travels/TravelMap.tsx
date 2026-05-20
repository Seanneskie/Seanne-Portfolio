"use client";

import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TravelEntry, TripGroup } from "./types";
import { fmtDate, withBasePath } from "@/lib/utils";
import { resolvePinIcon } from "./pinIcon";
import { jitterPins } from "./jitterPins";

// Watches the `.dark` class on <html> so the map can swap tile providers when
// the user toggles the site theme. Returns true when dark mode is active.
function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  React.useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

// True on coarse-pointer (touch) devices, where single-finger map drag would
// otherwise compete with page scroll. Evaluated once on mount.
function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches,
    );
  }, []);
  return isTouch;
}

const TILES = {
  light: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  dark: {
    // CartoDB "dark_all" — free, OSM-derived, dark muted palette that matches
    // the site's dark theme. Attribution required by both Carto and OSM.
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
} as const;

// Leaflet's default marker icon URLs assume a CDN host that breaks under our
// Vite bundle + base-path setup. Re-point them to the asset URLs Vite emits
// at build time so the markers render on first paint.
const markerIcon = new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href;
const markerIcon2x = new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href;
const markerShadow = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface TravelMapProps {
  trips: TravelEntry[];
  tripGroups?: TripGroup[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  /** When true, fit bounds to all pins on mount; otherwise centers on the first pin. */
  fitBounds?: boolean;
  /** When true, the map sticks to the top on desktop as the page scrolls. */
  sticky?: boolean;
  /** When set, always render the polyline + sibling halos for this trip, even
   * when no individual pin is active. Used by the trip-detail page where the
   * trip is the page's subject, not a transient hover state. */
  alwaysShowTrip?: string;
}

// Builds a Leaflet divIcon that renders a circular pin in the brand teal with
// a tag-derived Lucide glyph inside. The glyph is serialized to SVG once per
// render via renderToStaticMarkup so we avoid shipping a sprite. Colors swap
// in dark mode — the CartoDB dark basemap is heavily muted, so the idle pin
// needs a brighter teal plus a darker outer ring to register against it.
type PinState = "idle" | "sibling" | "active";

function buildPinIcon(tags: string[], state: PinState, dark: boolean): L.DivIcon {
  const active = state === "active";
  const sibling = state === "sibling";
  const size = active ? 36 : 28;
  const glyphSize = active ? 18 : 16;
  const Icon = resolvePinIcon(tags);
  const glyph = renderToStaticMarkup(
    <Icon size={glyphSize} strokeWidth={2.25} color="#fff" />,
  );
  // Active = stronger teal, sibling = a teal glow ring to flag trip membership
  // without competing with the active pin, idle = standard teal.
  const fill = active
    ? dark
      ? "#2dd4bf"
      : "#0d9488"
    : dark
      ? "#14b8a6"
      : "#14b8a6";
  const ringColor = dark ? "rgba(15, 23, 42, 0.85)" : "#fff";
  // Sibling pins get an extra outer teal halo so the trip group reads as a
  // unit on the map. The inner white/dark ring stays for legibility.
  const boxShadow = sibling
    ? `0 0 0 2px ${ringColor}, 0 0 0 5px ${dark ? "rgba(45, 212, 191, 0.55)" : "rgba(13, 148, 136, 0.45)"}, 0 4px 10px rgba(0,0,0,0.35)`
    : `0 0 0 2px ${ringColor}, 0 4px 10px rgba(0,0,0,0.35)`;
  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 9999px;
      background: ${fill};
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: ${boxShadow};
      transform: translateY(${active ? "-2px" : "0"});
      transition: transform 200ms ease, background 200ms ease, width 200ms ease, height 200ms ease;
    ">${glyph}</div>
  `;
  return L.divIcon({
    html,
    className: "travel-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

// Flies to the active pin, then back to the overview when deselected.
// `points` is the full pin set so we can restore the original framing
// instead of leaving the map ratcheted in on the last-hovered pin.
function FlyTo({
  coords,
  points,
}: {
  coords: [number, number] | null;
  points: [number, number][];
}) {
  const map = useMap();
  // The zoom the map settled on initially (after FitAll). We never zoom in
  // past a fixed focus level on hover, and we restore this on deselect.
  const baseZoomRef = React.useRef<number | null>(null);
  // Skip the deselect-to-overview animation on the first run — FitAll
  // already frames the map on mount, so re-flying would double-animate.
  const hadCoordsRef = React.useRef(false);

  React.useEffect(() => {
    if (baseZoomRef.current === null) baseZoomRef.current = map.getZoom();

    if (coords) {
      hadCoordsRef.current = true;
      // Focus the pin without ratcheting: clamp to a single focus zoom
      // rather than max(current, 6), which only ever increased.
      const focusZoom = Math.max(baseZoomRef.current ?? 6, 6);
      map.flyTo(coords, focusZoom, { duration: 0.8 });
      return;
    }

    // Deselected — return to the overview framing, but only if we had
    // actually flown to a pin (don't fight FitAll on mount).
    if (!hadCoordsRef.current) return;
    hadCoordsRef.current = false;
    if (points.length > 1) {
      map.flyToBounds(points, { padding: [40, 40], duration: 0.6 });
    } else if (points.length === 1) {
      map.flyTo(points[0], baseZoomRef.current ?? 6, { duration: 0.6 });
    }
  }, [coords, points, map]);
  return null;
}

function FitAll({ points }: { points: [number, number][] }) {
  const map = useMap();
  React.useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 6);
      return;
    }
    map.fitBounds(points, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

// Hover-to-preview latency. Mouseout starts a timer; re-entering the marker
// (or its popup) cancels it. 3s is long enough to drag the cursor onto the
// popup to click "Read full trip →" without it vanishing.
const POPUP_HOVER_LINGER_MS = 3000;

export default function TravelMap({
  trips,
  tripGroups = [],
  activeSlug,
  onSelect,
  fitBounds = true,
  sticky = false,
  alwaysShowTrip,
}: TravelMapProps): React.ReactElement {
  const isDark = useIsDarkMode();
  const isTouch = useIsTouch();
  const tile = isDark ? TILES.dark : TILES.light;
  const closeTimers = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const markerRefs = React.useRef<Map<string, L.Marker>>(new Map());

  React.useEffect(() => {
    const timers = closeTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // Open the popup whenever activeSlug changes from a non-pointer source
  // (keyboard focus on a card, click that flips activeSlug). Mouse hover
  // already opens it via the marker's own `mouseover` handler, so this
  // closes the keyboard-accessibility gap. Closing on null deselect lets
  // the card-mouse-leave path collapse the popup cleanly.
  React.useEffect(() => {
    if (!activeSlug) {
      markerRefs.current.forEach((marker) => marker.closePopup());
      return;
    }
    const marker = markerRefs.current.get(activeSlug);
    if (marker) marker.openPopup();
  }, [activeSlug]);

  const pinnedTrips = React.useMemo(
    () => trips.filter((t): t is TravelEntry & { coords: [number, number] } => Boolean(t.coords)),
    [trips],
  );

  // Resolved coords account for jitter: pins that share the same source
  // coords (e.g. two stops inside one mall) fan out around the shared point
  // so each one is individually clickable.
  const resolvedCoords = React.useMemo(() => jitterPins(pinnedTrips), [pinnedTrips]);

  const points = React.useMemo(
    () => pinnedTrips.map((t) => resolvedCoords.get(t.slug) ?? t.coords),
    [pinnedTrips, resolvedCoords],
  );

  const activeCoords = React.useMemo<[number, number] | null>(() => {
    if (!activeSlug) return null;
    return resolvedCoords.get(activeSlug) ?? null;
  }, [activeSlug, resolvedCoords]);

  // Which trip should the map highlight? Falls back to `alwaysShowTrip`
  // (used by the trip-detail page) when no pin is hovered.
  const activeTripGroup = React.useMemo<TripGroup | null>(() => {
    if (activeSlug) {
      const active = trips.find((t) => t.slug === activeSlug);
      if (active?.trip) {
        return tripGroups.find((g) => g.slug === active.trip) ?? null;
      }
    }
    if (alwaysShowTrip) {
      return tripGroups.find((g) => g.slug === alwaysShowTrip) ?? null;
    }
    return null;
  }, [activeSlug, trips, tripGroups, alwaysShowTrip]);

  // Set of slugs that should pulse along with the active pin — its trip
  // siblings. Empty when the active pin has no trip or no trip is active.
  const siblingSlugs = React.useMemo<Set<string>>(() => {
    if (!activeTripGroup) return new Set();
    const siblings = pinnedTrips
      .filter((t) => t.trip === activeTripGroup.slug)
      .map((t) => t.slug);
    return new Set(siblings);
  }, [activeTripGroup, pinnedTrips]);

  // Itinerary path: stops listed in the trip's `stops` field, in order,
  // with each slug resolved to its jittered coords. Falls back to
  // date-sorted order if the trip has no explicit stops.
  const polylinePath = React.useMemo<[number, number][]>(() => {
    if (!activeTripGroup) return [];
    const tripPins = pinnedTrips.filter((t) => t.trip === activeTripGroup.slug);
    if (tripPins.length < 2) return [];

    const rank = new Map(activeTripGroup.stops.map((slug, i) => [slug, i]));
    const ordered = [...tripPins].sort((a, b) => {
      const ra = rank.has(a.slug) ? rank.get(a.slug)! : Number.MAX_SAFE_INTEGER;
      const rb = rank.has(b.slug) ? rank.get(b.slug)! : Number.MAX_SAFE_INTEGER;
      if (ra !== rb) return ra - rb;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return ordered
      .map((t) => resolvedCoords.get(t.slug))
      .filter((c): c is [number, number] => Boolean(c));
  }, [activeTripGroup, pinnedTrips, resolvedCoords]);

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800",
        // Mobile keeps a fixed 4:3-ish height; desktop gets a taller fixed
        // height plus optional sticky behavior so the map persists as the
        // user scrolls the trip cards.
        "h-[60vw] max-h-[420px] lg:h-[55vh] lg:max-h-[560px]",
        sticky ? "lg:sticky lg:top-20 lg:z-10" : "",
      ].join(" ")}
    >
      <MapContainer
        center={points[0] ?? [10, 120]}
        zoom={3}
        scrollWheelZoom={false}
        // On touch devices a single-finger drag would otherwise hijack the
        // page scroll while the user is trying to scroll past the map.
        // Disable map dragging on touch and let pinch-zoom remain; desktop
        // keeps full drag. `tap` is left off so taps still hit markers.
        dragging={!isTouch}
        className="h-full w-full"
      >
        {/* `key` forces a fresh TileLayer when the theme flips so the new
           provider's tiles render immediately instead of layering on top. */}
        <TileLayer key={isDark ? "dark" : "light"} url={tile.url} attribution={tile.attribution} />
        {fitBounds && <FitAll points={points} />}
        <FlyTo coords={activeCoords} points={points} />
        {polylinePath.length >= 2 && (
          <Polyline
            positions={polylinePath}
            pathOptions={{
              color: isDark ? "#2dd4bf" : "#0d9488",
              weight: 3,
              opacity: 0.7,
              dashArray: "6 8",
              lineCap: "round",
            }}
          />
        )}
        {pinnedTrips.map((trip) => {
          const isActive = trip.slug === activeSlug;
          const isSibling = !isActive && siblingSlugs.has(trip.slug);
          const state: PinState = isActive ? "active" : isSibling ? "sibling" : "idle";
          return (
            <Marker
              key={`${trip.slug}-${state}-${isDark ? "d" : "l"}`}
              position={resolvedCoords.get(trip.slug) ?? trip.coords}
              icon={buildPinIcon(trip.tags, state, isDark)}
              ref={(instance) => {
                if (instance) {
                  markerRefs.current.set(trip.slug, instance);
                } else {
                  markerRefs.current.delete(trip.slug);
                  // Markers remount whenever their pin state or the theme
                  // changes (the key includes both). Cancel any pending
                  // close timer so it can't fire closePopup on the detached
                  // instance or linger in the map after this marker is gone.
                  const pending = closeTimers.current.get(trip.slug);
                  if (pending) {
                    clearTimeout(pending);
                    closeTimers.current.delete(trip.slug);
                  }
                }
              }}
              eventHandlers={{
                click: () => onSelect(trip.slug),
                mouseover: (event) => {
                  const pending = closeTimers.current.get(trip.slug);
                  if (pending) {
                    clearTimeout(pending);
                    closeTimers.current.delete(trip.slug);
                  }
                  event.target.openPopup();
                },
                mouseout: (event) => {
                  const marker = event.target;
                  // Replace any in-flight timer so repeated mouseouts can't
                  // orphan an earlier one in the map.
                  const existing = closeTimers.current.get(trip.slug);
                  if (existing) clearTimeout(existing);
                  const timer = setTimeout(() => {
                    marker.closePopup();
                    closeTimers.current.delete(trip.slug);
                  }, POPUP_HOVER_LINGER_MS);
                  closeTimers.current.set(trip.slug, timer);
                },
              }}
            >
              <Popup>
                <div className="w-[180px] space-y-1.5">
                  {trip.cover && (
                    <img
                      src={withBasePath(trip.cover)}
                      alt=""
                      className="mb-1 h-24 w-full rounded object-cover"
                    />
                  )}
                  <p className="text-sm font-semibold leading-tight">{trip.title}</p>
                  <p className="text-[11px] text-gray-600">
                    {fmtDate(trip.date)} · {trip.location}
                  </p>
                  <a
                    href={withBasePath(`/travels/${trip.slug}/`)}
                    className="mt-1 inline-block text-xs font-semibold text-teal-700 hover:underline"
                  >
                    Read full trip →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* No pins to show — e.g. a filter excluded everything, or matching
          stops have no coords. Without this the map sits blank and looks
          broken. Pointer-events-none so the map underneath stays usable. */}
      {pinnedTrips.length === 0 && (
        <div className="pointer-events-none absolute inset-0 z-400 flex items-center justify-center bg-white/70 px-4 text-center backdrop-blur-sm dark:bg-gray-900/70">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            No mapped stops match these filters.
          </p>
        </div>
      )}

      {/* Touch hint: dragging is disabled on touch so the page can scroll
          past the map, so tell the user how to pan. */}
      {isTouch && pinnedTrips.length > 0 && (
        <p className="pointer-events-none absolute bottom-1 left-1 z-400 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white">
          Tap a pin for details
        </p>
      )}
    </div>
  );
}
