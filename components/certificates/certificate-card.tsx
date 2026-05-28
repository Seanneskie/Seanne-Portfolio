"use client";

import { motion } from "framer-motion";
import { useState, type ReactElement } from "react";
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

export interface EnrichedCert {
  tags: string[];
  title: string;
  desc: string;
  link?: string;
  image?: string;
  skills: string[];
  date: Date | null;
  dateLabel: string;
  year: number | null;
  issuer: string;
}

const MAX_SKILL_BADGES = 3;

interface Props {
  certificate: EnrichedCert;
  index: number;
  layout?: "grid" | "timeline";
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

export default function CertificateCard({ certificate: c, index, layout = "grid" }: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const bodyText = stripDate(c.desc);
  const viewLink = resolveLink(c);
  const imageSrc = resolveImage(c);
  const hasExternalLink = Boolean(c.link && !c.link.startsWith("/"));
  const visibleSkills = c.skills.slice(0, MAX_SKILL_BADGES);
  const overflowSkills = c.skills.length - visibleSkills.length;

  const badgeCls =
    "rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800";

  return (
    <motion.li
      role="listitem"
      className="h-full"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: Math.min(index, 8) * 0.04, duration: 0.3 }}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <Card
          className={[
            "group relative flex h-full flex-col overflow-hidden rounded-2xl p-0",
            "border border-teal-200/70 bg-white/85 backdrop-blur",
            "dark:border-teal-800/70 dark:bg-gray-950/60",
            "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20",
            "focus-within:ring-1 focus-within:ring-teal-500/60",
          ].join(" ")}
        >
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={`Preview ${c.title} certificate`}
              className="relative block aspect-[16/10] w-full overflow-hidden focus:outline-none"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={`${c.title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-100 to-sky-100 dark:from-teal-900/40 dark:via-cyan-900/30 dark:to-sky-900/40">
                  <span className="text-3xl font-bold text-teal-700/70 dark:text-teal-200/70">
                    {c.issuer.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent dark:from-teal-950/60" />
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-teal-800 ring-1 ring-teal-200 dark:bg-gray-950/85 dark:text-teal-100 dark:ring-teal-800">
                {c.issuer}
              </span>
              {c.dateLabel && (
                <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[0.65rem] font-medium text-gray-700 ring-1 ring-teal-200 dark:bg-gray-950/85 dark:text-gray-200 dark:ring-teal-800">
                  {c.dateLabel}
                </span>
              )}
            </button>
          </SheetTrigger>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-base font-semibold leading-snug text-teal-800 dark:text-teal-200">
              {c.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm text-gray-700 dark:text-gray-200">
              {bodyText}
            </p>

            {visibleSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {visibleSkills.map((s) => (
                  <Badge key={s} variant="secondary" className={badgeCls}>
                    {s}
                  </Badge>
                ))}
                {overflowSkills > 0 && (
                  <Badge variant="secondary" className={badgeCls}>
                    +{overflowSkills}
                  </Badge>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
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
                  className="ml-auto border-0 bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 text-white focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
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

          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
          />
        </Card>

        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-2xl"
        >
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
