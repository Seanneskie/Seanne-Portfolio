import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "order-inventory-management-api";

export default async function OrderInventoryManagementApi() {
  const images = await getGalleryImages(
    SLUG,
    "Order & Inventory Management API screenshot",
    "/static/placeholders/csharp.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="Lightweight RESTful API built with ASP.NET Core and PostgreSQL — products, stock validation, idempotent orders, and audit logging. Hobby/learning project."
      />

      <ProjectSection title="Introduction">
        <p>
          Lightweight ASP.NET Core (net8.0) service using Entity Framework Core
          with the Npgsql provider to talk to a local PostgreSQL database. It
          offers product CRUD, stock validation, and idempotent order placement
          for small stores.
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
          NuGet packages like FluentValidation.AspNetCore,
          Microsoft.AspNetCore.OpenApi, Npgsql.EntityFrameworkCore.PostgreSQL,
          Serilog.AspNetCore with a console sink, and Swashbuckle.AspNetCore
          power the API. The default connection string points at a local
          PostgreSQL instance but can be overridden for other environments. EF
          Core migrations, RFC 7807 <code>ProblemDetails</code>, and integration
          tests against Dockerized Postgres prepare the project for Azure
          deployment.
        </p>
      </ProjectSection>
    </div>
  );
}
