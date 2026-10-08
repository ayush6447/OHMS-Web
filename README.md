# OMHS — landing page

Landing page for **OMHS**, a non-invasive cholesterol estimation research prototype by **Ayuda**
(two SWIR wavelengths at 1200 nm / 1720 nm + pneumatic cuff occlusion, with a Flutter companion app
for Android and iOS).

> OMHS is a research prototype and is not a medical device. It is not intended to diagnose or treat any condition.

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Lenis · GSAP + ScrollTrigger · Motion · React Bits

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run lint      # oxlint
npm run preview   # serve the production build
```

## Structure

```
brand/                      Source brand files from the app (app_colors.dart, logo PNGs)
public/                     Favicons, OG image, logo marks, team photos
src/
  theme/tokens.ts           Colour tokens — mirrors brand/app_colors.dart exactly (+ web-only AA text roles)
  theme/ThemeProvider.tsx   Light/dark: follows the OS until the user picks, saved in localStorage
  content/site.ts           All editable copy and every {{TODO}} placeholder
  sections/*                One file per scroll scene (Hero, Problem, HowItWorks, Hardware, AppShowcase, …)
  components/*              Navbar, PhoneFrame, RingGauge, IsoBoard, app-screens/*, …
  components/reactbits/*    React Bits components (installed via the shadcn CLI, re-themed to the brand)
  lib/                      GSAP setup, Lenis smooth scroll, waitlist submit hook
```

### Colours

`src/theme/tokens.ts` is the single source of truth. The `omhsTokens` plugin in `vite.config.ts`
injects them as `--c-*` CSS variables into `index.html` at build time, and `src/index.css` maps them
to Tailwind utilities (`bg-surface`, `text-muted-text`, `from-ring-start`, …). If the app palette
changes, update `brand/app_colors.dart` and `appColors` in `tokens.ts` together.

### Motion

- Desktop: pinned, scrubbed scenes (hero, how it works, hardware, roadmap).
- Mobile (< 768px): shorter pins, no horizontal scroll, lighter effects.
- `prefers-reduced-motion`: no smooth scrolling, pinning or scrubbing; content is shown statically.
- One WebGL layer (LightRays, hero only). It is lazy-loaded and torn down when offscreen.

### Waitlist form

Frontend only. Set `VITE_WAITLIST_ENDPOINT` (e.g. in `.env.local`) to a URL that accepts a JSON POST;
see `src/lib/waitlist.ts`. Until it is set, the form validates and tells the visitor plainly that
the entry was **not** stored.

## Placeholders to fill in

Everything rendered as a dashed red `{{TODO}}` on the page lives in `src/content/site.ts`, except where noted:

- Contact email, production domain
- Google Play and App Store links
- Social links (LinkedIn, GitHub, Instagram, X)
- Team: LinkedIn URLs for everyone, roles for Ayush and Amrit, Amrit's surname
- Roadmap: milestones after calibration
- Problem section: a sourced statistic + citation (`src/sections/Problem.tsx`)
- Waitlist backend (`VITE_WAITLIST_ENDPOINT`)
- `index.html`: absolute `og:url` / `og:image` once the domain is known
