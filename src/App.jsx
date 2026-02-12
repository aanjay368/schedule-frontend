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

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function App() {
    
  return (
    <BrowserRouter>
    <MantineProvider>
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
      </MantineProvider>
    </BrowserRouter>
  );
}
