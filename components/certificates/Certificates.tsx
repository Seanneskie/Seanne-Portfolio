import { type ReactElement } from "react";

import CertificatesSection from "./certificates-section";

export default function Certificates(): ReactElement {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">
        Certificates
      </h1>
      <CertificatesSection />
    </section>
  );
}
