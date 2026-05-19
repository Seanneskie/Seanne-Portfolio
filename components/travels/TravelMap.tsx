"use client";

import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TravelEntry } from "./types";
import { withBasePath } from "@/lib/utils";
import { resolvePinIcon } from "./pinIcon";

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

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
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  /** When true, fit bounds to all pins on mount; otherwise centers on the first pin. */
  fitBounds?: boolean;
  /** When true, the map sticks to the top on desktop as the page scrolls. */
  sticky?: boolean;
}

// Builds a Leaflet divIcon that renders a circular pin in the brand teal with
// a tag-derived Lucide glyph inside. The glyph is serialized to SVG once per
// (tag, active) pair via renderToStaticMarkup so we avoid shipping a sprite
// and the pin can still inherit theme colors at runtime.
function buildPinIcon(tags: string[], active: boolean): L.DivIcon {
  const size = active ? 36 : 28;
  const glyphSize = active ? 18 : 16;
  const Icon = resolvePinIcon(tags);
  const glyph = renderToStaticMarkup(
    <Icon size={glyphSize} strokeWidth={2.25} color="#fff" />,
  );
  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 9999px;
      background: ${active ? "#0d9488" : "#14b8a6"};
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 2px #fff, 0 4px 10px rgba(0,0,0,0.25);
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

function FlyTo({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords) {
      map.flyTo(coords, Math.max(map.getZoom(), 6), { duration: 0.8 });
    }
  }, [coords, map]);
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
  activeSlug,
  onSelect,
  fitBounds = true,
  sticky = false,
}: TravelMapProps): React.ReactElement {
  const isDark = useIsDarkMode();
  const tile = isDark ? TILES.dark : TILES.light;
  const closeTimers = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  React.useEffect(() => {
    const timers = closeTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const pinnedTrips = React.useMemo(
    () => trips.filter((t): t is TravelEntry & { coords: [number, number] } => Boolean(t.coords)),
    [trips],
  );

  const points = React.useMemo(
    () => pinnedTrips.map((t) => t.coords),
    [pinnedTrips],
  );

  const activeCoords = React.useMemo<[number, number] | null>(() => {
    if (!activeSlug) return null;
    const active = pinnedTrips.find((t) => t.slug === activeSlug);
    return active?.coords ?? null;
  }, [activeSlug, pinnedTrips]);

  return (
    <div
      className={[
        "w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800",
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
        className="h-full w-full"
      >
        {/* `key` forces a fresh TileLayer when the theme flips so the new
           provider's tiles render immediately instead of layering on top. */}
        <TileLayer key={isDark ? "dark" : "light"} url={tile.url} attribution={tile.attribution} />
        {fitBounds && <FitAll points={points} />}
        <FlyTo coords={activeCoords} />
        {pinnedTrips.map((trip) => {
          const isActive = trip.slug === activeSlug;
          return (
            <Marker
              key={`${trip.slug}-${isActive ? "active" : "idle"}`}
              position={trip.coords}
              icon={buildPinIcon(trip.tags, isActive)}
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
    </div>
  );
}
