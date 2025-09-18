import type { Metadata } from "next";
import type { JSX } from "react";

import HomePageContent from "@/components/home/home-page-content";

const PAGE_TITLE = "Home | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Discover Seanne Cañete's full-stack portfolio featuring web applications, data visualizations, and product highlights.";

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

export default function HomePage(): JSX.Element {
  return <HomePageContent />;
}
