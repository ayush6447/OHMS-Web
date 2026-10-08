import { useId } from 'react';
import { SCALE_MAX } from '@/lib/cholesterol';

const SWEEP = 270;
const START = 135; // degrees, measured clockwise from +x (SVG y points down)

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
}

/** SVG arc path for the fraction range [a, b] of the 270° gauge. */
function arc(cx: number, cy: number, r: number, a: number, b: number) {
  const [x1, y1] = polar(cx, cy, r, START + SWEEP * a);
  const [x2, y2] = polar(cx, cy, r, START + SWEEP * b);
  const large = SWEEP * (b - a) > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

interface RingGaugeProps {
  value: number;
  size?: number;
  stroke?: number;
  /** 0–1 multiplier for the filled arc, for reveal animations. */
  reveal?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * The app's Dashboard ring: a 270° track on a 0–300 mg/dL scale with the
 * Borderline and High zones tinted, and a lavender→blue value arc.
 */
export function RingGauge({ value, size = 200, stroke = 14, reveal = 1, className = '', children }: RingGaugeProps) {
  const id = useId();
  const c = size / 2;
  const r = c - stroke / 2 - 2;
  const frac = Math.min(1, Math.max(0, value / SCALE_MAX)) * reveal;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="block">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--c-ring-start)" />
            <stop offset="1" stopColor="var(--c-ring-end)" />
          </linearGradient>
        </defs>
        <path d={arc(c, c, r, 0, 1)} fill="none" stroke="var(--c-ring-track)" strokeWidth={stroke} strokeLinecap="round" />
        <path d={arc(c, c, r, 200 / SCALE_MAX, 240 / SCALE_MAX)} fill="none" stroke="var(--c-ring-seg-b)" strokeWidth={stroke} />
        <path d={arc(c, c, r, 240 / SCALE_MAX, 1)} fill="none" stroke="var(--c-ring-seg-a)" strokeWidth={stroke} strokeLinecap="round" />
        {frac > 0.001 && (
          <path
            d={arc(c, c, r, 0, 1)}
            pathLength={1}
            strokeDasharray={`${frac} 1`}
            fill="none"
            stroke={`url(#${id}-g)`}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
