import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "vims";

export default async function Vims() {
  const images = await getGalleryImages(
    SLUG,
    "Vessel Inventory Management System screenshot",
    "/static/placeholders/next.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="Vessel-oriented inventory management system on the Next.js App Router — modules for items, departments, transfers, requests, and report generation for TSP Marine Industries."
      />

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
            <strong>ORM &amp; DB tooling:</strong> Drizzle ORM with migration
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
          per-vessel quantities, log adjustments or transfers, and export reports
          to common formats. The application integrates Supabase for
          authentication and data persistence while providing a modern,
          responsive UI.
        </p>
      </ProjectSection>
      <ProjectSection title="Structure">
        <pre className="whitespace-pre-wrap">
          <code>{`src/
 ├─ app/              # Next.js routes: admin dashboards, auth pages, user views
 ├─ components/       # Reusable UI parts (header, footer, form controls)
 ├─ context/          # React context for session/auth state
 ├─ db/               # Drizzle schema and Supabase migrations
 ├─ lib/              # Helper modules: inventory, transfers, exports, auth
 └─ utils/            # General utilities
`}</code>
        </pre>
      </ProjectSection>
      <ProjectSection title="Key Features">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Admin Inventory:</strong> Group items by vessel, filter low
            stock, and paginate results.
          </li>
          <li>
            <strong>Adjustments &amp; Transfers:</strong> Helpers and pages to
            move stock between vessels or record consumption.
          </li>
          <li>
            <strong>Reports &amp; Exports:</strong> Generate Excel/PDF summaries
            through dedicated helper functions.
          </li>
          <li>
            <strong>Authentication:</strong> Supabase sessions with
            client/server helpers and persistent cookies.
          </li>
        </ul>
      </ProjectSection>
    </div>
  );
}
