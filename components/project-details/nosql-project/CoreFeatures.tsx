import ProjectSection from "../ProjectSection";

export default function CoreFeatures() {
  return (
    <ProjectSection title="Core Features">
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>User Registration & Login</strong>
          <br />Secure signup/login with hashed passwords and token-based sessions.
        </li>
        <li>
          <strong>Menu Management</strong>
          <br />Admins can add, update, or remove coffee products, including pricing
          and availability.
        </li>
        <li>
          <strong>Cart & Checkout</strong>
          <br />Customers can browse the coffee menu, add items to the cart, and
          place orders.
        </li>
        <li>
          <strong>Order Tracking</strong>
          <br />Real-time status updates for customers and administrative order
          monitoring.
        </li>
        <li>
          <strong>Admin Dashboard</strong>
          <br />Provides insights on sales, top-selling items, and active users.
        </li>
      </ul>
    </ProjectSection>
  );
}

