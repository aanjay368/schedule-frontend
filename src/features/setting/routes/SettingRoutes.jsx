import { lazy } from "react";
import { Route } from "react-router";
import ThemeSetting from "../pages/ThemeSetting";
const SettingMenu = lazy(() => import("../pages/SettingMenu"));
const PasswordSetting = lazy(() => import("../pages/PasswordSetting"));
const UsernameSetting = lazy(() => import("../pages/UsernameSetting"));

export const SettingRoutes = (
  <Route path="settings">
    <Route index element={<SettingMenu />} />
    <Route path="username" element={<UsernameSetting />} />
    <Route path="password" element={<PasswordSetting />} />
    <Route path="theme" element={<ThemeSetting />} />
  </Route>
);
