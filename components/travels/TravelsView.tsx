"use client";

import * as React from "react";
import TravelMap from "./TravelMap";
import TravelCardFeed from "./TravelCardFeed";
import TravelStats from "./TravelStats";
import TravelFilters from "./TravelFilters";
import type { TravelEntry } from "./types";

interface TravelsViewProps {
  trips: TravelEntry[];
}

export default function TravelsView({ trips }: TravelsViewProps): React.ReactElement {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [activeCountry, setActiveCountry] = React.useState<string | null>(null);

  // Collect the union of all tags/countries across trips so the filter chips
  // always show the full vocabulary, not just what's currently visible.
  const { allTags, allCountries } = React.useMemo(() => {
    const tagSet = new Set<string>();
    const countrySet = new Set<string>();
    for (const trip of trips) {
      trip.tags.forEach((t) => tagSet.add(t));
      if (trip.country) countrySet.add(trip.country);
    }
    return {
      allTags: Array.from(tagSet).sort(),
      allCountries: Array.from(countrySet).sort(),
    };
  }, [trips]);

  const filteredTrips = React.useMemo(() => {
    return trips.filter((t) => {
      if (activeTag && !t.tags.includes(activeTag)) return false;
      if (activeCountry && t.country !== activeCountry) return false;
      return true;
    });
  }, [trips, activeTag, activeCountry]);

  // Chronological index (1-based, oldest first) so the pins read like waypoints
  // on a journey rather than mirroring the newest-first list order.
  const indexBySlug = React.useMemo(() => {
    const map: Record<string, number> = {};
    const ordered = [...filteredTrips].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    ordered.forEach((trip, i) => {
      map[trip.slug] = i + 1;
    });
    return map;
  }, [filteredTrips]);

  if (trips.length === 0) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-300">No trips logged yet.</p>
    );
  }

  return (
    <div className="space-y-6">
      <TravelStats trips={filteredTrips} />
      <TravelFilters
        tags={allTags}
        countries={allCountries}
        activeTag={activeTag}
        activeCountry={activeCountry}
        onTagChange={setActiveTag}
        onCountryChange={setActiveCountry}
      />
      {/* Desktop: map on the left sticks while the feed scrolls on the right.
          Mobile: single column, map renders first then the feed below. */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <TravelMap
          trips={filteredTrips}
          activeSlug={activeSlug}
          onSelect={setActiveSlug}
          sticky
        />
        <TravelCardFeed
          trips={filteredTrips}
          activeSlug={activeSlug}
          onSelect={setActiveSlug}
          indexBySlug={indexBySlug}
        />
      </div>
    </div>
  );
}
