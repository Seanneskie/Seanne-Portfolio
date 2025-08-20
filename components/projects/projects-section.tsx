"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/lib/use-data";
import { withBasePath } from "@/lib/utils";
import { useState } from "react";

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

export default function ProjectsSection() {
  const { data, loading, error } = useData<Project[]>("projects.json");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
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
      <p className="text-red-600 dark:text-red-400">Failed to load projects.</p>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {data.map((p: Project, i: number) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.35 }}
        >
          <Card
            className={[
              "group relative overflow-hidden rounded-2xl p-4",
              // border + surface tuned for light/dark
              "border border-teal-200/70 bg-white/85 backdrop-blur",
              "dark:border-teal-800/70 dark:bg-gray-950/60",
              // hover elevation + ring
              "transition-shadow hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20",
              "focus-within:ring-1 focus-within:ring-teal-500/60",
            ].join(" ")}
          >
            {/* Image with soft teal overlay */}
            {p.image ? (
              <div className="relative mb-3 aspect-video overflow-hidden rounded-xl">
                <Image
                  src={withBasePath(p.image)}
                  alt={p.alt}
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/25 to-transparent dark:from-teal-950/35" />
              </div>
            ) : null}

            <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200">
              {p.title}
            </h3>

            {p.description ? (
              <>
                <p
                  className={[
                    "text-sm text-gray-700 dark:text-gray-200",
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
                  className="mt-1 text-xs font-medium text-teal-700 hover:underline focus:outline-none dark:text-teal-300"
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
                  className="rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800"
                >
                  {t}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.details ? (
                <Button
                  size="sm"
                  asChild
                  className={[
                    "group gap-2 text-white",
                    "bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500",
                    "bg-[length:200%_200%] animate-gradient-x",
                    "shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300",
                    "hover:-translate-y-0.5",
                    "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
                  ].join(" ")}
                >
                  <Link
                    href={`/project-details/${p.details
                      .replace(/^project-details\//, "")
                      .replace(/\.html$/, "")}`}
                  >
                    Project details →
                  </Link>
                </Button>
              ) : null}

              {p.github ? (
                <Button
                  size="sm"
                  asChild
                  className={[
                    "group gap-2 text-white",
                    "bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500",
                    "bg-[length:200%_200%] animate-gradient-x",
                    "shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300",
                    "hover:-translate-y-0.5",
                    "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
                  ].join(" ")}
                >
                  <Link href={p.github}>{p.githubLabel ?? "View project"}</Link>
                </Button>
              ) : null}
            </div>

            {/* Decorative corner glow on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
