// React Router
import { BrowserRouter, Routes, Route } from "react-router";

// Components & Contexts
import { AuthProvider } from "./contexts/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ToastProvider } from "./contexts/ToastProvider";

import PageNotFound from "./pages/PageNotFound";

// Feature Routes
import { AuthRoutes } from "./features/auth/routes/AuthRoutes";
import { DeveloperRoutes } from "./features/developer/routes/DeveloperRoutes";
import { StaffRoutes } from "./features/staff/routes/StaffRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <Routes>
              {AuthRoutes}
              {DeveloperRoutes}
              {StaffRoutes}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
