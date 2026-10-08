import { Suspense, lazy, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import BlurText from '@/components/reactbits/BlurText';
import Magnet from '@/components/reactbits/Magnet';
import { PhoneFrame } from '@/components/PhoneFrame';
import { DashboardScreen } from '@/components/app-screens/DashboardScreen';
import { PlatformLine } from '@/components/Platforms';
import { ResultNote } from '@/components/Disclaimer';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { MM, gsap, useGSAP } from '@/lib/gsap';
import { useTheme } from '@/theme/theme-context';
import { palette } from '@/theme/tokens';
import { site } from '@/content/site';

// WebGL background is split into its own chunk (ogl) and only mounted when motion is allowed.
const LightRays = lazy(() => import('@/components/reactbits/LightRays'));

const CHIPS = [
  { text: '1200 nm', className: 'left-[-150px] top-[70px]', depth: -120 },
  { text: '1720 nm', className: 'right-[-150px] top-[150px]', depth: -200 },
  { text: 'BLE · live', className: 'left-[-130px] top-[330px]', depth: -60 },
  { text: '142 mmHg', className: 'right-[-140px] top-[400px]', depth: -150 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { mode } = useTheme();
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const staged = isDesktop && !reduced; // desktop choreography: pinned, phone rises from below the fold

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MM.full, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=85%',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
          defaults: { ease: 'none' },
        });
        tl.to('[data-hero-copy]', { y: -120, opacity: 0, duration: 0.6 }, 0)
          .fromTo(
            '[data-hero-phone]',
            { y: 0, rotateX: 26, scale: 0.9 },
            { y: () => -(window.innerHeight * 0.62), rotateX: 0, scale: 1, duration: 1 },
            0,
          )
          .to('[data-hero-glow]', { opacity: 1, scale: 1.15, duration: 1 }, 0);
        gsap.utils.toArray<HTMLElement>('[data-hero-chip]').forEach((chip) => {
          tl.fromTo(
            chip,
            { opacity: 0, y: 60 },
            { opacity: 1, y: Number(chip.dataset.depth), duration: 0.8 },
            0.15,
          );
        });
      });

      mm.add(MM.compact, () => {
        gsap.fromTo(
          '[data-hero-phone]',
          { rotateX: 18, y: 40 },
          {
            rotateX: 0,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: '[data-hero-phone]', start: 'top bottom', end: 'center 60%', scrub: 0.5 },
          },
        );
      });
    },
    { scope: root },
  );

  const rays = palette[mode];

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className={`relative isolate overflow-hidden ${staged ? 'h-[100svh] min-h-[720px]' : 'pb-16'}`}
    >
      {/* Background: one WebGL layer + static brand gradients + grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(60% 50% at 12% 8%, color-mix(in srgb, var(--c-pink) 55%, transparent), transparent 70%), radial-gradient(50% 45% at 92% 18%, color-mix(in srgb, var(--c-ring-start) 45%, transparent), transparent 70%), radial-gradient(70% 60% at 50% 110%, color-mix(in srgb, var(--c-primary) 22%, transparent), transparent 70%)',
          }}
        />
        {!reduced && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 ${mode === 'dark' ? 'opacity-80' : 'opacity-45'}`}>
              <LightRays
                raysOrigin="top-center"
                raysColor={mode === 'dark' ? rays.ringStart : rays.ringEnd}
                raysSpeed={0.6}
                lightSpread={0.9}
                rayLength={1.6}
                fadeDistance={1.1}
                saturation={1}
                followMouse={isDesktop}
                mouseInfluence={0.06}
                noiseAmount={0.05}
                distortion={0.04}
              />
            </div>
          </Suspense>
        )}
        <div
          data-hero-glow
          className="absolute left-1/2 top-[62%] h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full opacity-60"
          style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--c-cyan) 30%, transparent), transparent)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div
        data-hero-copy
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-32 text-center sm:px-6 sm:pt-36 md:pt-[18vh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chip glass mb-7 border-0 text-ink"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan" />
          </span>
          v2 proof-of-concept · research prototype
        </motion.p>

        {reduced ? (
          <h1 id="hero-title" className="text-display text-balance max-w-[14ch] pb-[0.1em]">
            {site.tagline}
          </h1>
        ) : (
          <div id="hero-title" className="max-w-[14ch]">
            <SplitText
              tag="h1"
              text={site.tagline}
              className="text-display text-balance pb-[0.12em]"
              splitType="chars"
              delay={22}
              duration={1}
              ease="power4.out"
              from={{ opacity: 0, y: 70 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
            />
          </div>
        )}

        <div className="text-lede mt-6 max-w-2xl text-muted-text">
          {reduced ? (
            <p>
              OMHS estimates cholesterol with two wavelengths of near-infrared light and a gentle pneumatic cuff,
              streamed live to an app on your phone.
            </p>
          ) : (
            <BlurText
              text="OMHS estimates cholesterol with two wavelengths of near-infrared light and a gentle pneumatic cuff, streamed live to an app on your phone."
              animateBy="words"
              direction="bottom"
              delay={28}
              stepDuration={0.3}
              className="justify-center"
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center gap-5"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnet padding={60} magnetStrength={4}>
              <a href="#waitlist" className="btn btn-primary px-7">
                Join the waitlist
              </a>
            </Magnet>
            <a href="#how-it-works" className="btn btn-ghost px-6">
              See how it works <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>
          <PlatformLine className="justify-center" />
        </motion.div>
      </div>

      {/* Phone stage */}
      <div
        className={
          staged
            ? 'perspective pointer-events-none absolute inset-x-0 top-[calc(100%-240px)] z-20 flex justify-center'
            : 'perspective relative z-20 mt-14 flex justify-center px-4'
        }
      >
        <div data-hero-phone className="preserve-3d relative origin-bottom will-change-transform">
          <PhoneFrame mode={mode} label="The OMHS app Dashboard: a ring gauge showing a sample total cholesterol of 182 mg/dL, in the Desirable band.">
            <DashboardScreen />
          </PhoneFrame>
          {staged &&
            CHIPS.map((c) => (
              <span
                key={c.text}
                data-hero-chip
                data-depth={c.depth}
                aria-hidden
                className={`glass absolute rounded-full px-4 py-2 font-mono text-sm text-ink opacity-0 ${c.className}`}
              >
                {c.text}
              </span>
            ))}
          <ResultNote className="mx-auto mt-5 max-w-[290px] justify-center text-center">
            Sample reading for illustration. Research prototype, not a medical device.
          </ResultNote>
        </div>
      </div>
    </section>
  );
}
