import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AiPoweredEmailGenerator() {
  const images = await getProjectImages("ai-powered-email-generator");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/ai.png"]}
        alt="AI Powered Email Generator screenshot"
        githubUrl="https://github.com/Seanneskie/ai-powered-email-generator"
      >
        <p>
          <strong>Overview:</strong> Prototype email assistant that combines
          LangChain prompt templates with the OpenRouter API to craft
          context-aware messages.
        </p>
        <p>
          <strong>Tech Stack:</strong> Next.js, TypeScript, LangChain,
          OpenRouter, Tailwind CSS.
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
          <ProjectGallery images={images} alt="AI Powered Email Generator screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

