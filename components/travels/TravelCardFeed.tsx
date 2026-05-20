"use client";

import * as React from "react";
import type { TravelEntry, TripGroup } from "./types";
import { fmtDate, withBasePath } from "@/lib/utils";
import { useTravelSections } from "./useTravelSections";

interface TravelCardFeedProps {
  trips: TravelEntry[];
  tripGroups?: TripGroup[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
  indexBySlug: Record<string, number>;
}

const COLLAPSE_STORAGE_KEY = "travels:collapsed-trips";

const persistCollapsed = (set: Set<string>): void => {
  try {
    window.localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage can throw in private mode / quota — ignore.
  }
};

export default function TravelCardFeed({
  trips,
  tripGroups = [],
  activeSlug,
  onSelect,
  indexBySlug,
}: TravelCardFeedProps): React.ReactElement {
  const sections = useTravelSections(trips, tripGroups);

  // The first trip section (sections are sorted newest-first in
  // useTravelSections) stays expanded by default; everything older collapses
  // so a feed full of trips doesn't dump a huge wall of stops on load.
  const newestTripKey = React.useMemo(
    () => sections.find((s) => s.kind === "trip")?.key,
    [sections],
  );

  // null until hydrated from localStorage on the client — render expanded
  // pre-hydration so SSR/CSR markup match and the user sees content while
  // we resolve their saved preference.
  const [collapsed, setCollapsed] = React.useState<Set<string> | null>(null);

  React.useEffect(() => {
    let stored: string[] | null = null;
    try {
      const raw = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as string[];
    } catch {
      stored = null;
    }

    // The keys we're allowed to collapse — only existing trip sections.
    const tripKeys = sections.filter((s) => s.kind === "trip").map((s) => s.key);
    const knownKeys = new Set(tripKeys);
    const storedSet = new Set(
      Array.isArray(stored) ? stored.filter((k) => knownKeys.has(k)) : [],
    );

    const initial = new Set<string>();
    for (const key of tripKeys) {
      if (storedSet.has(key)) {
        // Honor the saved state for trips the user has seen before.
        initial.add(key);
      } else if (!stored) {
        // True first visit (no stored value at all): collapse all but newest.
        if (key !== newestTripKey) initial.add(key);
      }
      // A trip absent from a *non-empty* stored set is new since the last
      // visit — leave it expanded so the user notices it.
    }

    setCollapsed(initial);
    // Rewrite storage with the reconciled set so stale keys don't accumulate.
    persistCollapsed(initial);
    // We only want to seed this once on mount; sections changing later
    // (e.g. filter toggles) shouldn't reset the user's preferences.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSection = React.useCallback((key: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev ?? []);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      persistCollapsed(next);
      return next;
    });
  }, []);

  // Idempotent expand: only ever clears the key from the collapsed set, so
  // calling it on an already-expanded section is a no-op. The map-hover
  // effect relies on this — using toggleSection there could re-collapse a
  // section if the effect re-ran after the user had expanded it.
  const expandSection = React.useCallback((key: string) => {
    setCollapsed((prev) => {
      if (!prev?.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      persistCollapsed(next);
      return next;
    });
  }, []);

  // Hover-intent for card → map sync. Selecting is immediate, but deselect
  // is delayed so moving the cursor from a card toward the map doesn't
  // instantly close the popup the card opened. Mirrors the map popup's own
  // mouseout linger so the interaction feels symmetric in both directions.
  const deselectTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearDeselect = React.useCallback(() => {
    if (deselectTimer.current) {
      clearTimeout(deselectTimer.current);
      deselectTimer.current = null;
    }
  }, []);
  const selectCard = React.useCallback(
    (slug: string) => {
      clearDeselect();
      onSelect(slug);
    },
    [clearDeselect, onSelect],
  );
  const deselectCard = React.useCallback(() => {
    clearDeselect();
    deselectTimer.current = setTimeout(() => onSelect(null), 250);
  }, [clearDeselect, onSelect]);
  React.useEffect(() => clearDeselect, [clearDeselect]);

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

    const scrollIfNeeded = (): void => {
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      if (!inView) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    // If the card is inside a collapsed trip section, expand it first so
    // scrolling to it actually lands on something visible. The <ul> only
    // un-hides on the next render, so defer the scroll a frame to measure
    // the card once it's actually laid out.
    const sectionKey = el.dataset.sectionKey;
    if (sectionKey && collapsed?.has(sectionKey)) {
      expandSection(sectionKey);
      const raf = requestAnimationFrame(scrollIfNeeded);
      return () => cancelAnimationFrame(raf);
    }

    scrollIfNeeded();
  }, [activeSlug, collapsed, expandSection]);

  if (trips.length === 0) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-300">No trips match these filters.</p>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const isCollapsible = section.kind === "trip";
        const isCollapsed = isCollapsible && (collapsed?.has(section.key) ?? false);
        const listId = `feed-list-${section.key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
        return (
        <section key={section.key} aria-label={section.heading}>
          {section.kind === "trip" ? (
            <header className="mb-3 flex items-stretch overflow-hidden rounded-lg border border-teal-500/30 bg-teal-500/5 dark:border-teal-400/30 dark:bg-teal-400/5">
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                aria-expanded={!isCollapsed}
                aria-controls={listId}
                className="flex min-w-0 flex-1 items-start gap-2.5 px-3.5 py-3 text-left transition hover:bg-teal-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500/60 dark:hover:bg-teal-400/10"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={[
                    "mt-0.5 h-4 w-4 shrink-0 text-teal-700 transition-transform duration-200 motion-reduce:transition-none dark:text-teal-300",
                    isCollapsed ? "" : "rotate-90",
                  ].join(" ")}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.22 4.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L10.94 10 6.22 5.28a.75.75 0 0 1 0-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-bold text-teal-800 dark:text-teal-100">
                    {section.heading}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {section.meta && (
                      <span className="rounded-full bg-teal-500/15 px-2 py-0.5 text-[10px] font-semibold text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
                        {section.meta}
                      </span>
                    )}
                    <span className="rounded-full bg-teal-500/15 px-2 py-0.5 text-[10px] font-semibold text-teal-800 dark:bg-teal-400/15 dark:text-teal-200">
                      {section.items.length} stop{section.items.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  {section.summary && (
                    <p className="mt-1.5 line-clamp-2 text-xs text-gray-700 dark:text-gray-300">
                      {section.summary}
                    </p>
                  )}
                </div>
              </button>
              {section.tripSlug && (
                <a
                  href={withBasePath(`/travels/trip/${section.tripSlug}/`)}
                  aria-label={`View trip: ${section.heading}`}
                  className="flex shrink-0 items-center whitespace-nowrap border-l border-teal-500/30 px-3 text-[11px] font-semibold text-teal-700 transition hover:bg-teal-500/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500/60 dark:border-teal-400/30 dark:text-teal-300 dark:hover:bg-teal-400/10"
                >
                  View trip →
                </a>
              )}
            </header>
          ) : (
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {section.heading}
            </h2>
          )}
          <ul
            id={listId}
            className={[
              section.kind === "trip"
                // Timeline: a continuous connector line runs down the left
                // behind the numbered waypoint badges, mirroring the map's
                // itinerary polyline. The line is inset to sit under the
                // badge centers (badge col is 1.75rem wide).
                ? "relative space-y-3 before:absolute before:bottom-3 before:left-[0.8125rem] before:top-3 before:w-px before:bg-teal-500/30 dark:before:bg-teal-400/30"
                : "space-y-3",
            ].join(" ")}
            hidden={isCollapsed}
          >
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
                  data-section-key={section.key}
                  onMouseEnter={() => selectCard(trip.slug)}
                  onMouseLeave={deselectCard}
                  className={section.kind === "trip" ? "relative flex items-stretch gap-3" : ""}
                >
                  {section.kind === "trip" && (
                    // Waypoint badge sits on the connector line. Highlights
                    // teal-filled when its card is the active one.
                    <span
                      aria-hidden="true"
                      className={[
                        "relative z-10 mt-3 flex h-[1.625rem] w-[1.625rem] shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 transition motion-reduce:transition-none",
                        isActive
                          ? "scale-110 bg-teal-500 text-white ring-white dark:bg-teal-400 dark:text-gray-900 dark:ring-gray-900"
                          : "bg-white text-teal-700 ring-teal-500/40 dark:bg-gray-900 dark:text-teal-300 dark:ring-teal-400/40",
                      ].join(" ")}
                    >
                      {idx ?? "·"}
                    </span>
                  )}
                  <StopCard
                    trip={trip}
                    isActive={isActive}
                    showIndexBadge={section.kind !== "trip"}
                    idx={idx}
                    onFocus={() => selectCard(trip.slug)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        );
      })}
    </div>
  );
}

interface StopCardProps {
  trip: TravelEntry;
  isActive: boolean;
  /** Year sections overlay the chrono index on the cover; trip sections show
   * it on the timeline badge instead, so the cover badge is suppressed. */
  showIndexBadge: boolean;
  idx: number | undefined;
  onFocus: () => void;
}

function StopCard({ trip, isActive, showIndexBadge, idx, onFocus }: StopCardProps) {
  return (
    <a
      href={withBasePath(`/travels/${trip.slug}/`)}
      onFocus={onFocus}
      className={[
        "group flex flex-1 gap-4 overflow-hidden rounded-lg border bg-white p-3 transition duration-200 motion-reduce:transition-none dark:bg-gray-900/40",
        isActive
          ? "border-teal-500/60 shadow-md ring-1 ring-teal-500/20 dark:border-teal-400/60 dark:ring-teal-400/20"
          : "border-gray-200 hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-sm motion-reduce:hover:translate-y-0 dark:border-gray-800 dark:hover:border-teal-400/40",
      ].join(" ")}
    >
      <div className="relative shrink-0">
        {trip.cover ? (
          <img
            src={withBasePath(trip.cover)}
            alt=""
            loading="lazy"
            className="h-24 w-24 rounded-md object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-28 sm:w-40"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gradient-to-br from-teal-500/20 to-teal-700/20 text-2xl sm:h-28 sm:w-40">
            <span aria-hidden="true">🗺️</span>
          </div>
        )}
        {showIndexBadge && idx !== undefined && (
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
  );
}
