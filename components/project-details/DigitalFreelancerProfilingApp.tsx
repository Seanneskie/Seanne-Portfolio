import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "digital-freelancer-profiling-app";

export default async function DigitalFreelancerProfilingApp() {
  const images = await getGalleryImages(
    SLUG,
    "Digital Freelancer Profiling App screenshot",
    "/static/placeholders/next.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        downloadUrl="/digital-freelancer-profiling-app/pdfs/DPFS_UserManual.pdf"
        summary="Capstone Django platform for freelancer profile management, event participation, and support requests — coordinated through Notion Scrumban boards."
      />

      <ProjectSection title="Introduction">
        <p>
          Capstone Freelancer Profiling App centralizes freelancer management
          with features for profile creation, event participation, announcements,
          and support ticket handling.
        </p>
        <p>
          Development tasks were tracked in Notion using Kanban boards tailored
          to a Scrumban workflow.
        </p>
      </ProjectSection>
      <ProjectSection title="Features">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Create detailed freelancer profiles including affiliations,
            experience, skills, and languages.
          </li>
          <li>Upload resumes, certificates, and project portfolios.</li>
          <li>
            Browse and RSVP to events with QR-code attendance tracking.
          </li>
          <li>
            Receive announcements and submit support tickets with
            notifications.
          </li>
          <li>Admin dashboard with analytics and content management.</li>
          <li>
            Organize work in Notion Kanban boards with Scrumban for iterative
            planning and review.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Installation">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Clone the repository:</strong>{" "}
            <code>
              git clone https://github.com/Seanneskie/capstone-app-profile.git
            </code>
          </li>
          <li>
            <strong>Create and activate a virtual environment:</strong>{" "}
            <code>py -m venv env</code> and activate via{" "}
            <code>env\Scripts\activate.bat</code> or{" "}
            <code>env\Scripts\activate.ps1</code>
          </li>
          <li>
            <strong>Install dependencies:</strong>{" "}
            <code>pip install -r requirements.txt</code>
          </li>
          <li>
            <strong>Configure environment variables:</strong> create a{" "}
            <code>.env</code> file with PostgreSQL settings.
          </li>
          <li>
            <strong>Run migrations and load initial data:</strong>{" "}
            <code>py manage.py migrate</code> and{" "}
            <code>py manage.py loaddata fixtures/updated_data.json</code>
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Usage">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Start the development server: <code>py manage.py runserver</code>
          </li>
          <li>
            Visit <code>http://127.0.0.1:8000</code> to browse the site and
            manage profiles.
          </li>
          <li>
            Explore events, announcements, and the support ticket system
            through the web interface.
          </li>
        </ul>
      </ProjectSection>
    </div>
  );
}
