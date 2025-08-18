import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { withBasePath } from "@/lib/utils";

interface ProjectOverviewProps {
  imageSrc: string;
  alt: string;
  children: ReactNode;
  githubUrl?: string;
  linkLabel?: string;
}

export default function ProjectOverview({
  imageSrc,
  alt,
  children,
  githubUrl,
  linkLabel = "View on GitHub",
}: ProjectOverviewProps) {
  return (
    <section className="flex flex-col md:flex-row items-center gap-6">
      <div className="md:w-1/3">
        <Image
          src={withBasePath(imageSrc)}
          alt={alt}
          width={400}
          height={300}
          className="rounded shadow"
        />
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
      </div>
    </section>
  );
}
