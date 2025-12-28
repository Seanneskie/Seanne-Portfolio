import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function Vims() {
  const alt = "Vessel Inventory Management System screenshot";
  const images = (await getProjectImages("vims")).map((src) => ({
    src,
    alt,
  }));
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Vessel Inventory Management System"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/next.webp", alt }]
        }
      >
        <p>
          <strong>Overview:</strong> VIMS is a vessel‑oriented inventory
          management system built on the Next.js App Router. It provides admin
          modules for items, departments, inventory adjustments, transfers,
          requests and report generation, with a responsive interface styled by
          Tailwind CSS and Radix UI components.
        </p>
      </ProjectOverview>

      <ProjectSection title="Tech Stack">
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Framework:</strong> Next.js 15 with React 18 and TypeScript,
            bundled via Turbopack for development
          </li>
          <li>
            <strong>Styling:</strong> Tailwind CSS with custom color tokens and
            tailwindcss-animate plugin
          </li>
          <li>
            <strong>UI Components:</strong> Radix UI and ShadCN UI primitives
          </li>
          <li>
            <strong>State/Data:</strong> Supabase client and server helpers for
            authentication and database access
          </li>
          <li>
            <strong>ORM & DB tooling:</strong> Drizzle ORM with migration
            configs for PostgreSQL
          </li>
          <li>
            <strong>Utilities:</strong> Chart.js for dashboards, ExcelJS and
            xlsx for export, and various helper libraries for file handling and
            alerts
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Introduction">
        <p>
          VIMS (Vessel Inventory Management System) centralizes tracking of
          marine vessel stock. Administrators can manage item catalogs, monitor
          per‑vessel quantities, log adjustments or transfers, and export reports
          to common formats. The application integrates Supabase for
          authentication and data persistence while providing a modern,
          responsive UI.
        </p>
      </ProjectSection>
      <ProjectSection title="Structure">
        <pre className="whitespace-pre-wrap"><code>{`src/\n ├─ app/              # Next.js routes: admin dashboards, auth pages, user views\n ├─ components/       # Reusable UI parts (header, footer, form controls)\n ├─ context/          # React context for session/auth state\n ├─ db/               # Drizzle schema and Supabase migrations\n ├─ lib/              # Helper modules: inventory, transfers, exports, auth\n └─ utils/            # General utilities\n`}</code></pre>
      </ProjectSection>
      <ProjectSection title="Key Features">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Admin Inventory:</strong> Group items by vessel, filter low
            stock, and paginate results.
          </li>
          <li>
            <strong>Adjustments & Transfers:</strong> Helpers and pages to move
            stock between vessels or record consumption.
          </li>
          <li>
            <strong>Reports & Exports:</strong> Generate Excel/PDF summaries
            through dedicated helper functions.
          </li>
          <li>
            <strong>Authentication:</strong> Supabase sessions with
            client/server helpers and persistent cookies.
          </li>
        </ul>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

