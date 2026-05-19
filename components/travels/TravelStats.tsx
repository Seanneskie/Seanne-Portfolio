"use client";

import * as React from "react";
import type { TravelEntry } from "./types";

interface TravelStatsProps {
  trips: TravelEntry[];
}

export default function TravelStats({ trips }: TravelStatsProps): React.ReactElement | null {
  const stats = React.useMemo(() => {
    if (trips.length === 0) return null;
    const countries = new Set<string>();
    const cities = new Set<string>();
    let minYear = Infinity;
    let maxYear = -Infinity;
    for (const trip of trips) {
      if (trip.country) countries.add(trip.country);
      if (trip.city) cities.add(trip.city);
      const year = new Date(trip.date).getFullYear();
      if (year < minYear) minYear = year;
      if (year > maxYear) maxYear = year;
    }
    const yearRange = minYear === maxYear ? String(minYear) : `${minYear}–${maxYear}`;
    return {
      tripCount: trips.length,
      countryCount: countries.size,
      cityCount: cities.size,
      yearRange,
    };
  }, [trips]);

  if (!stats) return null;

  const Item = ({ value, label }: { value: string | number; label: string }) => (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-teal-700 dark:text-teal-300">{value}</span>
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-gray-900/40">
      <Item value={stats.tripCount} label={stats.tripCount === 1 ? "trip" : "trips"} />
      {stats.cityCount > 0 && (
        <>
          <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">·</span>
          <Item value={stats.cityCount} label={stats.cityCount === 1 ? "city" : "cities"} />
        </>
      )}
      {stats.countryCount > 0 && (
        <>
          <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">·</span>
          <Item value={stats.countryCount} label={stats.countryCount === 1 ? "country" : "countries"} />
        </>
      )}
      <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">·</span>
      <Item value={stats.yearRange} label="" />
    </div>
  );
}
