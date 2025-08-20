import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";

export default function ProjectTemplate() {
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={["/static/placeholders/ai.png"]}
        alt="Project screenshot"
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
    </div>
  );
}
