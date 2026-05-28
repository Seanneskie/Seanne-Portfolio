import { type ReactElement } from "react";

import CertificatesSection from "./certificates-section";
import type { Certificate } from "./certificates-section";
import { enrichCertificate } from "./utils";

interface CertificatesProps {
  data: Certificate[];
}

interface StatProps {
  label: string;
  value: number | string;
}

function Stat({ label, value }: StatProps): ReactElement {
  return (
    <div className="flex flex-col items-start">
      <span className="text-2xl font-semibold text-teal-700 dark:text-teal-200 sm:text-3xl">
        {value}
      </span>
      <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}

export default function Certificates({ data }: CertificatesProps): ReactElement {
  const enriched = data.map((c) => enrichCertificate(c));
  const issuerCount = new Set(enriched.map((c) => c.issuer)).size;
  const yearCount = new Set(enriched.map((c) => c.year).filter((y) => y !== null)).size;
  const skillCount = new Set(enriched.flatMap((c) => c.skills)).size;

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
        <div className="absolute -top-24 right-6 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/30" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/30" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Credentials
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Certificates and training
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-700 dark:text-gray-200 sm:text-lg">
            Verified learning milestones across data, cloud, AI, and engineering. Filter by issuer,
            year, or topic — or switch to the timeline view to see them in chronological order.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-6 rounded-2xl border border-teal-200/70 bg-white/80 px-5 py-4 backdrop-blur sm:grid-cols-4 dark:border-teal-800/70 dark:bg-gray-950/60">
            <Stat label="Certificates" value={enriched.length} />
            <Stat label="Issuers" value={issuerCount} />
            <Stat label="Years" value={yearCount} />
            <Stat label="Skills" value={skillCount} />
          </div>
        </section>

        <CertificatesSection data={data} />
      </div>
    </main>
  );
}
