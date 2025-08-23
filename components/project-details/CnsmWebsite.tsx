import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function CnsmWebsite() {
  const images = await getProjectImages("cnsm-website");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/Mern.png"]}
        alt="CNSM website screenshot"
        githubUrl="https://github.com/Seanneskie/advDB-CNSM-Website"
      >
        <p>
          <strong>Overview:</strong> MERN stack website for the College of
          Natural Sciences and Mathematics showcasing departments,
          announcements, and program information.
        </p>
        <p>
          <strong>Collaborators:</strong> Database Major Batch of 2021-2025
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
          <ProjectGallery images={images} alt="CNSM website screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}
