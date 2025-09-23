import type { ComponentType } from "react";
import type { JSX } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageParams = { slug: string };

interface PageProps {
  params: Promise<PageParams>;
}

/**
 * Normalizes the dynamic route parameters emitted by Next.js type generation.
 *
 * Although the generated types annotate `params` as a `Promise`, the runtime
 * value may already be resolved. Awaiting the helper keeps the implementation
 * compatible with either shape without sacrificing type safety.
 */
const resolveParams = async (params: PageProps["params"]): Promise<PageParams> => {
  return params;
};

interface ProjectDetailConfig {
  loader: () => Promise<{ default: ComponentType }>;
  title: string;
  description: string;
}

const projectDetailConfig: Record<string, ProjectDetailConfig> = {
  "llm-restaurant-finder": {
    loader: () => import("@/components/project-details/LlmRestaurantFinder"),
    title: "LLM Restaurant Finder",
    description:
      "LLM-driven dining assistant parsing user intents into validated schemas before querying Foursquare Places so metadata stays precise.",
  },
  "ai-coin-detector": {
    loader: () => import("@/components/project-details/AICoinDetector"),
    title: "AI Coin Detector",
    description: "Made with Django and Google Teachable Machine for an Introduction to AI course requirement.",
  },
  "nosql-project": {
    loader: () => import("@/components/project-details/NosqlProject"),
    title: "NoSQL Project - MERN Stack Website",
    description: "A final NoSQL course project built with the MERN stack to demonstrate schema-less database design.",
  },
  "cnsm-website": {
    loader: () => import("@/components/project-details/CnsmWebsite"),
    title: "Advance Database Project - CNSM Website",
    description: "Capstone MongoDB and React experience delivering a CMS-style site for the College of Natural Sciences and Mathematics.",
  },
  "bitcoin-analysis-app": {
    loader: () => import("@/components/project-details/BitcoinAnalysisApp"),
    title: "Bitcoin Analysis App",
    description: "Bitcoin price prediction and descriptive analytics built with Django, Python, and rich data visualizations.",
  },
  "desktop-payroll-management-system": {
    loader: () => import("@/components/project-details/DesktopPayrollManagementSystem"),
    title: "Desktop Payroll Management System",
    description: "FastAPI backend paired with an Electron shell for managing payroll workflows on the desktop.",
  },
  "digital-freelancer-profiling-app": {
    loader: () => import("@/components/project-details/DigitalFreelancerProfilingApp"),
    title: "Digital Freelancer Profiling App",
    description: "Django-powered profiling system with Scrumban task boards supporting a capstone on digital freelancers.",
  },
  "cemcdo-app": {
    loader: () => import("@/components/project-details/CemcdoApp"),
    title: "CEMCDO App",
    description: "Municipal fund utilization and cooperative profiling platform created for CEMCDO using Django.",
  },
  vims: {
    loader: () => import("@/components/project-details/Vims"),
    title: "VIMS - Vessel Inventory Management System",
    description: "Next.js inventory system for tracking TSP Marine Industries vessel assets in offshore operations.",
  },
  "itinerary-planner": {
    loader: () => import("@/components/project-details/ItineraryPlanner"),
    title: "Laravel Itinerary Planner",
    description: "Full-stack travel planner featuring budgeting tools, map integration, and exportable itineraries.",
  },
  "albany-airbnb-dashboard": {
    loader: () => import("@/components/project-details/AlbanyAirbnbDashboard"),
    title: "Albany Airbnb Dashboard",
    description: "Interactive analytics dashboard surfacing Airbnb pricing trends and guest sentiment for Albany listings.",
  },
  "mcdonalds-sentiment-analysis": {
    loader: () => import("@/components/project-details/McdonaldsSentimentAnalysis"),
    title: "McDonald's Sentiment Analysis",
    description: "Python sentiment analysis over 33,000 Google reviews to highlight McDonald's customer experience themes.",
  },
  "ai-powered-email-generator": {
    loader: () => import("@/components/project-details/AiPoweredEmailGenerator"),
    title: "AI-Powered Email Generator",
    description: "Django and LangChain assistant that crafts professional emails with adjustable tone, CRM data, and Gmail delivery.",
  },
  "headless-ecommerce-mini-store": {
    loader: () => import("@/components/project-details/HeadlessEcommerceMiniStore"),
    title: "Headless E-Commerce Mini-Store",
    description: "Next.js storefront consuming Shopify's Storefront API with reusable UI components and server-side rendering.",
  },
  "order-inventory-management-api": {
    loader: () => import("@/components/project-details/OrderInventoryManagementApi"),
    title: "Order & Inventory Management API",
    description: "Lightweight ASP.NET Core API with PostgreSQL handling stock validation, orders, and auditing.",
  },
  "budget-system": {
    loader: () => import("@/components/project-details/BudgetSystem"),
    title: "Budget System",
    description: "Layered ASP.NET Core and SQL Server budgeting platform with validation and idempotent API middleware.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const config = projectDetailConfig[slug];

  if (!config) {
    const fallbackTitle = "Project Not Found | Seanne Cañete";
    const fallbackDescription = "The requested project page could not be located.";
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
      },
    };
  }

  const pageTitle = `${config.title} | Project Details | Seanne Cañete`;

  return {
    title: pageTitle,
    description: config.description,
    openGraph: {
      title: pageTitle,
      description: config.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: config.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await resolveParams(params);
  const config = projectDetailConfig[slug];

  if (!config) {
    notFound();
  }

  try {
    const Component: ComponentType = (await config.loader()).default;
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <Component />
      </main>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return Object.keys(projectDetailConfig).map((slug) => ({ slug }));
}
