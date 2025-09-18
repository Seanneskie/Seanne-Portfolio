import type { Metadata } from "next";
import type { JSX } from "react";

import ProjectsPageContent from "@/components/projects/projects-page-content";

const PAGE_TITLE = "Projects | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Browse Seanne Cañete's software engineering projects spanning full-stack web apps, data analysis, and automation tools.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function ProjectsPage(): JSX.Element {
  return <ProjectsPageContent />;
}
