import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
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

      <ProjectSection title="Dataset">
        <p>
          The dataset contains more than 33,000 reviews scraped from Google
          Maps. Each review includes the user&apos;s rating, review text, and date,
          providing a rich corpus for sentiment analysis.
        </p>
      </ProjectSection>

      <ProjectSection title="NLP Approach">
        <p>
          Reviews were preprocessed and tokenized using <strong>NLTK</strong>.
          Sentiment scoring leveraged the <strong>VADER</strong> lexicon to
          classify each review as positive, negative, or neutral. Aggregate
          scores were computed to reveal overall customer sentiment.
        </p>
      </ProjectSection>

      <ProjectSection title="Charts and Insights">
        <p>
          Visualizations illustrate sentiment distribution and top keywords.
          Bar and pie charts help highlight the proportion of positive versus
          negative feedback, while word frequency charts expose common themes in
          customer opinions.
        </p>
      </ProjectSection>
    </div>
  );
}

