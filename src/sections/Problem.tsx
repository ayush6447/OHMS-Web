import { motion } from 'motion/react';
import { FlaskConical, Hourglass, Syringe } from 'lucide-react';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import GradientText from '@/components/reactbits/GradientText';
import { Text } from '@/components/Text';
import { useIsDesktop } from '@/hooks/useMediaQuery';

const STATEMENTS = [
  'Checking your cholesterol today usually starts with a needle.',
  'Then a lab, and a wait for the result.',
];

const CARDS = [
  {
    Icon: Syringe,
    title: 'A needle',
    body: 'A standard lipid panel needs a blood sample — drawn from a vein or taken by finger-prick.',
  },
  {
    Icon: FlaskConical,
    title: 'A lab',
    body: 'The sample is analysed in a laboratory or on a dedicated point-of-care analyser.',
  },
  {
    Icon: Hourglass,
    title: 'A wait',
    body: 'Depending on where you are tested, the result can take anywhere from minutes to days.',
  },
];

export function Problem() {
  const isDesktop = useIsDesktop();

  return (
    <section id="problem" aria-labelledby="problem-title" className="relative px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-5xl">
        <h2 id="problem-title" className="eyebrow mb-10">
          The problem
        </h2>

        {STATEMENTS.map((s) => (
          <ScrollReveal
            key={s}
            enableBlur={isDesktop}
            baseOpacity={0.12}
            baseRotation={2}
            blurStrength={6}
            containerClassName="mb-10 md:mb-16"
            textClassName="text-[clamp(2rem,5.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance"
          >
            {s}
          </ScrollReveal>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,5.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance"
        >
          We're exploring whether <GradientText animationSpeed={10}>light</GradientText> can do part of that job.
        </motion.p>

        <ul className="mt-20 grid gap-4 md:mt-28 md:grid-cols-3">
          {CARDS.map(({ Icon, title, body }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-[28px] p-7"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-pink text-on-pink">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-text">{body}</p>
            </motion.li>
          ))}
        </ul>

        <motion.aside
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 flex flex-col gap-2 rounded-[28px] border border-dashed border-divider p-7 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Statistic placeholder"
        >
          <p className="text-title">
            <Text>{'{{TODO: sourced stat}}'}</Text>
          </p>
          <p className="text-sm text-muted-text">
            Source: <Text>{'{{TODO: citation}}'}</Text>
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
