import { type ReactElement, type ReactNode } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { slugifySection } from "@/lib/project-meta";

interface ProjectSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export default function ProjectSection({
  title,
  id,
  children,
}: ProjectSectionProps): ReactElement {
  const sectionId = id ?? slugifySection(title);
  return (
    <Card id={sectionId} className="relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-600/10 via-teal-500/5 to-transparent dark:from-teal-400/10 dark:via-teal-400/5 dark:to-transparent"
      />
      <CardHeader className="relative z-10 pb-2">
        <h2 className="text-2xl font-semibold leading-none">
          <a
            href={`#${sectionId}`}
            className="group/anchor inline-flex items-center gap-2 hover:text-teal-700 dark:hover:text-teal-300"
          >
            {title}
            <span
              aria-hidden
              className="text-teal-500 opacity-0 transition-opacity group-hover/anchor:opacity-100"
            >
              #
            </span>
          </a>
        </h2>
      </CardHeader>
      <CardContent className="relative z-10 space-y-2">{children}</CardContent>
    </Card>
  );
}
