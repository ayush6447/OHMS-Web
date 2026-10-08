import { useRef } from 'react';
import { IsoBoard, BOARD_ASPECT, type Part } from '@/components/IsoBoard';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { MM, gsap, useGSAP } from '@/lib/gsap';

interface Layer {
  name: string;
  part: string;
  body: string;
  accent: string;
  parts: Part[];
}

// Top of the stack first. Parts are listed back-to-front so they overlap correctly.
const LAYERS: Layer[] = [
  {
    name: 'BLE link',
    part: 'ESP32-C3',
    body: 'Streams the live cycle to the phone over Bluetooth Low Energy.',
    accent: 'var(--c-cyan)',
    parts: [
      { x: 150, y: 20, w: 70, d: 18, h: 3, fill: 'var(--c-cyan)' },
      { x: 70, y: 50, w: 80, d: 60, h: 10, fill: 'var(--c-on-badge)' },
    ],
  },
  {
    name: 'Controller',
    part: 'Teensy 4',
    body: 'Runs the four-phase cycle and samples the sensor.',
    accent: 'var(--c-ring-end)',
    parts: [
      { x: 30, y: 30, w: 30, d: 100, h: 6, fill: 'var(--c-ring-start)' },
      { x: 95, y: 45, w: 70, d: 70, h: 12, fill: 'var(--c-on-badge)' },
      { x: 190, y: 60, w: 26, d: 40, h: 8, fill: 'var(--c-muted)' },
    ],
  },
  {
    name: 'LED driver',
    part: 'Dual constant-current SWIR',
    body: 'Drives the 1200 nm and 1720 nm LEDs at a controlled current.',
    accent: 'var(--c-pink)',
    parts: [
      { x: 40, y: 40, w: 50, d: 40, h: 8, fill: 'var(--c-on-badge)' },
      { x: 150, y: 40, w: 50, d: 40, h: 8, fill: 'var(--c-on-badge)' },
      { x: 60, y: 110, w: 20, d: 20, h: 10, fill: 'var(--c-cyan)', glow: true },
      { x: 170, y: 110, w: 20, d: 20, h: 10, fill: 'var(--c-pink)', glow: true },
    ],
  },
  {
    name: 'Sensor / TIA',
    part: 'Photodiode + transimpedance amp',
    body: 'Converts the light reaching the photodiode into a signal the controller can read.',
    accent: 'var(--c-ring-start)',
    parts: [
      { x: 60, y: 50, w: 60, d: 40, h: 8, fill: 'var(--c-on-badge)' },
      { x: 150, y: 60, w: 36, d: 36, h: 6, fill: 'var(--c-primary)', glow: true },
      { x: 40, y: 115, w: 140, d: 14, h: 4, fill: 'var(--c-muted)' },
    ],
  },
  {
    name: 'Pneumatics',
    part: 'Pump + valve',
    body: 'Inflates, holds and releases the finger cuff.',
    accent: 'var(--c-primary)',
    parts: [
      { x: 30, y: 40, w: 100, d: 60, h: 26, fill: 'var(--c-muted)' },
      { x: 160, y: 50, w: 40, d: 40, h: 18, fill: 'var(--c-on-badge)' },
      { x: 130, y: 66, w: 30, d: 8, h: 8, fill: 'var(--c-ring-start)' },
    ],
  },
];

const TIGHT = 0.1; // collapsed spacing as a fraction of the exploded spacing

export function Hardware() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const build = (end: string) => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-layer]');
        const labels = gsap.utils.toArray<HTMLElement>('[data-layer-label]');
        const mid = (rows.length - 1) / 2;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.from(rows, { y: (i, el: HTMLElement) => (mid - i) * el.offsetHeight * (1 - TIGHT), duration: 1 }, 0)
          .from(labels, { opacity: 0, x: -24, stagger: 0.08, duration: 0.45 }, 0.45)
          .from('[data-hw-caption]', { opacity: 0, duration: 0.3 }, 0.9);
      };
      mm.add(MM.full, () => build('+=160%'));
      mm.add(MM.compact, () => build('+=110%'));
    },
    { scope: root },
  );

  return (
    <section
      id="hardware"
      ref={root}
      aria-labelledby="hardware-title"
      className={`relative overflow-hidden px-4 sm:px-6 ${reduced ? 'py-28' : 'flex min-h-[100svh] flex-col justify-center py-14'}`}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-x-10 lg:grid-cols-12">
        <div className="max-w-2xl lg:col-span-4">
          <h2 id="hardware-title" className="eyebrow">
            Inside the hardware
          </h2>
          <p className="text-title mt-3 text-balance">Five boards. One job each.</p>
          <p className="text-lede mt-3 hidden text-muted-text sm:block">
            The v2 rebuild splits the device into modules, so every function lives on its own board.
          </p>
          <p data-hw-caption className="mt-6 hidden font-mono text-[11px] text-muted-text lg:block">
            Illustration · not to scale · physical stacking order may differ
          </p>
        </div>

        <ol
          className="mt-4 py-[calc(var(--wb)*0.17)] md:mt-6 lg:col-span-8 lg:mt-0"
          style={{ ['--wb' as string]: 'clamp(140px, min(40vw, calc(46svh - 90px)), 340px)' } as React.CSSProperties}
        >
          {LAYERS.map((l, i) => (
            <li
              key={l.name}
              data-layer
              className="relative flex items-center will-change-transform"
              style={{ height: `calc(var(--wb) * ${(BOARD_ASPECT * 0.5).toFixed(3)})`, zIndex: LAYERS.length - i }}
            >
              <div className="relative shrink-0" style={{ width: 'var(--wb)' }}>
                <IsoBoard accent={l.accent} parts={l.parts} />
              </div>
              <div data-layer-label className="flex min-w-0 items-center gap-3 pl-3 sm:gap-4 sm:pl-6">
                <span aria-hidden className="hidden h-px w-10 shrink-0 bg-divider sm:block md:w-16" />
                <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: l.accent }} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-tight tracking-[-0.02em] sm:text-xl">{l.name}</h3>
                  <p className="font-mono text-[11px] text-primary-text sm:text-xs">{l.part}</p>
                  <p className="mt-1 hidden max-w-xs text-sm leading-snug text-muted-text md:block">{l.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-2 font-mono text-[11px] text-muted-text lg:hidden">
          Illustration · not to scale · physical stacking order may differ
        </p>
      </div>
    </section>
  );
}
