import { type ReactElement } from "react";

import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

const FALLBACK_IMAGE = "/static/placeholders/ai.webp";

export default async function MinervaProject(): Promise<ReactElement> {
  const alt = "Minerva Project screenshot";
  let rawImages: string[] = [];

  try {
    rawImages = await getProjectImages("minerva-project");
  } catch (error) {
    console.error("Unable to load Minerva Project screenshots:", error);
  }

  const images = (rawImages.length ? rawImages : [FALLBACK_IMAGE]).map((src) => ({
    src,
    alt,
  }));

  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Minerva - Service Status Dashboard"
        images={images}
      >
        <p>
          <strong>Overview:</strong> Minerva is a real-time incident monitoring
          dashboard that aggregates service status information from multiple
          cloud providers into a single, unified view. Instead of visiting
          individual status pages, developers can monitor the health of critical
          services from one centralized location.
        </p>
        <p>
          <strong>Services Monitored:</strong> Cloudflare, Supabase, Fly.io,
          GitHub, Vercel, and Upstash — with the ability to add more providers.
        </p>
        <p>
          <strong>Collaborators:</strong> Solo build.
        </p>
        <p>
          <strong>Tech Stack:</strong> Next.js 16, React 19, TypeScript,
          Tailwind CSS, shadcn/ui, rss-parser, Lucide Icons, Vercel.
        </p>
      </ProjectOverview>

      <ProjectSection title="RSS Feed Aggregation">
        <p>
          Minerva consumes RSS and Atom feeds from each provider&apos;s official
          status page using the rss-parser library. Feeds are fetched
          server-side, parsed into a normalized incident model, and categorized
          by severity — operational, degraded, outage, maintenance, or
          scheduled.
        </p>
      </ProjectSection>

      <ProjectSection title="Unified Status View">
        <p>
          All monitored services are displayed on a single dashboard organized
          by status category. Each service card shows the provider name, current
          status, and a timeline of recent incidents. The interface refreshes
          automatically to keep the information current.
        </p>
      </ProjectSection>

      <ProjectSection title="UI and Design">
        <p>
          The interface is built with shadcn/ui components styled via Tailwind
          CSS, featuring a clean, responsive layout. Lucide Icons provide
          visual indicators for service health, and the Geist font family keeps
          the typography consistent with the Next.js ecosystem.
        </p>
      </ProjectSection>

      <ProjectSection title="Deployment">
        <p>
          The application is deployed on Vercel with automatic builds from the
          main branch. Next.js server-side rendering ensures feeds are fetched
          and processed at request time, delivering up-to-date status data
          without requiring client-side API calls.
        </p>
      </ProjectSection>

      <ProjectSection title="Known Limitations">
        <ul className="list-disc space-y-1 pl-6">
          <li>
            RSS feed availability depends on each provider&apos;s status page
            uptime; if a feed is temporarily unreachable, that service shows
            stale data.
          </li>
          <li>
            Adding new providers currently requires manual feed URL
            configuration in the codebase.
          </li>
        </ul>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}
