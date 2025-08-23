import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function BitcoinAnalysisApp() {
  const images = await getProjectImages("bitcoin-analysis-app");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/data-analytics.webp"]}
        alt="Bitcoin Analysis App screenshot"
      >
        <p>
          <strong>Overview:</strong> The Bitcoin Analysis App explores Bitcoin&apos;s
          historical price movement and market activity through interactive
          visualizations.
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
          <ProjectGallery images={images} alt="Bitcoin Analysis App screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

