import ProjectOverview from "./ProjectOverview";
import { getProjectImages } from "@/lib/project-images";
import Introduction from "./ai-coin-detector/Introduction";
import Rationale from "./ai-coin-detector/Rationale";
import DataCollection from "./ai-coin-detector/DataCollection";
import ModelDevelopment from "./ai-coin-detector/ModelDevelopment";
import TrainingAndEvaluation from "./ai-coin-detector/TrainingAndEvaluation";
import Deployment from "./ai-coin-detector/Deployment";
import EthicalImplications from "./ai-coin-detector/EthicalImplications";

export default async function AICoinDetector() {
  const images = await getProjectImages("ai-coin-detector");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/ai.png"]}
        alt="AI Coin Detector Screenshot"
        githubUrl="https://github.com/Seanneskie/AI-coin-detector-django"
      >
        <p>
          <strong>Overview:</strong> This AI Coin Detector was developed using
          Django and Google Teachable Machine (GTM) as a requirement for the
          <em> Introduction to AI</em> course.
        </p>
        <p>
          <strong>Collaborators:</strong> Kimberly Baylon, Jeric Aminola,
          Bridget Jose, Azlan Tomindug
        </p>
      </ProjectOverview>
      <Introduction />
      <Rationale />
      <DataCollection />
      <ModelDevelopment />
      <TrainingAndEvaluation />
      <Deployment />
      <EthicalImplications />
    </div>
  );
}

