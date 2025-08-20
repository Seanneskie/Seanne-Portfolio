import ProjectOverview from "./ProjectOverview";
import { getProjectImages } from "@/lib/project-images";
import TechStack from "./nosql-project/TechStack";
import AuthenticationFeatures from "./nosql-project/AuthenticationFeatures";
import CoreFeatures from "./nosql-project/CoreFeatures";
import FolderStructure from "./nosql-project/FolderStructure";

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
      <TechStack />
      <AuthenticationFeatures />
      <CoreFeatures />
      <FolderStructure />
    </div>
  );
}

