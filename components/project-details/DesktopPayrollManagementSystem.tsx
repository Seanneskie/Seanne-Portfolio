import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function DesktopPayrollManagementSystem() {
  const alt = "Desktop Payroll Management System screenshot";
  const images = (
    await getProjectImages("desktop-payroll-management-system")
  ).map((src) => ({ src, alt }));
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Desktop Payroll Management System"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/next.webp", alt }]
        }
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
        <p>
          The pms-project is a desktop payroll management system that marries a
          FastAPI back end with an Electron front end. The back end exposes
          routes for dashboards, employee management, salary grades, allowances,
          deductions, payroll, incentives, catch bonuses, reports, and
          thirteenth-month pay, all served through a FastAPI application and
          static files. The Electron shell launches this API as a subprocess,
          waits for it to become available at
          <a
            href="http://127.0.0.1:8000"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://127.0.0.1:8000
          </a>
          , and then loads the interface in a browser window. SQLAlchemy models
          capture domain entities such as salary grades, employees, allowances,
          and deductions, enabling rich payroll computations and historical
          tracking.
        </p>
      </ProjectSection>
      <ProjectSection title="Backend Overview">
        <p>
          <strong>Application Startup:</strong> A simple runner starts the
          FastAPI app using Uvicorn, ensuring the project root is on the Python
          path before importing the application instance.
        </p>
        <p>
          <strong>Routing &amp; Static Assets:</strong> Core route modules cover
          operational concerns like employee records, payroll calculations, and
          incentives, while static files (CSS, images) are mounted for UI
          rendering.
        </p>
        <p>
          <strong>Data Models:</strong> SQLAlchemy models define tables for
          salary grades, employees, and their related histories, supporting
          allowances, deductions, and pay-step adjustments.
        </p>
      </ProjectSection>
      <ProjectSection title="Frontend Overview">
        <p>
          <strong>Electron Shell:</strong> The Electron process spawns the
          packaged back end (PMS_API.exe), waits until it responds, and then
          presents the FastAPI UI inside a BrowserWindow. Single-instance
          enforcement and clean shutdown handling are built in.
        </p>
        <p>
          <strong>Configuration &amp; Scripts:</strong> package.json configures
          Electron Forge commands (start, package, make) and declares dependencies
          such as electron, @tailwindcss/cli, and axios.
        </p>
      </ProjectSection>
      <ProjectSection title="Dependencies">
        <p>
          The Python environment includes FastAPI, SQLAlchemy, Uvicorn, and
          supporting libraries for templating, Excel/Word generation, and PDF
          reporting, among others, as listed in requirements.txt.
        </p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

