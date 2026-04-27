import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "albany-airbnb-dashboard";

export default async function AlbanyAirbnbDashboard() {
  const images = await getGalleryImages(
    SLUG,
    "Albany Airbnb Dashboard screenshot",
    "/static/placeholders/data-analytics.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="Interactive Streamlit dashboard visualizing Airbnb listing trends, pricing patterns, and guest sentiment in Albany, New York."
      />

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
    </div>
  );
}
