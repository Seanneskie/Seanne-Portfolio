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
      <ProjectSection title="Product Catalog">
        <p>
          The storefront queries Shopify&apos;s GraphQL API to display products,
          collections, and real-time inventory with a responsive UI.
        </p>
      </ProjectSection>
      <ProjectSection title="Checkout Flow">
        <p>
          Customers proceed through a custom checkout that hands off to
          Shopify&apos;s secure checkout while persisting cart data via serverless
          functions.
        </p>
      </ProjectSection>
      <ProjectGallery
        images={images.length ? images : fallback}
        alt="Headless E-Commerce Mini-Store screenshots"
      />
    </div>
  );
}

