"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { withBasePath } from "@/lib/utils";
import Image from "@/src/shims/next-image";
import { stripDate } from "./utils";
import type { EnrichedCert } from "./certificate-card";

interface Props {
  items: EnrichedCert[];
}

function groupByYear(items: EnrichedCert[]): { year: number | "Undated"; items: EnrichedCert[] }[] {
  const buckets = new Map<number | "Undated", EnrichedCert[]>();
  for (const c of items) {
    const key: number | "Undated" = c.year ?? "Undated";
    const list = buckets.get(key) ?? [];
    list.push(c);
    buckets.set(key, list);
  }
  return Array.from(buckets.entries())
    .sort(([a], [b]) => {
      if (a === "Undated") return 1;
      if (b === "Undated") return -1;
      return (b as number) - (a as number);
    })
    .map(([year, items]) => ({ year, items }));
}

export default function TimelineView({ items }: Props): ReactElement {
  const groups = useMemo(() => groupByYear(items), [items]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-teal-300/60 via-teal-300/30 to-transparent dark:from-teal-700/60 dark:via-teal-700/30 sm:left-4"
      />
      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {groups.map((g) => (
            <motion.section
              key={String(g.year)}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              aria-labelledby={`year-${g.year}`}
            >
              <div className="sticky top-[18rem] z-10 -mx-2 mb-4 flex items-center gap-3 sm:top-[16rem]">
                <span
                  aria-hidden
                  className="ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-teal-400 bg-white text-[10px] font-bold text-teal-700 shadow-sm dark:border-teal-500 dark:bg-gray-950 dark:text-teal-200 sm:ml-1"
                >
                  {String(g.year).slice(-2)}
                </span>
                <h2
                  id={`year-${g.year}`}
                  className="rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-teal-800 ring-1 ring-teal-200 backdrop-blur dark:bg-gray-950/85 dark:text-teal-200 dark:ring-teal-800"
                >
                  {g.year} · {g.items.length}
                </h2>
              </div>

              <ul role="list" className="space-y-3 pl-10 sm:pl-12">
                <AnimatePresence mode="popLayout">
                  {g.items.map((c, i) => (
                    <TimelineRow key={c.title + i} certificate={c} index={i} />
                  ))}
                </AnimatePresence>
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function resolveLink(c: EnrichedCert): string | undefined {
  const raw = c.link ?? c.image;
  if (!raw) return undefined;
  return raw.startsWith("/") ? withBasePath(raw) : raw;
}

function resolveImage(c: EnrichedCert): string | undefined {
  if (c.image?.startsWith("/")) return withBasePath(c.image);
  if (c.link?.startsWith("/")) return withBasePath(c.link);
  return undefined;
}

function TimelineRow({
  certificate: c,
  index,
}: {
  certificate: EnrichedCert;
  index: number;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const bodyText = stripDate(c.desc);
  const viewLink = resolveLink(c);
  const imageSrc = resolveImage(c);
  const hasExternalLink = Boolean(c.link && !c.link.startsWith("/"));

  const badgeCls =
    "rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800";

  return (
    <motion.li
      role="listitem"
      className="relative"
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ delay: Math.min(index, 6) * 0.03, duration: 0.25 }}
    >
      <span
        aria-hidden
        className="absolute -left-[1.85rem] top-5 h-2.5 w-2.5 rounded-full bg-teal-400 ring-4 ring-white dark:bg-teal-500 dark:ring-gray-950 sm:-left-[2.05rem]"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <Card
          className={[
            "group relative overflow-hidden rounded-xl p-3 sm:p-4",
            "border border-teal-200/70 bg-white/85 backdrop-blur",
            "dark:border-teal-800/70 dark:bg-gray-950/60",
            "transition-shadow hover:shadow-md hover:shadow-teal-300/20 dark:hover:shadow-teal-900/20",
          ].join(" ")}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={`Preview ${c.title} certificate`}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-lg sm:w-40 sm:flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={`${c.title} preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-100 dark:from-teal-900/40 dark:via-cyan-900/30 dark:to-sky-900/40">
                    <span className="text-lg font-bold text-teal-700/70 dark:text-teal-200/70">
                      {c.issuer.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </button>
            </SheetTrigger>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-teal-700 dark:text-teal-300">{c.issuer}</span>
                {c.dateLabel && (
                  <>
                    <span aria-hidden>•</span>
                    <time dateTime={c.date?.toISOString().slice(0, 10)}>{c.dateLabel}</time>
                  </>
                )}
              </div>
              <h3 className="mt-0.5 text-base font-semibold leading-snug text-teal-800 dark:text-teal-200">
                {c.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-700 dark:text-gray-200">
                {bodyText}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {c.skills.slice(0, 4).map((s) => (
                  <Badge key={s} variant="secondary" className={badgeCls}>
                    {s}
                  </Badge>
                ))}
                {c.skills.length > 4 && (
                  <Badge variant="secondary" className={badgeCls}>
                    +{c.skills.length - 4}
                  </Badge>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-teal-200 text-teal-700 hover:border-teal-300 hover:text-teal-800 dark:border-teal-800 dark:text-teal-200"
                  >
                    Preview
                  </Button>
                </SheetTrigger>
                {viewLink && hasExternalLink && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="ml-auto text-teal-700 hover:text-teal-800 dark:text-teal-200"
                  >
                    <a
                      href={viewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${c.title} certificate in a new tab`}
                    >
                      Open ↗
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl">
          <SheetHeader>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {c.issuer}
              {c.dateLabel ? ` • ${c.dateLabel}` : ""}
            </p>
            <SheetTitle className="text-xl">{c.title}</SheetTitle>
            <SheetDescription className="text-gray-700 dark:text-gray-200">
              {bodyText}
            </SheetDescription>
          </SheetHeader>

          {imageSrc && (
            <div className="px-4">
              <a
                href={viewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl ring-1 ring-teal-200 dark:ring-teal-800"
                aria-label={`Open ${c.title} certificate at full size`}
              >
                <Image
                  src={imageSrc}
                  alt={`${c.title} certificate`}
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                />
              </a>
            </div>
          )}

          <div className="space-y-4 p-4">
            {c.skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Skills
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <Badge key={s} variant="secondary" className={badgeCls}>
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {c.tags.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Topics
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <Badge key={t} variant="secondary" className={badgeCls}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {viewLink && (
              <Button
                asChild
                className="w-full border-0 bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 text-white focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
              >
                <a href={viewLink} target="_blank" rel="noopener noreferrer">
                  {hasExternalLink ? "View source" : "Open full image"}
                </a>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </motion.li>
  );
}
