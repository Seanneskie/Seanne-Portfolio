import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";

export default function ExampleProject() {
  return (
    <div className="space-y-12">
      <ProjectOverview
        imageSrc="/static/placeholders/next.png"
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
        <p>Introduce your project here.</p>
      </ProjectSection>

      <ProjectSection title="Rationale">
        <p>Explain the rationale or motivation behind the project.</p>
      </ProjectSection>
    </div>
  );
}
