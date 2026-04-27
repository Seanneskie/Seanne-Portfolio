import { type ReactElement } from "react";

import ProjectOverview from "./ProjectOverview";
import ProjectSection from "./ProjectSection";
import { getGalleryImages } from "@/lib/project-images";

const SLUG = "nosql-project";

export default async function NosqlProject(): Promise<ReactElement> {
  const images = await getGalleryImages(
    SLUG,
    "NoSQL Project screenshot",
    "/static/placeholders/Mern.webp"
  );

  return (
    <div className="space-y-12">
      <ProjectOverview
        slug={SLUG}
        images={images}
        summary="CoffeeHub is a full-stack MERN coffee shop platform that streamlines product listings, ordering, and authentication with secure, performant data flows."
      />

      <ProjectSection title="Tech Stack">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Frontend:</strong> React.js with Axios and Context API for
            state management.
          </li>
          <li>
            <strong>Backend:</strong> Node.js and Express.js using a modular
            service-based architecture.
          </li>
          <li>
            <strong>Database:</strong> MongoDB stores user profiles, menu items,
            and order data.
          </li>
          <li>
            <strong>Authentication:</strong> Secure JWT-based auth via custom
            Express middleware.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Authentication Features">
        <ul className="list-disc pl-6 space-y-1">
          <li>Users authenticate with JWTs.</li>
          <li>Middleware verifies tokens and restricts routes by role.</li>
          <li>Refresh tokens maintain secure sessions.</li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Core Features">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>User Registration &amp; Login:</strong> Secure signup and
            login with hashed passwords and token-based sessions.
          </li>
          <li>
            <strong>Menu Management:</strong> Admins add, update, or remove
            products with pricing and availability.
          </li>
          <li>
            <strong>Cart &amp; Checkout:</strong> Customers build carts and
            place orders.
          </li>
          <li>
            <strong>Order Tracking:</strong> Real-time status updates and admin
            monitoring.
          </li>
          <li>
            <strong>Admin Dashboard:</strong> Displays sales insights and
            active users.
          </li>
        </ul>
      </ProjectSection>
      <ProjectSection title="Folder Structure">
        <pre>
{`/client (React frontend)
  └── src/
      ├── components/
      ├── pages/
      └── services/ (API handlers)

/server (Node.js backend)
  ├── controllers/
  ├── routes/
  ├── middleware/
  └── models/`}
        </pre>
      </ProjectSection>
    </div>
  );
}
