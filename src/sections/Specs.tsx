import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import CountUp from '@/components/reactbits/CountUp';
import ScrollVelocity from '@/components/reactbits/ScrollVelocity';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface Spec {
  /** Numeric value counted up to; omit for text-only specs. */
  value?: number;
  prefix?: string;
  text?: string;
  label: string;
  detail: string;
  span?: string;
}

// Only real, design-level facts about the v2 prototype. No performance claims.
const SPECS: Spec[] = [
  { prefix: '0–', value: 300, label: 'mg/dL display range', detail: 'Desirable <200 · Borderline 200–239 · High ≥240', span: 'col-span-2' },
  { value: 2, label: 'SWIR wavelengths', detail: '1200 nm · 1720 nm' },
  { value: 4, label: 'Phase cycle', detail: 'Inflate · Hold · Measure · Deflate' },
  { value: 5, label: 'Hardware modules', detail: 'Controller · LED driver · Sensor/TIA · Pneumatics · BLE' },
  { text: 'BLE', label: 'Wireless link', detail: 'ESP32-C3 to your phone' },
  { value: 2, label: 'Platforms', detail: 'Android + iOS' },
  { value: 2, label: 'Themes', detail: 'Light + dark' },
];

const MARQUEE = [
  'Near-infrared  ·  1200 nm  ·  1720 nm  ·  Pneumatic cuff  ·  Needle-free  ·  ',
  'Teensy 4  ·  ESP32-C3  ·  Bluetooth LE  ·  Android  ·  iOS  ·  Flutter  ·  ',
];

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  // Mount the animation only while near the viewport so it never runs offscreen.
  const near = useInView(ref, { margin: '200px 0px' });
  const reduced = usePrefersReducedMotion();
  const rowClass = 'px-3 text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[1.15] tracking-[-0.045em]';

  return (
    <div ref={ref} aria-hidden className="relative mt-24 select-none overflow-hidden md:mt-32">
      {near && !reduced ? (
        <ScrollVelocity
          texts={[
            <span key="a" className="text-ink">{MARQUEE[0]}</span>,
            <span key="b" className="text-transparent [-webkit-text-stroke:1.5px_var(--c-primary-text)]">{MARQUEE[1]}</span>,
          ]}
          velocity={40}
          numCopies={4}
          className={rowClass}
        />
      ) : (
        <div className="whitespace-nowrap">
          <p className={`${rowClass} text-ink`}>{MARQUEE[0]}</p>
          <p className={`${rowClass} text-transparent [-webkit-text-stroke:1.5px_var(--c-primary-text)]`}>{MARQUEE[1]}</p>
        </div>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent md:w-40" />
    </div>
  );
}

export function Specs() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="specs" aria-labelledby="specs-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="specs-title" className="eyebrow">
          Specs
        </h2>
        <p className="text-title mt-3 max-w-2xl text-balance">The prototype, by the numbers we can stand behind.</p>

        <dl className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {SPECS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`card flex flex-col p-5 sm:p-7 ${s.span ?? ''}`}
            >
              <dt className="order-2 font-semibold tracking-[-0.01em]">{s.label}</dt>
              <dd className="order-1 mb-auto pb-8 font-mono text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.06em]">
                {s.prefix}
                {s.value === undefined ? (
                  s.text
                ) : reduced ? (
                  s.value
                ) : (
                  <CountUp to={s.value} duration={1.6} />
                )}
              </dd>
              <dd className="order-3 mt-1 text-sm leading-snug text-muted-text">{s.detail}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
      <Marquee />
    </section>
  );
}
