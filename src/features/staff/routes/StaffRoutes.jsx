import React, { Suspense } from "react";
import { Route } from "react-router";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import { SettingRoutes } from "../../setting/routes/SettingRoutes";
import ScheduleInfo from "../pages/ScheduleInfo";
import PageLoader from "../../../components/ui/PageLoader";

// Lazy load components
const StaffLayout = React.lazy(
  () => import("../components/layouts/StaffLayout"),
);
const SearchSchedule = React.lazy(() => import("../pages/SearchSchedule"));
const Profile = React.lazy(() => import("../pages/Profile"));

export const StaffRoutes = (
  <Route
    path="/staff"
    element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <StaffLayout />
        </Suspense>
      </ProtectedRoute>
    }
  >
    <Route path="schedules"  element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <SearchSchedule />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="schedules/:scheduleId"  element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <ScheduleInfo />
        </Suspense>
      </ProtectedRoute>
    } />
    <Route path="profile/:employeeId"  element={
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Profile />
        </Suspense>
      </ProtectedRoute>
    } />
    {SettingRoutes}
  </Route>
);
