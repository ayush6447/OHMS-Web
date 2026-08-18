import React from 'react';
import { Syringe, Clock, TrendingDown, CheckCircle2 } from 'lucide-react';
import { CountUp } from './CountUp';

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] font-mono text-xs font-bold uppercase tracking-wider">
            THE LIMITATION OF STANDARD LIPID PANELS
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
            Venipuncture is a bottleneck for continuous cardiovascular care.
          </h2>

          <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed font-normal">
            Standard blood draws are painful, infrequent, and yield a single static snapshot. They fail to capture real-time physiological shifts — such as postprandial triglyceride surges, statin response curves, or daily exercise dynamics.
          </p>
        </div>

        {/* 3 Core Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="skeu-panel p-8 rounded-3xl transition-all">
            <div className="w-12 h-12 rounded-2xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] flex items-center justify-center mb-6">
              <Syringe className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-black dark:text-white mb-2">
              Invasive &amp; Painful
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-6">
              Needles require clinical visits, trained phlebotomists, and biohazard handling, creating high friction for frequent testing.
            </p>
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 font-mono text-xs text-[#4CAF50] dark:text-[#80EF80] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>OHMS: 100% Optical &amp; Needle-Free</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="skeu-panel p-8 rounded-3xl transition-all">
            <div className="w-12 h-12 rounded-2xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-black dark:text-white mb-2">
              Delayed Turnaround
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-6">
              Samples sent to central labs take 3–5 days to report results, delaying actionable intervention when time matters.
            </p>
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 font-mono text-xs text-[#4CAF50] dark:text-[#80EF80] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>OHMS: Instant Readouts in &lt; 5 sec</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="skeu-panel p-8 rounded-3xl transition-all">
            <div className="w-12 h-12 rounded-2xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] flex items-center justify-center mb-6">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-black dark:text-white mb-2">
              Static Snapshots
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-6">
              Annual lipid panels miss diurnal fluctuations, dietary triggers, and acute drug metabolism patterns between annual physicals.
            </p>
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 font-mono text-xs text-[#4CAF50] dark:text-[#80EF80] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>OHMS: Continuous Trend Spectroscopy</span>
            </div>
          </div>

        </div>

        {/* Clinical Stat Callouts Banner */}
        <div className="skeu-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
            
            <div className="pt-4 md:pt-0 md:pr-6">
              <div className="font-mono text-4xl sm:text-5xl font-bold text-[#4CAF50] dark:text-[#80EF80] mb-2">
                <CountUp end={38} suffix="%" />
              </div>
              <p className="text-sm opacity-80 font-normal">
                Of adults exhibit elevated triglycerides or LDL requiring active monitoring.
              </p>
              <span className="inline-block mt-2 font-mono text-[10px] opacity-60 uppercase font-bold">
                [Clinical Baseline Indicator]
              </span>
            </div>

            <div className="pt-6 md:pt-0 md:px-6">
              <div className="font-mono text-4xl sm:text-5xl font-bold mb-2">
                0
              </div>
              <p className="text-sm opacity-80 font-normal">
                Blood draws or skin punctures needed with OHMS non-invasive optical sensing.
              </p>
              <span className="inline-block mt-2 font-mono text-[10px] opacity-60 uppercase font-bold">
                [Zero-Invasive Spectrometry]
              </span>
            </div>

            <div className="pt-6 md:pt-0 md:pl-6">
              <div className="font-mono text-4xl sm:text-5xl font-bold text-[#4CAF50] dark:text-[#80EF80] mb-2">
                &lt; 5s
              </div>
              <p className="text-sm opacity-80 font-normal">
                Measurement time for complete total cholesterol &amp; triglyceride readout.
              </p>
              <span className="inline-block mt-2 font-mono text-[10px] opacity-60 uppercase font-bold">
                [Real-time Demodulation]
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
