import { Bluetooth } from 'lucide-react';
import { RingGauge } from '../RingGauge';
import { BANDS, bandFor } from '@/lib/cholesterol';
import { ScreenShell } from './ScreenShell';

/** Sample value shown in the mock UI. Illustration only — not a real reading. */
export const SAMPLE_READING = 182;

const bandColor = (label: string) =>
  label === 'Desirable' ? 'var(--c-ok-text)' : label === 'Borderline' ? 'var(--c-primary-text)' : 'var(--c-danger-text)';

export function DashboardScreen({ value = SAMPLE_READING, reveal = 1 }: { value?: number; reveal?: number }) {
  const band = bandFor(value);
  return (
    <ScreenShell active="dashboard" title="Dashboard" kicker="Good morning">
      <div className="flex items-center gap-1.5 self-start rounded-full bg-badge px-2.5 py-1 text-[10px] font-medium text-on-badge">
        <span className="size-1.5 rounded-full bg-cyan" />
        <Bluetooth className="size-3" />
        OMHS v2 · Connected
      </div>

      <div className="mt-3 rounded-[24px] bg-surface p-4 shadow-[0_10px_30px_-18px_rgba(16,26,115,0.35)]">
        <p className="text-[11px] font-medium text-muted-text">Total cholesterol</p>
        <div className="mt-1 flex justify-center">
          <RingGauge value={value} reveal={reveal} size={176} stroke={13}>
            <div className="text-center">
              <p className="font-mono text-[38px] font-bold leading-none tracking-[-0.04em]">
                {Math.round(value * reveal)}
              </p>
              <p className="mt-1 text-[11px] text-muted-text">mg/dL</p>
              <p
                className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                style={{ color: bandColor(band.label), background: 'var(--c-surface-alt)' }}
              >
                {band.label}
              </p>
            </div>
          </RingGauge>
        </div>
        <div className="-mt-3 flex justify-between font-mono text-[9px] text-muted-text">
          <span>0</span>
          <span>300</span>
        </div>
        <ul className="mt-3 grid grid-cols-3 gap-1 text-center text-[9px]">
          {BANDS.map((b) => (
            <li key={b.label} className="rounded-xl bg-surface-alt px-1 py-1.5">
              <span className="block font-semibold" style={{ color: bandColor(b.label) }}>
                {b.label}
              </span>
              <span className="font-mono text-muted-text">{b.range}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-[20px] bg-surface-alt px-4 py-3">
        <div>
          <p className="text-[10px] text-muted-text">Last measured</p>
          <p className="text-[12px] font-semibold">Today, 08:12</p>
        </div>
        <span className="rounded-full bg-button px-3.5 py-2 text-[11px] font-semibold text-on-primary">Measure</span>
      </div>
      <p className="mt-2 text-center text-[9px] text-muted-text">Sample data · research prototype</p>
    </ScreenShell>
  );
}
