import Link from "next/link";
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
      className="grid gap-3 border-t border-teal-200/70 pt-6 dark:border-teal-800/70 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/project-details/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-teal-200/70 bg-white/80 p-4 transition hover:border-teal-400 hover:shadow-md dark:border-teal-800/70 dark:bg-gray-950/60 dark:hover:border-teal-500"
        >
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-300">
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous project
          </span>
          <span className="mt-1 font-semibold text-gray-900 group-hover:text-teal-700 dark:text-gray-100 dark:group-hover:text-teal-200">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={`/project-details/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-teal-200/70 bg-white/80 p-4 text-right transition hover:border-teal-400 hover:shadow-md dark:border-teal-800/70 dark:bg-gray-950/60 dark:hover:border-teal-500 sm:items-end"
        >
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-300">
            Next project
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 font-semibold text-gray-900 group-hover:text-teal-700 dark:text-gray-100 dark:group-hover:text-teal-200">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
