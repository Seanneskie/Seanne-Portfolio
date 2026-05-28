"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { enrichCertificate } from "./utils";
import FilterBar, { type SortKey, type ViewMode } from "./filter-bar";
import CertificateCard, { type EnrichedCert } from "./certificate-card";

export interface Certificate {
  tags: string[];
  title: string;
  desc: string;
  link?: string;
  image?: string;
  skills: string[];
}

function countBy<T, K extends string | number>(items: T[], key: (i: T) => K): Map<K, number> {
  const m = new Map<K, number>();
  for (const it of items) {
    const k = key(it);
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

interface CertificatesSectionProps {
  data: Certificate[];
}

export default function CertificatesSection({ data }: CertificatesSectionProps): ReactElement {
  const [search, setSearch] = useState("");
  const [selectedIssuers, setSelectedIssuers] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<ViewMode>("grid");

  const certificates = useMemo<EnrichedCert[]>(
    () => data.map((c) => enrichCertificate(c)),
    [data]
  );

  const issuerOptions = useMemo(() => {
    const counts = countBy(certificates, (c) => c.issuer);
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [certificates]);

  const tagOptions = useMemo(() => {
    const flat = certificates.flatMap((c) => c.tags);
    const counts = countBy(flat, (t) => t);
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [certificates]);

  const yearOptions = useMemo(() => {
    const flat = certificates.map((c) => c.year).filter((y): y is number => y !== null);
    const counts = countBy(flat, (y) => y);
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.value - a.value);
  }, [certificates]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = certificates.filter((c) => {
      const matchesSearch =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.desc.toLowerCase().includes(term) ||
        c.skills.some((s) => s.toLowerCase().includes(term)) ||
        c.tags.some((t) => t.toLowerCase().includes(term));
      const matchesIssuer = selectedIssuers.size === 0 || selectedIssuers.has(c.issuer);
      const matchesTag =
        selectedTags.size === 0 || c.tags.some((t) => selectedTags.has(t));
      const matchesYear =
        selectedYears.size === 0 || (c.year !== null && selectedYears.has(c.year));
      return matchesSearch && matchesIssuer && matchesTag && matchesYear;
    });
    const sorted = [...list];
    if (sort === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      const dir = sort === "newest" ? -1 : 1;
      sorted.sort((a, b) => {
        const at = a.date?.getTime() ?? 0;
        const bt = b.date?.getTime() ?? 0;
        return (at - bt) * dir;
      });
    }
    return sorted;
  }, [certificates, search, selectedIssuers, selectedTags, selectedYears, sort]);

  const hasActiveFilters =
    !!search || selectedIssuers.size > 0 || selectedTags.size > 0 || selectedYears.size > 0;

  const toggle = <T,>(set: Set<T>, value: T): Set<T> => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const clearAll = () => {
    setSearch("");
    setSelectedIssuers(new Set());
    setSelectedTags(new Set());
    setSelectedYears(new Set());
  };

  return (
    <div className="space-y-6">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        issuers={issuerOptions}
        selectedIssuers={selectedIssuers}
        onToggleIssuer={(v) => setSelectedIssuers((s) => toggle(s, v))}
        tags={tagOptions}
        selectedTags={selectedTags}
        onToggleTag={(v) => setSelectedTags((s) => toggle(s, v))}
        years={yearOptions}
        selectedYears={selectedYears}
        onToggleYear={(v) => setSelectedYears((s) => toggle(s, v))}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        shownCount={filtered.length}
        totalCount={certificates.length}
        onClear={clearAll}
        hasActiveFilters={hasActiveFilters}
      />

      {filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-teal-200 bg-white/80 p-10 text-center text-gray-600 dark:border-teal-800 dark:bg-gray-950/60 dark:text-gray-300">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            No certificates match your filters
          </p>
          <p className="mt-2 text-sm">Try a different keyword or clear active filters.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={clearAll}
            className="mt-4 border-teal-200 text-teal-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800 dark:text-teal-200"
          >
            Reset filters
          </Button>
        </Card>
      ) : (
        <ul
          role="list"
          className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <CertificateCard key={c.title + i} certificate={c} index={i} layout={view} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
