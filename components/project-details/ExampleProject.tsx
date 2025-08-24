import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function ExampleProject() {
  const images = await getProjectImages("example-project");
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Example Project"
        images={images.length ? images : ["/static/placeholders/ai.png"]}
        alt="Example project screenshot"
      >
        <p>
          <strong>Overview:</strong> Replace this text with a short summary of
          your project.
        </p>
        <p>
          <strong>Collaborators:</strong> List collaborators here.
        </p>
      </ProjectOverview>

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

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="Example project screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}
