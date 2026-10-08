import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Matches the `md` breakpoint where pinned scenes switch to their full desktop choreography. */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
