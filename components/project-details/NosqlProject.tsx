import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
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

      <ProjectSection title="Tech Stack">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Frontend:</strong> React.js with Axios and Context API for
            state management.
          </li>
          <li>
            <strong>Backend:</strong> Node.js and Express.js with modular route
            handling and service-based architecture.
          </li>
          <li>
            <strong>Database:</strong> MongoDB for storing user profiles, menu
            items, and order data.
          </li>
          <li>
            <strong>Authentication:</strong> Secure JWT-based authentication
            implemented via custom Express middleware.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Authentication Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>Users authenticate via JWT (JSON Web Tokens).</li>
          <li>
            Middleware functions protect private routes, verify tokens, and
            restrict access based on user roles (e.g., admin vs. customer).
          </li>
          <li>Refresh token logic is used to maintain secure sessions.</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>User Registration & Login</strong>
            <br />Secure signup/login with hashed passwords and token-based
            sessions.
          </li>
          <li>
            <strong>Menu Management</strong>
            <br />Admins can add, update, or remove coffee products, including
            pricing and availability.
          </li>
          <li>
            <strong>Cart & Checkout</strong>
            <br />Customers can browse the coffee menu, add items to the cart,
            and place orders.
          </li>
          <li>
            <strong>Order Tracking</strong>
            <br />Real-time status updates for customers and administrative order
            monitoring.
          </li>
          <li>
            <strong>Admin Dashboard</strong>
            <br />Provides insights on sales, top-selling items, and active
            users.
          </li>
        </ul>
      </ProjectSection>

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
    </div>
  );
}

