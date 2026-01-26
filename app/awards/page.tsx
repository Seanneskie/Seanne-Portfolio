import React, { type ReactElement } from "react";
import type { Metadata } from "next";

import Awards from "@/components/awards";

const PAGE_TITLE = "Awards";
const PAGE_OG_TITLE = "Awards | Seanne Cañete";
const PAGE_DESCRIPTION =
  "See the awards and recognitions earned by Seanne Cañete, a full-stack engineer and IT graduate from Mindanao State University - General Santos City.";

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

export default function AwardsPage(): ReactElement {
  return <Awards />;
}
