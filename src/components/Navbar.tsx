import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS } from '@/content/site';


/**
 * Floating pill navbar. Past the top of the page it shrinks slightly and its
 * frosted backdrop fades in — transform + opacity only.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <div
        className="pointer-events-auto relative w-full max-w-5xl origin-top transition-transform duration-500 ease-out-expo"
        style={{ transform: scrolled ? 'scale(0.97) translateY(-2px)' : 'none' }}
      >
        {/* Frosted backdrop; fades in once the page has scrolled. */}
        <div
          aria-hidden
          className="glass absolute inset-0 rounded-full transition-opacity duration-500"
          style={{ opacity: scrolled || open ? 1 : 0.55 }}
        />
        <nav aria-label="Primary" className="relative flex h-14 items-center justify-between gap-2 pl-4 pr-2 sm:pl-5">
          <a href="#top" className="rounded-full" aria-label="OMHS — back to top">
            <Logo size={28} />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-text transition-colors hover:bg-badge/70 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a href="#waitlist" className="btn btn-primary hidden min-h-10 px-5 text-sm sm:inline-flex">
              Join waitlist
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-10 place-items-center rounded-full text-ink hover:bg-badge md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute inset-x-0 top-[calc(100%+8px)] origin-top rounded-[28px] p-3 md:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-badge"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#waitlist" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">
                Join the waitlist
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
