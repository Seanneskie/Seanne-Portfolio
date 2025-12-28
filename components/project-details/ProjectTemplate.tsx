import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";
export default async function ProjectTemplate() {
  const alt = "Project screenshot";
  const images = (await getProjectImages("project-slug")).map((src) => ({
    src,
    alt,
  }));
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Project Title"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/ai.webp", alt }]
        }
        // githubUrl="https://github.com/username/repo" // optional
        // downloadUrl="/static/project-slug/file.zip" // optional
      >
        <p>
          <strong>Overview:</strong> Brief overview of the project.
        </p>
        <p>
          <strong>Collaborators:</strong> List collaborators here.
        </p>
      </ProjectOverview>

      <ProjectSection title="Introduction">
        <p>Introduce the project here.</p>
      </ProjectSection>

      <ProjectSection title="Rationale">
        <p>Explain the rationale behind the project here.</p>
      </ProjectSection>

      <ProjectSection title="Data Collection and Preparation">
        <p>Describe data collection and preparation.</p>
      </ProjectSection>

      <ProjectSection title="Model Development">
        <p>Provide details on model development.</p>
      </ProjectSection>

      <ProjectSection title="Training and Evaluation">
        <p>Discuss training and evaluation of the model.</p>
      </ProjectSection>

      <ProjectSection title="Deployment">
        <p>Outline deployment information.</p>
      </ProjectSection>

      <ProjectSection title="Ethical and Societal Implications">
        <p>Share ethical and societal considerations.</p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}
