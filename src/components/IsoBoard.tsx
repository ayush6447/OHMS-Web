/**
 * Isometric circuit-board illustration (SVG). Pure decoration; all colours
 * come from the brand CSS variables so it follows the theme.
 */

const COS30 = Math.cos(Math.PI / 6);
const BOARD = { w: 240, d: 160, t: 12 };
const LIFT = 14;

const iso = (x: number, y: number, z = 0) => [(x - y) * COS30, (x + y) * 0.5 - z] as const;
const pts = (list: (readonly [number, number])[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

const MIN_X = -BOARD.d * COS30;
const VIEW_W = (BOARD.w + BOARD.d) * COS30;
const VIEW_H = (BOARD.w + BOARD.d) * 0.5 + BOARD.t + LIFT;
export const BOARD_ASPECT = VIEW_H / VIEW_W;

export interface Part {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  /** Fill for the part's top face. */
  fill?: string;
  glow?: boolean;
}

function Block({ x, y, w, d, h, fill = 'var(--c-text)', glow }: Part) {
  const top = [iso(x, y, h), iso(x + w, y, h), iso(x + w, y + d, h), iso(x, y + d, h)];
  const right = [iso(x + w, y, h), iso(x + w, y + d, h), iso(x + w, y + d, 0), iso(x + w, y, 0)];
  const front = [iso(x, y + d, h), iso(x + w, y + d, h), iso(x + w, y + d, 0), iso(x, y + d, 0)];
  const [cx, cy] = iso(x + w / 2, y + d / 2, h);
  return (
    <g>
      <polygon points={pts(right)} fill={fill} opacity="0.55" />
      <polygon points={pts(front)} fill={fill} opacity="0.75" />
      <polygon points={pts(top)} fill={fill} />
      {glow && <ellipse cx={cx} cy={cy} rx="16" ry="9" fill={fill} opacity="0.35" />}
    </g>
  );
}

export function IsoBoard({ accent, parts, className = '' }: { accent: string; parts: Part[]; className?: string }) {
  const { w, d, t } = BOARD;
  const top = [iso(0, 0), iso(w, 0), iso(w, d), iso(0, d)];
  const right = [iso(w, 0), iso(w, d), iso(w, d, -t), iso(w, 0, -t)];
  const front = [iso(0, d), iso(w, d), iso(w, d, -t), iso(0, d, -t)];
  const holes = [
    [14, 14],
    [w - 14, 14],
    [w - 14, d - 14],
    [14, d - 14],
  ].map(([x, y]) => iso(x, y));
  // A few "traces" running across the board.
  const traces = [
    [iso(30, 40), iso(120, 40), iso(120, 90)],
    [iso(40, 120), iso(180, 120)],
    [iso(200, 30), iso(200, 100), iso(150, 100)],
  ];

  return (
    <svg
      viewBox={`${MIN_X.toFixed(1)} ${-LIFT} ${VIEW_W.toFixed(1)} ${VIEW_H.toFixed(1)}`}
      className={`block h-auto w-full overflow-visible ${className}`}
      aria-hidden
    >
      <polygon points={pts(right)} fill={`color-mix(in srgb, ${accent} 45%, var(--c-hero))`} />
      <polygon points={pts(front)} fill={`color-mix(in srgb, ${accent} 65%, var(--c-hero))`} />
      <polygon
        points={pts(top)}
        fill={`color-mix(in srgb, ${accent} 22%, var(--c-surface))`}
        stroke={`color-mix(in srgb, ${accent} 60%, transparent)`}
        strokeWidth="1"
      />
      {traces.map((tr, i) => (
        <polyline
          key={i}
          points={pts(tr)}
          fill="none"
          stroke={`color-mix(in srgb, ${accent} 70%, var(--c-text))`}
          strokeOpacity="0.35"
          strokeWidth="1.4"
        />
      ))}
      {holes.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2.3" fill="var(--c-bg)" stroke={accent} strokeOpacity="0.6" />
      ))}
      {parts.map((p, i) => (
        <Block key={i} {...p} />
      ))}
    </svg>
  );
}
