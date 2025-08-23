import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
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
          <ProjectGallery images={images} alt="Order & Inventory Management API screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

