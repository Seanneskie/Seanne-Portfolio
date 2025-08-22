import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { withBasePath } from "@/lib/utils";
import ProjectGallery from "./ProjectGallery";
import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";

interface ProjectOverviewProps {
  images: string[];
  alt: string;
  children: ReactNode;
  githubUrl?: string;
  linkLabel?: string;
  downloadUrl?: string;
}

export default function ProjectOverview({
  images,
  alt,
  children,
  githubUrl,
  linkLabel = "View on GitHub",
  downloadUrl,
}: ProjectOverviewProps) {
  const firstImage = images[0];

  return (
    <section className="flex flex-col md:flex-row items-center gap-6">
      <div className="md:w-1/3">
        {images.length > 1 ? (
          <ProjectGallery images={images} alt={alt} />
        ) : (
          <Image
            src={withBasePath(firstImage)}
            alt={alt}
            width={400}
            height={300}
            className="rounded shadow"
          />
        )}
      </div>
      <div className="md:w-2/3 space-y-2">
        {children}
        {(githubUrl || downloadUrl) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {githubUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2"
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
              <Button variant="outline" size="sm" asChild className="gap-2">
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
