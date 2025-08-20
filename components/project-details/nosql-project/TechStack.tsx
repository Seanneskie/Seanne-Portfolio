import ProjectSection from "../ProjectSection";

export default function TechStack() {
  return (
    <ProjectSection title="Tech Stack">
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Frontend:</strong> React.js with Axios and Context API for state
          management.
        </li>
        <li>
          <strong>Backend:</strong> Node.js and Express.js with modular route
          handling and service-based architecture.
        </li>
        <li>
          <strong>Database:</strong> MongoDB for storing user profiles, menu items,
          and order data.
        </li>
        <li>
          <strong>Authentication:</strong> Secure JWT-based authentication
          implemented via custom Express middleware.
        </li>
      </ul>
    </ProjectSection>
  );
}

