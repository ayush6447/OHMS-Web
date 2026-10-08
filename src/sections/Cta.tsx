import { useId, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import Magnet from '@/components/reactbits/Magnet';
import GradientText from '@/components/reactbits/GradientText';
import { Text } from '@/components/Text';
import { submitWaitlist, type Interest } from '@/lib/waitlist';

const INTERESTS: { value: Interest; label: string }[] = [
  { value: 'waitlist', label: 'Waitlist' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'research', label: 'Researcher' },
  { value: 'investor', label: 'Investor' },
];

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done'; stored: boolean } | { kind: 'error'; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Cta() {
  const id = useId();
  const [interest, setInterest] = useState<Interest>('waitlist');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const partner = interest !== 'waitlist';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      document.getElementById(`${id}-email`)?.focus();
      return;
    }
    setEmailError(null);
    setStatus({ kind: 'sending' });
    const res = await submitWaitlist({
      email: email.trim(),
      interest,
      organisation: partner ? org.trim() || undefined : undefined,
      message: message.trim() || undefined,
    });
    setStatus(res.ok ? { kind: 'done', stored: res.stored } : { kind: 'error', message: res.error });
  }

  const field =
    'w-full rounded-2xl border border-divider bg-surface px-4 py-3 text-ink placeholder:text-muted-text/80 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-text';

  return (
    <section id="waitlist" aria-labelledby="cta-title" className="relative overflow-hidden px-4 py-28 sm:px-6 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 15% 80%, color-mix(in srgb, var(--c-primary) 22%, transparent), transparent 70%), radial-gradient(45% 50% at 90% 10%, color-mix(in srgb, var(--c-pink) 50%, transparent), transparent 70%)',
        }}
      />
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <h2 id="cta-title" className="text-headline text-balance">
            Let's find out what <GradientText animationSpeed={10}>light</GradientText> can measure.
          </h2>
          <p className="text-lede mt-6 text-muted-text">
            We're looking for clinics to help with data collection, researchers to collaborate with, and investors who
            care about getting the science right. Or join the waitlist for updates as the prototype develops.
          </p>
          <p className="mt-6 text-sm text-muted-text">
            Prefer email? <Text>{'{{TODO: contact email}}'}</Text>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-[32px] p-6 sm:p-8 lg:col-span-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status.kind === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
                role="status"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-pink text-on-pink">
                  <Check className="size-7" aria-hidden />
                </span>
                <p className="mt-5 text-2xl font-semibold tracking-[-0.02em]">Thanks — we've got it.</p>
                {status.stored ? (
                  <p className="mt-2 text-muted-text">We'll be in touch at {email.trim()}.</p>
                ) : (
                  <p className="mt-3 text-sm text-muted-text">
                    Heads up: the form backend isn't connected yet, so this entry was not stored.{' '}
                    <Text>{'{{TODO: connect backend}}'}</Text>
                  </p>
                )}
                <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus({ kind: 'idle' })}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} className="space-y-5">
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold">I'm interested as a…</legend>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((it) => (
                      <label key={it.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="interest"
                          value={it.value}
                          checked={interest === it.value}
                          onChange={() => setInterest(it.value)}
                          className="peer sr-only"
                        />
                        <span className="block rounded-full border border-divider px-4 py-2 text-sm font-medium text-muted-text transition-colors peer-checked:border-transparent peer-checked:bg-button peer-checked:text-on-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary-text peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg">
                          {it.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-semibold">
                    Email
                  </label>
                  <input
                    id={`${id}-email`}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? `${id}-email-err` : undefined}
                    placeholder="you@example.com"
                    className={field}
                  />
                  {emailError && (
                    <p id={`${id}-email-err`} className="mt-2 text-sm text-danger-text">
                      {emailError}
                    </p>
                  )}
                </div>

                {partner && (
                  <div>
                    <label htmlFor={`${id}-org`} className="mb-2 block text-sm font-semibold">
                      Organisation <span className="font-normal text-muted-text">(optional)</span>
                    </label>
                    <input
                      id={`${id}-org`}
                      autoComplete="organization"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      className={field}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor={`${id}-msg`} className="mb-2 block text-sm font-semibold">
                    Message <span className="font-normal text-muted-text">(optional)</span>
                  </label>
                  <textarea
                    id={`${id}-msg`}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${field} resize-none`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Magnet padding={50} magnetStrength={5}>
                    <button type="submit" className="btn btn-primary px-7" disabled={status.kind === 'sending'}>
                      {status.kind === 'sending' ? (
                        <>
                          <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>
                          {partner ? 'Get in touch' : 'Join the waitlist'} <ArrowRight className="size-4" aria-hidden />
                        </>
                      )}
                    </button>
                  </Magnet>
                </div>
                <p role="alert" className="text-sm text-danger-text empty:hidden">
                  {status.kind === 'error' ? status.message : ''}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
