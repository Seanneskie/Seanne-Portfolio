import ProjectSection from "../ProjectSection";

export default function AuthenticationFeatures() {
  return (
    <ProjectSection title="Authentication Features">
      <ul className="list-disc pl-6 space-y-2">
        <li>Users authenticate via JWT (JSON Web Tokens).</li>
        <li>
          Middleware functions protect private routes, verify tokens, and restrict
          access based on user roles (e.g., admin vs. customer).
        </li>
        <li>Refresh token logic is used to maintain secure sessions.</li>
      </ul>
    </ProjectSection>
  );
}

