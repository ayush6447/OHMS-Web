import { ScreenShell } from './ScreenShell';

const PHASES = ['Inflate', 'Hold', 'Measure', 'Deflate'] as const;

/** Measure screen frozen mid-cycle (sample values for illustration). */
export function MeasureScreen() {
  const active = 2;
  return (
    <ScreenShell active="measure" title="Measure" kicker="Live cycle">
      <div className="rounded-[24px] bg-hero p-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium text-white/75">Phase {active + 1} of 4</p>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#3BEAF4]" /> Live
          </span>
        </div>
        <p className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.02em]">{PHASES[active]}</p>
        <div className="mt-3 flex gap-1">
          {PHASES.map((p, i) => (
            <span key={p} className={`h-1 flex-1 rounded-full ${i <= active ? 'bg-white' : 'bg-white/25'}`} />
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-white/75">Cuff pressure</p>
            <p className="font-mono text-[30px] font-bold leading-none tracking-[-0.03em]">
              142<span className="ml-1 text-[12px] font-normal text-white/75">mmHg</span>
            </p>
          </div>
          <p className="font-mono text-[12px] text-white/80">62%</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#C2B5FF] to-[#3BEAF4]" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {['1200 nm', '1720 nm'].map((w) => (
          <div key={w} className="rounded-[20px] bg-surface p-3 shadow-[0_8px_24px_-16px_rgba(16,26,115,0.3)]">
            <p className="text-[10px] text-muted-text">LED {w}</p>
            <p className="mt-1 font-mono text-[18px] font-bold tracking-[-0.03em]">
              50.0<span className="ml-0.5 text-[10px] font-normal text-muted-text">mA</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] font-semibold">
        <span className="rounded-full bg-surface-alt py-2.5 text-center text-muted-text">Start</span>
        <span className="rounded-full border-[1.5px] border-danger py-2.5 text-center text-danger-text">Stop</span>
      </div>
    </ScreenShell>
  );
}
