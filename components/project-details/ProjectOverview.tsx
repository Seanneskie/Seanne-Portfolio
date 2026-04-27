import Link from "next/link";
import { type ReactElement, type ReactNode } from "react";
import { withBasePath } from "@/lib/utils";
import { getProjectMeta, type ProjectMeta } from "@/lib/project-meta";
import ProjectGallery from "./ProjectGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, FileText, Github, Users } from "lucide-react";

interface ProjectOverviewProps {
  /**
   * When provided, tags / period / collaborators / github / link are auto-loaded
   * from public/data/projects.json. Explicit props still win when both are set.
   */
  slug?: string;
  title?: string;
  images?: Array<{ src: string; alt: string }>;
  children?: ReactNode;
  githubUrl?: string;
  linkLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  downloadUrl?: string;
  tags?: string[];
  period?: string;
  collaborators?: string | null;
  summary?: string;
}

export default function ProjectOverview(props: ProjectOverviewProps): ReactElement {
  const meta: ProjectMeta | undefined = props.slug ? getProjectMeta(props.slug) : undefined;

  const title = props.title ?? meta?.title ?? "Project";
  const summary = props.summary ?? meta?.description;
  const tags = props.tags ?? meta?.tags ?? [];
  const period = props.period ?? meta?.period;
  const collaborators = props.collaborators ?? meta?.collaborators;
  const githubUrl = props.githubUrl ?? meta?.github ?? undefined;
  const linkLabel = props.linkLabel ?? meta?.githubLabel ?? "View on GitHub";
  const liveUrl = props.liveUrl ?? (meta as { link?: string | null } | undefined)?.link ?? undefined;
  const liveLabel = props.liveLabel ?? "Live demo";
  const downloadUrl = props.downloadUrl;

  const images = props.images ?? [];

  return (
    <section
      aria-labelledby="project-title"
      className="group relative overflow-hidden rounded-2xl border border-teal-200/70 bg-white/85 p-4 md:p-6 backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60 md:grid md:grid-cols-2 md:items-start gap-6 transition-shadow hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20"
    >
      <div className="relative mb-4 md:mb-0">
        {images.length >= 1 ? (
          <ProjectGallery images={images} showThumbnails={images.length > 1} />
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <h1
            id="project-title"
            className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400"
          >
            {title}
          </h1>

          {(period || collaborators) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
              {period && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  <span>{period}</span>
                </span>
              )}
              {collaborators && (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4" aria-hidden />
                  <span>{collaborators}</span>
                </span>
              )}
            </div>
          )}

          {summary && (
            <p className="text-base text-gray-700 dark:text-gray-200">{summary}</p>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="rounded-full bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:ring-teal-800"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}

        {props.children && <div className="space-y-2 pt-1">{props.children}</div>}

        {(githubUrl || liveUrl || downloadUrl) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {liveUrl && (
              <Button
                size="sm"
                asChild
                className="group gap-2 text-white bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 bg-[length:200%_200%] animate-gradient-x shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {liveLabel}
                </Link>
              </Button>
            )}
            {githubUrl && (
              <Button
                size="sm"
                asChild
                className="group gap-2 text-white bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-[length:200%_200%] animate-gradient-x shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  {linkLabel}
                </Link>
              </Button>
            )}
            {downloadUrl && (
              <Button
                size="sm"
                asChild
                className="group gap-2 text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_200%] animate-gradient-x shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                <a href={withBasePath(downloadUrl)} download>
                  <FileText className="h-4 w-4" />
                  Download
                </a>
              </Button>
            )}
          </div>
        )}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-teal-500/15"
      />
    </section>
  );
}
