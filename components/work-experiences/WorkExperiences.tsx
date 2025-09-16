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
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
          Work Experiences
        </h1>

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
      </section>
    );
  }

  if (error || !data) {
    return <p className="text-red-600 dark:text-red-400">Failed to load work experiences.</p>;
  }

  return (
    <section className="space-y-4" aria-labelledby="work-exp-title">
      <h1
        id="work-exp-title"
        className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400"
      >
        Work Experiences
      </h1>

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
    </section>
  );
}
