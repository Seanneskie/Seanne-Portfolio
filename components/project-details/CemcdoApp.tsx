import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getProjectImages } from "@/lib/project-images";

export default async function CemcdoApp() {
  const images = await getProjectImages("cemcdo-app");
  return (
    <div className="space-y-12">
      <ProjectOverview
        images={images.length ? images : ["/static/placeholders/django.png"]}
        alt="CEMCDO App screenshot"
        githubUrl="https://cemcdo-demo.onrender.com/"
        linkLabel="View Site"
      >
        <p>
          <strong>Overview:</strong> A Django-based system for the City Economic
          Management and Cooperative Development Office of General Santos City.
          It currently includes modules for tracking fund utilization and
          profiling local cooperatives.
        </p>
        <p>
          <strong>Collaborators:</strong> Kimberly Baylon, Bridget Jose, Azlan
          Tomindug, Francheska Mei Besana
        </p>
      </ProjectOverview>
      <ProjectSection title="Fund Utilization Module">
        <p>
          Records allocations and expenses to provide transparency on how city
          funds are used across programs. Summary views help staff monitor
          spending and generate reports.
        </p>
      </ProjectSection>
      <ProjectSection title="Cooperative Profiling Module">
        <p>
          Maintains detailed profiles of cooperatives including registration
          data, membership statistics, and compliance status to support
          streamlined oversight.
        </p>
      </ProjectSection>
    </div>
  );
}
