"use client";

import { type ReactElement } from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
export interface Achievement {
  icon: string;
  title: string;
  description: string;
  skills?: string[];
}

interface AwardsProps {
  data: Achievement[];
}

// Framer Motion v11 expects an Easing (function or [x1,y1,x2,y2])
const EASE_OUT: NonNullable<Transition["ease"]> = [0.16, 1, 0.3, 1];
const badgeCls =
  "rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

export default function Awards({ data }: AwardsProps): ReactElement {
  const totalAwards = data.length;

  return (
    <main className="py-16 sm:py-20">
      <Section className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Recognition"
              title="Awards and achievements"
              description="Highlights that reflect leadership, innovation, and strong delivery in engineering projects."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">Awards collected</p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {totalAwards}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Timeline showcases key wins across academic and professional stages.
              </p>
            </Card>
          </Reveal>
        </section>

        <div className="relative">
          {/* Timeline spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gray-200 dark:bg-gray-800"
          />

          <ol role="list" className="space-y-8">
            {data.map((achievement, idx) => (
              <motion.li
                key={`${achievement.title}-${idx}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="relative pl-12"
              >
                {/* Timeline pin */}
                <span
                  className="absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full bg-teal-600 ring-8 ring-white dark:bg-teal-500 dark:ring-gray-950"
                  aria-hidden="true"
                >
                  <i className={`${achievement.icon} relative text-sm text-white`} />
                </span>

                {/* Card body */}
                <Card className="group transition-colors hover:border-teal-500/40 dark:hover:border-teal-400/40">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>

                    <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    {achievement.skills?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {achievement.skills.map((label) => (
                          <Badge
                            key={label}
                            variant="secondary"
                            className={badgeCls}
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </ol>
        </div>
      </Section>
    </main>
  );
}
