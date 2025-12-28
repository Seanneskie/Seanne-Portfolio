import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AiPoweredEmailGenerator() {
  const alt = "AI Powered Email Generator screenshot";
  const images = (await getProjectImages("ai-powered-email-generator")).map(
    (src) => ({ src, alt })
  );
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="AI-Powered Email Generator"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/ai.webp", alt }]
        }
        githubUrl="https://github.com/Seanneskie/email-generator"
      >
        <p>
          <strong>Overview:</strong> Django and LangChain assistant for
          drafting professional emails with tone and purpose controls,
          automatic signature insertion, and built-in CRM features.
        </p>
        <p>
          <strong>Tech Stack:</strong> Python 3, Django 5.2, LangChain 0.3,
          OpenRouter/OpenAI API, Tailwind CSS via CLI, SQLite/PostgreSQL,
          Whisper for audio transcription, Node.js.
        </p>
      </ProjectOverview>

      <ProjectSection title="Email Composition">
        <p>
          Compose emails by setting tone and purpose while automatically
          appending sender details like name, phone, and affiliation.
        </p>
      </ProjectSection>

      <ProjectSection title="Template History">
        <p>
          Every generated message is saved with its metadata so users can
          revisit and reuse past templates.
        </p>
      </ProjectSection>

      <ProjectSection title="Gmail Integration">
        <p>
          Drafts can be confirmed and sent through Gmail with optional
          attachments, keeping communication in one flow.
        </p>
      </ProjectSection>

      <ProjectSection title="Audio Transcription">
        <p>
          Local Whisper models convert uploaded MP3 or WAV files to text,
          producing downloadable transcripts.
        </p>
      </ProjectSection>

      <ProjectSection title="CRM Dashboard">
        <p>
          Manage accounts, contacts, leads, opportunities, and activities in a
          lightweight CRM that ties directly into email history.
        </p>
      </ProjectSection>

      <ProjectSection title="Tech Highlights">
        <p>
          Uses Django ORM with SQLite by default and optional PostgreSQL,
          Tailwind for styling, and dotenv-managed environment settings.
        </p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

