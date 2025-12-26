// React Router
import { BrowserRouter, Routes, Route } from "react-router";

// Components & Contexts
import { AuthProvider } from "./contexts/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ToastProvider } from "./contexts/ToastProvider";

import PageNotFound from "./pages/PageNotFound";

// Feature Routes
import { AuthRoutes } from "./features/auth/routes/AuthRoutes";
import { DeveloperRoutes } from "./features/developer/routes/DevelopeRoutes";
import { StaffRoutes } from "./features/staff/routes/StaffRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>          
            <ThemeProvider>
              <Routes>
                {AuthRoutes}
                {DeveloperRoutes}
                {StaffRoutes}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </ThemeProvider>          
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
