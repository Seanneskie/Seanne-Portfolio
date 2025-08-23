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

      <ProjectSection title="LangChain Prompts">
        <p>
          Prompts are assembled with LangChain&apos;s
          <code> ChatPromptTemplate </code> to capture the desired tone, audience,
          and key points. Few-shot examples guide the model toward concise
          and professional language.
        </p>
        <p>Example template:</p>
        <pre className="rounded bg-slate-800 p-4 text-slate-100 overflow-x-auto"><code>{`You are an assistant that writes professional emails.
Write an email in a {tone} voice about {topic} for {audience}.`}</code></pre>
      </ProjectSection>

      <ProjectSection title="OpenRouter Integration">
        <p>
          The application sends the composed prompt to OpenRouter, allowing
          access to a variety of hosted LLMs. Requests include model selection
          and stream responses to the UI for a responsive typing effect.
        </p>
      </ProjectSection>

      <ProjectSection title="Sample Outputs">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Formal inquiry email introducing a product and requesting a follow-up
            call.
          </li>
          <li>
            Friendly reminder email summarizing action items from a recent
            meeting.
          </li>
          <li>
            Promotional announcement highlighting new features in a release.
          </li>
        </ul>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery
            images={images}
            alt="AI Powered Email Generator screenshot"
          />
        </ProjectSection>
      )}
    </div>
  );
}

