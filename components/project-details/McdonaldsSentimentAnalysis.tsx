import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectHighlights from "./ProjectHighlights";
import { getGalleryImages } from "@/lib/project-images";
import { getProjectPdfs } from "@/lib/project-pdfs";
import { withBasePath } from "@/lib/utils";

const SLUG = "mcdonalds-sentiment-analysis";

export default async function McdonaldsSentimentAnalysis() {
  const images = await getGalleryImages(
    SLUG,
    "McDonald's Sentiment Analysis screenshot",
    "/static/placeholders/django.webp"
  );
  const pdfs = await getProjectPdfs(SLUG);
  const pdf = pdfs[0];

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        downloadUrl={pdf}
        summary="VADER-based sentiment analysis pipeline mining ~33,000 Google reviews to surface customer-experience trends across U.S. McDonald's locations."
      />

      <ProjectHighlights
        items={[
          { label: "Reviews analyzed", value: "33k+", hint: "U.S. Google reviews" },
          { label: "Aspect categories", value: "4", hint: "food, service, speed, cleanliness" },
          { label: "Polarity classes", value: "3", hint: "positive / neutral / negative" },
          { label: "Stack", value: "NLTK + VADER", hint: "Pandas / Orange" },
        ]}
      />

      <ProjectSection title="Introduction">
        <p>
          A lightweight NLP pipeline that mines ~33k public Google reviews to
          help stakeholders quickly gauge customer sentiment across U.S.
          locations.
        </p>
      </ProjectSection>

      <ProjectSection title="Problem & Objectives">
        <ul className="list-disc pl-6">
          <li>Manual review reading is slow and inconsistent.</li>
          <li>
            Automate sentiment scoring and aspect tagging for food, service,
            speed, and cleanliness.
          </li>
          <li>Provide state-level insights for decision-makers.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Scope & Constraints">
        <ul className="list-disc pl-6">
          <li>Focus on ~33k English Google reviews from U.S. stores.</li>
          <li>Class project delivered over one semester.</li>
          <li>Aspect keywords curated manually; no PII retained.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Architecture">
        <ul className="list-disc pl-6">
          <li>Python ETL with Pandas for cleaning and aggregation.</li>
          <li>NLTK + VADER for sentiment scoring.</li>
          <li>Aspect tagging via keyword rules.</li>
          <li>Charts prototyped in Orange Data Mining.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Data & Datasets">
        <ul className="list-disc pl-6">
          <li>Source: 33k Google reviews with location metadata.</li>
          <li>
            Cleaning: deduplication, lowercasing, stop-word removal, and
            tokenization.
          </li>
          <li>
            Sentiment thresholds: positive ≥ 0.05, negative ≤ -0.05, else
            neutral.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Features">
        <ul className="list-disc pl-6">
          <li>Bulk review ingestion and preprocessing.</li>
          <li>VADER sentiment scoring per review.</li>
          <li>
            Aspect classification for food, service, speed, and cleanliness.
          </li>
          <li>State-level summaries and charts.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Analytics & ML">
        <ul className="list-disc pl-6">
          <li>VADER polarity scores binned into positive, neutral, negative.</li>
          <li>Aspect frequency counts to spot recurring themes.</li>
          <li>Manual spot checks for validation.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Results & Impact">
        <p>
          Automated processing replaced weeks of manual review reading and
          highlighted states where service sentiment lagged, informing future
          improvements.
        </p>
      </ProjectSection>

      <ProjectSection title="Challenges & Learnings">
        <ul className="list-disc pl-6">
          <li>Noisy, emoji-filled text required custom cleaning.</li>
          <li>
            Aspect keywords needed tuning to avoid false positives and
            negatives.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Next Steps">
        <ul className="list-disc pl-6">
          <li>Expose results via interactive dashboard or API.</li>
          <li>Experiment with transformer models for aspect sentiment.</li>
        </ul>
      </ProjectSection>

      {pdf && (
        <ProjectSection title="Links">
          <ul className="list-disc pl-6">
            <li>
              <a
                href={withBasePath(pdf)}
                className="text-teal-600 hover:underline"
              >
                Project Documentation (PDF)
              </a>
            </li>
          </ul>
        </ProjectSection>
      )}
    </div>
  );
}
