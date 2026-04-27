import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "ai-powered-email-generator";

export default async function AiPoweredEmailGenerator() {
  const images = await getGalleryImages(
    SLUG,
    "AI Powered Email Generator screenshot",
    "/static/placeholders/ai.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="Django + LangChain assistant that drafts professional emails with tone and purpose controls, automatic signature insertion, audio transcription, and a built-in CRM."
      />

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
    </div>
  );
}
