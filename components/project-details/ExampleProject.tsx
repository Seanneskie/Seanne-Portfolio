import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "example-project";

export default async function ExampleProject() {
  const images = await getGalleryImages(SLUG, "Example project screenshot");

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        title="Example Project"
        images={images}
        summary="Replace this text with a short summary of your project."
        collaborators="List collaborators here."
      />

      <ProjectSection title="Introduction">
        <p>Introduction content coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>Rationale content coming soon.</p>
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
    </div>
  );
}
