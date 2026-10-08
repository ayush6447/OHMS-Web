interface LogoProps {
  className?: string;
  /** Rendered size of the mark in px. */
  size?: number;
  withWordmark?: boolean;
}

/** The app's cross + droplet mark with the OMHS wordmark. */
export function Logo({ className = '', size = 32, withWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/omhs-mark-96.webp"
        srcSet="/brand/omhs-mark-96.webp 96w, /brand/omhs-mark-192.webp 192w"
        sizes={`${size}px`}
        width={size}
        height={size}
        alt={withWordmark ? '' : 'OMHS'}
        decoding="async"
        className="shrink-0"
      />
      {withWordmark && <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">OMHS</span>}
    </span>
  );
}
