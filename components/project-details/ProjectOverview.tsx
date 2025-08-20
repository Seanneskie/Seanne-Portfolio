import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { withBasePath } from "@/lib/utils";
import ProjectGallery from "./ProjectGallery";

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
        {githubUrl && (
          <Link
            href={githubUrl}
            className="inline-block underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel}
          </Link>
        )}
        {downloadUrl && (
          <Link
            href={withBasePath(downloadUrl)}
            download
            className="inline-block underline"
          >
            Download
          </Link>
        )}
      </div>
    </section>
  );
}
