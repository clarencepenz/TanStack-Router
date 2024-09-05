import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "../auth";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const auth = useAuth();

  return (
      <p className="my-5">Welcome to your dashboard <span className="text-[#104a44] text-xl font-medium capitalize">{auth.user}!</span></p>
  );
}

