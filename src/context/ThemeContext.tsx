import React, { useEffect, useState } from 'react';
import {
  ThemeContext,
  chartStylesMap,
  getInitialTheme,
  type Theme,
} from './themeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eca-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, chartStyles: chartStylesMap[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
