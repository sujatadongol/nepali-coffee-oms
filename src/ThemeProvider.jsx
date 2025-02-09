import React, { createContext, useState, useContext, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./utils/theme";

// Create a context with default value as undefined
const ThemeContext = createContext(undefined);

export const ThemeProviderWrapper = ({ children }) => {
  // State to hold the current theme
  const [formTheme, setFormTheme] = useState(defaultTheme);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      formTheme,
      setFormTheme,
    }),
    [formTheme, setFormTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={formTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useFormTheme = () => useContext(ThemeContext);
