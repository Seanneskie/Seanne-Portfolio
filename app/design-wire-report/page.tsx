import type { Metadata } from "next";
import type { JSX } from "react";

import DesignWireReportTabs from "@/components/design-wire/design-wire-report-tabs";

const PAGE_TITLE = "Design Wire: Report Workspace | Seanne Cañete";
const PAGE_DESCRIPTION =
  "Interactive wireframe of a reporting workspace showcasing KPIs, performance analytics, exports, and automation activity.";

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

export default function DesignWireReportPage(): JSX.Element {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-300">
          Design wire exploration
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-teal-900 dark:text-teal-100">
          Report Workspace Tabs
        </h1>
        <p className="max-w-3xl text-base text-gray-700 dark:text-gray-300">
          This interactive wire models a modular reporting workspace with tabbed navigation.
          Each tab highlights how Seanne structures analytics dashboards—balancing key KPIs,
          trend insights, export orchestration, and automation telemetry for operations teams.
        </p>
      </header>

      <DesignWireReportTabs />
    </main>
  );
}
