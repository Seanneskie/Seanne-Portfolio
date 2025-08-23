import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AICoinDetector() {
  const images = await getProjectImages("ai-coin-detector");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/ai.png"]}
        alt="AI Coin Detector Screenshot"
        githubUrl="https://github.com/Seanneskie/AI-coin-detector-django"
        downloadUrl="/ai-coin-detector/pdfs/Philippine%20Peso%20Coin%20Detector%20and%20Counter.pdf"
      >
        <p>
          <strong>Overview:</strong> This AI Coin Detector was developed using
          Django and Google Teachable Machine (GTM) as a requirement for the
          <em> Introduction to AI</em> course.
        </p>
        <p>
          <strong>Collaborators:</strong> Kimberly Baylon, Jeric Aminola,
          Bridget Jose, Azlan Tomindug
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
          <ProjectGallery images={images} alt="AI Coin Detector Screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

