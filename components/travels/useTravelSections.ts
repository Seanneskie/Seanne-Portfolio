import * as React from "react";
import type { TravelEntry, TripGroup } from "./types";

export interface FeedSection {
  key: string;
  kind: "trip" | "year";
  heading: string;
  meta?: string;
  summary?: string;
  items: TravelEntry[];
  sortDate: number;
  tripSlug?: string;
}

// Sort trip stops by the itinerary order in `stops:`, then fall back to date
// (ascending — narrative order). Items not listed in `stops` go to the end.
function sortByItinerary(items: TravelEntry[], stops: string[]): TravelEntry[] {
  const rank = new Map(stops.map((slug, i) => [slug, i]));
  return [...items].sort((a, b) => {
    const ra = rank.has(a.slug) ? rank.get(a.slug)! : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.slug) ? rank.get(b.slug)! : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const fmtDateRange = (startIso: string, endIso?: string): string => {
  const start = new Date(startIso);
  if (!endIso) return fmtDate(startIso);
  const end = new Date(endIso);
  const sameMonth =
    start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth();
  if (sameMonth) {
    const monthDay = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${monthDay}–${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${fmtDate(startIso)} – ${fmtDate(endIso)}`;
};

/**
 * Bucket travel entries into feed sections — trip-named or year-named —
 * sorted newest first. Entries with a known `trip` slug land under that
 * trip's section in itinerary order; everyone else falls into year buckets
 * sorted by date desc.
 */
export function useTravelSections(
  trips: TravelEntry[],
  tripGroups: TripGroup[],
): FeedSection[] {
  return React.useMemo(() => {
    const groupsBySlug = new Map(tripGroups.map((g) => [g.slug, g]));
    const tripBuckets = new Map<string, TravelEntry[]>();
    const yearBuckets = new Map<number, TravelEntry[]>();

    for (const trip of trips) {
      const tripSlug = trip.trip;
      if (tripSlug && groupsBySlug.has(tripSlug)) {
        const bucket = tripBuckets.get(tripSlug) ?? [];
        bucket.push(trip);
        tripBuckets.set(tripSlug, bucket);
      } else {
        const year = new Date(trip.date).getFullYear();
        const bucket = yearBuckets.get(year) ?? [];
        bucket.push(trip);
        yearBuckets.set(year, bucket);
      }
    }

    const tripSections: FeedSection[] = Array.from(tripBuckets.entries()).map(
      ([slug, items]) => {
        const group = groupsBySlug.get(slug)!;
        return {
          key: `trip:${slug}`,
          kind: "trip",
          heading: group.title,
          meta: `${fmtDateRange(group.startDate, group.endDate)} · ${group.location}`,
          summary: group.summary,
          items: sortByItinerary(items, group.stops),
          sortDate: new Date(group.startDate).getTime(),
          tripSlug: slug,
        };
      },
    );

    const yearSections: FeedSection[] = Array.from(yearBuckets.entries()).map(
      ([year, items]) => {
        const sortedItems = [...items].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        return {
          key: `year:${year}`,
          kind: "year",
          heading: String(year),
          items: sortedItems,
          sortDate: new Date(sortedItems[0]?.date ?? `${year}-01-01`).getTime(),
        };
      },
    );

    return [...tripSections, ...yearSections].sort((a, b) => b.sortDate - a.sortDate);
  }, [trips, tripGroups]);
}
