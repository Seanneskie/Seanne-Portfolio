"use client";

import type { JSX } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TagFilter from "@/components/projects/tag-filter";
import { useData } from "@/lib/use-data";
import { withBasePath } from "@/lib/utils";

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

const ITEMS_PER_PAGE = 6;

export default function ProjectsPageContent(): JSX.Element {
  const { data, loading, error } = useData<Project[]>("projects.json");
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const projects: Project[] = useMemo(() => data ?? [], [data]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        (project.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [projects, search, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentProjects = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearch(event.target.value);
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Projects</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <Card
              key={index}
              className="h-[500px] animate-pulse rounded-2xl border border-teal-200/60 bg-white/70 dark:border-teal-800/60 dark:bg-gray-950/50"
            />
          ))}
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <p className="text-red-600 dark:text-red-400">Failed to load projects.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Projects</h1>

      <div className="mb-6 flex flex-col gap-4">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={handleSearch}
          className="w-full"
        />
        <TagFilter
          tags={allTags}
          selected={selectedTags}
          onChange={(tags) => {
            setSelectedTags(tags);
            setPage(1);
          }}
        />
      </div>

      {currentProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="h-full"
            >
              <Card
                className={[
                  "group relative min-h-[460px] h-full overflow-hidden rounded-2xl p-4",
                  "border border-teal-200/70 bg-white/85 backdrop-blur",
                  "dark:border-teal-800/70 dark:bg-gray-950/60",
                  "transition-shadow hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20",
                  "focus-within:ring-1 focus-within:ring-teal-500/60",
                ].join(" ")}
              >
                {project.image ? (
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-xl">
                    <Image src={withBasePath(project.image)} alt={project.alt} fill className="object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/25 to-transparent dark:from-teal-950/35" />
                  </div>
                ) : null}

                <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200">{project.title}</h3>

                {project.description ? (
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{project.description}</p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.details ? (
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
                      <Link href={`/${project.details}`}>Project details →</Link>
                    </Button>
                  ) : null}

                  {project.github ? (
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
                      <Link href={project.github}>{project.githubLabel ?? "View project"}</Link>
                    </Button>
                  ) : null}
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      ) : null}
    </main>
  );
}
