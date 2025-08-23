import { promises as fs } from "fs";
import path from "path";
import type { ComponentType } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const componentMap: Record<string, () => Promise<{ default: ComponentType }>> = {
  "ai-coin-detector": () => import("@/components/project-details/AICoinDetector"),
  "nosql-project": () => import("@/components/project-details/NosqlProject"),
  "cnsm-website": () => import("@/components/project-details/CnsmWebsite"),
  "bitcoin-analysis-app": () => import("@/components/project-details/BitcoinAnalysisApp"),
  pms: () => import("@/components/project-details/DesktopPayrollManagementSystem"),
  "digital-freelancer-profiling-app": () =>
    import("@/components/project-details/DigitalFreelancerProfilingApp"),
  "cemcdo-app": () => import("@/components/project-details/CemcdoApp"),
  vims: () => import("@/components/project-details/Vims"),
  "itinerary-planner": () => import("@/components/project-details/ItineraryPlanner"),
  "albany-airbnb-dashboard": () =>
    import("@/components/project-details/AlbanyAirbnbDashboard"),
  "mcdonalds-sentiment-analysis": () =>
    import("@/components/project-details/McdonaldsSentimentAnalysis"),
  "ai-powered-email-generator": () =>
    import("@/components/project-details/AiPoweredEmailGenerator"),
  "headless-ecommerce-mini-store": () =>
    import("@/components/project-details/HeadlessEcommerceMiniStore"),
  "order-inventory-management-api": () =>
    import("@/components/project-details/OrderInventoryManagementApi"),
  "budget-system": () => import("@/components/project-details/BudgetSystem"),
  "example-project": () => import("@/components/project-details/ExampleProject"),
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let Component: ComponentType | null = null;

  const loader = componentMap[slug];
  if (loader) {
    try {
      Component = (await loader()).default;
    } catch {
      Component = null;
    }
  }

  if (Component) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <Component />
      </main>
    );
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "project-details",
    `${slug}.html`
  );

  try {
    const html = await fs.readFile(filePath, "utf8");
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  } catch {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <p>Project details not found.</p>
      </main>
    );
  }
}

export async function generateStaticParams() {
  const htmlDir = path.join(process.cwd(), "public", "project-details");

  const htmlFiles = await fs.readdir(htmlDir).catch(() => []);

  const htmlSlugs = htmlFiles
    .filter((file) => file.endsWith(".html"))
    .map((file) => file.replace(/\.html$/, ""));

  const slugs = Array.from(
    new Set([...htmlSlugs, ...Object.keys(componentMap)])
  );

  return slugs.map((slug) => ({ slug }));
}
