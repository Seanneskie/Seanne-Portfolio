import type { Metadata } from "next";
import type { JSX } from "react";

import ContactPageContent from "@/components/contact/contact-page-content";

const PAGE_TITLE = "Contact | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Reach out to Seanne Cañete for collaboration, freelance opportunities, or questions about recent engineering projects.";

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

export default function ContactPage(): JSX.Element {
  return <ContactPageContent />;
}
