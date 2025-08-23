import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getProjectImages } from "@/lib/project-images";

export default async function DigitalFreelancerProfilingApp() {
  const images = await getProjectImages("digital-freelancer-profiling-app");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/next.png"]}
        alt="Digital Freelancer Profiling App screenshot"
        downloadUrl="/digital-freelancer-profiling-app/pdfs/DPFS_UserManual.pdf"
      >
        <p>
          <strong>Overview:</strong> Web platform for profiling digital freelancers,
          capturing detailed qualifications while providing administrators tools to
          vet and manage entries.
        </p>
        <p>
          <strong>Tech Stack:</strong> PHP, MySQL, Tailwind CSS, and Vanilla
          JavaScript.
        </p>
      </ProjectOverview>

      <ProjectSection title="Profile Fields">
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal information including photo, contact, and location.</li>
          <li>Skill tags, work experience, and service rates.</li>
          <li>Uploadable portfolio items and certifications.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Authentication">
        <p>
          Users register with email verification and sign in with encrypted
          credentials. Role-based access separates freelancers from
          administrators, and session management keeps accounts secure.
        </p>
      </ProjectSection>

      <ProjectSection title="Admin Workflows">
        <ul className="list-disc pl-6 space-y-2">
          <li>Dashboard listing new profiles awaiting review.</li>
          <li>Approve, reject, or flag entries with instant feedback.</li>
          <li>Edit user details and reset credentials when necessary.</li>
        </ul>
      </ProjectSection>
    </div>
  );
}

