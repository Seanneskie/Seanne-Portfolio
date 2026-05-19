/**
 * Shared registry of project-detail slugs and their lazy-loaded components.
 *
 * Both stacks consume this during the migration: Next.js's
 * app/project-details/[slug]/page.tsx and Astro's
 * src/pages/project-details/[slug].astro both walk these keys for static
 * generation and look up the component loader + section list per slug.
 *
 * Why not a content collection? The `loader` field is a function returning
 * a dynamic import — that's a runtime concern, not data, so it stays here
 * alongside the title/description/sections metadata.
 */
import type { ComponentType } from "react";

export interface ProjectDetailConfig {
  loader: () => Promise<{ default: ComponentType }>;
  title: string;
  description: string;
  /** Section titles in document order; drives the sticky TOC. */
  sections?: string[];
}

export const projectDetailConfig: Record<string, ProjectDetailConfig> = {
  "llm-restaurant-finder": {
    loader: () => import("@/components/project-details/LlmRestaurantFinder"),
    title: "LLM Restaurant Finder",
    description:
      "LLM-driven dining assistant parsing user intents into validated schemas before querying Foursquare Places so metadata stays precise.",
    sections: [
      "Natural-Language Intake",
      "Gemini Schema Validation",
      "Parameter Mapping to Foursquare",
      "Search and Optional Enrichment",
      "Normalization",
      "Access-Code Gate",
      "Deployment",
      "Known Limitations",
    ],
  },
  "ai-coin-detector": {
    loader: () => import("@/components/project-details/AICoinDetector"),
    title: "AI Coin Detector",
    description:
      "Made with Django and Google Teachable Machine for an Introduction to AI course requirement.",
    sections: [
      "Project Overview",
      "Introduction",
      "Rationale",
      "Data Collection & Preparation",
      "Dataset Collection",
      "Training & Testing",
      "Model Development",
      "Architecture & Setup",
      "Model Classes (Front/Back)",
      "Training Setup (Hyperparameters)",
      "Training Process & Challenges",
      "Evaluation",
      "Real-World Deployment",
      "Potential Use Cases / Applications",
      "Ethical & Societal Implications",
    ],
  },
  "nosql-project": {
    loader: () => import("@/components/project-details/NosqlProject"),
    title: "NoSQL Project - MERN Stack Website",
    description:
      "A final NoSQL course project built with the MERN stack to demonstrate schema-less database design.",
    sections: ["Tech Stack", "Authentication Features", "Core Features", "Folder Structure"],
  },
  "cnsm-website": {
    loader: () => import("@/components/project-details/CnsmWebsite"),
    title: "Advance Database Project - CNSM Website",
    description:
      "Capstone MongoDB and React experience delivering a CMS-style site for the College of Natural Sciences and Mathematics.",
    sections: [
      "Introduction",
      "Rationale",
      "Data Collection",
      "Model Development",
      "Training and Evaluation",
      "Deployment",
      "Ethical Implications",
    ],
  },
  "bitcoin-analysis-app": {
    loader: () => import("@/components/project-details/BitcoinAnalysisApp"),
    title: "Bitcoin Analysis App",
    description:
      "Bitcoin price prediction and descriptive analytics built with Django, Python, and rich data visualizations.",
    sections: [
      "Introduction",
      "Objectives",
      "Dataset",
      "Data Pre-Processing",
      "Analysis & Modeling",
      "System Development",
      "Visualization",
      "Results & Conclusion",
      "Lessons Learned",
      "Future Improvements",
    ],
  },
  "desktop-payroll-management-system": {
    loader: () => import("@/components/project-details/DesktopPayrollManagementSystem"),
    title: "Desktop Payroll Management System",
    description:
      "FastAPI backend paired with an Electron shell for managing payroll workflows on the desktop.",
    sections: ["Introduction", "Backend Overview", "Frontend Overview", "Dependencies"],
  },
  "digital-freelancer-profiling-app": {
    loader: () => import("@/components/project-details/DigitalFreelancerProfilingApp"),
    title: "Digital Freelancer Profiling App",
    description:
      "Django-powered profiling system with Scrumban task boards supporting a capstone on digital freelancers.",
    sections: ["Introduction", "Features", "Installation", "Usage"],
  },
  "cemcdo-app": {
    loader: () => import("@/components/project-details/CemcdoApp"),
    title: "CEMCDO App",
    description:
      "Municipal fund utilization and cooperative profiling platform created for CEMCDO using Django.",
    sections: [
      "System Overview",
      "Goals & Objectives",
      "User Roles",
      "Cooperative Profiling Module",
      "Fund Utilization Module",
      "Security & Access",
      "Information Architecture",
      "Deployment & Environments",
      "Usage Highlights",
      "Roadmap",
      "Acknowledgments",
    ],
  },
  vims: {
    loader: () => import("@/components/project-details/Vims"),
    title: "VIMS - Vessel Inventory Management System",
    description:
      "Next.js inventory system for tracking TSP Marine Industries vessel assets in offshore operations.",
    sections: ["Tech Stack", "Introduction", "Structure", "Key Features"],
  },
  "itinerary-planner": {
    loader: () => import("@/components/project-details/ItineraryPlanner"),
    title: "Laravel Itinerary Planner",
    description:
      "Full-stack travel planner featuring budgeting tools, map integration, and exportable itineraries.",
    sections: [
      "Project Overview",
      "Core Features",
      "Tech Stack",
      "Project Structure",
      "Setup & Development",
      "Testing",
      "Contribution Guidelines",
    ],
  },
  "albany-airbnb-dashboard": {
    loader: () => import("@/components/project-details/AlbanyAirbnbDashboard"),
    title: "Albany Airbnb Dashboard",
    description:
      "Interactive analytics dashboard surfacing Airbnb pricing trends and guest sentiment for Albany listings.",
    sections: [
      "Introduction",
      "Rationale",
      "Data Collection",
      "Model Development",
      "Training and Evaluation",
      "Deployment",
      "Ethical Implications",
    ],
  },
  "mcdonalds-sentiment-analysis": {
    loader: () => import("@/components/project-details/McdonaldsSentimentAnalysis"),
    title: "McDonald's Sentiment Analysis",
    description:
      "Python sentiment analysis over 33,000 Google reviews to highlight McDonald's customer experience themes.",
    sections: [
      "Introduction",
      "Problem & Objectives",
      "Scope & Constraints",
      "Architecture",
      "Data & Datasets",
      "Features",
      "Analytics & ML",
      "Results & Impact",
      "Challenges & Learnings",
      "Next Steps",
      "Links",
    ],
  },
  "ai-powered-email-generator": {
    loader: () => import("@/components/project-details/AiPoweredEmailGenerator"),
    title: "AI-Powered Email Generator",
    description:
      "Django and LangChain assistant that crafts professional emails with adjustable tone, CRM data, and Gmail delivery.",
    sections: [
      "Email Composition",
      "Template History",
      "Gmail Integration",
      "Audio Transcription",
      "CRM Dashboard",
      "Tech Highlights",
    ],
  },
  "headless-ecommerce-mini-store": {
    loader: () => import("@/components/project-details/HeadlessEcommerceMiniStore"),
    title: "Headless E-Commerce Mini-Store",
    description:
      "Next.js storefront consuming Shopify's Storefront API with reusable UI components and server-side rendering.",
    sections: ["Introduction", "Local Development", "Architecture", "Deployment", "Testing"],
  },
  "order-inventory-management-api": {
    loader: () => import("@/components/project-details/OrderInventoryManagementApi"),
    title: "Order & Inventory Management API",
    description:
      "Lightweight ASP.NET Core API with PostgreSQL handling stock validation, orders, and auditing.",
    sections: ["Introduction", "Consistency and Concurrency", "Development and Deployment"],
  },
  "budget-system": {
    loader: () => import("@/components/project-details/BudgetSystem"),
    title: "Budget System",
    description:
      "Layered ASP.NET Core and SQL Server budgeting platform with validation and idempotent API middleware.",
    sections: ["Introduction", "Rationale", "Architecture", "Running the Project", "Build and Test"],
  },
  "minerva-project": {
    loader: () => import("@/components/project-details/MinervaProject"),
    title: "Minerva - Service Status Dashboard",
    description:
      "Real-time incident monitoring dashboard aggregating service status from Cloudflare, Supabase, Fly.io, GitHub, Vercel, and Upstash into a unified view.",
    sections: [
      "RSS Feed Aggregation",
      "Unified Status View",
      "UI and Design",
      "Deployment",
      "Known Limitations",
    ],
  },
};

export const projectDetailSlugs: string[] = Object.keys(projectDetailConfig);
