import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bluetooth } from 'lucide-react';
import { ResultNote } from '@/components/Disclaimer';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { MM, ScrollTrigger, gsap, segment, useGSAP } from '@/lib/gsap';

const PHASES = [
  {
    name: 'Inflate',
    body: 'A small pump inflates the cuff around the finger.',
  },
  {
    name: 'Hold',
    body: 'The valve closes and the cuff holds its pressure steady.',
  },
  {
    name: 'Measure',
    body: 'Two SWIR LEDs — 1200 nm and 1720 nm — light the tissue while a photodiode and transimpedance amplifier read the signal at each wavelength.',
  },
  {
    name: 'Deflate',
    body: 'The valve opens and the cuff releases.',
  },
  {
    name: 'Result',
    body: 'The estimate is sent over Bluetooth LE to the companion app.',
  },
];

/** Illustrative cuff target used for the simulated cycle (not a device spec). */
const PEAK = 142;
const LED_MA = 50;
const CYCLE_END = 0.88; // scroll progress at which the 4-phase cycle completes; the rest shows the result

const easeOut = (x: number) => 1 - (1 - x) * (1 - x);
const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

/** Simulated state at cycle progress t ∈ [0,1]. */
function sample(t: number) {
  let pressure = 0;
  let led = 0;
  if (t < 0.25) pressure = PEAK * easeOut(t / 0.25);
  else if (t < 0.5) pressure = PEAK;
  else if (t < 0.75) {
    const u = (t - 0.5) / 0.25;
    pressure = PEAK - 3 * u;
    led = LED_MA * Math.min(1, u / 0.08) * (u > 0.94 ? (1 - u) / 0.06 : 1);
  } else pressure = (PEAK - 3) * (1 - easeInOut((t - 0.75) / 0.25));
  return { pressure, led };
}

interface SceneNodes {
  pressure: HTMLSpanElement;
  led1: HTMLSpanElement;
  led2: HTMLSpanElement;
  pct: HTMLSpanElement;
  ring: SVGCircleElement;
  clip: SVGRectElement;
  head: SVGGElement;
  beam1: SVGGElement;
  beam2: SVGGElement;
  cuff: SVGGElement;
  result: HTMLDivElement;
}

const CHART_W = 600;
const CHART_H = 180;
const yFor = (p: number) => CHART_H - 14 - (p / 160) * (CHART_H - 34);
const CURVE = Array.from({ length: 121 }, (_, i) => {
  const t = i / 120;
  return `${i === 0 ? 'M' : 'L'} ${(t * CHART_W).toFixed(1)} ${yFor(sample(t).pressure).toFixed(1)}`;
}).join(' ');

export function HowItWorks() {
  const uid = useId();
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(reduced ? 2 : 0);
  const phaseRef = useRef(phase);

  // DOM nodes the scroll scene writes to directly (no React re-render per frame).
  const el = useRef<Partial<SceneNodes>>({});
  const bind =
    <K extends keyof SceneNodes>(key: K) =>
    (node: SceneNodes[K] | null) => {
      el.current[key] = node ?? undefined;
    };

  const render = useCallback((p: number) => {
    const n = el.current;
    const t = segment(p, 0, CYCLE_END);
    const res = segment(p, CYCLE_END, 1);
    const { pressure, led } = sample(t);
    const measuring = t >= 0.5 && t < 0.75;
    const shimmer = measuring ? 0.75 + 0.25 * Math.sin(t * 160) : 0;

    if (n.pressure) n.pressure.textContent = pressure.toFixed(0).padStart(3, '0');
    if (n.led1) n.led1.textContent = led.toFixed(1).padStart(4, '0');
    if (n.led2) n.led2.textContent = led.toFixed(1).padStart(4, '0');
    if (n.pct) n.pct.textContent = `${Math.round(t * 100)}`.padStart(2, '0');
    n.ring?.setAttribute('stroke-dasharray', `${t.toFixed(4)} 1`);
    n.clip?.setAttribute('transform', `scale(${t.toFixed(4)} 1)`);
    n.head?.setAttribute('transform', `translate(${(t * CHART_W).toFixed(1)} ${yFor(pressure).toFixed(1)})`);
    if (n.beam1) n.beam1.style.opacity = String((led / LED_MA) * shimmer);
    if (n.beam2) n.beam2.style.opacity = String((led / LED_MA) * (1.5 - shimmer) * 0.85);
    if (n.cuff) n.cuff.style.transform = `scaleY(${(1 + 0.32 * (pressure / PEAK)).toFixed(3)})`;
    if (n.result) {
      n.result.style.opacity = String(res);
      n.result.style.transform = `translateY(${(1 - res) * 16}px)`;
    }

    const next = res > 0.35 ? 4 : Math.min(3, Math.floor(t * 4));
    if (next !== phaseRef.current) {
      phaseRef.current = next;
      setPhase(next);
    }
  }, []);

  // Reduced motion: no pin, no scrub — show the cycle frozen mid-measurement.
  useEffect(() => {
    if (reduced) render(CYCLE_END * 0.62);
  }, [reduced, render]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const pinned = (end: string) => {
        render(0);
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => render(self.progress),
        });
        return () => st.kill();
      };
      mm.add(MM.full, () => pinned('+=320%'));
      mm.add(MM.compact, () => pinned('+=220%'));
    },
    { scope: root },
  );

  const PhaseText = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-sm text-primary-text">0{phase + 1}</p>
        <p className="text-2xl font-semibold tracking-[-0.03em]">{PHASES[phase].name}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-text">{PHASES[phase].body}</p>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section
      id="how-it-works"
      ref={root}
      aria-labelledby="how-title"
      className={`relative overflow-hidden px-4 sm:px-6 ${reduced ? 'py-28' : 'flex min-h-[100svh] items-center py-10 md:py-0'}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(50% 50% at 80% 50%, color-mix(in srgb, var(--c-ring-start) 22%, transparent), transparent 70%)',
        }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-12 md:gap-12">
        {/* Copy + phase rail */}
        <div className="md:col-span-5">
          <h2 id="how-title" className="eyebrow">
            How it works
          </h2>
          <p className="text-title mt-3 text-balance">One cycle. Four phases. Two wavelengths of light.</p>

          {/* Mobile: only the active phase */}
          <div className="mt-6 min-h-[132px] md:hidden" aria-live="polite">
            {PhaseText}
          </div>

          {/* Desktop: full rail */}
          <ol className="mt-10 hidden space-y-1 md:block">
            {PHASES.map((ph, i) => {
              const on = i === phase;
              return (
                <li
                  key={ph.name}
                  aria-current={on ? 'step' : undefined}
                  className="relative rounded-2xl py-2.5 pl-6 pr-4"
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-3 bottom-3 w-[3px] origin-top rounded-full bg-gradient-to-b from-ring-start to-ring-end transition-transform duration-500 ${on ? 'scale-y-100' : 'scale-y-0'}`}
                  />
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-primary-text">0{i + 1}</span>
                    <span className={`text-lg font-semibold tracking-[-0.02em] transition-colors duration-500 ${on ? 'text-ink' : 'text-muted-text'}`}>
                      {ph.name}
                    </span>
                  </p>
                  {/* Only the active phase shows its description (inactive text stays at full contrast). */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <p className="overflow-hidden pt-1 text-sm leading-relaxed text-muted-text">{ph.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Instrument panel */}
        <div className="glass relative rounded-[32px] p-4 sm:p-6 md:col-span-7">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-text">
              Simulated cycle · {PHASES[phase].name}
            </p>
            <div className="relative grid size-14 place-items-center">
              <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="28" cy="28" r="24" fill="none" stroke="var(--c-ring-track)" strokeWidth="5" />
                <circle
                  ref={bind('ring')}
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke={`url(#${uid}-ring)`}
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0 1"
                />
                <defs>
                  <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--c-ring-start)" />
                    <stop offset="1" stopColor="var(--c-ring-end)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-mono text-xs font-bold">
                <span ref={bind('pct')}>00</span>%
              </span>
            </div>
          </div>

          <div className="mt-3 grid gap-4 sm:grid-cols-[1.1fr_1fr] sm:items-center">
            {/* Finger, cuff and the two beams */}
            <svg viewBox="0 0 260 190" className="h-[165px] w-full sm:h-[200px]" role="img" aria-label="Diagram: two LEDs at 1200 nm and 1720 nm shining through a finger held by an inflatable cuff, onto a photodiode.">
              <defs>
                <linearGradient id={`${uid}-b1`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--c-cyan)" stopOpacity="0.95" />
                  <stop offset="1" stopColor="var(--c-cyan)" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id={`${uid}-b2`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--c-pink)" stopOpacity="0.95" />
                  <stop offset="1" stopColor="var(--c-ring-start)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* LEDs */}
              <rect x="78" y="14" width="22" height="12" rx="3" fill="var(--c-cyan)" />
              <rect x="160" y="14" width="22" height="12" rx="3" fill="var(--c-pink)" />
              <text x="89" y="9" textAnchor="middle" className="fill-ink font-mono text-[11px]">1200 nm</text>
              <text x="171" y="9" textAnchor="middle" className="fill-ink font-mono text-[11px]">1720 nm</text>
              {/* beams */}
              <g ref={bind('beam1')} style={{ opacity: 0 }}>
                <polygon points="80,26 98,26 112,166 66,166" fill={`url(#${uid}-b1)`} />
              </g>
              <g ref={bind('beam2')} style={{ opacity: 0 }}>
                <polygon points="162,26 180,26 194,166 148,166" fill={`url(#${uid}-b2)`} />
              </g>
              {/* cuff (inflates) */}
              <g ref={bind('cuff')} style={{ transformOrigin: '130px 96px', transformBox: 'view-box' }}>
                <rect x="34" y="70" width="192" height="52" rx="26" fill="var(--c-surface-alt)" stroke="var(--c-divider)" strokeWidth="1.5" />
              </g>
              {/* finger */}
              <rect x="20" y="80" width="220" height="32" rx="16" fill="var(--c-pink)" opacity="0.9" />
              <rect x="20" y="80" width="220" height="32" rx="16" fill="none" stroke="var(--c-ring-start)" strokeWidth="1.2" />
              {/* photodiode */}
              <rect x="106" y="166" width="48" height="12" rx="3" fill="var(--c-primary)" />
              <text x="130" y="188" textAnchor="middle" className="fill-ink font-mono text-[11px]">photodiode + TIA</text>
            </svg>

            {/* Readouts */}
            <dl className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-3">
              <div className="rounded-2xl bg-surface-alt/80 p-3">
                <dt className="text-[11px] text-muted-text">Cuff pressure</dt>
                <dd className="font-mono text-lg font-bold tracking-[-0.03em] sm:text-2xl">
                  <span ref={bind('pressure')}>000</span>
                  <span className="ml-1 text-[11px] font-normal text-muted-text">mmHg</span>
                </dd>
              </div>
              <div className="rounded-2xl bg-surface-alt/80 p-3">
                <dt className="text-[11px] text-muted-text">LED 1200 nm</dt>
                <dd className="font-mono text-lg font-bold tracking-[-0.03em] sm:text-2xl">
                  <span ref={bind('led1')}>00.0</span>
                  <span className="ml-1 text-[11px] font-normal text-muted-text">mA</span>
                </dd>
              </div>
              <div className="rounded-2xl bg-surface-alt/80 p-3">
                <dt className="text-[11px] text-muted-text">LED 1720 nm</dt>
                <dd className="font-mono text-lg font-bold tracking-[-0.03em] sm:text-2xl">
                  <span ref={bind('led2')}>00.0</span>
                  <span className="ml-1 text-[11px] font-normal text-muted-text">mA</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Cuff pressure trace */}
          <div className="relative mt-4 rounded-2xl bg-surface-alt/60 p-3">
            <p className="mb-1 flex justify-between font-mono text-[10px] text-muted-text">
              <span>Cuff pressure · mmHg</span>
              <span className="hidden sm:inline">Inflate · Hold · Measure · Deflate</span>
            </p>
            <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="h-[56px] w-full sm:h-[120px]" preserveAspectRatio="none" aria-hidden>
              <defs>
                <clipPath id={`${uid}-clip`}>
                  <rect ref={bind('clip')} x="0" y="0" width={CHART_W} height={CHART_H} transform="scale(0 1)" />
                </clipPath>
                <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="var(--c-ring-start)" />
                  <stop offset="1" stopColor="var(--c-ring-end)" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((x) => (
                <line key={x} x1={x * CHART_W} x2={x * CHART_W} y1="0" y2={CHART_H} stroke="var(--c-divider)" strokeDasharray="4 6" />
              ))}
              <path d={CURVE} fill="none" stroke="var(--c-divider)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path
                d={CURVE}
                fill="none"
                stroke={`url(#${uid}-line)`}
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                clipPath={`url(#${uid}-clip)`}
              />
              <g ref={bind('head')} transform={`translate(0 ${yFor(0)})`}>
                <circle r="7" fill="var(--c-ring-end)" opacity="0.25" />
                <circle r="3.5" fill="var(--c-ring-end)" />
              </g>
            </svg>
          </div>

          {/* Result overlay */}
          <div
            ref={bind('result')}
            className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl bg-hero p-4 text-white shadow-xl sm:inset-x-6 sm:bottom-6"
            style={{ opacity: 0 }}
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Bluetooth className="size-4" aria-hidden /> Cycle complete — estimate sent to the app over BLE
            </p>
            <p className="mt-1 text-xs text-white/80">
              Illustrative values. A research prototype; readings are not validated for clinical use.
            </p>
          </div>
        </div>
      </div>
      {reduced && (
        <ResultNote className="mx-auto mt-6 max-w-6xl">
          Shown mid-cycle with illustrative values. Research prototype, not a medical device.
        </ResultNote>
      )}
    </section>
  );
}
