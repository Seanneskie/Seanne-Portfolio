import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function Vims() {
  const images = await getProjectImages("vims");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Vessel Inventory Management System screenshot"
      >
        <p>
          <strong>Overview:</strong> Web application for tracking vessels, their
          specifications, and operational status across a fleet.
        </p>
        <p>
          <strong>Tech Stack:</strong> Next.js, React, TypeScript, Tailwind CSS.
        </p>
      </ProjectOverview>

      <ProjectSection title="Introduction">
        <p>Project introduction coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>Rationale coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Data Collection">
        <p>Data collection details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Model Development">
        <p>Model development details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Training and Evaluation">
        <p>Training and evaluation details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>Deployment details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Ethical Implications">
        <p>Ethical considerations coming soon.</p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="Vessel Inventory Management System screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

