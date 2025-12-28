"use client";

import { type ReactElement } from "react";
import { useData } from "@/lib/use-data";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, Briefcase, CalendarDays, CheckCircle2 } from "lucide-react";

interface WorkExperience {
  company: string;
  project: string;
  period: string;
  images: { src: string; alt: string }[];
  tech: string[];
  summary: string;
  highlights: string[];
}

/** Variants (typed & literal-narrowed) */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
} satisfies Variants;

const card = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
} satisfies Variants;

const listItem = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
} satisfies Variants;

export default function WorkExperiences(): ReactElement {
  const { data, loading, error } = useData<WorkExperience[]>("work-experiences.json");

  if (loading) {
    return (
      <main className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
          <div className="absolute -top-24 right-6 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/30" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/30" />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12">
          <section className="mb-10 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Career
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Work experiences
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-200 sm:text-lg">
              Roles and projects that shaped production delivery, collaboration, and impact.
            </p>
          </section>

          <div className="relative grid gap-6 sm:grid-cols-2">
            {/* Timeline rail (loading) */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-3 top-0 hidden h-full w-px bg-gradient-to-b from-teal-400/0 via-teal-500/30 to-teal-400/0 sm:block"
            />
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="relative overflow-hidden border-teal-600/10 bg-white/70 shadow-sm backdrop-blur-sm dark:border-teal-400/10 dark:bg-teal-900/20"
              >
                <span
                  aria-hidden
                  className="absolute left-[-1.15rem] top-7 hidden h-3 w-3 rounded-full bg-teal-500 ring-4 ring-white/70 dark:ring-teal-950 sm:block"
                />
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="aspect-video w-full rounded-md" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((__, k) => (
                      <Skeleton key={k} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                  <div className="space-y-2 pt-1">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return <p className="text-red-600 dark:text-red-400">Failed to load work experiences.</p>;
  }

  const totalExperiences = data.length;
  const totalTech = new Set(data.flatMap((exp) => exp.tech)).size;
  const totalHighlights = data.reduce((sum, exp) => sum + exp.highlights.length, 0);

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
        <div className="absolute -top-24 right-6 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/30" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/30" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Career
            </p>
            <h1
              id="work-exp-title"
              className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            >
              Work experiences
            </h1>
            <p className="mt-3 text-base text-gray-700 dark:text-gray-200 sm:text-lg">
              A look at professional projects, responsibilities, and outcomes that shaped delivery
              discipline.
            </p>
          </div>

          <Card className="rounded-2xl border border-teal-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {totalExperiences}
                </p>
                <p>Roles delivered</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTech}</p>
                <p>Tools used</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {totalHighlights}
                </p>
                <p>Highlights logged</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {data.length}
                </p>
                <p>Projects showcased</p>
              </div>
            </div>
          </Card>
        </section>

        <div className="relative">
          {/* Timeline rail */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-0 hidden h-full w-px bg-gradient-to-b from-teal-400/0 via-teal-500/30 to-teal-400/0 sm:block"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {data.map((exp) => (
              <motion.article
                key={`${exp.company}-${exp.project}-${exp.period}`}
                variants={card}
                whileHover={{ y: -4 }} // keep hover simple to avoid extra type friction
                className="group relative"
              >
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute left-[-1.15rem] top-8 hidden h-3 w-3 rounded-full bg-teal-500 ring-4 ring-white/70 transition-transform duration-300 group-hover:scale-110 dark:ring-teal-950 sm:block"
                />

                <Card className="relative overflow-hidden border-teal-600/10 bg-white/70 shadow-sm backdrop-blur-sm ring-1 ring-transparent transition-all duration-300 hover:shadow-md hover:ring-teal-500/20 dark:border-teal-400/10 dark:bg-teal-900/20">
                  {/* Accent gradient */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 opacity-80"
                  />
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl text-teal-800 dark:text-teal-200">
                      <Building2 className="h-5 w-5 opacity-80" />
                      <span className="font-semibold">{exp.company}</span>
                    </CardTitle>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-200">
                        <Briefcase className="h-4 w-4 opacity-70" />
                        {exp.project}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <CalendarDays className="h-4 w-4 opacity-60" />
                        {exp.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {exp.images.length > 0 && (
                      <Carousel className="w-full" opts={{ align: "start" }}>
                        <CarouselContent>
                          {exp.images.map((img) => (
                            <CarouselItem key={img.src}>
                              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                                <Image
                                  src={withBasePath(img.src)}
                                  alt={img.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 shadow-sm" />
                        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 shadow-sm" />
                      </Carousel>
                    )}

                    <p className="text-gray-700 dark:text-gray-200">{exp.summary}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <motion.div key={t} variants={listItem} className="motion-safe:contents">
                          <Badge
                            variant="secondary"
                            className="bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 transition-colors hover:bg-teal-100 dark:bg-teal-900/40 dark:text-teal-100 dark:ring-teal-800 dark:hover:bg-teal-900/60"
                          >
                            {t}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {exp.highlights?.length > 0 && (
                      <motion.ul
                        variants={container}
                        className="mt-1 space-y-2 text-sm text-gray-700 dark:text-gray-200"
                      >
                        {exp.highlights.map((h) => (
                          <motion.li
                            key={h}
                            variants={listItem}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                            <span>{h}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
