import React, { Suspense } from "react";
import { Route } from "react-router";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import {SettingRoutes} from "../../setting/routes/SettingRoutes";
import PageLoader from "../../../components/ui/PageLoader"

// Lazy load components
const EmployeeManagement = React.lazy(
  () => import("../pages/EmployeeManagement"),
);
const ScheduleManagement = React.lazy(
  () => import("../pages/ScheduleManagement"),
);
const DeveloperLayout = React.lazy(
  () => import("../components/layouts/DeveloperLayout"),
);

const DeveloperModule = () => (
  <ProtectedRoute>
    <Suspense fallback={PageLoader}>
      <DeveloperLayout />
    </Suspense>
  </ProtectedRoute>
);

export const DeveloperRoutes = (
  <Route path="/dev" element={<DeveloperModule />}>
    <Route
      index
      element={
        <Suspense fallback={PageLoader}>
          <ScheduleManagement />
        </Suspense>
      }
    />
    <Route
      path="employees"
      element={
        <Suspense fallback={PageLoader}>
          <EmployeeManagement />
        </Suspense>
      }
    />
    <Route
      path="schedules"
      element={
        <Suspense fallback={PageLoader}>
          <ScheduleManagement />
        </Suspense>
      }
    />
    {SettingRoutes}
  </Route>
);
