import { ShieldAlert } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { PlatformLine } from '@/components/Platforms';
import { Text } from '@/components/Text';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_LINKS, isTodo, site, socials } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-divider px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div
          role="note"
          aria-label="Medical disclaimer"
          className="flex gap-3 rounded-[24px] bg-surface-alt p-5 text-sm leading-relaxed sm:p-6"
        >
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-primary-text" aria-hidden />
          <p>
            <strong className="font-semibold">{site.disclaimer}</strong>{' '}
            <span className="text-muted-text">
              It has not been clinically validated. Any readings shown on this site are illustrative sample data.
            </span>
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size={36} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-text">
              A research project by {site.org}, exploring non-invasive cholesterol estimation with near-infrared light.
            </p>
            <PlatformLine className="mt-5" />
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-text">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink hover:text-primary-text">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#waitlist" className="text-ink hover:text-primary-text">
                  Join the waitlist
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-text">Follow</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {socials.map((s) => (
                <li key={s.label} className="flex flex-wrap items-center gap-2">
                  {isTodo(s.href) ? (
                    <>
                      <span>{s.label}</span>
                      <Text>{s.href}</Text>
                    </>
                  ) : (
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-ink hover:text-primary-text">
                      {s.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-divider pt-6 text-xs text-muted-text sm:flex-row sm:items-center">
          <p>
            © {year} {site.org}. {site.name} is a research prototype.
          </p>
          <div className="flex items-center gap-2">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
