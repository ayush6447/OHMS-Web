import { Search, SlidersHorizontal } from 'lucide-react';
import { bandFor } from '@/lib/cholesterol';
import { ScreenShell } from './ScreenShell';

/** Sample rows for the mock History screen. */
const READINGS = [
  { v: 182, when: 'Today · 08:12' },
  { v: 205, when: 'Mon · 19:40' },
  { v: 176, when: 'Sun · 09:05' },
  { v: 214, when: 'Fri · 07:58' },
  { v: 188, when: 'Wed · 08:30' },
];

const FILTERS = ['All', 'Desirable', 'Borderline', 'High'];

export function HistoryScreen() {
  return (
    <ScreenShell active="history" title="History" kicker="Your readings">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-alt px-3 py-2 text-[11px] text-muted-text">
          <Search className="size-3.5" /> Search readings
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-surface-alt">
          <SlidersHorizontal className="size-3.5" />
        </span>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${i === 0 ? 'bg-pink text-on-pink' : 'bg-badge text-on-badge'}`}
          >
            {f}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {READINGS.map((r) => {
          const band = bandFor(r.v);
          const color = band.label === 'Desirable' ? 'var(--c-ok-text)' : 'var(--c-primary-text)';
          return (
            <li key={r.when} className="flex items-center justify-between rounded-[18px] bg-surface px-3.5 py-2.5 shadow-[0_6px_20px_-14px_rgba(16,26,115,0.3)]">
              <div>
                <p className="font-mono text-[16px] font-bold tracking-[-0.03em]">
                  {r.v}
                  <span className="ml-1 text-[9px] font-normal text-muted-text">mg/dL</span>
                </p>
                <p className="text-[10px] text-muted-text">{r.when}</p>
              </div>
              <span className="rounded-full bg-surface-alt px-2 py-0.5 text-[9.5px] font-semibold" style={{ color }}>
                {band.label}
              </span>
            </li>
          );
        })}
      </ul>
    </ScreenShell>
  );
}
