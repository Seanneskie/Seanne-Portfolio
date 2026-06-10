import Link from "@/src/shims/next-link";
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
      className="rounded-card border border-gray-200 bg-white p-4 transition-colors hover:border-teal-500/40 md:grid md:grid-cols-2 md:items-start md:gap-6 md:p-6 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-400/40"
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
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {title}
          </h1>

          {(period || collaborators) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
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
            <p className="text-base text-gray-600 dark:text-gray-400">{summary}</p>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="rounded-full border border-gray-200 bg-transparent font-normal text-gray-600 dark:border-gray-800 dark:text-gray-400"
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
              <Button size="sm" asChild className="gap-2">
                <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {liveLabel}
                </Link>
              </Button>
            )}
            {githubUrl && (
              <Button size="sm" variant="outline" asChild className="gap-2">
                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  {linkLabel}
                </Link>
              </Button>
            )}
            {downloadUrl && (
              <Button size="sm" variant="outline" asChild className="gap-2">
                <a href={withBasePath(downloadUrl)} download>
                  <FileText className="h-4 w-4" />
                  Download
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
