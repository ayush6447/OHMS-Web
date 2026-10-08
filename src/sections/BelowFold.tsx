import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { Problem } from './Problem';
import { HowItWorks } from './HowItWorks';
import { Hardware } from './Hardware';
import { AppShowcase } from './AppShowcase';
import { Specs } from './Specs';
import { Roadmap } from './Roadmap';
import { Team } from './Team';
import { Cta } from './Cta';

/**
 * Everything after the hero, loaded as one lazy chunk. Mounting the scenes
 * together keeps ScrollTrigger pins created in page order; a refresh after
 * mount (and after web fonts settle) recalculates every start/end.
 */
export default function BelowFold() {
  useEffect(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
    // Images (team photos) can shift layout once decoded.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      <Problem />
      <HowItWorks />
      <Hardware />
      <AppShowcase />
      <Specs />
      <Roadmap />
      <Team />
      <Cta />
    </>
  );
}
