import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Hero3DCanvas } from './Hero3DCanvas';
import { CountUp } from './CountUp';
import { CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      {/* 3D WebGL Lipid & Light background */}
      <Hero3DCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-[#636B2F] dark:text-[#80EF80] font-mono text-xs font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#636B2F] dark:bg-[#80EF80] animate-ping" />
                NON-INVASIVE OPTO-MECHANICAL HEMODYNAMIC SPECTROMETER
              </div>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black dark:text-white leading-[1.1] tracking-tight"
              variants={itemVariants}
            >
              Know your cholesterol.{' '}
              <span className="text-[#636B2F] dark:text-[#80EF80] block mt-1">Without a single needle.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="text-lg sm:text-xl text-black/80 dark:text-white/80 max-w-2xl font-normal leading-relaxed"
              variants={itemVariants}
            >
              A medical-grade prototype that measures total cholesterol and triglycerides in seconds — right through your fingernail. Continuous, daily cardiovascular trend monitoring, minus the blood draw.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap items-center gap-4 pt-2" variants={itemVariants}>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 skeu-btn font-bold text-base px-7 py-3.5 rounded-xl"
              >
                <span>Get in touch</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 skeu-inset text-black dark:text-white font-semibold text-base px-6 py-3.5 rounded-xl hover:border-[#636B2F] dark:hover:border-[#80EF80] transition-all"
              >
                <span>See how it works</span>
              </a>
            </motion.div>

            {/* Three inline checkmarked feature tags */}
            <motion.div
              className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-black/80 dark:text-white/80"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#636B2F] dark:text-[#80EF80]" />
                <span>Needle-free readings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#636B2F] dark:text-[#80EF80]" />
                <span>10 kHz lock-in signal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#636B2F] dark:text-[#80EF80]" />
                <span>Read-through-nail optics</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Floating "Live" Skeuomorphic Lipid Scan Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <div className="w-full max-w-md skeu-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden animate-float">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#636B2F] dark:bg-[#80EF80] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#636B2F] dark:bg-[#80EF80]"></span>
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-black dark:text-white uppercase">
                    LIPID SCAN — LIVE
                  </span>
                </div>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-lg skeu-inset text-[#636B2F] dark:text-[#80EF80] font-bold">
                  1200nm + 1720nm
                </span>
              </div>

              {/* Monospace Live Data Metrics */}
              <div className="space-y-4">
                
                {/* Total Cholesterol */}
                <div className="skeu-inset p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold opacity-70">Total Cholesterol</div>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mt-0.5">
                      <CountUp end={178} duration={2.2} />
                      <span className="text-sm opacity-60 font-normal ml-1.5">mg/dL</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-[#636B2F] text-white dark:bg-[#80EF80] dark:text-black font-mono text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Optimal</span>
                  </div>
                </div>

                {/* Triglycerides */}
                <div className="skeu-inset p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold opacity-70">Triglycerides</div>
                    <div className="font-mono text-3xl font-bold text-[#636B2F] dark:text-[#80EF80] mt-0.5">
                      <CountUp end={96} duration={2.5} />
                      <span className="text-sm opacity-60 font-normal ml-1.5">mg/dL</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-[#636B2F] text-white dark:bg-[#80EF80] dark:text-black font-mono text-xs font-bold">
                    Normal
                  </div>
                </div>

                {/* Signal Confidence */}
                <div className="skeu-inset p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold opacity-70">Signal Confidence</div>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mt-0.5">
                      <CountUp end={94} duration={2} suffix="%" />
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#636B2F] dark:text-[#80EF80] skeu-inset px-2.5 py-1 rounded-xl font-bold">
                    Phase Locked
                  </div>
                </div>

              </div>

              {/* Waveform Graphic */}
              <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono opacity-70 mb-2 font-bold">
                  <span>10 kHz LOCK-IN DEMODULATION</span>
                  <span className="text-[#636B2F] dark:text-[#80EF80]">SNR: 48 dB</span>
                </div>
                <div className="h-10 w-full skeu-inset rounded-xl relative overflow-hidden flex items-center px-2">
                  <svg className="w-full h-7 stroke-[#636B2F] dark:stroke-[#80EF80] fill-none" viewBox="0 0 300 40">
                    <path
                      d="M0,20 Q15,5 30,20 T60,20 T90,5 T120,20 T150,35 T180,20 T210,5 T240,20 T270,35 T300,20"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
