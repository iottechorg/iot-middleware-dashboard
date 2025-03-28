import React, { createContext, useState, useEffect, useCallback } from 'react';

// Available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system' // Follows system preference
};

// Create the theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State for current theme
  const [theme, setTheme] = useState(THEMES.LIGHT);
  // State for actual applied theme (after resolving 'system' preference)
  const [appliedTheme, setAppliedTheme] = useState(THEMES.LIGHT);
  // Color mode preferences
  const [colorMode, setColorMode] = useState({
    primary: '#3B82F6', // blue-500
    secondary: '#10B981', // green-500
    accent: '#8B5CF6', // violet-500
    contrast: 'normal'
  });

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && Object.values(THEMES).includes(storedTheme)) {
      setTheme(storedTheme);
    }

    // Check for stored color preferences
    const storedColorMode = localStorage.getItem('colorMode');
    if (storedColorMode) {
      try {
        setColorMode(JSON.parse(storedColorMode));
      } catch (error) {
        console.error('Error parsing stored color mode:', error);
      }
    }
  }, []);

  // Listen for system color scheme preference changes
  useEffect(() => {
    // Only add listener if theme is set to 'system'
    if (theme === THEMES.SYSTEM) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Initial check
      setAppliedTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT);
      
      // Add listener for changes
      const handleChange = (e) => {
        setAppliedTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      // Clean up
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // If not system, applied theme is the same as selected theme
      setAppliedTheme(theme);
    }
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    // Remove any existing theme classes
    document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);
    
    // Add the current theme class
    document.documentElement.classList.add(appliedTheme);
    
    // Apply CSS custom properties for colors
    document.documentElement.style.setProperty('--color-primary', colorMode.primary);
    document.documentElement.style.setProperty('--color-secondary', colorMode.secondary);
    document.documentElement.style.setProperty('--color-accent', colorMode.accent);
    
    // Apply contrast settings
    if (colorMode.contrast === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [appliedTheme, colorMode]);

  // Change theme
  const changeTheme = useCallback((newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }, []);

  // Update color mode
  const updateColorMode = useCallback((newColorMode) => {
    setColorMode(prev => {
      const updated = { ...prev, ...newColorMode };
      localStorage.setItem('colorMode', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    changeTheme(newTheme);
  }, [theme, changeTheme]);

  // Reset to defaults
  const resetTheme = useCallback(() => {
    changeTheme(THEMES.LIGHT);
    setColorMode({
      primary: '#3B82F6', // blue-500
      secondary: '#10B981', // green-500
      accent: '#8B5CF6', // violet-500
      contrast: 'normal'
    });
    localStorage.removeItem('colorMode');
  }, [changeTheme]);

  // Context value
  const themeContextValue = {
    theme,
    appliedTheme,
    colorMode,
    isDark: appliedTheme === THEMES.DARK,
    changeTheme,
    toggleTheme,
    updateColorMode,
    resetTheme,
    themes: THEMES
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;