import React from "react";
import type { Metadata } from "next";

import Awards from "@/components/awards";

void React;

const PAGE_TITLE = "Awards | Seanne Cañete";
const PAGE_DESCRIPTION =
  "See the awards and recognitions Seanne Cañete has earned for innovation, leadership, and engineering excellence.";

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

export default function AwardsPage(): JSX.Element {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <Awards />
    </main>
  );
}
