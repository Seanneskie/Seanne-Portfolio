"use client";

import * as React from "react";
import type { TravelEntry, TripGroup } from "./types";
import { withBasePath } from "@/lib/utils";

interface TravelCardFeedProps {
  trips: TravelEntry[];
  tripGroups?: TripGroup[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  indexBySlug: Record<string, number>;
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
    const endDay = end.getDate();
    return `${monthDay}–${endDay}, ${end.getFullYear()}`;
  }
  return `${fmtDate(startIso)} – ${fmtDate(endIso)}`;
};

// Sort trip stops by the itinerary order in `stops:`, then fall back to date
// (oldest first — narrative order within the trip). Items not listed in
// `stops` go to the end. Empty `stops` → pure date ascending.
function sortByItinerary(items: TravelEntry[], stops: string[]): TravelEntry[] {
  const rank = new Map(stops.map((slug, i) => [slug, i]));
  return [...items].sort((a, b) => {
    const ra = rank.has(a.slug) ? rank.get(a.slug)! : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.slug) ? rank.get(b.slug)! : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

// One feed section — either a multi-stop trip or a year bucket of one-offs.
interface FeedSection {
  key: string;
  kind: "trip" | "year";
  // The headline for the section heading.
  heading: string;
  // Optional secondary label (date range / location / summary).
  meta?: string;
  summary?: string;
  // Sorted newest → oldest so each section reads top-down chronologically.
  items: TravelEntry[];
  // Representative date used to sort sections newest → oldest.
  sortDate: number;
}

export default function TravelCardFeed({
  trips,
  tripGroups = [],
  activeSlug,
  onSelect,
  indexBySlug,
}: TravelCardFeedProps): React.ReactElement {
  // Bucket entries: known trip slug → trip section; everything else → year.
  // Trip sections always render even when the trip has only one current entry,
  // so the trip framing is visible as soon as it's been authored.
  const sections = React.useMemo<FeedSection[]>(() => {
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
        const sortedItems = sortByItinerary(items, group.stops);
        return {
          key: `trip:${slug}`,
          kind: "trip",
          heading: group.title,
          meta: `${fmtDateRange(group.startDate, group.endDate)} · ${group.location}`,
          summary: group.summary,
          items: sortedItems,
          sortDate: new Date(group.startDate).getTime(),
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

  // When the map flips activeSlug (e.g. user hovered a pin), scroll the
  // matching card into view. Only scroll when the change is map-driven —
  // avoid jumping the page when the user is already hovering a card.
  const cardRefs = React.useRef<Map<string, HTMLLIElement | null>>(new Map());
  const lastActiveRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!activeSlug || activeSlug === lastActiveRef.current) {
      lastActiveRef.current = activeSlug;
      return;
    }
    lastActiveRef.current = activeSlug;
    const el = cardRefs.current.get(activeSlug);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    if (!inView) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeSlug]);

  if (trips.length === 0) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-300">No trips match these filters.</p>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.key} aria-label={section.heading}>
          {section.kind === "trip" ? (
            <header className="mb-3 rounded-lg border border-teal-500/30 bg-teal-500/5 px-3 py-2 dark:border-teal-400/30 dark:bg-teal-400/5">
              <h2 className="text-sm font-semibold text-teal-800 dark:text-teal-200">
                {section.heading}
              </h2>
              {section.meta && (
                <p className="mt-0.5 text-[11px] text-teal-700/80 dark:text-teal-300/80">
                  {section.meta} · {section.items.length} stop
                  {section.items.length === 1 ? "" : "s"}
                </p>
              )}
              {section.summary && (
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">{section.summary}</p>
              )}
            </header>
          ) : (
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {section.heading}
            </h2>
          )}
          <ul className="space-y-3">
            {section.items.map((trip) => {
              const isActive = trip.slug === activeSlug;
              const idx = indexBySlug[trip.slug];
              return (
                <li
                  key={trip.slug}
                  ref={(el) => {
                    if (el) cardRefs.current.set(trip.slug, el);
                    else cardRefs.current.delete(trip.slug);
                  }}
                  onMouseEnter={() => onSelect(trip.slug)}
                  onMouseLeave={() => onSelect(null)}
                >
                  <a
                    href={withBasePath(`/travels/${trip.slug}/`)}
                    onFocus={() => onSelect(trip.slug)}
                    className={[
                      "group flex gap-4 overflow-hidden rounded-lg border bg-white p-3 transition dark:bg-gray-900/40",
                      isActive
                        ? "border-teal-500/60 shadow-sm ring-1 ring-teal-500/20 dark:border-teal-400/60 dark:ring-teal-400/20"
                        : "border-gray-200 hover:border-teal-500/40 dark:border-gray-800 dark:hover:border-teal-400/40",
                    ].join(" ")}
                  >
                    <div className="relative shrink-0">
                      {trip.cover ? (
                        <img
                          src={withBasePath(trip.cover)}
                          alt=""
                          loading="lazy"
                          className="h-24 w-24 rounded-md object-cover sm:h-28 sm:w-40"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gradient-to-br from-teal-500/20 to-teal-700/20 text-2xl sm:h-28 sm:w-40">
                          <span aria-hidden="true">🗺️</span>
                        </div>
                      )}
                      {idx !== undefined && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white ring-2 ring-white dark:ring-gray-900"
                        >
                          {idx}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <time>{fmtDate(trip.date)}</time>
                        <span className="truncate">{trip.location}</span>
                      </div>
                      <h3 className="mt-0.5 text-base font-semibold text-black group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                        {trip.title}
                      </h3>
                      {trip.excerpt && (
                        <p className="mt-0.5 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                          {trip.excerpt}
                        </p>
                      )}
                      {trip.tags.length > 0 && (
                        <ul className="mt-1.5 flex flex-wrap gap-1">
                          {trip.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full bg-teal-500/10 px-1.5 py-0.5 text-[10px] font-medium text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
                            >
                              #{tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
