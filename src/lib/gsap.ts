import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Breakpoint conditions shared by every scroll scene via `gsap.matchMedia()`.
 * - full:    desktop, motion allowed — full pinning and scrubbing
 * - compact: mobile, motion allowed — short pins, fewer moving parts
 * - reduced: user prefers reduced motion — no pinning or scrubbing at all
 */
export const MM = {
  full: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  compact: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Maps p from [a, b] to [0, 1], clamped. */
export const segment = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export { gsap, ScrollTrigger, useGSAP };
