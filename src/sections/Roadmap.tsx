import { useRef } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Text } from '@/components/Text';
import { roadmap, statusLabel, type MilestoneStatus } from '@/content/site';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { MM, gsap, useGSAP } from '@/lib/gsap';

const chipClass: Record<MilestoneStatus, string> = {
  done: 'bg-surface-alt text-ok-text',
  now: 'bg-pink text-on-pink',
  next: 'bg-badge text-on-badge',
  later: 'border border-dashed border-divider text-muted-text',
};

function Dot({ status }: { status: MilestoneStatus }) {
  if (status === 'done')
    return (
      <span className="grid size-6 place-items-center rounded-full bg-ok text-white">
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  if (status === 'now')
    return (
      <span className="relative grid size-6 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
        <span className="size-4 rounded-full bg-primary ring-4 ring-primary/20" />
      </span>
    );
  return <span className="block size-3.5 rounded-full border-2 border-divider bg-bg" />;
}

function Card({ m, index }: { m: (typeof roadmap)[number]; index: number }) {
  const now = m.status === 'now';
  return (
    <article
      className={`relative flex h-full flex-col rounded-[28px] p-7 ${now ? 'glass ring-2 ring-primary/40' : 'card'}`}
      aria-current={now ? 'step' : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-muted-text">0{index + 1}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${chipClass[m.status]}`}>
          {statusLabel[m.status]}
          {now && ' · we are here'}
        </span>
      </div>
      <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
        <Text>{m.title}</Text>
      </h3>
      <p className="mt-3 leading-relaxed text-muted-text">
        <Text>{m.body}</Text>
      </p>
    </article>
  );
}

export function Roadmap() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const horizontal = isDesktop && !reduced;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MM.full, () => {
        const el = track.current;
        if (!el) return;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo('[data-road-progress]', { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        });
      });
    },
    { scope: root, dependencies: [horizontal] },
  );

  return (
    <section
      id="roadmap"
      ref={root}
      aria-labelledby="roadmap-title"
      className={`relative overflow-hidden ${horizontal ? 'flex min-h-[100svh] flex-col justify-center py-16' : 'py-28'}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 id="roadmap-title" className="eyebrow">
          Roadmap
        </h2>
        <p className="text-title mt-3 max-w-2xl text-balance">From bench prototype to a calibrated estimate.</p>
        <p className="text-lede mt-3 max-w-2xl text-muted-text">
          We are at v2. The next step is collecting real data in a clinic so the signal can be calibrated against lab
          results.
        </p>
      </div>

      {horizontal ? (
        <div className="mt-14">
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="h-px w-full bg-divider" />
            <div data-road-progress className="absolute inset-x-6 top-0 h-px origin-left bg-gradient-to-r from-ring-start to-ring-end" />
          </div>
          <ol
            ref={track}
            className="mt-8 flex gap-5 will-change-transform pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          >
            {roadmap.map((m, i) => (
              <li key={m.title + i} className="w-[min(420px,36vw)] shrink-0">
                <div className="mb-5">
                  <Dot status={m.status} />
                </div>
                <Card m={m} index={i} />
              </li>
            ))}
            {/* trailing space so the last card can settle away from the edge */}
            <li aria-hidden className="w-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] shrink-0" />
          </ol>
        </div>
      ) : (
        <ol className="relative mx-auto mt-12 max-w-6xl space-y-5 px-4 sm:px-6">
          <span aria-hidden className="absolute bottom-6 left-[calc(1rem+11px)] top-6 w-px bg-divider sm:left-[calc(1.5rem+11px)]" />
          {roadmap.map((m, i) => (
            <motion.li
              key={m.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-4"
            >
              <div className="relative z-[1] flex w-6 shrink-0 justify-center pt-7">
                <Dot status={m.status} />
              </div>
              <div className="min-w-0 flex-1">
                <Card m={m} index={i} />
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}
