"use client";

import * as React from "react";
import type { TravelEntry, TripGroup } from "./types";
import { withBasePath } from "@/lib/utils";
import { useTravelSections } from "./useTravelSections";

interface TravelCardFeedProps {
  trips: TravelEntry[];
  tripGroups?: TripGroup[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  indexBySlug: Record<string, number>;
}

const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function TravelCardFeed({
  trips,
  tripGroups = [],
  activeSlug,
  onSelect,
  indexBySlug,
}: TravelCardFeedProps): React.ReactElement {
  const sections = useTravelSections(trips, tripGroups);

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
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-sm font-semibold text-teal-800 dark:text-teal-200">
                  {section.heading}
                </h2>
                {section.tripSlug && (
                  <a
                    href={withBasePath(`/travels/trip/${section.tripSlug}/`)}
                    className="shrink-0 text-[11px] font-semibold text-teal-700 hover:underline dark:text-teal-300"
                  >
                    View trip →
                  </a>
                )}
              </div>
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
