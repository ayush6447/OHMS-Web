import { Info } from 'lucide-react';

/** Small, calm note placed next to any visual that shows a reading. */
export function ResultNote({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-start gap-1.5 text-xs leading-relaxed text-muted-text ${className}`}>
      <Info className="mt-px size-3.5 shrink-0" aria-hidden />
      <span>{children ?? 'Illustrative sample values. OMHS is a research prototype, not a medical device.'}</span>
    </p>
  );
}
