import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AICoinDetector() {
  const images = await getProjectImages("ai-coin-detector");
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="AI Coin Detector"
        images={images.length ? images : ["/static/placeholders/ai.png"]}
        alt="AI Coin Detector Screenshot"
        githubUrl="https://github.com/Seanneskie/AI-coin-detector-django"
        downloadUrl="/ai-coin-detector/pdfs/Philippine%20Peso%20Coin%20Detector%20and%20Counter.pdf"
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

      <ProjectSection title="Project Overview">
        <p>
          <strong>Philippine Peso Coin Detector and Counter</strong> is a
          browser-based tool that uses a Google Teachable Machine vision model
          to detect and count modern Philippine coins from a live webcam feed.
          It recognizes ₱1, ₱5, ₱10, ₱20, and 25-centavos, then computes the
          running total. The project demonstrates how accessible
          no-code/low-code ML can solve real problems in currency handling,
          education, and accessibility.
        </p>
      </ProjectSection>

      <ProjectSection title="Introduction">
        <p>
          As AI becomes more embedded in daily life, practical applications like
          coin recognition showcase how computer vision can assist users in
          routine tasks. This project leverages{" "}
          <em>Google Teachable Machine</em> to build an image classifier that
          distinguishes Philippine peso denominations and their obverse/ reverse
          faces. The focus is on quick identification and accurate summation,
          improving coin counting speed and supporting visually impaired users
          who may find the new coin series visually similar. The result is a
          deployable, web-first prototype that narrows the gap between complex
          ML and everyday users.
        </p>
      </ProjectSection>

      <ProjectSection title="Rationale">
        <p>
          The system addresses key needs in <strong>efficiency</strong> (fast
          tallying of mixed coins),
          <strong>accuracy</strong> (reducing human error), and{" "}
          <strong>accessibility</strong> (assisting users who struggle to
          distinguish denominations). Beyond personal use, it maps well to
          <em>self-service kiosks</em> and <em>vending machines</em>, where
          reliable coin detection helps prevent fraud and ensures correct
          crediting. Using camera sensors for inference maintains speed while
          minimizing hardware cost and setup complexity.
        </p>
      </ProjectSection>

      <ProjectSection title="Data Collection & Preparation">
        <p>
          The dataset consists of close-up images of legal tender coins captured
          by the team, including both <strong>front (obverse)</strong> and{" "}
          <strong>back (reverse)</strong> faces. Close-ups preserve fine
          features (text, ridges, bi-metallic rings) that are crucial for class
          separation. To improve model robustness, images were taken under
          varied angles and lighting; however, consistent backgrounds were
          preferred to reduce noise and focus the model on coin features rather
          than context.
        </p>
      </ProjectSection>

      <ProjectSection title="Dataset Collection">
        <ul>
          <li>
            Classes: 25¢, ₱1, ₱5, ₱10, ₱20 — each split into front and back.
          </li>
          <li>
            Composition: Team-captured photos ensuring clear visibility of
            inscriptions, patterns, and color/bi-metallic cues.
          </li>
          <li>
            Orientation: Mixed rotations and tilts to simulate real-world
            placement on flat surfaces and in-hand.
          </li>
          <li>
            Background: Kept simple/clean to help the model discriminate coin
            features.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Training & Testing">
        <p>
          The target was ~100 samples per class where feasible. Training and
          testing sets were strictly separated: test images used different
          angles/lighting and were not seen during training. After evaluation,
          selected test samples were merged into training to incrementally
          improve the model (“train-validate-add” loop). Ongoing testing spanned
          several months, constrained by data scarcity for some denominations
          (e.g., ₱20, ₱10, 25¢).
        </p>
      </ProjectSection>

      <ProjectSection title="Model Development">
        <p>
          The model was built with <strong>Teachable Machine</strong> using the
          platform’s default image classification pipeline to prioritize
          stability and avoid over-tuning. Ten classes represent front/back
          faces for each denomination (see below). Default hyperparameters were
          chosen to reduce complexity risk and keep the training process
          reproducible for non-ML specialists.
        </p>
      </ProjectSection>

      <ProjectSection title="Architecture & Setup">
        <ul>
          <li>
            <strong>Classes (10):</strong> ₱1 (Front/Back), ₱5 (Front/Back), ₱10
            (Front/Back), ₱20 (Front/Back), 25¢ (Front/Back).
          </li>
          <li>
            <strong>Epochs:</strong> 80
          </li>
          <li>
            <strong>Batch Size:</strong> 16
          </li>
          <li>
            <strong>Learning Rate:</strong> 0.00102
          </li>
          <li>
            <strong>Runtime:</strong> Client-side inference in the browser via
            webcam feed, aggregating predictions to coin counts and total value.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Model Classes (Front/Back)">
        <ul>
          <li>
            <strong>25 CENTS – Front / Back</strong> → value <code>0.25</code>
          </li>
          <li>
            <strong>1 PESO – Front / Back</strong> → value <code>1</code>
          </li>
          <li>
            <strong>5 PESO – Front / Back</strong> → value <code>5</code>
          </li>
          <li>
            <strong>10 PESO – Front / Back</strong> → value <code>10</code>
          </li>
          <li>
            <strong>20 PESO – Front / Back</strong> → value <code>20</code>
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Training Setup (Hyperparameters)">
        <ul>
          <li>
            Epochs: <code>80</code>
          </li>
          <li>
            Batch Size: <code>16</code>
          </li>
          <li>
            Learning Rate: <code>0.00102</code>
          </li>
          <li>
            Tuning Strategy: Use defaults to reduce overfitting risk and keep
            the model reproducible for classroom/extension use.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Training Process & Challenges">
        <p>
          The team began with ~50 images per class and scaled upward as time
          allowed. Data scarcity for ₱20, ₱10, and 25¢ limited balance across
          classes, while bright lighting sometimes caused{" "}
          <strong>silver-tone misclassification</strong>—frequently pushing
          predictions toward ₱1 with high confidence. Contributing factors
          included lighting glare, similar reflectance across coins, and class
          imbalance.
        </p>
        <p>
          <strong>Mitigations:</strong> capture closer shots, enforce consistent
          lighting, use plain backgrounds, collect more minority-class samples,
          and fold validated test images back into training. These steps
          improved differentiation, especially between silver denominations.
        </p>
      </ProjectSection>

      <ProjectSection title="Evaluation">
        <p>
          Test plans documented sample-by-sample outcomes, with a pass defined
          as a prediction confidence ≥ <strong>60–70%</strong> (configurable
          threshold). Results were tracked against earlier model iterations to
          verify improvements. While no external benchmark was adopted, the
          previous model served as an internal baseline.
        </p>
      </ProjectSection>

      <ProjectSection title="Real-World Deployment">
        <p>
          The model can be embedded in browser-based counters, kiosks, or vendor
          dashboards where coins are presented to a camera for verification and
          tallying. In banks/financial orgs, it can accelerate coin deposits; in
          vending machines, it can validate coins, reduce fraud, and ensure
          correct crediting. For public offices and NGOs, it can streamline coin
          handling during events and drives.
        </p>
      </ProjectSection>

      <ProjectSection title="Potential Use Cases / Applications">
        <ul>
          <li>
            <strong>Retail & Consumer Services:</strong> Faster checkout/change
            handling, lower error rates, smoother end-of-day reconciliation.
          </li>
          <li>
            <strong>Banking & Financial Institutions:</strong> Reliable coin
            deposits, customer self-service counters, improved back-office
            processing.
          </li>
          <li>
            <strong>Charitable Organizations:</strong> Automated counting and
            categorization of coin donations to focus staff time on mission
            work.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Ethical & Societal Implications">
        <p>
          <strong>Reliability & Accuracy:</strong> Model errors can impact user
          trust and finances. Careful dataset curation, calibration, and
          lighting control reduce misreads. Systems should include confidence
          thresholds and human-in-the-loop checks for edge cases and
          out-of-distribution samples (e.g., commemorative coins).
        </p>
        <p>
          <strong>Security & Misuse:</strong> Datasets and models must be
          protected from tampering that could cause acceptance of counterfeit
          items. Simple UI safeguards (e.g., “hold steady” prompts, glare
          warnings) help manage user-side risk.
        </p>
        <p>
          <strong>Job Displacement:</strong> Automating manual coin counting may
          shift some roles; organizations should plan for upskilling/reskilling
          and redeploy staff to higher-value tasks (reporting, analysis,
          customer care).
        </p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="AI Coin Detector Screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}
