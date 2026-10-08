import type { ReactNode } from 'react';
import { BatteryFull, History, LayoutDashboard, Settings, Signal, Activity } from 'lucide-react';

export type ScreenKey = 'dashboard' | 'measure' | 'history' | 'settings';

const TABS: { key: ScreenKey; label: string; Icon: typeof History }[] = [
  { key: 'dashboard', label: 'Home', Icon: LayoutDashboard },
  { key: 'measure', label: 'Measure', Icon: Activity },
  { key: 'history', label: 'History', Icon: History },
  { key: 'settings', label: 'Settings', Icon: Settings },
];

/** Status bar + title + bottom tab bar shared by the mock app screens. */
export function ScreenShell({
  active,
  title,
  kicker,
  children,
}: {
  active: ScreenKey;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col [&_*]:transition-colors [&_*]:duration-500">
      <div className="flex h-11 items-center justify-between px-7 pt-1 font-mono text-[11px] font-bold">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <Signal className="size-3" strokeWidth={2.5} />
          <BatteryFull className="size-4" strokeWidth={2} />
        </span>
      </div>
      <div className="px-5 pb-2 pt-2">
        {kicker && <p className="text-[11px] text-muted-text">{kicker}</p>}
        <p className="text-[22px] font-semibold leading-tight tracking-[-0.02em]">{title}</p>
      </div>
      <div className="min-h-0 flex-1 px-5">{children}</div>
      <div className="mx-3 mb-3 mt-2 flex items-center justify-around rounded-[22px] bg-surface py-2 shadow-[0_8px_24px_-12px_rgba(16,26,115,0.25)]">
        {TABS.map(({ key, label, Icon }) => {
          const on = key === active;
          return (
            <span
              key={key}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1 text-[9.5px] font-medium ${
                on ? 'bg-pink text-on-pink' : 'text-muted-text'
              }`}
            >
              <Icon className="size-[17px]" strokeWidth={on ? 2.4 : 2} />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
