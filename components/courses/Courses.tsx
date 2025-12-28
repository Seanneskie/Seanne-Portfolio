import { type ReactElement } from "react";

import { Card } from "@/components/ui/card";
import CoursesSection from "./courses-section";

export default function Courses(): ReactElement {
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
              Learning Path
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Courses and workshops
            </h1>
            <p className="mt-3 text-base text-gray-700 dark:text-gray-200 sm:text-lg">
              A focused catalog of classes covering software engineering, analytics, and design.
              Use the filters to quickly pinpoint the topics you care about.
            </p>
          </div>

          <Card className="rounded-2xl border border-teal-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              What you will find
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              Coursework spanning backend systems, data workflows, design foundations, and modern
              web delivery.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-gray-600 dark:text-gray-300">
              <p>• Clear course codes and institutions</p>
              <p>• Expandable descriptions and credit info</p>
              <p>• Search and filter controls</p>
            </div>
          </Card>
        </section>

        <CoursesSection />
      </div>
    </main>
  );
}
