import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./auth/components/ProtectedRoute";
import Profile from "./employee/pages/Profile";
import Setting from "./employee/pages/Setting";
import NavigationProvider from "./components/NavigationProvider";
import LoadingAnimation from "./components/LoadingAnimation";
import NotFound from "./components/NotFound";

const LoginPage = React.lazy(() => import("./auth/pages/LoginPage"));
const DeveloperLayout = React.lazy(
  () => import("./developer/layouts/DeveloperLayout"),
);
const ScheduleManagement = React.lazy(
  () => import("./developer/pages/ScheduleManagement"),
);
const EmployeeManagement = React.lazy(
  () => import("./developer/pages/EmployeeManagement"),
);
const Schedule = React.lazy(() => import("./employee/pages/Schedule"));
const EmployeeLayout = React.lazy(
  () => import("./employee/layouts/EmployeeLayout"),
);

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavigationProvider>
          <Routes>
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

            {/* Protected /dev routes - only for DEVELOPER role */}
            <Route
              path="/dev"
              element={
                <ProtectedRoute requiredRole="DEVELOPER">
                  <DeveloperLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
                        <LoadingAnimation />
                      </div>
                    }
                  >
                    <ScheduleManagement />
                  </Suspense>
                }
              />
              <Route
                path="schedule"
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
                        <LoadingAnimation />
                      </div>
                    }
                  >
                    <ScheduleManagement />
                  </Suspense>
                }
              />
              <Route
                path="employee"
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
                        <LoadingAnimation />
                      </div>
                    }
                  >
                    <EmployeeManagement />
                  </Suspense>
                }
              />
            </Route>

            {/* Protected /emp routes - only for EMPLOYEE role */}
            <Route
              path="/emp"
              element={
                <ProtectedRoute requiredRole="EMPLOYEE">
                  <EmployeeLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
                        <LoadingAnimation />
                      </div>
                    }
                  >
                    <Schedule />
                  </Suspense>
                }
              />
              <Route
                path="schedule"
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
                        <LoadingAnimation />
                      </div>
                    }
                  >
                    <Schedule />
                  </Suspense>
                }
              />
              <Route
                path="profile/:employeeId"
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
                        <LoadingAnimation />
                      </div>
                    }
                  >
                    <Profile />
                  </Suspense>
                }
              />
              <Route path="setting" element={<Setting />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NavigationProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
