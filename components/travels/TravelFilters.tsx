"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { TravelSortMode } from "./types";

interface TripChoice {
  slug: string;
  title: string;
}

interface TravelFiltersProps {
  tags: string[];
  countries: string[];
  trips?: TripChoice[];
  activeTag: string | null;
  activeCountry: string | null;
  activeTrip: string | null;
  onTagChange: (tag: string | null) => void;
  onCountryChange: (country: string | null) => void;
  onTripChange: (trip: string | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
  sortMode: TravelSortMode;
  onSortChange: (mode: TravelSortMode) => void;
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:border-teal-400 dark:bg-teal-400/10 dark:text-teal-300"
          : "border-gray-200 text-gray-600 hover:border-teal-500/40 hover:text-teal-700 dark:border-gray-800 dark:text-gray-300 dark:hover:text-teal-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

const ROW_CLASS =
  "-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const ROW_LABEL_CLASS =
  "shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";

export default function TravelFilters({
  tags,
  countries,
  trips = [],
  activeTag,
  activeCountry,
  activeTrip,
  onTagChange,
  onCountryChange,
  onTripChange,
  query,
  onQueryChange,
  sortMode,
  onSortChange,
  resultCount,
  totalCount,
  hasActiveFilters,
  onClearAll,
}: TravelFiltersProps): React.ReactElement | null {
  const hasChipFilters =
    tags.length > 0 || countries.length > 1 || trips.length > 0;

  // Count of *chip* facets currently applied (search is shown separately in
  // the search box), surfaced as a badge so the value of expanding the panel
  // is visible while it's collapsed.
  const activeChipCount =
    (activeTrip ? 1 : 0) + (activeCountry ? 1 : 0) + (activeTag ? 1 : 0);

  // Expand the panel by default when a chip filter is already applied (e.g.
  // arriving with state) so the user can see what's active; collapsed
  // otherwise to keep the long tag list from dominating the page.
  const [open, setOpen] = React.useState(activeChipCount > 0);

  if (!hasChipFilters && totalCount === 0) return null;

  return (
    <div className="space-y-3">
      {/* Search + sort + summary toolbar — always visible. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search places, cities, tags…"
            aria-label="Search travels"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-black placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {hasChipFilters && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className={[
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition",
                activeChipCount > 0
                  ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:border-teal-400 dark:bg-teal-400/10 dark:text-teal-300"
                  : "border-gray-200 text-gray-600 hover:text-teal-700 dark:border-gray-800 dark:text-gray-300 dark:hover:text-teal-300",
              ].join(" ")}
            >
              <SlidersHorizontal aria-hidden="true" size={15} />
              Filters
              {activeChipCount > 0 && (
                <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-bold text-white dark:bg-teal-400 dark:text-gray-900">
                  {activeChipCount}
                </span>
              )}
            </button>
          )}

          <label className="sr-only" htmlFor="travel-sort">
            Sort order
          </label>
          <select
            id="travel-sort"
            value={sortMode}
            onChange={(e) => onSortChange(e.target.value as TravelSortMode)}
            className="shrink-0 rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {/* Result count + clear-all — only when something is filtering. */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-gray-500 dark:text-gray-400" aria-live="polite">
            {resultCount === totalCount
              ? `${totalCount} stop${totalCount === 1 ? "" : "s"}`
              : `${resultCount} of ${totalCount} stop${totalCount === 1 ? "" : "s"} match`}
          </span>
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 font-medium text-teal-700 hover:underline dark:text-teal-300"
          >
            <X aria-hidden="true" size={13} />
            Clear all
          </button>
        </div>
      )}

      {/* Chip rows — collapsible. */}
      {hasChipFilters && open && (
        <div className="space-y-2 rounded-lg border border-gray-200 p-3 dark:border-gray-800">
          {trips.length > 0 && (
            <div className={ROW_CLASS}>
              <span className={ROW_LABEL_CLASS}>Trip</span>
              {trips.map((trip) => (
                <Chip
                  key={trip.slug}
                  label={trip.title}
                  active={activeTrip === trip.slug}
                  onClick={() => onTripChange(activeTrip === trip.slug ? null : trip.slug)}
                />
              ))}
            </div>
          )}
          {countries.length > 1 && (
            <div className={ROW_CLASS}>
              <span className={ROW_LABEL_CLASS}>Country</span>
              {countries.map((country) => (
                <Chip
                  key={country}
                  label={country}
                  active={activeCountry === country}
                  onClick={() =>
                    onCountryChange(activeCountry === country ? null : country)
                  }
                />
              ))}
            </div>
          )}
          {tags.length > 0 && (
            <div className={ROW_CLASS}>
              <span className={ROW_LABEL_CLASS}>Tag</span>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  active={activeTag === tag}
                  onClick={() => onTagChange(activeTag === tag ? null : tag)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
