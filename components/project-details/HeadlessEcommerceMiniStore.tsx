import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function HeadlessEcommerceMiniStore() {
  const alt = "Headless E-Commerce Mini-Store screenshot";
  const images = (await getProjectImages("headless-ecommerce-mini-store")).map(
    (src) => ({ src, alt })
  );
  const fallback = [{ src: "/static/placeholders/next.webp", alt }];

  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Headless E-Commerce Mini-Store"
        images={images.length ? images : fallback}
      >
        <p>
          <strong>Overview:</strong> Shop‑Next is a Next.js storefront that
          fetches product data from Shopify’s Storefront API and renders it
          with reusable UI components and server-side data fetching.
        </p>
        <p>
          <strong>Tech Stack:</strong> Next.js 15, React 19, TypeScript 5,
          Tailwind CSS 4, Radix UI primitives, Lucide icons, Framer Motion,
          Shopify Storefront GraphQL API, ESLint 9, Vitest, Testing Library, Docker.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
        </p>
      </ProjectOverview>
      <ProjectSection title="Introduction">
        <p>
          Shop‑Next is a customizable e‑commerce demo built with modern React
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
          Visit <code>http://localhost:3000</code> to view the site. Editing
          <code>app/page.tsx</code> hot‑reloads changes automatically.
        </p>
      </ProjectSection>
      <ProjectSection title="Architecture">
        <p>
          Server components handle Shopify data fetching while client components
          provide interactive UI elements such as product grids and banners. The
          <code>shopifyFetch</code> helper in <code>lib/shopify.ts</code> manages
          authenticated GraphQL requests.
        </p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>
          Vercel is the recommended platform. An <code>apprunner.yaml</code>
          outlines a potential AWS App Runner setup. A multi‑stage Dockerfile
          builds a production image and injects Shopify credentials via
          environment variables.
        </p>
      </ProjectSection>
      <ProjectSection title="Testing">
        <p>
          Unit tests use Vitest and Testing Library while ESLint 9 enforces code
          standards.
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

