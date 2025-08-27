import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function ItineraryPlanner() {
  const images = await getProjectImages("itinerary-planner");
  const doubledImages = images.flatMap((img) => [img, img]);
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Itinerary Planner"
        images={doubledImages.length ? doubledImages : ["/static/placeholders/php.png"]}
        alt="Itinerary Planner screenshot"
        githubUrl="https://github.com/Seanneskie/itinerary-planner"
      >
        <p>
          <strong>Overview:</strong> Web app for organizing trips, mapping
          activities, and tracking budgets in one dashboard.
        </p>
        <p>
          <strong>Tech Stack:</strong> Laravel, PHP 8.2, Tailwind CSS, Alpine.js,
          Leaflet, Chart.js.
        </p>
      </ProjectOverview>

      <ProjectSection title="Project Overview">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Purpose:</strong> Consolidate travel planning tasks—
            activities, accommodations, expenses, and notes—into a single
            platform.
          </li>
          <li>
            <strong>Scope:</strong> Supports solo or group trips with itinerary
            creation, activity mapping, budget management, member coordination,
            and booking records.
          </li>
          <li>
            <strong>Audience:</strong> Travelers needing a central place for
            schedules and expense tracking.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>User Authentication:</strong> Registration, login, email
            verification, password reset, and profile management via Laravel
            Breeze.
          </li>
          <li>
            <strong>Itinerary Management:</strong> Create, edit, search, and
            filter itineraries, upload photos, and view trips chronologically.
          </li>
          <li>
            <strong>Activity Planning:</strong> Attach activities with time,
            notes, location, and optional coordinates; link or track budgets.
          </li>
          <li>
            <strong>Interactive Map:</strong> Leaflet map displaying activities
            and bookings with theme-aware markers.
          </li>
          <li>
            <strong>Budget Tracking:</strong> Compare budgeted vs. spent amounts
            with Chart.js visualizations and category filters.
          </li>
          <li>
            <strong>Group Members:</strong> Manage participants and permissions
            for each itinerary.
          </li>
          <li>
            <strong>Bookings:</strong> Log accommodations or reservations with
            location data and date ranges.
          </li>
          <li>
            <strong>Exporting & Reporting:</strong> Generate Excel and PDF
            exports of itineraries.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Tech Stack">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Backend:</strong> PHP 8.2+, Laravel 12, Maatwebsite Excel,
            Barryvdh DomPDF, Laravel Breeze, Pint, PHPUnit.
          </li>
          <li>
            <strong>Frontend:</strong> Vite, Tailwind CSS with forms plugin,
            Alpine.js, Axios, Leaflet, Chart.js.
          </li>
          <li>
            <strong>Tooling & Development:</strong> npm scripts, concurrently for
            dev services, composer scripts for setup and tests.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Project Structure">
        <pre className="whitespace-pre-wrap">
{`app/              // Controllers, models, policies, view components
bootstrap/        // Laravel bootstrap files
config/           // Framework and application configuration
database/         // Migrations, seeders, factories
public/           // Front-end entry point and assets
resources/        // Blade templates, styles, scripts
routes/           // Web, API, and console routes
storage/          // App, framework, log files
tests/            // PHPUnit suites (Feature & Unit)`}
        </pre>
      </ProjectSection>

      <ProjectSection title="Setup & Development">
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <strong>Install dependencies:</strong>
            <pre className="whitespace-pre-wrap">{`composer install
npm install`}</pre>
          </li>
          <li>
            <strong>Environment configuration:</strong>
            <pre className="whitespace-pre-wrap">{`cp .env.example .env
php artisan key:generate`}</pre>
          </li>
          <li>
            <strong>Database:</strong>
            <pre className="whitespace-pre-wrap">php artisan migrate</pre>
          </li>
          <li>
            <strong>Run development services:</strong>
            <pre className="whitespace-pre-wrap">{`npm run dev
php artisan serve`}</pre>
          </li>
        </ol>
      </ProjectSection>

      <ProjectSection title="Testing">
        <pre className="whitespace-pre-wrap">composer test</pre>
      </ProjectSection>

      <ProjectSection title="Contribution Guidelines">
        <ul className="list-disc space-y-2 pl-6">
          <li>Fork the repository and create a feature branch.</li>
          <li>Follow Laravel and PSR-12 coding standards (use Pint).</li>
          <li>Write tests for new features or fixes.</li>
          <li>Submit a pull request describing changes and rationale.</li>
        </ul>
      </ProjectSection>

      {doubledImages.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={doubledImages} alt="Itinerary Planner screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}
