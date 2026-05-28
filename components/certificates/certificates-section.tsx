"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { withBasePath } from "@/lib/utils";
import Image from "@/src/shims/next-image";
import { enrichCertificate, stripDate } from "./utils";
import FilterBar, { type SortKey, type ViewMode } from "./filter-bar";

export interface Certificate {
  tags: string[];
  title: string;
  desc: string;
  link?: string;
  image?: string;
  skills: string[];
}

type EnrichedCert = Certificate & {
  date: Date | null;
  dateLabel: string;
  year: number | null;
  issuer: string;
};

const MAX_BADGES = 6;

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
              <CertificateCard key={c.title + i} certificate={c} index={i} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

interface CertificateCardProps {
  certificate: EnrichedCert;
  index: number;
}

function CertificateCard({ certificate: c, index }: CertificateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const labels = Array.from(new Set([...c.tags, ...c.skills]));
  const bodyText = stripDate(c.desc);
  const badgeCls =
    "rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800";
  const rawLink = c.link ?? c.image ?? "";
  const viewLink = rawLink.startsWith("/") ? withBasePath(rawLink) : rawLink;
  const imageSrc = c.image?.startsWith("/")
    ? withBasePath(c.image)
    : c.link?.startsWith("/")
      ? withBasePath(c.link)
      : undefined;
  const hasExternalLink = Boolean(c.link && !c.link.startsWith("/"));

  return (
    <motion.li
      role="listitem"
      className="h-full"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={[
              "group relative overflow-hidden rounded-2xl p-4",
              "border border-teal-200/70 bg-white/85 backdrop-blur",
              "dark:border-teal-800/70 dark:bg-gray-950/60",
              "transition-shadow hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20",
              "focus-within:ring-1 focus-within:ring-teal-500/60",
              "flex flex-col",
              isExpanded ? "" : "h-64",
            ].join(" ")}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200">
                {c.title}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">{c.issuer}</span>
                {c.dateLabel && (
                  <>
                    <span aria-hidden>•</span>
                    <time dateTime={c.date?.toISOString().slice(0, 10)}>{c.dateLabel}</time>
                  </>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {labels
                  .slice(0, isExpanded ? labels.length : MAX_BADGES)
                  .map((label) => (
                    <Badge key={label} variant="secondary" className={badgeCls}>
                      {label}
                    </Badge>
                  ))}
              </div>

              <p
                className={[
                  "mt-2 text-sm text-gray-700 dark:text-gray-200",
                  !isExpanded && "line-clamp-3",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {bodyText}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {rawLink && (
                <Button
                  asChild
                  size="sm"
                  className="border-0 bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 text-white focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
                >
                  <a
                    href={viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${c.title} certificate`}
                  >
                    View certificate
                  </a>
                </Button>
              )}
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
            />
          </Card>
        </HoverCardTrigger>
        {(imageSrc || hasExternalLink) && (
          <HoverCardContent side="top" className="w-80 p-0">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${c.title} certificate`}
                width={320}
                height={200}
                className="h-auto w-full rounded-md"
              />
            ) : (
              <div className="flex h-44 w-full items-center justify-center rounded-md bg-teal-50 dark:bg-teal-900/30">
                <a
                  href={viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline dark:text-teal-200"
                >
                  View on Certificate Link
                </a>
              </div>
            )}
          </HoverCardContent>
        )}
      </HoverCard>
    </motion.li>
  );
}
