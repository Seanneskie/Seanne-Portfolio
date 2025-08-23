import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
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

      <ProjectSection title="Introduction">
        <p>Project introduction coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>Rationale coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Data Collection">
        <p>Data collection details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Model Development">
        <p>Model development details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Training and Evaluation">
        <p>Training and evaluation details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>Deployment details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Ethical Implications">
        <p>Ethical considerations coming soon.</p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="Digital Freelancer Profiling App screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

