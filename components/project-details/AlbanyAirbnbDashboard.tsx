import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AlbanyAirbnbDashboard() {
  const alt = "Albany Airbnb Dashboard screenshot";
  const images = (await getProjectImages("albany-airbnb-dashboard")).map(
    (src) => ({ src, alt })
  );
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Albany Airbnb Dashboard"
        images={
          images.length
            ? images
            : [{
                src: "/static/placeholders/data-analytics.webp",
                alt,
              }]
        }
      >
        <p>
          <strong>Overview:</strong> An interactive Streamlit dashboard that
          visualizes Airbnb listing trends in Albany, New York.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
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
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

