import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getProjectImages } from "@/lib/project-images";

export default async function Vims() {
  const images = await getProjectImages("vims");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Vessel Inventory Management System screenshot"
      >
        <p>
          <strong>Overview:</strong> Web application for tracking vessels, their
          specifications, and operational status across a fleet.
        </p>
        <p>
          <strong>Tech Stack:</strong> Next.js, React, TypeScript, Tailwind CSS.
        </p>
      </ProjectOverview>

      <ProjectSection title="Vessel Inventory Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>Maintain detailed records of vessels with capacity and class.</li>
          <li>Search and filter vessels by name, type, or availability.</li>
          <li>Track active, inactive, and maintenance statuses in real time.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Deployment Details">
        <p>
          Deployed on Vercel for fast global delivery, leveraging automatic
          builds and environment variables for seamless updates.
        </p>
      </ProjectSection>
    </div>
  );
}

