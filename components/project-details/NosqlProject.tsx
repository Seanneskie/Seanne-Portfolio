import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function NosqlProject() {
  const images = await getProjectImages("nosql-project");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/Mern.png"]}
        alt="NoSQL Project screenshot"
      >
        <p>
          <strong>Overview:</strong> CoffeeHub is a full-stack web application
          designed to modernize coffee shop operations by streamlining product
          listings, orders, and user authentication. Built using the MERN stack
          (MongoDB, Express.js, React, Node.js), the app ensures efficient
          performance, secure data handling, and a smooth customer experience.
        </p>
        <p>
          <strong>Collaborators:</strong> Individual Project
        </p>
      </ProjectOverview>

      <ProjectSection title="Introduction">
        <p>Project introduction coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Rationale">
        <p>Rationale coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Data Collection">
        <p>Data collection details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Model Development">
        <p>Model development details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Training and Evaluation">
        <p>Training and evaluation details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Deployment">
        <p>Deployment details coming soon.</p>
      </ProjectSection>
      <ProjectSection title="Ethical Implications">
        <p>Ethical considerations coming soon.</p>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="NoSQL Project screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}

