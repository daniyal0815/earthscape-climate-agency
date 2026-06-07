import { createContext } from 'react';
import type { CSSProperties } from 'react';

export type Theme = 'dark' | 'light';

interface ChartStyles {
  gridStroke: string;
  tooltipStyle: CSSProperties;
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  chartStyles: ChartStyles;
}

export const THEME_STORAGE_KEY = 'eca-theme';

export const chartStylesMap: Record<Theme, ChartStyles> = {
  dark: {
    gridStroke: 'rgba(255,255,255,0.05)',
    tooltipStyle: {
      backgroundColor: '#1e293b',
      border: '1px solid rgba(255,255,255,0.1)',
    },
  },
  light: {
    gridStroke: 'rgba(15,23,42,0.08)',
    tooltipStyle: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
    },
  },
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
};
