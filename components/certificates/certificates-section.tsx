"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { useData } from "@/lib/use-data";
import { withBasePath } from "@/lib/utils";
import Image from "next/image";

interface Certificate {
  tags: string[];
  title: string;
  desc: string;
  link?: string;
  image?: string;
  skills: string[];
}

const MAX_BADGES = 6;

export default function CertificatesSection(): ReactElement {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const { data, loading, error } = useData<Certificate[]>("certificates.json");
  const certificates = useMemo(() => data ?? [], [data]);

  const tags = useMemo<string[]>(
    () => Array.from(new Set(certificates.flatMap((c) => c.tags))).sort(),
    [certificates]
  );

  const filtered = useMemo(() => {
    return certificates.filter((c) => {
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.desc.toLowerCase().includes(term);
      const matchesTag = !tag || c.tags.includes(tag);
      return matchesSearch && matchesTag;
    });
  }, [certificates, search, tag]);

  const totalCertificates = certificates.length;
  const totalTags = tags.length;

  if (loading) {
    return (
      <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            className="h-56 animate-pulse rounded-2xl border border-teal-200/60 bg-white/70 dark:border-teal-800/60 dark:bg-gray-950/50"
          />
        ))}
      </div>
    );
  }

  if (error || !data)
    return (
      <p className="text-red-600 dark:text-red-400">
        Failed to load certificates.
      </p>
    );

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl border border-teal-200/70 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Input
            placeholder="Search certificates"
            aria-label="Search certificates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:max-w-md focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
          />
          {/* 1) Control value using a sentinel when tag is empty */}
          <Select
            value={tag ? tag : "__all"}
            onValueChange={(v) => setTag(v === "__all" ? "" : v)}
          >
            <SelectTrigger
              aria-label="Filter by tag"
              className="lg:w-64 focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
            >
              <SelectValue placeholder="All tags" />
            </SelectTrigger>

            <SelectContent>
              {/* 2) Use a non-empty value here */}
              <SelectItem value="__all">All tags</SelectItem>
              {tags.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>
              Showing {filtered.length} of {totalCertificates}
            </span>
            <span className="hidden text-gray-400 dark:text-gray-500 sm:inline">•</span>
            <span>{totalTags} tags</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearch("");
                setTag("");
              }}
              disabled={!search && !tag}
              className="border-teal-200 text-teal-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800 dark:text-teal-200"
            >
              Clear filters
            </Button>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-teal-200 bg-white/80 p-10 text-center text-gray-600 dark:border-teal-800 dark:bg-gray-950/60 dark:text-gray-300">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            No certificates match your search
          </p>
          <p className="mt-2 text-sm">Try a different keyword or reset the filters.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearch("");
              setTag("");
            }}
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
          <AnimatePresence>
            {filtered.map((c: Certificate, i: number) => (
              <CertificateCard key={c.title + i} certificate={c} index={i} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

function CertificateCard({ certificate: c, index }: CertificateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const labels = Array.from(new Set([...c.tags, ...c.skills]));
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
      transition={{ delay: index * 0.05, duration: 0.35 }}
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
                {c.desc}
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
