import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getProjectImages } from "@/lib/project-images";

export default async function OrderInventoryManagementApi() {
  const images = await getProjectImages("order-inventory-management-api");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Order & Inventory Management API screenshot"
      >
        <p>
          <strong>Overview:</strong> Lightweight RESTful API built with ASP.NET Core
          and PostgreSQL for managing products and orders with stock validation and
          audit logging.
        </p>
        <p>
          <strong>Tech Stack:</strong> ASP.NET Core, Entity Framework Core, PostgreSQL,
          FluentValidation, Serilog, Swagger.
        </p>
      </ProjectOverview>

      <ProjectSection title="Key Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>Product catalog with soft deletes and basic filtering.</li>
          <li>Inventory-aware order creation that validates stock levels.</li>
          <li>Idempotent order endpoints to prevent duplicate submissions.</li>
          <li>Audit logs and structured logging via Serilog.</li>
          <li>OpenAPI documentation with Swagger UI.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Development Notes">
        <p>
          The API follows a clean architecture approach using repositories and services
          to separate concerns. Data access is handled through Entity Framework Core
          with PostgreSQL migrations. Input validation is enforced with
          FluentValidation, and integration tests ensure critical flows such as order
          placement remain reliable.
        </p>
      </ProjectSection>
    </div>
  );
}

