import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
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

      <ProjectSection title="Key Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Transactions handle income, expense, and transfer flows between
            accounts.
          </li>
          <li>
            FluentValidation ensures positive amounts and required account fields
            for each transaction type.
          </li>
          <li>
            EF Core sets monetary precision, unique category names, relationships,
            and stores idempotency keys; a database seeder bootstraps sample
            data.
          </li>
          <li>
            Middleware hashes request bodies and checks Idempotency-Key headers
            to reject duplicate writes.
          </li>
          <li>
            Minimal CRUD API returns RFC 7807 ProblemDetails responses and
            exposes a typed HttpClient for front-end integration.
          </li>
        </ul>
      </ProjectSection>
    </div>
  );
}

