import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getProjectImages } from "@/lib/project-images";

export default async function BitcoinAnalysisApp() {
  const images = await getProjectImages("bitcoin-analysis-app");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/data-analytics.webp"]}
        alt="Bitcoin Analysis App screenshot"
      >
        <p>
          <strong>Overview:</strong> The Bitcoin Analysis App explores Bitcoin&apos;s
          historical price movement and market activity through interactive
          visualizations.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
        </p>
      </ProjectOverview>
      <ProjectSection title="Objectives">
        <ul className="list-disc pl-6 space-y-2">
          <li>Visualize price trends to highlight volatility and market cycles.</li>
          <li>Compare price action with trading volume and moving averages.</li>
          <li>Provide an accessible dashboard for exploring Bitcoin market data.</li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Data Sources">
        <p>
          The application combines daily open, high, low, close, and volume data
          from public Bitcoin datasets such as CoinDesk and Kaggle.
        </p>
      </ProjectSection>
      <ProjectSection title="Charts">
        <p>
          Line and candlestick charts present price behaviour, while bar charts
          display trading volume with moving‑average overlays for context.
        </p>
      </ProjectSection>
    </div>
  );
}

