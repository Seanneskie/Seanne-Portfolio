import { type ReactElement } from "react";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
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
      <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
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
    <main className="py-16 sm:py-20">
      <Section className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Credentials"
            title="Certificates and training"
            description="Verified learning milestones across data, cloud, AI, and engineering. Filter by issuer, year, or topic — or switch to the timeline view to see them in chronological order."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 gap-6 rounded-card border border-gray-200 bg-slate-50 px-5 py-4 dark:border-gray-800 dark:bg-gray-900/40 sm:grid-cols-4">
            <Stat label="Certificates" value={enriched.length} />
            <Stat label="Issuers" value={issuerCount} />
            <Stat label="Years" value={yearCount} />
            <Stat label="Skills" value={skillCount} />
          </div>
        </Reveal>

        <CertificatesSection data={data} />
      </Section>
    </main>
  );
}
