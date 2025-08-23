import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getProjectImages } from "@/lib/project-images";

export default async function CnsmWebsite() {
  const images = await getProjectImages("cnsm-website");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/Mern.png"]}
        alt="CNSM website screenshot"
        githubUrl="https://github.com/Seanneskie/advDB-CNSM-Website"
      >
        <p>
          <strong>Overview:</strong> MERN stack website for the College of
          Natural Sciences and Mathematics showcasing departments,
          announcements, and program information.
        </p>
        <p>
          <strong>Collaborators:</strong> Database Major Batch of 2021-2025
        </p>
      </ProjectOverview>

      <ProjectSection title="Key Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>Responsive landing pages for departments and degree programs.</li>
          <li>Admin dashboard for managing faculty profiles and announcements.</li>
          <li>User authentication with role-based access.</li>
          <li>Searchable catalog of courses and downloadable resources.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Database Architecture">
        <p>
          MongoDB stores collections for users, departments, programs, courses,
          and announcements. Documents reference each other through ObjectIds,
          enabling quick lookups without joins. Indexed fields such as department
          names and user emails support fast queries, and embedded subdocuments
          capture repeated structures like course prerequisites. The Express API
          enforces schema validation before writes to maintain data integrity.
        </p>
      </ProjectSection>
    </div>
  );
}
