import { lazy, Suspense } from "react";
import { Route } from "react-router";
import PageLoader from "../../../components/ui/PageLoader";
const ThemeSetting = lazy(() => import("../pages/ThemeSetting"));
const SettingMenu = lazy(() => import("../pages/SettingMenu"));
const PasswordSetting = lazy(() => import("../pages/PasswordSetting"));
const UsernameSetting = lazy(() => import("../pages/UsernameSetting"));

export const SettingRoutes = (
  <Route path="settings">
    <Route
      index
      element={
        <Suspense fallback={<PageLoader />}>
          <SettingMenu />
        </Suspense>
      }
    />
    <Route
      path="username"
      element={
        <Suspense fallback={<PageLoader />}>
          <UsernameSetting />
        </Suspense>
      }
    />
    <Route
      path="password"
      element={
        <Suspense fallback={<PageLoader />}>
          <PasswordSetting />
        </Suspense>
      }
    />
    <Route
      path="theme"
      element={
        <Suspense fallback={<PageLoader />}>
          <ThemeSetting />
        </Suspense>
      }
    />
  </Route>
);
