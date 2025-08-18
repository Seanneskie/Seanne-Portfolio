import { ReactNode } from "react";

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
}

export default function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
