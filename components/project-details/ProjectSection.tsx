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
    <Card id={sectionId} className="scroll-mt-24 overflow-hidden">
      <CardHeader className="pb-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a
            href={`#${sectionId}`}
            className="group/anchor inline-flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
          >
            {title}
            <span
              aria-hidden
              className="text-teal-600 opacity-0 transition-opacity group-hover/anchor:opacity-100 dark:text-teal-400"
            >
              #
            </span>
          </a>
        </h2>
      </CardHeader>
      <CardContent className="space-y-2 text-gray-600 dark:text-gray-400">{children}</CardContent>
    </Card>
  );
}
