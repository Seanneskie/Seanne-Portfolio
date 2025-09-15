import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function OrderInventoryManagementApi() {
  const alt = "Order & Inventory Management API screenshot";
  const images = (await getProjectImages("order-inventory-management-api")).map(
    (src) => ({ src, alt })
  );
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Order & Inventory Management API"
        githubUrl="https://github.com/Seanneskie/dotnet-inventory"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/csharp.png", alt }]
        }
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
        <p>
          <strong>Note:</strong> This is a hobby/learning project only.
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
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

