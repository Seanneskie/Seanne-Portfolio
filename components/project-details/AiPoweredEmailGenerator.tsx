import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AiPoweredEmailGenerator() {
  const images = await getProjectImages("ai-powered-email-generator");
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="AI-Powered Email Generator"
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
        <p>
          Web app that drafts email responses from a short prompt and optional
          context, built to explore LLM-assisted writing workflows.
        </p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>
          Automating routine email composition saves time and encourages a
          consistent tone when handling frequent inquiries.
        </p>
      </ProjectSection>
      <ProjectSection title="Data Collection">
        <p>
          The system only processes user-supplied prompts and optional thread
          history. No external dataset is stored or used for training.
        </p>
      </ProjectSection>
      <ProjectSection title="Model Development">
        <p>
          LangChain prompt templates structure requests sent to OpenRouter,
          allowing different large language models to generate polished drafts.
        </p>
      </ProjectSection>
      <ProjectSection title="Training and Evaluation">
        <p>
          The generator relies on pre-trained models. Quality is assessed
          manually by iterating on prompts and reviewing sample outputs.
        </p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>
          Implemented in Next.js and deployed to Vercel. Serverless functions
          handle API keys and return generated text in real time.
        </p>
      </ProjectSection>
      <ProjectSection title="Ethical Implications">
        <p>
          Users are encouraged to review generated content to avoid
          misinformation or unintended tone. The app avoids storing personal
          data to respect privacy.
        </p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="AI Powered Email Generator screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

