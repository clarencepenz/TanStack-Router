import * as React from "react";
import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { useAuth } from "../auth";

// Create a route for authentication, wrapping the AuthLayout component
export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    // Redirect to log in if the user is not authenticated
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

// Define the AuthLayout component
function AuthLayout() {
  const router = useRouter(); // Get the router instance
  const navigate = Route.useNavigate(); // Get the navigate function for route navigation
  const auth = useAuth(); // Get the authentication context

  // Handle logout logic
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/" }); // Redirect to the home page after logout
        });
      });
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div>
        <p className="text-3xl font-medium">Authenticated Route</p>
        <p>Protected route! Only visible to authenticated users.</p>
        <Outlet /> {/* Render nested routes */}
        <button
          type="button"
          className="bg-[#02211e] text-white py-2 px-4 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}