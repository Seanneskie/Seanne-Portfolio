import type { Metadata } from "next";
import type { JSX } from "react";

import WorkExperiences from "@/components/work-experiences";

const PAGE_TITLE = "Work Experience | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Explore Seanne Cañete's professional experience across software engineering, analytics, and product delivery roles.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function WorkExperiencesPage(): JSX.Element {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <WorkExperiences />
    </main>
  );
}
