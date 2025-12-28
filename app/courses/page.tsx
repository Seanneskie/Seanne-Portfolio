import type { Metadata } from "next";
import type { JSX } from "react";

import CoursesSection from "@/components/courses";

const PAGE_TITLE = "Courses | Seanne Cañete";
const PAGE_DESCRIPTION =
  "A curated list of courses and workshops Seanne Cañete has completed in software engineering, analytics, and design.";

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

export default function CoursesPage(): JSX.Element {
  return <CoursesSection />;
}
