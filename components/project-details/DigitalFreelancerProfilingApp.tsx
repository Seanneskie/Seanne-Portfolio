import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function DigitalFreelancerProfilingApp() {
  const images = await getProjectImages("digital-freelancer-profiling-app");
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Digital Freelancer Profiling App"
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Digital Freelancer Profiling App screenshot"
        downloadUrl="/digital-freelancer-profiling-app/pdfs/DPFS_UserManual.pdf"
      >
        <p>
          <strong>Overview:</strong> Capstone Freelancer Profiling App is a
          Django-based platform for managing freelancer profiles, events, and
          support requests.
        </p>
        <p>
          <strong>Tech Stack:</strong> Django 4.2.7, django-allauth,
          crispy-bootstrap5, django-jazzmin, PostgreSQL, Graphene, psycopg2.
        </p>
        <p>
          <strong>Collaborators:</strong> Azlan Tomindug, Kimberly Claire
          Baylon, Seanne Cañete, Bridget Nicolette Jose, and Dr. Lumer Jude P.
          Doce (Adviser).
        </p>
      </ProjectOverview>

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
          <li>
            Admin dashboard with analytics and content management.
          </li>
          <li>
            Organize work in Notion Kanban boards with Scrumban for iterative
            planning and review.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Installation">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Clone the repository:</strong> <code>git clone
            https://github.com/Seanneskie/capstone-app-profile.git</code>
          </li>
          <li>
            <strong>Create and activate a virtual environment:</strong>
            <code>py -m venv env</code> and activate via
            <code>env\Scripts\activate.bat</code> or
            <code>env\Scripts\activate.ps1</code>
          </li>
          <li>
            <strong>Install dependencies:</strong>
            <code>pip install -r requirements.txt</code>
          </li>
          <li>
            <strong>Configure environment variables:</strong> create a
            <code>.env</code> file with PostgreSQL settings.
          </li>
          <li>
            <strong>Run migrations and load initial data:</strong>
            <code>py manage.py migrate</code> and
            <code>py manage.py loaddata fixtures/updated_data.json</code>
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Usage">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Start the development server:
            <code>py manage.py runserver</code>
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

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="Digital Freelancer Profiling App screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

