import type { TravelEntry } from "./types";

// Two pins are "stacked" if their coords match to ~1m precision. At zoom
// levels relevant for city-scale travel, anything closer than that is
// indistinguishable to the user and the icons overlap.
const COORD_KEY_PRECISION = 5;

// Radius of the fan-out circle in degrees (~22m at the equator). Stays
// inside the same building footprint so the pin still reads as "this mall"
// while becoming individually clickable. Increase if your collisions are
// across a campus rather than a single building.
const JITTER_RADIUS_DEG = 0.0002;

function keyOf(coords: [number, number]): string {
  return `${coords[0].toFixed(COORD_KEY_PRECISION)},${coords[1].toFixed(COORD_KEY_PRECISION)}`;
}

/**
 * Fan-out pins that share the exact same coords into a small ring so each
 * marker is independently clickable. Single-occupant coords are returned
 * untouched. Order within a collision group is stable (input order).
 */
export function jitterPins(
  trips: (TravelEntry & { coords: [number, number] })[],
): Map<string, [number, number]> {
  const groups = new Map<string, (TravelEntry & { coords: [number, number] })[]>();
  for (const trip of trips) {
    const k = keyOf(trip.coords);
    const bucket = groups.get(k) ?? [];
    bucket.push(trip);
    groups.set(k, bucket);
  }

  const out = new Map<string, [number, number]>();
  for (const bucket of groups.values()) {
    if (bucket.length === 1) {
      out.set(bucket[0].slug, bucket[0].coords);
      continue;
    }
    // Distribute n pins around the circle; n=2 lands them on opposite sides,
    // n=3 forms a triangle, etc. Start at the top (angle = -π/2) so the
    // arrangement reads predictably.
    const n = bucket.length;
    for (let i = 0; i < n; i++) {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const [lat, lng] = bucket[i].coords;
      out.set(bucket[i].slug, [
        lat + JITTER_RADIUS_DEG * Math.sin(angle),
        lng + JITTER_RADIUS_DEG * Math.cos(angle),
      ]);
    }
  }
  return out;
}
