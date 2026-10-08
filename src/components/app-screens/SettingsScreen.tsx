import { Bluetooth, Info, Moon, Ruler, Sun } from 'lucide-react';
import type { ThemeMode } from '@/theme/tokens';
import { ScreenShell } from './ScreenShell';

function Segmented({ options, active }: { options: React.ReactNode[]; active: number }) {
  return (
    <div className="relative grid grid-cols-2 rounded-full bg-surface-alt p-1 text-[11px] font-semibold">
      <span
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-button transition-transform duration-500 ease-out-expo"
        style={{ transform: active === 1 ? 'translateX(100%)' : 'none' }}
      />
      {options.map((o, i) => (
        <span
          key={i}
          className={`relative z-[1] flex items-center justify-center gap-1 py-1.5 ${i === active ? 'text-on-primary' : 'text-muted-text'}`}
        >
          {o}
        </span>
      ))}
    </div>
  );
}

export function SettingsScreen({ mode }: { mode: ThemeMode }) {
  return (
    <ScreenShell active="settings" title="Settings" kicker="Preferences">
      <div className="space-y-2.5">
        <section className="rounded-[20px] bg-surface p-3.5 shadow-[0_6px_20px_-14px_rgba(16,26,115,0.3)]">
          <p className="mb-2 text-[11px] font-semibold">Appearance</p>
          <Segmented
            active={mode === 'dark' ? 1 : 0}
            options={[
              <>
                <Sun className="size-3" /> Light
              </>,
              <>
                <Moon className="size-3" /> Dark
              </>,
            ]}
          />
        </section>
        <section className="rounded-[20px] bg-surface p-3.5 shadow-[0_6px_20px_-14px_rgba(16,26,115,0.3)]">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold">
            <Ruler className="size-3.5" /> Units
          </p>
          <Segmented active={0} options={['mg/dL', 'mmol/L']} />
        </section>
        <section className="rounded-[20px] bg-surface p-3.5 shadow-[0_6px_20px_-14px_rgba(16,26,115,0.3)]">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold">
            <Bluetooth className="size-3.5" /> Device
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[10.5px]">
            <span className="text-muted-text">OMHS v2 · ESP32-C3</span>
            <span className="flex items-center gap-1 font-semibold text-ok-text">
              <span className="size-1.5 rounded-full bg-ok" /> Connected
            </span>
          </div>
        </section>
        <section className="flex gap-2 rounded-[20px] bg-surface-alt p-3.5 text-[10px] leading-snug text-muted-text">
          <Info className="mt-px size-3.5 shrink-0" />
          Research prototype. Not a medical device; not for diagnosis or treatment.
        </section>
      </div>
    </ScreenShell>
  );
}
