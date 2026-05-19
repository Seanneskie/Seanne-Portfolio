"use client";

import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TravelEntry } from "./types";

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
  onSelect: (slug: string) => void;
  /** When true, fit bounds to all pins on mount; otherwise centers on the first pin. */
  fitBounds?: boolean;
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

export default function TravelMap({
  trips,
  activeSlug,
  onSelect,
  fitBounds = true,
}: TravelMapProps): React.ReactElement {
  const isDark = useIsDarkMode();
  const tile = isDark ? TILES.dark : TILES.light;

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
    <div className="h-[420px] w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 lg:h-[560px]">
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
        {pinnedTrips.map((trip) => (
          <Marker
            key={trip.slug}
            position={trip.coords}
            eventHandlers={{ click: () => onSelect(trip.slug) }}
          >
            <Popup>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{trip.title}</p>
                <p className="text-xs text-gray-600">{trip.location}</p>
                {trip.excerpt && <p className="text-xs">{trip.excerpt}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
