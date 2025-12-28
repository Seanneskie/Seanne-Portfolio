import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function CemcdoApp() {
  const alt = "CEMCDO App screenshot";
  const images = (await getProjectImages("cemcdo-app")).map((src) => ({
    src,
    alt,
  }));
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="CEMCDO App"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/django.webp", alt }]
        }
        githubUrl="https://cemcdo-demo.onrender.com/"
        linkLabel="View Site"
      >
        <p>
          <strong>Overview:</strong> A Django-powered information system for the
          City Economic Management and Cooperative Development Office of General
          Santos City. It consolidates cooperative records and fund utilization
          into a unified portal with role-based dashboards.
        </p>
        <p>
          <strong>Collaborators:</strong> Azlan Tomindug, Bridget Nicolette
          Jose, Francheska Mei Besana, Kimberly Claire Baylon, Seanne B.
          Cañete
        </p>
      </ProjectOverview>

      <ProjectSection title="System Overview">
        <p>
          Common entry point: https://cemcdo-demo.onrender.com. After login,
          users land on role-specific dashboards.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Cooperative Profiling:</strong> register cooperatives,
            manage profiles, and generate reports.
          </li>
          <li>
            <strong>Fund Utilization:</strong> administrative module for
            division budgets, transactions, and augmentation workflows.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Goals & Objectives">
        <ul className="list-disc list-inside space-y-1">
          <li>
            Single source of truth for cooperative records and financial
            utilization.
          </li>
          <li>
            Faster reporting via built-in exports and analytic charts.
          </li>
          <li>
            Controlled access through authenticated roles and per-division
            views.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="User Roles">
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Admin Division:</strong> manages fund dashboards, master
            data, divisions, accounts, reports, and augmentation approvals.
          </li>
          <li>
            <strong>Division Officers/Staff:</strong> handle division accounts,
            obligation and augmentation requests, and transactions.
          </li>
          <li>
            <strong>Cooperative Accounts:</strong> manage their cooperative
            details through issued credentials.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Cooperative Profiling Module">
        <ul className="list-disc list-inside space-y-1">
          <li>
            Register cooperatives via multi-step forms with optional fields like
            organization date, apex, cluster, and remarks.
          </li>
          <li>
            Create cooperative accounts with enforced password policy.
          </li>
          <li>
            View, edit, or delete cooperative profiles and export filtered
            lists to Excel.
          </li>
          <li>
            Generate summary reports with chart insights and Excel/PDF exports.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Fund Utilization Module">
        <ul className="list-disc list-inside space-y-1">
          <li>
            Admin dashboard cards for total accounts, budgets, expenses, and
            pending augments with quarterly expense charts.
          </li>
          <li>
            Department analytics showing budget vs. expenses and exportable
            funds summaries.
          </li>
          <li>
            Division and account management with quarterly budget allocations.
          </li>
          <li>
            Obligation requests, payee registry, purchase requests, and
            augmentation workflows that validate source and target totals.
          </li>
          <li>
            Comprehensive transaction views and financial reports (yearly,
            quarterly, or custom range).
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Security & Access">
        <ul className="list-disc list-inside space-y-1">
          <li>
            Authentication gates all modules with role-based dashboards.
          </li>
          <li>
            Cooperative account creation enforces passwords ≥8 characters with
            uppercase, number, and symbol requirements.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Information Architecture">
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Backend:</strong> Django apps for cooperatives and funds
            providing REST-like views and export endpoints.
          </li>
          <li>
            <strong>Frontend:</strong> HTML, CSS, Tailwind CSS, and JavaScript
            with Chart.js visualizations.
          </li>
          <li>
            <strong>Database & Auth:</strong> Supabase PostgreSQL with managed
            authentication.
          </li>
          <li>
            <strong>Hosting:</strong> Render for web service and static/media
            assets.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Deployment & Environments">
        <p>
          Production deployment uses Render with environment variables for the
          Supabase database and Django configuration. Build steps include
          Tailwind compilation, collectstatic, migrations, and seeding master
          data.
        </p>
      </ProjectSection>

      <ProjectSection title="Usage Highlights">
        <ul className="list-disc list-inside space-y-1">
          <li>Log in at the site URL to reach the appropriate dashboard.</li>
          <li>
            Cooperative Profiling: register cooperatives, issue accounts, and
            export profiles.
          </li>
          <li>
            Fund Utilization: manage divisions and accounts, submit obligation or
            augmentation requests, and export reports.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Roadmap">
        <ul className="list-disc list-inside space-y-1">
          <li>Fine-grained permissions and audit logging.</li>
          <li>Additional export formats and scheduled reports.</li>
          <li>Enhanced cooperative self-service portal.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Acknowledgments">
        <p>
          Developed for the Cooperatives and Administrative divisions of CEMCDO,
          based on official user manuals for each module.
        </p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

