import { type ReactElement } from "react";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import CoursesSection from "./courses-section";
import type { Course } from "./courses-section";

interface CoursesProps {
  data: Course[];
}

export default function Courses({ data }: CoursesProps): ReactElement {
  return (
    <main className="py-16 sm:py-20">
      <Section className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Learning Path"
              title="Courses and workshops"
              description="A focused catalog of classes covering software engineering, analytics, and design. Use the filters to quickly pinpoint the topics you care about."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="p-6">
              <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                What you will find
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Coursework spanning backend systems, data workflows, design foundations, and modern
                web delivery.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• Clear course codes and institutions</p>
                <p>• Expandable descriptions and credit info</p>
                <p>• Search and filter controls</p>
              </div>
            </Card>
          </Reveal>
        </section>

        <CoursesSection data={data} />
      </Section>
    </main>
  );
}
