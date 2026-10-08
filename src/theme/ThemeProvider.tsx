import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { palette, type ThemeMode } from './tokens';
import { ThemeContext, THEME_STORAGE_KEY } from './theme-context';

function readStored(): ThemeMode | null {
  try {
    const v = window.localStorage.getItem(THEME_STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function writeStored(mode: ThemeMode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
}

function systemMode(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(mode: ThemeMode, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 500);
  }
  root.classList.toggle('dark', mode === 'dark');
  root.style.colorScheme = mode;
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', palette[mode].bg));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The inline script in index.html has already set the class before first paint.
  const [mode, setMode] = useState<ThemeMode>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );

  // Follow the OS setting until the user makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (readStored()) return;
      const next = systemMode();
      apply(next, true);
      setMode(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    writeStored(next);
    apply(next, true);
    setMode(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  }, [setTheme]);

  const value = useMemo(() => ({ mode, setTheme, toggle }), [mode, setTheme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
