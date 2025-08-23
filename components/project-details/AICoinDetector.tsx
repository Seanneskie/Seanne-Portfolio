import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function AICoinDetector() {
  const images = await getProjectImages("ai-coin-detector");
  return (
    <div className="space-y-12">
      <ProjectOverview
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

      <ProjectSection title="Introduction">
        <p>
          Web-based utility that identifies and counts Philippine peso coins
          from webcam input using a model trained with Google Teachable
          Machine.
        </p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>
          Automating coin recognition streamlines sorting tasks for classrooms
          and small businesses while demonstrating practical computer vision
          concepts.
        </p>
      </ProjectSection>
      <ProjectSection title="Data Collection">
        <p>
          Hundreds of labeled coin photos were captured with a smartphone and
          uploaded to Teachable Machine to represent each peso denomination.
        </p>
      </ProjectSection>
      <ProjectSection title="Model Development">
        <p>
          The Teachable Machine model was exported to TensorFlow and combined
          with OpenCV image preprocessing within a Django backend.
        </p>
      </ProjectSection>
      <ProjectSection title="Training and Evaluation">
        <p>
          Model accuracy was reviewed using Teachable Machine&apos;s validation
          metrics and manual testing against real coin samples.
        </p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>
          Packaged as a Django app that serves a browser interface, enabling
          real-time detection via a connected webcam.
        </p>
      </ProjectSection>
      <ProjectSection title="Ethical Implications">
        <p>
          Images were collected in controlled settings to avoid privacy issues
          and the tool is intended for educational use, not counterfeit
          detection.
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

