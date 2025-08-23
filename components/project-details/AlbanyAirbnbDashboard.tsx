import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AlbanyAirbnbDashboard() {
  const images = await getProjectImages("albany-airbnb-dashboard");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/data-analytics.webp"]}
        alt="Albany Airbnb Dashboard screenshot"
      >
        <p>
          <strong>Overview:</strong> An interactive Streamlit dashboard that
          visualizes Airbnb listing trends in Albany, New York.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
        </p>
      </ProjectOverview>
      <ProjectSection title="Features">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            Dynamic charts displaying price, availability, and review metrics
            across neighborhoods.
          </li>
          <li>
            Filter controls for refining listings by room type and price range.
          </li>
          <li>
            Exportable summary reports for deeper analysis.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Screenshots">
        <ProjectGallery
          images={images}
          alt="Albany Airbnb Dashboard screenshot"
        />
      </ProjectSection>
    </div>
  );
}

