/**
 * OMHS design tokens — the single source of truth for colour on the web.
 *
 * `appColors` mirrors `brand/app_colors.dart` (the Flutter app's OmhsColors
 * ThemeExtension) value-for-value. Do not edit those hexes here without
 * changing the app too.
 *
 * `webColors` holds a handful of web-only roles that exist because some app
 * colours do not reach WCAG AA as *text* on the web (e.g. light `muted` is
 * 3.8:1 on `bg`). They are only used for text; the app hexes are still used
 * for fills, rings and decoration.
 *
 * These tokens are turned into CSS custom properties at build time by the
 * `omhsTokens` plugin in vite.config.ts, so there is no flash of wrong colour.
 * Keep this file free of DOM/browser APIs.
 */

export type ThemeMode = 'light' | 'dark';

export interface AppPalette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  hero: string;
  primary: string;
  onPrimary: string;
  pink: string;
  onPink: string;
  cyan: string;
  text: string;
  muted: string;
  divider: string;
  ringTrack: string;
  ringSegA: string;
  ringSegB: string;
  ringStart: string;
  ringEnd: string;
  badge: string;
  onBadge: string;
  ok: string;
  danger: string;
}

export interface WebPalette {
  /** Secondary text that passes AA (4.5:1) on bg, surface and surfaceAlt. */
  mutedText: string;
  /** Links and accent text that pass AA on bg and surface. */
  primaryText: string;
  /** Solid button fill that keeps white label text at AA. */
  button: string;
  /** Cyan used as text (light cyan is decorative only). */
  cyanText: string;
  okText: string;
  dangerText: string;
  /** Three stops for gradient display text; every stop passes AA as large text on bg. */
  gradA: string;
  gradB: string;
  gradC: string;
}

export const appColors: Record<ThemeMode, AppPalette> = {
  light: {
    bg: '#FBFBFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F2FB',
    hero: '#1F32C4',
    primary: '#1F32C4',
    onPrimary: '#FFFFFF',
    pink: '#FFD3E3',
    onPink: '#1F32C4',
    cyan: '#1FE3F0',
    text: '#101A73',
    muted: '#7A7FA6',
    divider: '#DDE0F3',
    ringTrack: '#EDEEFA',
    ringSegA: '#FFD9E7',
    ringSegB: '#FFE9F1',
    ringStart: '#A597E6',
    ringEnd: '#2F43D4',
    badge: '#E4E6F3',
    onBadge: '#101A73',
    ok: '#16A34A',
    danger: '#E5484D',
  },
  dark: {
    bg: '#0A0E2E',
    surface: '#1A2157',
    surfaceAlt: '#151B4E',
    hero: '#1A2690',
    primary: '#5566FF',
    onPrimary: '#FFFFFF',
    pink: '#FFB8D1',
    onPink: '#141B6E',
    cyan: '#3BEAF4',
    text: '#EEF0FF',
    muted: '#98A0D8',
    divider: '#28307A',
    ringTrack: '#1D2462',
    ringSegA: '#3A2C6E',
    ringSegB: '#2E2766',
    ringStart: '#C2B5FF',
    ringEnd: '#6475FF',
    badge: '#252C6B',
    onBadge: '#E6E8FF',
    ok: '#4ADE80',
    danger: '#FF6B7A',
  },
};

export const webColors: Record<ThemeMode, WebPalette> = {
  light: {
    mutedText: '#5B6390',
    primaryText: '#1F32C4',
    button: '#1F32C4',
    cyanText: '#0B7280',
    okText: '#15803D',
    dangerText: '#C62F35',
    gradA: '#1F32C4',
    gradB: '#6A3FCB',
    gradC: '#0B7280',
  },
  dark: {
    mutedText: '#98A0D8',
    primaryText: '#97A3FF',
    button: '#4656F0',
    cyanText: '#3BEAF4',
    okText: '#4ADE80',
    dangerText: '#FF6B7A',
    gradA: '#97A3FF',
    gradB: '#C2B5FF',
    gradC: '#3BEAF4',
  },
};

export type Palette = AppPalette & WebPalette;

export const palette: Record<ThemeMode, Palette> = {
  light: { ...appColors.light, ...webColors.light },
  dark: { ...appColors.dark, ...webColors.dark },
};

/** Fonts shared with the app: Poppins for UI, Space Mono for numbers/readouts. */
export const fonts = {
  sans: "'Poppins', ui-sans-serif, system-ui, sans-serif",
  mono: "'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const radii = {
  card: '28px',
  panel: '32px',
  phone: '44px',
} as const;

const kebab = (key: string) => key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

/** `{ '--c-bg': '#FBFBFF', ... }` for one theme. Usable as an inline style to scope a theme. */
export function cssVars(mode: ThemeMode): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(palette[mode])) {
    out[`--c-${kebab(key)}`] = value;
  }
  return out;
}

const block = (selector: string, mode: ThemeMode) =>
  `${selector}{${Object.entries(cssVars(mode))
    .map(([k, v]) => `${k}:${v}`)
    .join(';')};color-scheme:${mode}}`;

/** Full stylesheet: light on :root, dark on `.dark`. Injected into index.html at build time. */
export function cssVarsStylesheet(): string {
  return `${block(':root', 'light')}${block(':root.dark', 'dark')}`;
}
