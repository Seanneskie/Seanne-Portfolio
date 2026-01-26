import type { Metadata } from "next";
import type { JSX } from "react";

import HomePageContent from "@/components/home/home-page-content";

const PAGE_TITLE = "Full-Stack Engineer";
const PAGE_OG_TITLE = "Seanne Cañete | Full-Stack Engineer";
const PAGE_DESCRIPTION =
  "Full-stack engineer and IT graduate from Mindanao State University - General Santos City. Building web apps, data dashboards, and product-focused experiences.";
const PAGE_KEYWORDS = [
  "Seanne Cañete",
  "Seanne Canete",
  "full stack engineer",
  "full stack developer",
  "software engineer",
  "web developer",
  "frontend developer",
  "backend developer",
  "Next.js developer",
  "React developer",
  "TypeScript developer",
  "portfolio",
  "Mindanao State University",
  "Mindanao State University - General Santos",
  "MSU General Santos",
  "General Santos City",
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: PAGE_KEYWORDS,
  openGraph: {
    title: PAGE_OG_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_OG_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function HomePage(): JSX.Element {
  return <HomePageContent />;
}
