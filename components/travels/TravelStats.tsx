"use client";

import * as React from "react";
import { CalendarRange, Globe2, MapPin, Plane, type LucideIcon } from "lucide-react";
import type { TravelEntry } from "./types";
import { parseLocalDate } from "@/lib/utils";

interface TravelStatsProps {
  trips: TravelEntry[];
}

interface StatCard {
  icon: LucideIcon;
  value: string | number;
  label: string;
  /** Screen-reader sentence; visible label may be terse/empty. */
  srLabel: string;
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
      const year = parseLocalDate(trip.date).getFullYear();
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

  // Only surface a card when its metric is meaningful (cities/countries can
  // be zero when content lacks that field). Trips and year range always show.
  const cards: StatCard[] = [
    {
      icon: Plane,
      value: stats.tripCount,
      label: stats.tripCount === 1 ? "stop" : "stops",
      srLabel: `${stats.tripCount} ${stats.tripCount === 1 ? "stop" : "stops"}`,
    },
  ];
  if (stats.cityCount > 0) {
    cards.push({
      icon: MapPin,
      value: stats.cityCount,
      label: stats.cityCount === 1 ? "city" : "cities",
      srLabel: `${stats.cityCount} ${stats.cityCount === 1 ? "city" : "cities"}`,
    });
  }
  if (stats.countryCount > 0) {
    cards.push({
      icon: Globe2,
      value: stats.countryCount,
      label: stats.countryCount === 1 ? "country" : "countries",
      srLabel: `${stats.countryCount} ${stats.countryCount === 1 ? "country" : "countries"}`,
    });
  }
  cards.push({
    icon: CalendarRange,
    value: stats.yearRange,
    label: "",
    srLabel: `active ${stats.yearRange}`,
  });

  return (
    <ul
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      aria-label="Travel summary"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <li
            key={card.srLabel}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-3 dark:border-gray-800 dark:bg-gray-900/40"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300"
            >
              <Icon size={18} strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-semibold leading-tight text-black dark:text-white">
                {card.value}
              </span>
              {card.label ? (
                <span className="block text-xs text-gray-500 dark:text-gray-400">{card.label}</span>
              ) : (
                <span className="sr-only">{card.srLabel}</span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
