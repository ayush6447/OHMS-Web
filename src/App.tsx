import { Suspense, lazy, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { Footer } from '@/sections/Footer';
import { startSmoothScroll } from '@/lib/smooth-scroll';

const BelowFold = lazy(() => import('@/sections/BelowFold'));

export default function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-button px-5 py-3 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      {/* Static film grain over the whole page — one fixed layer, no blending. */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.035] dark:opacity-[0.05]" />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Suspense fallback={<div className="min-h-[100svh]" />}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
