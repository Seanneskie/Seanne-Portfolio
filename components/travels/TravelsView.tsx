"use client";

import * as React from "react";
import TravelMap from "./TravelMap";
import TravelCardFeed from "./TravelCardFeed";
import TravelStats from "./TravelStats";
import TravelFilters from "./TravelFilters";
import type { TravelEntry, TripGroup } from "./types";

interface TravelsViewProps {
  trips: TravelEntry[];
  tripGroups?: TripGroup[];
}

export default function TravelsView({
  trips,
  tripGroups = [],
}: TravelsViewProps): React.ReactElement {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [activeCountry, setActiveCountry] = React.useState<string | null>(null);
  const [activeTrip, setActiveTrip] = React.useState<string | null>(null);

  // Tag vocabulary narrows to the active trip's stops when one is selected,
  // so "Davao trip + #coffee" shows only the coffee stop in that trip rather
  // than every coffee stop ever. Country list does the same; trip list is
  // always the full set.
  const { allTags, allCountries } = React.useMemo(() => {
    const inScope = activeTrip
      ? trips.filter((t) => t.trip === activeTrip)
      : trips;
    const tagSet = new Set<string>();
    const countrySet = new Set<string>();
    for (const trip of inScope) {
      trip.tags.forEach((t) => tagSet.add(t));
      if (trip.country) countrySet.add(trip.country);
    }
    return {
      allTags: Array.from(tagSet).sort(),
      allCountries: Array.from(countrySet).sort(),
    };
  }, [trips, activeTrip]);

  // Reset tag/country when they leave the active trip's vocabulary, so a
  // stale filter doesn't silently hide everything after switching trips.
  React.useEffect(() => {
    if (activeTag && !allTags.includes(activeTag)) setActiveTag(null);
    if (activeCountry && !allCountries.includes(activeCountry)) setActiveCountry(null);
  }, [allTags, allCountries, activeTag, activeCountry]);

  const tripChoices = React.useMemo(
    () => tripGroups.map((g) => ({ slug: g.slug, title: g.title })),
    [tripGroups],
  );

  const filteredTrips = React.useMemo(() => {
    return trips.filter((t) => {
      if (activeTrip && t.trip !== activeTrip) return false;
      if (activeTag && !t.tags.includes(activeTag)) return false;
      if (activeCountry && t.country !== activeCountry) return false;
      return true;
    });
  }, [trips, activeTag, activeCountry, activeTrip]);

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
        trips={tripChoices}
        activeTag={activeTag}
        activeCountry={activeCountry}
        activeTrip={activeTrip}
        onTagChange={setActiveTag}
        onCountryChange={setActiveCountry}
        onTripChange={setActiveTrip}
      />
      {/* Desktop: map on the left sticks while the feed scrolls on the right.
          Mobile: single column, map renders first then the feed below. */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <TravelMap
          trips={filteredTrips}
          tripGroups={tripGroups}
          activeSlug={activeSlug}
          onSelect={setActiveSlug}
          sticky
        />
        <TravelCardFeed
          trips={filteredTrips}
          tripGroups={tripGroups}
          activeSlug={activeSlug}
          onSelect={setActiveSlug}
          indexBySlug={indexBySlug}
        />
      </div>
    </div>
  );
}
