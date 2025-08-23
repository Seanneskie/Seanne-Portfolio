import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function CemcdoApp() {
  const images = await getProjectImages("cemcdo-app");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/django.png"]}
        alt="CEMCDO App screenshot"
        githubUrl="https://cemcdo-demo.onrender.com/"
        linkLabel="View Site"
      >
        <p>
          <strong>Overview:</strong> A Django-based system for the City Economic
          Management and Cooperative Development Office of General Santos City.
          It currently includes modules for tracking fund utilization and
          profiling local cooperatives.
        </p>
        <p>
          <strong>Collaborators:</strong> Kimberly Baylon, Bridget Jose, Azlan
          Tomindug, Francheska Mei Besana
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
          <ProjectGallery images={images} alt="CEMCDO App screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}
