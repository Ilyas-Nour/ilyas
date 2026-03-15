import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme Types
 * Only 'light' and 'dark' variants are supported for the core design system.
 */
type Theme = 'light' | 'dark';

/**
 * ThemeContext Type Definition
 * Provides the current active theme and a method to cycle through modes.
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * Manages the global visual state of the application.
 * Roles:
 * 1. Synchronizes React state with document-level [data-theme] attributes.
 * 2. Persists user preference via localStorage.
 * 3. Detects system theme preferences on initial hydration.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR Check: Only access window/localStorage on the client
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) return saved;
      
      // Fallback to system preference if no explicit choice was saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default for SSR
  });

  useEffect(() => {
    // Reflect state changes on the root element for global CSS variable targeting
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * Access the current theme context. Must be within a <ThemeProvider>.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
