import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function BudgetSystem() {
  const images = await getProjectImages("budget-system");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Budget System screenshot"
      >
        <p>
          <strong>Overview:</strong> Layered ASP.NET Core and SQL Server
          application for managing personal budgets. Accounts track starting
          balances and currencies, budgets are scoped by month and category, and
          categories indicate income or expense types.
        </p>
        <p>
          <strong>Tech Stack:</strong> ASP.NET Core, SQL Server, Entity Framework
          Core, FluentValidation.
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
          <ProjectGallery images={images} alt="Budget System screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

