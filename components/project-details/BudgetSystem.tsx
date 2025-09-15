import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function BudgetSystem() {
  const alt = "Budget System screenshot";
  const images = (await getProjectImages("budget-system")).map((src) => ({
    src,
    alt,
  }));
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Budget System"
        githubUrl="https://github.com/Seanneskie/budgetTracker"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/c#.png", alt }]
        }
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
        <p>
          <strong>Note:</strong> This is a hobby/learning project only.
        </p>
      </ProjectOverview>

      <ProjectSection title="Introduction">
        <p>
          A personal finance app that organizes accounts, budgets, and
          categories into a clean architecture stack. Users define starting
          balances and track monthly spending across income and expense types.
        </p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>
          Built to explore domain-driven design with ASP.NET Core while solving
          real budgeting needs and practicing testable, maintainable code.
        </p>
      </ProjectSection>
      <ProjectSection title="Architecture">
        <ul className="list-disc pl-6">
          <li>
            <strong>Domain:</strong> Entities and value objects that capture
            budgets, accounts, and categories.
          </li>
          <li>
            <strong>Application:</strong> Use cases coordinate business rules
            and ensure idempotency with deterministic identifiers.
          </li>
          <li>
            <strong>Infrastructure:</strong> EF Core migrations manage SQL
            Server schema and data access.
          </li>
          <li>
            <strong>API:</strong> Minimal endpoints return RFC7807 problem
            details for consistent error responses.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Running the Project">
        <p>Initialize secrets, update the database, then run the application:</p>
        <pre>
{`dotnet user-secrets set "ConnectionStrings:Default" "Server=(localdb)\\MSSQLLocalDB;Database=BudgetDb;Trusted_Connection=True;"
dotnet ef database update
dotnet run`}
        </pre>
      </ProjectSection>
      <ProjectSection title="Build and Test">
        <p>Verify compilation and run automated tests:</p>
        <pre>
{`dotnet build
dotnet test`}
        </pre>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

