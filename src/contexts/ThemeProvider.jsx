// src/contexts/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children}) => {
  const [themeSetting, setThemeSetting] = useState(localStorage.getItem("user-theme") || "auto");
  const [currentTheme, setCurrentTheme] = useState("light");

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  useEffect(() => {    
    if (themeSetting !== "auto") {
      setCurrentTheme(themeSetting);
      return;
    }
    
    const handler = () => setCurrentTheme(getSystemTheme());
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    handler(); 
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [themeSetting]);

  return (
    <ThemeContext.Provider
      value={{ themeSetting, setThemeSetting }}
    >
      <div data-theme={currentTheme} className="min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

