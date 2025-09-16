import { type ReactElement } from "react";

import ProjectsSection from "./projects-section";

export default function Projects(): ReactElement {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <ProjectsSection />
    </section>
  );
}
