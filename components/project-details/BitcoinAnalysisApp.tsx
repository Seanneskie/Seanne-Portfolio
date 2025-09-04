import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function BitcoinAnalysisApp() {
  const alt = "Bitcoin Analysis App screenshot";
  const images = (await getProjectImages("bitcoin-analysis-app")).map((src) => ({
    src,
    alt,
  }));
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="Bitcoin Analysis App"
        images={
          images.length
            ? images
            : [{
                src: "/static/placeholders/data-analytics.webp",
                alt,
              }]
        }
      >
        <p>
          <strong>Overview:</strong> The Bitcoin Analysis App explores
          Bitcoin&apos;s historical price movement and market activity through
          interactive visualizations.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
        </p>
      </ProjectOverview>
      <ProjectSection title="Introduction">
        <p>
          <strong>Bitcoin Historical Data Analysis</strong> (ITD 105 – Big Data
          Analytics). I analyzed Bitcoin’s price behavior to understand trends,
          volatility, and relationships among core market variables. The project
          centered on practical data wrangling, exploratory analysis, simple
          predictive modeling, and clear visualization for non-technical
          stakeholders.
        </p>
      </ProjectSection>

      <ProjectSection title="Objectives">
        <ul>
          <li>
            Visualize trends and correlations across Open, High, Low, Close,
            Volume, and Weighted Price.
          </li>
          <li>
            Compute descriptive statistics (mean, median, stdev, range, min/max
            & dates).
          </li>
          <li>
            Build simple linear regression models per target column and evaluate
            with MSE.
          </li>
          <li>Cross-check results against a Weka workflow for consistency.</li>
          <li>
            Translate findings into actionable insights for timing, risk, and
            strategy.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Dataset">
        <p>
          Minute-by-minute BTC price data (2012–2021) with columns: Timestamp,
          Open, High, Low, Close, Volume (BTC), Volume (Currency), and Weighted
          Price. For tractable analysis, I focused on 2019–2021 and also
          produced daily aggregates to accelerate plotting and time-series
          inspection.
        </p>
      </ProjectSection>

      <ProjectSection title="Data Pre-Processing">
        <ul>
          <li>
            Removed rows with nulls and duplicates; normalized schema and types.
          </li>
          <li>
            Converted Unix timestamps to human-readable dates; derived daily
            series.
          </li>
          <li>
            Split the original multi-year CSV into per-year (and per-month)
            files for faster I/O.
          </li>
          <li>
            Documented a lightweight data dictionary to standardize field names
            & validation.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Analysis & Modeling">
        <ul>
          <li>
            EDA: distributions, volatility bands, and pairwise relationships
            across price columns.
          </li>
          <li>
            Descriptive stats to summarize magnitude & spread, highlighting
            BTC’s high variance.
          </li>
          <li>
            Simple linear regression per target (e.g., Close, High, Low,
            Volume); saved models with joblib.
          </li>
          <li>
            Evaluation via train/test split and Mean Squared Error;
            sanity-checked against Weka outputs.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="System Development">
        <p>
          Built a Django-based prototype to run the pipeline and present results
          on the web. The backend (Pandas, scikit-learn, Matplotlib) ingests
          CSVs, computes stats, creates predictions for a user-provided date,
          and exposes context to templates. A clear separation of concerns keeps
          data loading, processing, and rendering modular.
        </p>
      </ProjectSection>

      <ProjectSection title="Visualization">
        <p>
          Rendered time-series charts (per column) and stat cards in the UI. The
          app prepares JSON-ready arrays for dates and values, then the template
          draws line charts for quick comparative scanning of
          Open/High/Low/Close, Volume, and Weighted Price.
        </p>
      </ProjectSection>

      <ProjectSection title="Results & Conclusion">
        <ul>
          <li>
            Strong co-movement among price features; descriptive stats confirm
            large swings typical of BTC.
          </li>
          <li>
            Python and Weka pipelines produced aligned regression behavior on
            held-out data.
          </li>
          <li>
            Daily aggregation enabled faster iteration while preserving macro
            trends for storytelling.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Lessons Learned">
        <ul>
          <li>
            Scale matters: pre-aggregating and file-splitting dramatically
            speeds analysis loops.
          </li>
          <li>
            Keep a tight data dictionary and validation to avoid subtle schema
            drift.
          </li>
          <li>
            Cross-tool verification (Python ↔ Weka) increases confidence in
            findings.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Future Improvements">
        <ul>
          <li>
            Try better baselines (walk-forward CV, ARIMA/Prophet) and
            tree/boosting models.
          </li>
          <li>
            Add volatility modeling and liquidity signals; integrate confidence
            bands in charts.
          </li>
          <li>
            Ship an interactive dashboard with filterable ranges and exportable
            insights.
          </li>
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
