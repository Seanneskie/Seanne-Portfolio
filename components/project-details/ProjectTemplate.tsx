import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectHighlights from "./ProjectHighlights";
import { getGalleryImages } from "@/lib/project-images";

/**
 * Starter template for a new project detail page.
 *
 * Steps to clone:
 *   1. Copy this file as `components/project-details/MyProject.tsx`.
 *   2. Set SLUG to match `details` in `public/data/projects.json` (without the
 *      `project-details/` prefix) — tags, period, links, and collaborators
 *      will be auto-pulled from the JSON entry.
 *   3. Customize the body sections.
 *   4. Register the slug in `app/project-details/[slug]/page.tsx`, optionally
 *      providing a `sections` array to enable the sticky table of contents.
 */
const SLUG = "project-slug";

export default async function ProjectTemplate() {
  const images = await getGalleryImages(SLUG, "Project screenshot");

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="One-sentence pitch for the project."
      />

      {/* Optional: showcase headline metrics or scope numbers */}
      <ProjectHighlights
        items={[
          { label: "Stat", value: "—", hint: "context" },
          { label: "Stat", value: "—", hint: "context" },
        ]}
      />

      <ProjectSection title="Introduction">
        <p>Introduce the project here.</p>
      </ProjectSection>

      <ProjectSection title="Architecture">
        <p>Describe the system at a high level.</p>
      </ProjectSection>

      <ProjectSection title="Key Features">
        <ul className="list-disc pl-6 space-y-1">
          <li>Feature one</li>
          <li>Feature two</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Deployment">
        <p>Outline deployment information.</p>
      </ProjectSection>
    </div>
  );
}
