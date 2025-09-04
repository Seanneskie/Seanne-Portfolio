import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";
import { getProjectPdfs } from "@/lib/project-pdfs";
import { withBasePath } from "@/lib/utils";

export default async function McdonaldsSentimentAnalysis() {
  const alt = "McDonald's Sentiment Analysis screenshot";
  const images = (
    await getProjectImages("mcdonalds-sentiment-analysis")
  ).map((src) => ({ src, alt }));
  const pdfs = await getProjectPdfs("mcdonalds-sentiment-analysis");
  const pdf = pdfs[0];
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="McDonald's Sentiment Analysis"
        images={
          images.length
            ? images
            : [{ src: "/static/placeholders/django.png", alt }]
        }
        downloadUrl={pdf}
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

      <ProjectSection title="Links">
        <ul className="list-disc pl-6">
          {pdf && (
            <li>
              <a
                href={withBasePath(pdf)}
                className="text-teal-600 hover:underline"
              >
                Project Documentation (PDF)
              </a>
            </li>
          )}
        </ul>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} />
        </ProjectSection>
      )}
    </div>
  );
}

