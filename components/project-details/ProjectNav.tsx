import Link from "@/src/shims/next-link";
import { type ReactElement } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentProjects } from "@/lib/project-meta";

interface ProjectNavProps {
  slug: string;
}

export default function ProjectNav({ slug }: ProjectNavProps): ReactElement | null {
  const { prev, next } = getAdjacentProjects(slug);
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Project navigation"
      className="grid gap-3 border-t border-gray-200 pt-6 dark:border-gray-800 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/project-details/${prev.slug}`}
          className="group flex flex-col rounded-card border border-gray-200 bg-white p-4 transition-colors hover:border-teal-500/40 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-400/40"
        >
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous project
          </span>
          <span className="mt-1 font-semibold text-gray-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={`/project-details/${next.slug}`}
          className="group flex flex-col items-end rounded-card border border-gray-200 bg-white p-4 text-right transition-colors hover:border-teal-500/40 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-400/40 sm:items-end"
        >
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Next project
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 font-semibold text-gray-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
