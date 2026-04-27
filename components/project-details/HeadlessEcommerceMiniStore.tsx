import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "headless-ecommerce-mini-store";

export default async function HeadlessEcommerceMiniStore() {
  const images = await getGalleryImages(
    SLUG,
    "Headless E-Commerce Mini-Store screenshot",
    "/static/placeholders/next.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="Shop-Next is a Next.js storefront pulling product data from Shopify's Storefront API and rendering it through reusable UI components with server-side data fetching."
      />

      <ProjectSection title="Introduction">
        <p>
          Shop-Next is a customizable e-commerce demo built with modern React
          features and the Shopify Storefront API. It showcases product catalogs,
          promotional banners, and paginated listings.
        </p>
      </ProjectSection>
      <ProjectSection title="Local Development">
        <p>Install dependencies and start the development server:</p>
        <pre>
          <code>npm run dev</code>
        </pre>
        <p>
          Visit <code>http://localhost:3000</code> to view the site. Editing{" "}
          <code>app/page.tsx</code> hot-reloads changes automatically.
        </p>
      </ProjectSection>
      <ProjectSection title="Architecture">
        <p>
          Server components handle Shopify data fetching while client components
          provide interactive UI elements such as product grids and banners. The{" "}
          <code>shopifyFetch</code> helper in <code>lib/shopify.ts</code>{" "}
          manages authenticated GraphQL requests.
        </p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>
          Vercel is the recommended platform. An <code>apprunner.yaml</code>{" "}
          outlines a potential AWS App Runner setup. A multi-stage Dockerfile
          builds a production image and injects Shopify credentials via
          environment variables.
        </p>
      </ProjectSection>
      <ProjectSection title="Testing">
        <p>
          Unit tests use Vitest and Testing Library while ESLint 9 enforces
          code standards.
        </p>
      </ProjectSection>
    </div>
  );
}
