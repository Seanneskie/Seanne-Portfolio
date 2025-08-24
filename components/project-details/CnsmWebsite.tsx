import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import ProjectGallery from "./ProjectGallery";
import { getProjectImages } from "@/lib/project-images";

export default async function CnsmWebsite() {
  const images = await getProjectImages("cnsm-website");
  return (
    <div className="space-y-12">
      <ProjectOverview
        title="CNSM Website"
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
      <ProjectSection title="Introduction">
        <p>
          A collaborative MERN (MongoDB, Express.js, React, Node.js) web
          platform for the College of Natural Sciences and Mathematics designed
          to centralize departmental pages, announcements, and program
          information. Our database cohort co-built the project using Bootstrap
          for rapid UI assembly and GitHub for version control and issue
          tracking. Core functional areas included student attendance, profile
          management, intramurals scoring, and fines collection. The initiative
          progressed through requirements, schema design, and working
          prototypes,{" "}
          <strong>
            but was ultimately archived due to scope and time constraints within
            the semester.
          </strong>
        </p>
      </ProjectSection>

      <ProjectSection title="Rationale">
        <p>
          Key processes across departments were fragmented—announcements posted
          in different channels, attendance tracked on paper or spreadsheets,
          and intramural results tallied per event with no single source of
          truth. Centralizing these workflows promised:
        </p>
        <ul>
          <li>One portal for announcements and program details.</li>
          <li>
            Consistent, queryable attendance logs per
            event/subject/organization.
          </li>
          <li>
            Transparent intramurals scoring with live, cumulative leaderboards.
          </li>
          <li>Streamlined fines assessment and payment tracking.</li>
        </ul>
        <p>
          The project also served as a capstone-style exercise in collaborative
          software development using modern tooling and team workflows.
        </p>
      </ProjectSection>

      <ProjectSection title="Data Collection">
        <p>We scoped the initial datasets and collection methods:</p>
        <ul>
          <li>
            <strong>Directory Data:</strong> Departments, programs, courses,
            faculty/advisers (seeded via coordinator-provided spreadsheets and
            on-form submissions).
          </li>
          <li>
            <strong>Profiles:</strong> Student and staff records with role-based
            attributes (submitted via web forms; validated against registrar
            lists where available).
          </li>
          <li>
            <strong>Attendance Logs:</strong> Event/class sessions,
            participants, timestamps, and remarks (entered by coordinators;
            planned CSV import for bulk updates).
          </li>
          <li>
            <strong>Intramurals:</strong> Events, teams, scoring rules, and
            results by match/round.
          </li>
          <li>
            <strong>Fines:</strong> Infraction types, amounts, issuance date,
            status (unpaid/paid), and clearance history.
          </li>
        </ul>
        <p>
          A lightweight data dictionary was drafted to standardize field names,
          types, and validation rules across forms and APIs.
        </p>
      </ProjectSection>

      <ProjectSection title="Model Development">
        <p>
          We structured the backend around clear MongoDB collections with
          Mongoose schemas and REST endpoints on Express:
        </p>
        <ul>
          <li>
            <strong>User &amp; Role:</strong> authentication credential, role
            (student, coordinator, admin), status.
          </li>
          <li>
            <strong>Profile:</strong> user reference, program/department, year
            level, contact info, and optional metadata for organizations.
          </li>
          <li>
            <strong>Department &amp; Program:</strong> names, descriptions,
            coordinators, announcement relationships.
          </li>
          <li>
            <strong>Announcement:</strong> title, body, tags, publishedBy,
            publishedAt, visibility (dept-wide or college-wide).
          </li>
          <li>
            <strong>Attendance:</strong> session/event reference, participant
            userId, check-in/out timestamps, status, and remarks.
          </li>
          <li>
            <strong>IntramuralEvent &amp; Score:</strong> divisions (e.g.,
            Men/Women), teams, fixtures, scoring rules, and match results.
          </li>
          <li>
            <strong>Fine:</strong> profile reference, infraction type, amount,
            issuedBy, issuedAt, status (unpaid/paid), receipts.
          </li>
        </ul>
        <p>
          API design followed resource-oriented routes (e.g.,{" "}
          <code>/api/announcements</code>,<code>/api/attendance</code>) with
          role-based access checks at the controller layer and request
          validation via middleware.
        </p>
      </ProjectSection>

      <ProjectSection title="Training and Evaluation">
        <p>
          While this was a web application (not an ML model), we planned and
          executed testing and evaluation in three layers:
        </p>
        <ul>
          <li>
            <strong>Unit &amp; Integration Tests:</strong> Controller and
            service tests for CRUD and permission paths, focusing on attendance
            and fines logic.
          </li>
          <li>
            <strong>Manual QA &amp; UAT:</strong> Coordinator walk-throughs of
            key flows (post announcement, record attendance, update scores,
            settle fines) against acceptance criteria.
          </li>
          <li>
            <strong>Performance Smoke Tests:</strong> Seeded sample data to
            validate list filtering, pagination, and scoreboard aggregation
            without timeouts.
          </li>
        </ul>
        <p>
          Success metrics included low bug counts on critical paths, predictable
          API latency for list endpoints, and positive coordinator feedback
          during UAT.
        </p>
      </ProjectSection>

      <ProjectSection title="Deployment">
        <p>
          The planned architecture separated concerns for flexibility and scale:
        </p>
        <ul>
          <li>
            <strong>Frontend:</strong> React + Bootstrap, built and served as
            static assets (e.g., Netlify/Vercel).
          </li>
          <li>
            <strong>API:</strong> Node/Express running on a managed host (e.g.,
            Render/Heroku), connected to MongoDB Atlas.
          </li>
          <li>
            <strong>CI/CD:</strong> GitHub for collaboration with PR reviews,
            environment config via .env, and branch-based deploys.
          </li>
        </ul>
        <p>
          <strong>Status:</strong> The team delivered working prototypes for the
          major modules, but the full deployment was deferred and the project
          archived due to timeline constraints and the breadth of features
          relative to semester deadlines. Next steps (post-archive) would be
          reducing scope to a minimal viable slice (Announcements + Attendance),
          then iterating.
        </p>
      </ProjectSection>

      <ProjectSection title="Ethical Implications">
        <p>
          The system handled sensitive student records, so we documented
          safeguards:
        </p>
        <ul>
          <li>
            <strong>Privacy &amp; Consent:</strong> Limit personally
            identifiable information, obtain consent for attendance tracking
            where applicable, and provide opt-out/appeal paths for fines.
          </li>
          <li>
            <strong>Security:</strong> Role-based access control, hashed
            credentials, server-side validation, and least-privilege defaults
            for coordinators versus admins.
          </li>
          <li>
            <strong>Fairness &amp; Transparency:</strong> Clear intramurals
            scoring rules, audit logs for fines issuance and payments, and
            traceable attendance edits with reason codes.
          </li>
          <li>
            <strong>Data Retention:</strong> Time-bounded retention for logs and
            the ability to export/delete a student’s data upon request.
          </li>
        </ul>
      </ProjectSection>

      {images.length > 0 && (
        <ProjectSection title="Screenshots">
          <ProjectGallery images={images} alt="CNSM website screenshot" />
        </ProjectSection>
      )}
    </div>
  );
}
