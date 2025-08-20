import ProjectSection from "../ProjectSection";

export default function FolderStructure() {
  return (
    <ProjectSection title="Folder Structure">
      <pre>{`/client (React frontend)
  └── src/
      ├── components/
      ├── pages/
      └── services/ (API handlers)

/server (Node.js backend)
  ├── controllers/
  ├── routes/
  ├── middleware/
  └── models/`}</pre>
    </ProjectSection>
  );
}

