"use client";

import * as React from "react";
import type { TravelEntry } from "./types";
import { withBasePath } from "@/lib/utils";

interface TravelTimelineProps {
  trips: TravelEntry[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
}

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function TravelTimeline({
  trips,
  activeSlug,
  onSelect,
}: TravelTimelineProps): React.ReactElement {
  // Group by year (descending) so the timeline reads newest → oldest with
  // sticky year headers as visual anchors.
  const byYear = React.useMemo(() => {
    const groups = new Map<number, TravelEntry[]>();
    for (const trip of trips) {
      const year = new Date(trip.date).getFullYear();
      const bucket = groups.get(year) ?? [];
      bucket.push(trip);
      groups.set(year, bucket);
    }
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }, [trips]);

  return (
    <div className="h-[420px] overflow-y-auto pr-2 lg:h-[560px]">
      {byYear.map(([year, items]) => (
        <section key={year} className="mb-6">
          <h3 className="sticky top-0 z-10 -mx-1 mb-3 bg-white/90 px-1 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500 backdrop-blur dark:bg-gray-900/90 dark:text-gray-400">
            {year}
          </h3>
          <ol className="relative space-y-2 border-l border-gray-200 pl-5 dark:border-gray-800">
            {items.map((trip) => {
              const isActive = trip.slug === activeSlug;
              return (
                <li key={trip.slug} className="relative">
                  <span
                    className={[
                      "absolute -left-[26px] top-3 inline-block h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-900",
                      isActive ? "bg-teal-500" : "bg-gray-400 dark:bg-gray-600",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onMouseEnter={() => onSelect(trip.slug)}
                    onFocus={() => onSelect(trip.slug)}
                    onClick={() => onSelect(trip.slug)}
                    aria-pressed={isActive}
                    className={[
                      "block w-full rounded-md border px-3 py-2 text-left text-sm transition",
                      isActive
                        ? "border-teal-500/60 bg-teal-500/5 dark:border-teal-400/50 dark:bg-teal-400/10"
                        : "border-gray-200 bg-white hover:border-teal-500/40 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-teal-400/40",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{fmtDate(trip.date)}</span>
                      <span>{trip.location}</span>
                    </div>
                    <p className="mt-0.5 font-medium text-black dark:text-white">{trip.title}</p>
                    {trip.excerpt && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-gray-600 dark:text-gray-300">
                        {trip.excerpt}
                      </p>
                    )}
                    <a
                      href={withBasePath(`/travels/${trip.slug}/`)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 inline-block text-xs font-medium text-teal-700 hover:underline dark:text-teal-300"
                    >
                      Read more →
                    </a>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
