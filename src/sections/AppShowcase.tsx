import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bluetooth, Moon, Sun } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { DashboardScreen } from '@/components/app-screens/DashboardScreen';
import { MeasureScreen } from '@/components/app-screens/MeasureScreen';
import { HistoryScreen } from '@/components/app-screens/HistoryScreen';
import { SettingsScreen } from '@/components/app-screens/SettingsScreen';
import { StoreBadges } from '@/components/Platforms';
import { ResultNote } from '@/components/Disclaimer';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useTheme } from '@/theme/theme-context';
import type { ThemeMode } from '@/theme/tokens';

interface Step {
  key: string;
  title: string;
  body: string;
  label: string;
  screen: (mode: ThemeMode) => ReactNode;
}

const STEPS: Step[] = [
  {
    key: 'dashboard',
    title: 'See where you stand at a glance.',
    body: 'The Dashboard ring shows your latest total cholesterol estimate on a 0–300 mg/dL scale, banded Desirable (<200), Borderline (200–239) and High (≥240).',
    label: 'App Dashboard with the cholesterol ring gauge (sample data).',
    screen: () => <DashboardScreen />,
  },
  {
    key: 'measure',
    title: 'Watch every cycle as it happens.',
    body: 'The live phase, cuff pressure, progress and both LED currents stream in over Bluetooth LE. Start and stop a measurement from your phone.',
    label: 'App Measure screen showing the Measure phase, cuff pressure 142 mmHg and two LED currents of 50.0 mA (sample data).',
    screen: () => <MeasureScreen />,
  },
  {
    key: 'history',
    title: 'Every reading, kept and searchable.',
    body: 'Search past readings, filter by band and scroll back through reading cards.',
    label: 'App History screen with a search field, band filters and reading cards (sample data).',
    screen: () => <HistoryScreen />,
  },
  {
    key: 'settings',
    title: 'Light or dark. mg/dL or mmol/L.',
    body: 'Switch the whole app between light and dark themes, and show results in the units you are used to.',
    label: 'App Settings screen with theme and unit toggles.',
    screen: (mode) => <SettingsScreen mode={mode} />,
  },
];

const flip = (m: ThemeMode): ThemeMode => (m === 'dark' ? 'light' : 'dark');

function Screen({ index, mode }: { index: number; mode: ThemeMode }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={STEPS[index].key}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -28, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {STEPS[index].screen(mode)}
      </motion.div>
    </AnimatePresence>
  );
}

export function AppShowcase() {
  const root = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { mode } = useTheme();
  const [active, setActive] = useState(0);
  const phoneMode = active === 3 ? flip(mode) : mode;

  useGSAP(
    () => {
      if (!isDesktop) return;
      const triggers = createStepTriggers(root.current, setActive);
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root, dependencies: [isDesktop] },
  );

  return (
    <section id="app" ref={root} aria-labelledby="app-title" className="relative px-4 py-28 sm:px-6 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(45% 35% at 20% 30%, color-mix(in srgb, var(--c-pink) 35%, transparent), transparent 70%), radial-gradient(40% 40% at 85% 70%, color-mix(in srgb, var(--c-cyan) 16%, transparent), transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 id="app-title" className="eyebrow">
            The app
          </h2>
          <p className="text-headline mt-4 text-balance">Your cycle, live on your phone.</p>
          <p className="text-lede mx-auto mt-5 max-w-2xl text-muted-text">
            A Flutter companion app for <strong className="font-semibold text-ink">Android and iOS</strong> pairs with
            the device over <span className="whitespace-nowrap">Bluetooth LE</span> and streams every cycle as it
            runs.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <StoreBadges className="justify-center" />
            <p className="flex items-center gap-1.5 text-xs text-muted-text">
              <Bluetooth className="size-3.5" aria-hidden /> One codebase, both platforms, same light and dark themes as
              this page.
            </p>
          </div>
        </motion.header>

        {isDesktop ? (
          <div className="mt-24 grid grid-cols-12 gap-10">
            <ol className="col-span-6 lg:col-span-5">
              {STEPS.map((s, i) => (
                <li key={s.key} data-app-step className="flex min-h-[80vh] flex-col justify-center">
                  <div>
                    <p className="font-mono text-sm text-primary-text">0{i + 1} · {s.key[0].toUpperCase() + s.key.slice(1)}</p>
                    <h3
                      className={`text-title mt-3 text-balance transition-colors duration-500 ${active === i ? 'text-ink' : 'text-muted-text'}`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`text-lede mt-4 text-muted-text transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {s.body}
                    </p>
                    {i === 3 && (
                      <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-text">
                        {phoneMode === 'dark' ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
                        The phone is showing the {phoneMode} theme.
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className="col-span-6 lg:col-span-7">
              <div className="sticky top-[calc(50vh-320px)] flex flex-col items-center">
                <PhoneFrame mode={phoneMode} label={STEPS[active].label}>
                  <Screen index={active} mode={phoneMode} />
                </PhoneFrame>
                <div className="mt-6 flex gap-2" aria-hidden>
                  {STEPS.map((s, i) => (
                    <span
                      key={s.key}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-primary' : 'w-1.5 bg-divider'}`}
                    />
                  ))}
                </div>
                <ResultNote className="mt-4 max-w-[290px] text-center">
                  Sample data. Research prototype, not a medical device.
                </ResultNote>
              </div>
            </div>
          </div>
        ) : (
          <ol className="mt-16 space-y-20">
            {STEPS.map((s, i) => {
              const m = i === 3 ? flip(mode) : mode;
              return (
                <motion.li
                  key={s.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-sm text-primary-text">0{i + 1} · {s.key[0].toUpperCase() + s.key.slice(1)}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-text">{s.body}</p>
                  <div className="mt-6 flex justify-center">
                    {/* 290×610 design size scaled to fit narrow screens */}
                    <div className="h-[488px] w-[232px]">
                      <div className="origin-top-left scale-[0.8]">
                        <PhoneFrame mode={m} label={s.label}>
                          <div className="absolute inset-0">{s.screen(m)}</div>
                        </PhoneFrame>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
            <ResultNote>Sample data. Research prototype, not a medical device.</ResultNote>
          </ol>
        )}
      </div>
    </section>
  );
}

/** One ScrollTrigger per text step: whichever step crosses the viewport centre drives the phone. */
function createStepTriggers(scope: HTMLElement | null, onActive: (i: number) => void) {
  if (!scope) return [];
  return Array.from(scope.querySelectorAll<HTMLElement>('[data-app-step]')).map((el, i) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => self.isActive && onActive(i),
    }),
  );
}
