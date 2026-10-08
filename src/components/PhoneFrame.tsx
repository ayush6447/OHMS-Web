import type { CSSProperties, ReactNode } from 'react';
import { cssVars, type ThemeMode } from '@/theme/tokens';

interface PhoneFrameProps {
  children: ReactNode;
  /** Theme for the screen contents, independent of the page theme. */
  mode: ThemeMode;
  /** Accessible description of what the screen shows. */
  label: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * A generic modern phone (no specific vendor) at a fixed 290×610 design size.
 * The screen is themed by scoping the app's CSS variables, so it can show
 * light or dark regardless of the page theme.
 */
export function PhoneFrame({ children, mode, label, className = '', style }: PhoneFrameProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-[290px] shrink-0 rounded-[48px] bg-[#0b0d1f] p-[9px] shadow-[0_50px_100px_-30px_rgba(16,26,115,0.55),0_0_0_1.5px_rgba(255,255,255,0.08)_inset] ${className}`}
      style={style}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[120px] h-12 w-[3px] rounded-l bg-[#1b1f3a]" />
      <span aria-hidden className="absolute -right-[3px] top-[150px] h-20 w-[3px] rounded-r bg-[#1b1f3a]" />
      <div
        aria-hidden
        className="relative h-[592px] overflow-hidden rounded-[40px] bg-bg text-ink transition-colors duration-500"
        style={cssVars(mode) as CSSProperties}
      >
        {children}
        {/* camera island */}
        <span className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </figure>
  );
}
