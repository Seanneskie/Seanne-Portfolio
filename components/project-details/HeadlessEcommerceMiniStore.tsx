import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function HeadlessEcommerceMiniStore() {
  const images = await getProjectImages("headless-ecommerce-mini-store");
  const fallback = ["/static/placeholders/next.png"];

  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : fallback}
        alt="Headless E-Commerce Mini-Store screenshot"
      >
        <p>
          <strong>Overview:</strong> Modern headless e-commerce platform using
          Next.js, Shopify Storefront GraphQL API, and AWS.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
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
          <ProjectGallery images={images} alt="Headless E-Commerce Mini-Store screenshots" />
        </ProjectSection>
      )}
    </div>
  );
}

