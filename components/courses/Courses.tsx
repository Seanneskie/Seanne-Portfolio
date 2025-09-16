import { type ReactElement } from "react";

import CoursesSection from "./courses-section";

export default function Courses(): ReactElement {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">Courses</h1>
      <CoursesSection />
    </section>
  );
}
