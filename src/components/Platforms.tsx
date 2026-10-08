import { ArrowUpRight, Smartphone } from 'lucide-react';
import { isTodo, stores } from '@/content/site';
import { Text } from './Text';

/** Compact "Android · iOS" line used in the hero and footer. */
export function PlatformLine({ className = '' }: { className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-2 text-sm text-muted-text ${className}`}>
      <Smartphone className="size-4" aria-hidden />
      Companion app for
      <span className="chip py-1 text-xs">Android</span>
      <span className="chip py-1 text-xs">iOS</span>
    </p>
  );
}

/** Store badges; render as placeholders until real store links are set in content/site.ts. */
export function StoreBadges({ className = '' }: { className?: string }) {
  const items = [
    { os: 'Android', store: 'Google Play', href: stores.android },
    { os: 'iOS', store: 'App Store', href: stores.ios },
  ];
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((it) => {
        const body = (
          <>
            <Smartphone className="size-5 shrink-0" aria-hidden />
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] text-muted-text">{it.store}</span>
              <span className="text-[15px] font-semibold">{it.os}</span>
            </span>
          </>
        );
        return (
          <li key={it.os} className="flex flex-col gap-1.5">
            {isTodo(it.href) ? (
              <>
                <span className="card flex items-center gap-3 rounded-2xl px-4 py-2.5 opacity-80">{body}</span>
                <Text>{it.href}</Text>
              </>
            ) : (
              <a
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="card flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-transform hover:-translate-y-0.5"
              >
                {body}
                <ArrowUpRight className="size-4 text-muted-text" aria-hidden />
                <span className="sr-only">(opens {it.store})</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
