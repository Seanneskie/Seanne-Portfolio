"use client";

import { type ReactElement } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type SortKey = "newest" | "oldest" | "title";
export type ViewMode = "grid" | "timeline";

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;

  issuers: { value: string; count: number }[];
  selectedIssuers: Set<string>;
  onToggleIssuer: (v: string) => void;

  tags: { value: string; count: number }[];
  selectedTags: Set<string>;
  onToggleTag: (v: string) => void;

  years: { value: number; count: number }[];
  selectedYears: Set<number>;
  onToggleYear: (v: number) => void;

  sort: SortKey;
  onSortChange: (v: SortKey) => void;

  view: ViewMode;
  onViewChange: (v: ViewMode) => void;

  shownCount: number;
  totalCount: number;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const chipBase =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}): ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        chipBase,
        active
          ? "border-teal-500/60 bg-teal-500/10 text-teal-800 dark:border-teal-400/60 dark:bg-teal-400/15 dark:text-teal-100"
          : "border-teal-200/60 bg-white/70 text-gray-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800/60 dark:bg-gray-950/50 dark:text-gray-200 dark:hover:border-teal-700 dark:hover:text-teal-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ChipGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): ReactElement {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[0.7rem] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
      {children}
    </div>
  );
}

export default function FilterBar({
  search,
  onSearchChange,
  issuers,
  selectedIssuers,
  onToggleIssuer,
  tags,
  selectedTags,
  onToggleTag,
  years,
  selectedYears,
  onToggleYear,
  sort,
  onSortChange,
  view,
  onViewChange,
  shownCount,
  totalCount,
  onClear,
  hasActiveFilters,
}: FilterBarProps): ReactElement {
  return (
    <div
      role="region"
      aria-label="Certificate filters"
      className="sticky top-16 z-20 -mx-2 rounded-2xl border border-teal-200/70 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/70"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <Input
          placeholder="Search certificates, skills, or topics"
          aria-label="Search certificates"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full lg:max-w-md focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
        />
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          <Select value={sort} onValueChange={(v) => onSortChange(v as SortKey)}>
            <SelectTrigger
              aria-label="Sort certificates"
              className="h-9 w-[150px] focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
            >
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="title">Title A–Z</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={view} onValueChange={(v) => onViewChange(v as ViewMode)}>
            <TabsList aria-label="View mode">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {issuers.length > 0 && (
          <ChipGroup label="Issuer">
            {issuers.map((i) => (
              <Chip
                key={i.value}
                active={selectedIssuers.has(i.value)}
                onClick={() => onToggleIssuer(i.value)}
              >
                {i.value}
                <span className="text-[0.65rem] opacity-60">{i.count}</span>
              </Chip>
            ))}
          </ChipGroup>
        )}
        {years.length > 0 && (
          <ChipGroup label="Year">
            {years.map((y) => (
              <Chip
                key={y.value}
                active={selectedYears.has(y.value)}
                onClick={() => onToggleYear(y.value)}
              >
                {y.value}
                <span className="text-[0.65rem] opacity-60">{y.count}</span>
              </Chip>
            ))}
          </ChipGroup>
        )}
        {tags.length > 0 && (
          <ChipGroup label="Topic">
            {tags.map((t) => (
              <Chip
                key={t.value}
                active={selectedTags.has(t.value)}
                onClick={() => onToggleTag(t.value)}
              >
                {t.value}
                <span className="text-[0.65rem] opacity-60">{t.count}</span>
              </Chip>
            ))}
          </ChipGroup>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600 dark:text-gray-300">
        <span>
          Showing <span className="font-semibold text-gray-900 dark:text-white">{shownCount}</span> of{" "}
          {totalCount}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="border-teal-200 text-teal-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800 dark:text-teal-200"
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}
