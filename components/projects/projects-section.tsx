"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "@/src/shims/next-link";
import Image from "@/src/shims/next-image";
import { useData } from "@/lib/use-data";
import { withBasePath } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactElement } from "react";

/** How many additional rows to reveal each time the sentinel scrolls into view. */
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
      <div className="flex flex-col gap-16">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <div className="aspect-video animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900" />
            <div className="space-y-4">
              <div className="h-7 w-2/3 animate-pulse rounded bg-gray-100 dark:bg-gray-900" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-900" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100 dark:bg-gray-900" />
            </div>
          </div>
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
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
        {projects.map((p: Project, i: number) => {
          // Even index (0, 2, 4…) = "odd-numbered" project (1st, 3rd…) → image left.
          // Odd index = image right. Mobile always stacks image first.
          const imageRight = i % 2 === 1;

          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group grid items-center gap-8 md:grid-cols-2 lg:gap-12"
            >
              {/* Image */}
              {p.image ? (
                <div
                  className={[
                    "relative aspect-video overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-teal-500/40 group-hover:shadow-xl dark:border-gray-800 dark:group-hover:border-teal-400/40",
                    imageRight ? "md:order-2" : "md:order-1",
                  ].join(" ")}
                >
                  <Image
                    src={withBasePath(p.image)}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              ) : (
                <div
                  className={[
                    "aspect-video rounded-2xl border border-gray-200 dark:border-gray-800",
                    imageRight ? "md:order-2" : "md:order-1",
                  ].join(" ")}
                />
              )}

              {/* Content */}
              <div className={imageRight ? "md:order-1" : "md:order-2"}>
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-teal-600 dark:text-gray-50 dark:group-hover:text-teal-400 sm:text-3xl">
                  {p.title}
                </h3>

                {p.description ? (
                  <>
                    <p
                      className={[
                        "mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400",
                        expanded[i] ? "" : "line-clamp-3",
                      ].join(" ")}
                    >
                      {p.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))
                      }
                      className="mt-2 text-sm font-medium text-teal-600 hover:underline focus:outline-none dark:text-teal-400"
                    >
                      {expanded[i] ? "Show less" : "Show more"}
                    </button>
                  </>
                ) : null}

                {/* Stack */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t: string) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 transition-colors group-hover:border-teal-500/30 dark:border-gray-800 dark:text-gray-400"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex flex-wrap gap-3">
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
              </div>
            </motion.article>
          );
        })}
      </div>

      {hasMore ? (
        <div
          ref={sentinelRef}
          aria-hidden
          className="mt-16 grid items-center gap-8 md:grid-cols-2 lg:gap-12"
        >
          <div className="aspect-video animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900" />
          <div className="space-y-4">
            <div className="h-7 w-2/3 animate-pulse rounded bg-gray-100 dark:bg-gray-900" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-900" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100 dark:bg-gray-900" />
          </div>
        </div>
      ) : null}
    </>
  );
}
