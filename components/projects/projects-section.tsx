"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "@/src/shims/next-link";
import Image from "@/src/shims/next-image";
import { useData } from "@/lib/use-data";
import { withBasePath } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactElement } from "react";

/** How many additional cards to reveal each time the sentinel scrolls into view. */
const INFINITE_SCROLL_BATCH = 6;

interface Project {
  title: string;
  image: string;
  alt: string;
  description?: string;
  tags: string[];
  github?: string | null;
  githubLabel?: string | null;
  details?: string | null;
}

interface ProjectsSectionProps {
  /** When set, render at most this many projects (e.g. a "featured" subset). */
  limit?: number;
}

export default function ProjectsSection({ limit }: ProjectsSectionProps = {}): ReactElement {
  const { data, loading, error } = useData<Project[]>("projects.json");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  // Infinite scroll only applies to the full list (no `limit` — i.e. the
  // /projects page). The featured home subset renders its fixed slice directly.
  const infinite = typeof limit !== "number";
  const [visibleCount, setVisibleCount] = useState<number>(INFINITE_SCROLL_BATCH);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const total = data?.length ?? 0;
  const hasMore = infinite && visibleCount < total;

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => prev + INFINITE_SCROLL_BATCH);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, total]);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-56 animate-pulse" />
        ))}
      </div>
    );
  }
  if (error || !data)
    return (
      <p className="text-red-600 dark:text-red-400">Failed to load projects.</p>
    );

  const projects = infinite
    ? data.slice(0, visibleCount)
    : data.slice(0, limit);

  return (
    <>
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p: Project, i: number) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (i % INFINITE_SCROLL_BATCH) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="group h-full overflow-hidden p-4 transition-colors hover:border-teal-500/40 dark:hover:border-teal-400/40">
            {/* Image */}
            {p.image ? (
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <Image
                  src={withBasePath(p.image)}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ) : null}

            <h3 className="text-lg font-semibold tracking-tight">
              {p.title}
            </h3>

            {p.description ? (
              <>
                <p
                  className={[
                    "mt-1 text-sm text-gray-600 dark:text-gray-400",
                    expanded[i] ? "" : "line-clamp-2",
                  ].join(" ")}
                >
                  {p.description}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))
                  }
                  className="mt-1 text-xs font-medium text-teal-600 hover:underline focus:outline-none dark:text-teal-400"
                >
                  {expanded[i] ? "Show less" : "Show more"}
                </button>
              </>
            ) : null}

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t: string) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400"
                >
                  {t}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.details ? (
                <Button size="sm" asChild>
                  <Link href={`/${p.details}`}>Project details →</Link>
                </Button>
              ) : null}

              {p.github ? (
                <Button size="sm" variant="outline" asChild>
                  <Link href={p.github}>{p.githubLabel ?? "View project"}</Link>
                </Button>
              ) : null}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>

    {hasMore ? (
      <div
        ref={sentinelRef}
        aria-hidden
        className="mt-6 grid gap-6 sm:grid-cols-2"
      >
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="h-56 animate-pulse" />
        ))}
      </div>
    ) : null}
    </>
  );
}
