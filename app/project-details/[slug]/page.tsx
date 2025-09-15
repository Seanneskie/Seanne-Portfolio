import type { ComponentType } from "react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const componentMap: Record<string, () => Promise<{ default: ComponentType }>> = {
  "ai-coin-detector": () => import("@/components/project-details/AICoinDetector"),
  "nosql-project": () => import("@/components/project-details/NosqlProject"),
  "cnsm-website": () => import("@/components/project-details/CnsmWebsite"),
  "bitcoin-analysis-app": () => import("@/components/project-details/BitcoinAnalysisApp"),
  "desktop-payroll-management-system": () =>
    import("@/components/project-details/DesktopPayrollManagementSystem"),
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
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const loader = componentMap[slug];
  if (!loader) {
    notFound();
  }

  try {
    const Component: ComponentType = (await loader()).default;
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <Component />
      </main>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  return Object.keys(componentMap).map((slug) => ({ slug }));
}
