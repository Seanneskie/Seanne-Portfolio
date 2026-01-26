import type { Metadata } from "next";
import type { JSX } from "react";

import CoursesSection from "@/components/courses";

const PAGE_TITLE = "Courses";
const PAGE_OG_TITLE = "Courses | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Courses and workshops completed by Seanne Cañete at Mindanao State University - General Santos City and beyond.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_OG_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_OG_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function CoursesPage(): JSX.Element {
  return <CoursesSection />;
}
