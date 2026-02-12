import React, { Suspense } from "react";
import { Route } from "react-router";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import { SettingRoutes } from "../../setting/routes/SettingRoutes";
import PageLoader from "../../../components/ui/PageLoader";
import SubmissionDetailPage from "../pages/SubmissionDetailPage";
import BackupHistory from "../pages/BackupHistory";
const CreateSubmissionPage = React.lazy(
  () => import("../pages/CreateSubmissionPage"),
);

// Lazy load components
const StaffLayout = React.lazy(
  () => import("../components/layouts/StaffLayout"),
);
const SearchSchedule = React.lazy(() => import("../pages/SearchSchedule"));
const Profile = React.lazy(() => import("../pages/Profile"));
const SubmissionsHistory = React.lazy(
  () => import("../pages/SubmissionsHistory"),
);
const ScheduleDetailPage = React.lazy(
  () => import("../pages/ScheduleDetailPage"),
);

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
    <Route
      path="schedules"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <SearchSchedule />
          </Suspense>
        </ProtectedRoute>
      }
    />
    <Route
      path="schedules/detail/:scheduleId"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <ScheduleDetailPage />
          </Suspense>
        </ProtectedRoute>
      }
    />
    <Route
      path="profile/:employeeId"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <Profile />
          </Suspense>
        </ProtectedRoute>
      }
    />
    <Route
      path="submissions/create"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <CreateSubmissionPage />
          </Suspense>
        </ProtectedRoute>
      }
    />
    <Route
      path="submissions"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <SubmissionsHistory />
          </Suspense>
        </ProtectedRoute>
      }
    />
    <Route
      path="submissions/detail/:submissionId"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <SubmissionDetailPage />
          </Suspense>
        </ProtectedRoute>
      }
    />
    <Route
      path="backups"
      element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <BackupHistory />
          </Suspense>
        </ProtectedRoute>
      }
    />
    {SettingRoutes}
  </Route>
);
