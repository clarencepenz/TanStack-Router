import React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import Navigation from "../components/Navigation";
import type { AuthContext } from "../auth";

interface MyRouterContext {
    auth: AuthContext; // Extend router context with auth
  }

  export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
      <>
        <Navigation />
        <Outlet />
      </>
    ),
  });

  
