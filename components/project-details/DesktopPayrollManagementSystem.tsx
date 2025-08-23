import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function DesktopPayrollManagementSystem() {
  const images = await getProjectImages("pms");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Desktop Payroll Management System screenshot"
      >
        <p>
          <strong>Overview:</strong> Cross-platform payroll management
          application with an Electron shell and FastAPI backend. The Electron
          wrapper delivers a native desktop experience while FastAPI powers the
          business logic and data APIs.
        </p>
        <p>
          <strong>Tech Stack:</strong> Electron, React, TypeScript, FastAPI,
          SQLAlchemy, SQLite.
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
          <ProjectGallery images={images} alt="Desktop Payroll Management System screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

