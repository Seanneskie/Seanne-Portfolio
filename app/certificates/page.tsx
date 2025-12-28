import type { Metadata } from "next";
import type { JSX } from "react";

import Certificates from "@/components/certificates";

const PAGE_TITLE = "Certificates | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Review Seanne Cañete's professional certifications and training across data science, cloud, and software development.";

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

export default function CertificatesPage(): JSX.Element {
  return <Certificates />;
}
