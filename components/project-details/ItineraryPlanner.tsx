import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function ItineraryPlanner() {
  const images = await getProjectImages("itinerary-planner");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/data-analytics.webp"]}
        alt="Itinerary Planner screenshot"
      >
        <p>
          <strong>Overview:</strong> A travel planning tool that combines
          interactive maps with budgeting controls to organize every leg of a
          trip.
        </p>
        <p>
          <strong>Tech Stack:</strong> Next.js, Leaflet, and Tailwind CSS.
        </p>
      </ProjectOverview>

      <ProjectSection title="Key Features">
        <ul className="list-disc space-y-1 pl-4">
          <li>Map integration to visualize destinations and routes.</li>
          <li>Budgeting to estimate costs and track expenses per stop.</li>
          <li>Export itineraries to shareable formats for offline access.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Screenshots">
        <ProjectGallery images={images} alt="Itinerary Planner screenshot" />
      </ProjectSection>
    </div>
  );
}
