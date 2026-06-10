"use client";

import { type ReactElement } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "@/src/shims/next-image";
import { withBasePath } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, Briefcase, CalendarDays, CheckCircle2 } from "lucide-react";

export interface WorkExperience {
  company: string;
  project: string;
  period: string;
  images: { src: string; alt: string }[];
  tech: string[];
  summary: string;
  highlights: string[];
}

interface WorkExperiencesProps {
  data: WorkExperience[];
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

export default function WorkExperiences({ data }: WorkExperiencesProps): ReactElement {
  const totalExperiences = data.length;
  const totalTech = new Set(data.flatMap((exp) => exp.tech)).size;
  const totalHighlights = data.reduce((sum, exp) => sum + exp.highlights.length, 0);

  return (
    <main className="py-16 sm:py-20">
      <Section className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Career"
              title="Work experiences"
              description="A look at professional projects, responsibilities, and outcomes that shaped delivery discipline."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {totalExperiences}
                  </p>
                  <p>Roles delivered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{totalTech}</p>
                  <p>Tools used</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {totalHighlights}
                  </p>
                  <p>Highlights logged</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.length}
                  </p>
                  <p>Projects showcased</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>

        <div className="relative">
          {/* Timeline rail */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-0 hidden h-full w-px bg-gray-200 dark:bg-gray-800 sm:block"
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
                className="group relative"
              >
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute left-[-1.15rem] top-8 hidden h-3 w-3 rounded-full bg-teal-500 ring-4 ring-white dark:bg-teal-400 dark:ring-gray-950 sm:block"
                />

                <Card className="relative overflow-hidden transition-colors hover:border-teal-500/40 dark:hover:border-teal-400/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl tracking-tight text-gray-900 dark:text-white">
                      <Building2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="font-semibold">{exp.company}</span>
                    </CardTitle>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
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

                    <p className="text-gray-600 dark:text-gray-400">{exp.summary}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <motion.div key={t} variants={listItem} className="motion-safe:contents">
                          <Badge
                            variant="secondary"
                            className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400"
                          >
                            {t}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {exp.highlights?.length > 0 && (
                      <motion.ul
                        variants={container}
                        className="mt-1 space-y-2 text-sm text-gray-600 dark:text-gray-400"
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
      </Section>
    </main>
  );
}
