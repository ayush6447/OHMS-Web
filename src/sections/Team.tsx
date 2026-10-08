import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import { Text } from '@/components/Text';
import { isTodo, mentor, site, team, type TeamMember } from '@/content/site';
import { useTheme } from '@/theme/theme-context';

function PersonCard({ person, subtitle, delay }: { person: TeamMember; subtitle: string; delay: number }) {
  const { mode } = useTheme();
  const plainName = person.name.replace(/\s*\{\{TODO[^}]*\}\}/g, '');
  const hasLink = !isTodo(person.linkedin);

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <SpotlightCard
        theme={mode}
        spotlightSize={260}
        intensity={0.35}
        className="group h-full rounded-[28px] p-0!"
      >
        <div className="relative overflow-hidden">
          <img
            src={person.photo}
            alt={`Portrait of ${plainName}`}
            loading="lazy"
            decoding="async"
            width={300}
            height={300}
            className="aspect-square w-full object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.06] group-hover:grayscale-0 [@media(hover:none)]:grayscale-0"
          />
          {hasLink && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${plainName} on LinkedIn (opens in a new tab)`}
              className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0A0E2E]/85 via-[#0A0E2E]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#101A73]">
                LinkedIn <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </a>
          )}
        </div>
        <div className="p-5 text-center sm:p-6">
          <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em] sm:text-xl">
            <Text>{person.name}</Text>
          </h3>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-text">
            <Text>{subtitle}</Text>
          </p>
          {!hasLink && (
            <p className="mt-3 text-xs">
              <Text>{person.linkedin}</Text>
            </p>
          )}
        </div>
      </SpotlightCard>
    </motion.li>
  );
}

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="team-title" className="eyebrow">
            Team · {site.org}
          </h2>
          <p className="text-headline mt-4 text-balance">The people building OMHS.</p>
          <p className="text-lede mx-auto mt-5 max-w-2xl text-muted-text">
            Hardware, firmware, signal processing and app development, guided by a mentor in biomedical sensing.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {team.map((m, i) => (
            <PersonCard key={m.photo} person={m} subtitle={m.role} delay={(i % 4) * 0.08} />
          ))}
        </ul>

        <h3 className="mt-20 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-text">Mentor</h3>
        <ul className="mx-auto mt-6 max-w-[300px]">
          <PersonCard person={mentor} subtitle={mentor.designation} delay={0.1} />
        </ul>
      </div>
    </section>
  );
}
