import { createContext, useContext } from 'react';
import type { ThemeMode } from './tokens';

export const THEME_STORAGE_KEY = 'omhs-theme';

export interface ThemeContextValue {
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
