"use client";

import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "@/src/shims/next-image";
import Link from "@/src/shims/next-link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TagFilter from "@/components/projects/tag-filter";
import { withBasePath } from "@/lib/utils";

export interface Project {
  title: string;
  image: string;
  alt: string;
  description?: string;
  tags: string[];
  github?: string | null;
  githubLabel?: string | null;
  details?: string | null;
}

interface ProjectsPageContentProps {
  data: Project[];
}

const ITEMS_PER_PAGE = 6;

export default function ProjectsPageContent({ data }: ProjectsPageContentProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const projects: Project[] = data;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [projects]);

  const stats = useMemo(() => {
    const withDetails = projects.filter((project) => project.details).length;
    const withGithub = projects.filter((project) => project.github).length;
    return {
      total: projects.length,
      tags: allTags.length,
      withDetails,
      withGithub,
    };
  }, [projects, allTags]);

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

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setPage(1);
  };

  return (
    <main>
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Portfolio
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Projects with real-world impact
            </h1>
            <p className="mt-4 max-w-xl text-base text-gray-600 dark:text-gray-400">
              A curated set of product builds, automation tools, and data-driven workflows. Filter
              by stack or use case to find what you need quickly.
            </p>
          </div>

          <Card className="p-6">
            <div className="grid grid-cols-2 gap-5 text-sm text-gray-500 dark:text-gray-400">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                <p>Projects shipped</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.tags}</p>
                <p>Tech tags</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.withDetails}
                </p>
                <p>Case studies</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.withGithub}
                </p>
                <p>Open-source links</p>
              </div>
            </div>
          </Card>
        </section>

        <Card className="mb-10 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={handleSearch}
              className="w-full lg:max-w-md"
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Showing {filtered.length} of {projects.length}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearFilters}
                disabled={search.length === 0 && selectedTags.length === 0}
              >
                Clear filters
              </Button>
            </div>
          </div>
          <TagFilter
            tags={allTags}
            selected={selectedTags}
            onChange={(tags) => {
              setSelectedTags(tags);
              setPage(1);
            }}
            className="mt-3"
          />
        </Card>

        {currentProjects.length === 0 ? (
          <Card className="border-dashed p-10 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No projects found
            </p>
            <p className="mt-2 text-sm">Try clearing filters or searching a different keyword.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearFilters}
              className="mt-4"
            >
              Reset filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % ITEMS_PER_PAGE) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Card className="group flex h-full flex-col overflow-hidden p-4 transition-colors hover:border-teal-500/40 dark:hover:border-teal-400/40">
                  {project.image ? (
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                      <Image
                        src={withBasePath(project.image)}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>

                  {project.description ? (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {project.details ? (
                      <Button size="sm" asChild>
                        <Link href={`/${project.details}`}>Project details</Link>
                      </Button>
                    ) : null}

                    {project.github ? (
                      <Button size="sm" asChild variant="outline">
                        <Link href={project.github}>{project.githubLabel ?? "View project"}</Link>
                      </Button>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
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
      </div>
    </main>
  );
}
