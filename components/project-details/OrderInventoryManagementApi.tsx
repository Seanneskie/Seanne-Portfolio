import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function OrderInventoryManagementApi() {
  const images = await getProjectImages("order-inventory-management-api");
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Order & Inventory Management API"
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

      <ProjectSection title="Introduction">
        <p>
          Lightweight ASP.NET Core and PostgreSQL service offering product CRUD,
          stock validation, and idempotent order placement for small stores.
        </p>
      </ProjectSection>
      <ProjectSection title="Consistency and Concurrency">
        <p>
          Transactions with an inventory audit log ensure reliable updates while
          Postgres <code>xmin</code> optimistic concurrency prevents oversells.
        </p>
      </ProjectSection>
      <ProjectSection title="Development and Deployment">
        <p>
          EF Core migrations, FluentValidation, RFC 7807 <code>ProblemDetails</code>,
          Swagger, and Serilog support robust development. Integration tests run
          against a Dockerized Postgres instance and the API targets Azure
          hosting.
        </p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="Order & Inventory Management API screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

