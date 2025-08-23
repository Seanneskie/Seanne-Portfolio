import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function McdonaldsSentimentAnalysis() {
  const images = await getProjectImages("mcdonalds-sentiment-analysis");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/django.png"]}
        alt="McDonald&apos;s Sentiment Analysis screenshot"
      >
        <p>
          <strong>Overview:</strong> Sentiment analysis of over 33,000
          McDonald&apos;s Google reviews using Python to understand customer
          satisfaction trends.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual project
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
          <ProjectGallery images={images} alt="McDonald's Sentiment Analysis screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

