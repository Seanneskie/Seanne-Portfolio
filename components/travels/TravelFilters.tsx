"use client";

import * as React from "react";

interface TravelFiltersProps {
  tags: string[];
  countries: string[];
  activeTag: string | null;
  activeCountry: string | null;
  onTagChange: (tag: string | null) => void;
  onCountryChange: (country: string | null) => void;
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
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:border-teal-400 dark:bg-teal-400/10 dark:text-teal-300"
          : "border-gray-200 text-gray-600 hover:border-teal-500/40 hover:text-teal-700 dark:border-gray-800 dark:text-gray-300 dark:hover:text-teal-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function TravelFilters({
  tags,
  countries,
  activeTag,
  activeCountry,
  onTagChange,
  onCountryChange,
}: TravelFiltersProps): React.ReactElement | null {
  if (tags.length === 0 && countries.length <= 1) return null;

  const reset = () => {
    onTagChange(null);
    onCountryChange(null);
  };
  const isAll = activeTag === null && activeCountry === null;

  return (
    <div className="space-y-2">
      {countries.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Country
          </span>
          {countries.map((country) => (
            <Chip
              key={country}
              label={country}
              active={activeCountry === country}
              onClick={() => onCountryChange(activeCountry === country ? null : country)}
            />
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Tag
          </span>
          <Chip label="All" active={isAll} onClick={reset} />
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
  );
}
