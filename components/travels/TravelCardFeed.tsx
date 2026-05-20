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
    if (stored && Array.isArray(stored)) {
      setCollapsed(new Set(stored));
    } else {
      // First visit: collapse every trip section except the newest one.
      const initial = new Set<string>();
      for (const s of sections) {
        if (s.kind === "trip" && s.key !== newestTripKey) initial.add(s.key);
      }
      setCollapsed(initial);
    }
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
            <header className="relative mb-3 overflow-hidden rounded-lg border border-teal-500/30 bg-teal-500/5 dark:border-teal-400/30 dark:bg-teal-400/5">
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                aria-expanded={!isCollapsed}
                aria-controls={listId}
                className="flex w-full items-start gap-2 px-3 py-2 pr-24 text-left transition hover:bg-teal-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500/60 dark:hover:bg-teal-400/10"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={[
                    "mt-1 h-3.5 w-3.5 shrink-0 text-teal-700 transition-transform dark:text-teal-300",
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
                  <h2 className="truncate text-sm font-semibold text-teal-800 dark:text-teal-200">
                    {section.heading}
                  </h2>
                  {section.meta && (
                    <p className="mt-0.5 text-[11px] text-teal-700/80 dark:text-teal-300/80">
                      {section.meta} · {section.items.length} stop
                      {section.items.length === 1 ? "" : "s"}
                    </p>
                  )}
                  {section.summary && !isCollapsed && (
                    <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">{section.summary}</p>
                  )}
                </div>
              </button>
              {section.tripSlug && (
                <a
                  href={withBasePath(`/travels/trip/${section.tripSlug}/`)}
                  className="absolute right-3 top-2 z-10 text-[11px] font-semibold text-teal-700 hover:underline dark:text-teal-300"
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
          <ul id={listId} className="space-y-3" hidden={isCollapsed}>
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
        );
      })}
    </div>
  );
}
