import React, { Suspense } from "react";
import { Route } from "react-router";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import { SettingRoutes } from "../../setting/routes/SettingRoutes";
import ScheduleInfo from "../pages/ScheduleInfo";

// Lazy load components
const StaffLayout = React.lazy(
  () => import("../components/layouts/StaffLayout"),
);
const Schedule = React.lazy(() => import("../pages/Schedule"));
const Profile = React.lazy(() => import("../pages/Profile"));

export const StaffRoutes = (
  <Route
    path="/staff"
    element={
      <ProtectedRoute>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
              <LoadingAnimation />
            </div>
          }
        >
          <StaffLayout />
        </Suspense>
      </ProtectedRoute>
    }
  >
    <Route path="schedules" element={<Schedule />} />
    <Route path="schedules/:scheduleId" element={<ScheduleInfo />} />
    <Route path="profile/:employeeId" element={<Profile />} />
    {SettingRoutes}
  </Route>
);
