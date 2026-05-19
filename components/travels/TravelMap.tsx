"use client";

import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TravelEntry } from "./types";

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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
