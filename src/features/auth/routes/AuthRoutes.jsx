import React, { Suspense } from "react";
import { Route } from "react-router";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";

const LoginPage = React.lazy(() => import("../../auth/pages/LoginPage"));

export const AuthRoutes = (
  <Route
    path="/"
    element={
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
            <LoadingAnimation />
          </div>
        }
      >
        <LoginPage />
      </Suspense>
    }
  />
);
