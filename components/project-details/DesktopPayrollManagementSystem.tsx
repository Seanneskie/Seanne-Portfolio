import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
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

      <ProjectSection title="Key Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>Employee directory with roles and configurable salaries.</li>
          <li>
            Time tracking and payroll calculations for hourly and salaried
            staff.
          </li>
          <li>Automatic payslip generation with deductions and allowances.</li>
          <li>FastAPI REST endpoints consumed by the Electron client.</li>
          <li>Packaging scripts build installers for Windows and Linux.</li>
        </ul>
      </ProjectSection>
    </div>
  );
}

