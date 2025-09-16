import Image from "next/image";
import Link from "next/link";
import { type ReactElement, type ReactNode } from "react";
import { withBasePath } from "@/lib/utils";
import ProjectGallery from "./ProjectGallery";
import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";

interface ProjectOverviewProps {
  title: string;
  images: Array<{ src: string; alt: string }>;
  children: ReactNode;
  githubUrl?: string;
  linkLabel?: string;
  downloadUrl?: string;
}

export default function ProjectOverview({
  title,
  images,
  children,
  githubUrl,
  linkLabel = "View on GitHub",
  downloadUrl,
}: ProjectOverviewProps): ReactElement {
  const firstImage = images[0];

  return (
    <section
      className="group relative overflow-hidden rounded-2xl border border-teal-200/70 bg-white/85 p-4 md:p-6 backdrop-blur dark:border-teal-800/70 dark:bg-gray-950/60 md:grid md:grid-cols-2 md:items-center gap-6 transition-shadow hover:shadow-lg hover:shadow-teal-300/30 dark:hover:shadow-teal-900/20"
    >
      <div className="relative mb-4 md:mb-0">
        {images.length > 1 ? (
          <ProjectGallery images={images} />
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={withBasePath(firstImage.src)}
              alt={firstImage.alt}
              fill
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/25 to-transparent dark:from-teal-950/35" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
          {title}
        </h1>
        {children}
        {(githubUrl || downloadUrl) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {githubUrl && (
              <Button
                size="sm"
                asChild
                className="group gap-2 text-white bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-[length:200%_200%] animate-gradient-x shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {linkLabel}
                </Link>
              </Button>
            )}
            {downloadUrl && (
              <Button
                size="sm"
                asChild
                className="group gap-2 text-white bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-500 bg-[length:200%_200%] animate-gradient-x shadow-md hover:shadow-lg transition-[transform,box-shadow,background-position] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
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
