"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
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
import { useData } from "@/lib/use-data";
import { withBasePath } from "@/lib/utils";

interface Certificate {
  tags: string[];
  title: string;
  desc: string;
  link?: string;
  skills: string[];
}

const MAX_BADGES = 6;
const MAX_DESC_LENGTH = 120;

export default function CertificatesSection() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search certificates"
          aria-label="Search certificates"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
        />
        {/* 1) Control value using a sentinel when tag is empty */}
        <Select
          value={tag ? tag : "__all"}
          onValueChange={(v) => setTag(v === "__all" ? "" : v)}
        >
          <SelectTrigger
            aria-label="Filter by tag"
            className="sm:w-56 focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
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
        <Button
          variant="ghost"
          onClick={() => {
            setSearch("");
            setTag("");
          }}
          disabled={!search && !tag}
        >
          Clear filters
        </Button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-200">
          No certificates match your search.
        </p>
      ) : (
        <ul
          role="list"
          className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filtered.map((c: Certificate, i: number) => {
              const labels = Array.from(new Set([...c.tags, ...c.skills]));
              const isExpanded = !!expanded[i];
              const showToggle =
                labels.length > MAX_BADGES || c.desc.length > MAX_DESC_LENGTH;
              const badgeCls =
                "rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800";

              return (
                <motion.li
                  key={c.title + i}
                  role="listitem"
                  className="h-full"
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  <Card
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
                            <Badge
                              key={label}
                              variant="secondary"
                              className={badgeCls}
                            >
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
                      {c.link && (
                        <Button
                          asChild
                          size="sm"
                          className="border-0 bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 text-white focus-visible:border-teal-500 focus-visible:ring-teal-500/50"
                        >
                          <a
                            href={
                              c.link.startsWith("/")
                                ? withBasePath(c.link)
                                : c.link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${c.title} certificate`}
                          >
                            View certificate
                          </a>
                        </Button>
                      )}

                      {showToggle && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setExpanded((prev) => ({
                              ...prev,
                              [i]: !isExpanded,
                            }))
                          }
                          className="self-start px-0 text-teal-700 hover:underline dark:text-teal-300"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </Button>
                      )}
                    </div>

                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
                    />
                  </Card>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
