import React, { useState } from 'react';
import { Fingerprint, Lightbulb, Eye, Cpu } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Place finger in finger clip',
      subtitle: 'Opto-Mechanical Clip Alignment',
      desc: 'The user inserts their finger into the ergonomic optical finger clip. The clip holds the fingernail securely against the sensor aperture, ensuring consistent pressure-compensated light path coupling.',
      icon: Fingerprint,
      detail: 'Spring-loaded clip mechanics isolate motion artifacts and stabilize nail-bed pressure.',
      tag: 'FINGER CLIP ALIGNMENT',
    },
    {
      num: '02',
      title: 'Dual-Wavelength NIR Emission',
      subtitle: '1200nm & 1720nm Laser Pulse',
      desc: 'Collimated near-infrared light at 1200nm and 1720nm passes directly through the fingernail. These specific NIR bands interact with the C-H vibrational absorption overtones of cholesterol and triglycerides.',
      icon: Lightbulb,
      detail: '1200nm targets total cholesterol ring bonds; 1720nm targets triglyceride hydrocarbon chains.',
      tag: '1200nm & 1720nm NIR EMISSION',
    },
    {
      num: '03',
      title: 'InGaAs Photodiode Capture',
      subtitle: 'High-Sensitivity Photodetection',
      desc: 'A precision Indium Gallium Arsenide (InGaAs) photodiode positioned beneath the finger captures the transmitted optical signal, converting attenuated NIR light into low-noise electrical signals.',
      icon: Eye,
      detail: 'High spectral responsivity across the 1000nm–1750nm NIR band guarantees clean signal acquisition.',
      tag: 'InGaAs PHOTODETECTOR',
    },
    {
      num: '04',
      title: 'Teensy Microcontroller Processing',
      subtitle: 'Real-Time Lock-In Demodulation',
      desc: 'The onboard Teensy microcontroller executes real-time digital lock-in demodulation at 10 kHz, stripping ambient optical noise and calculating total cholesterol, triglycerides, and confidence metrics in seconds.',
      icon: Cpu,
      detail: 'Calculates mg/dL concentration values with >48dB SNR phase lock rejection.',
      tag: 'TEENSY DEMODULATION ENGINE',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300 relative overflow-hidden border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-[#636B2F] dark:text-[#80EF80] font-mono text-xs font-bold uppercase tracking-wider">
            OPTICAL SPECTROSCOPY PROCESS
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white">
            How OHMS measures lipids through your nail.
          </h2>

          <p className="text-lg text-black/80 dark:text-white/80">
            Four precise steps: Finger Clip Alignment → 1200/1720nm NIR Emission → InGaAs Photodiode Capture → Teensy Demodulation.
          </p>
        </div>

        {/* Steps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector Buttons (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border flex items-start gap-4 ${
                    isActive
                      ? 'skeu-panel border-[#636B2F] dark:border-[#80EF80] translate-x-1'
                      : 'skeu-inset hover:opacity-100 opacity-80 border-transparent'
                  }`}
                >
                  <div
                    className={`font-mono text-sm font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      isActive
                        ? 'skeu-btn font-bold'
                        : 'skeu-inset text-[#636B2F] dark:text-[#80EF80]'
                    }`}
                  >
                    {step.num}
                  </div>

                  <div className="flex-1">
                    <div className="font-heading text-base font-bold text-black dark:text-white">
                      {step.title}
                    </div>
                    <div className="text-xs font-mono opacity-60 mt-0.5 font-bold">
                      {step.subtitle}
                    </div>
                  </div>

                  <div
                    className={`p-2 rounded-xl ${
                      isActive ? 'text-[#636B2F] dark:text-[#80EF80]' : 'opacity-40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Step Visual Showcase (Right Column) */}
          <div className="lg:col-span-7">
            <div className="skeu-panel p-8 sm:p-10 rounded-3xl relative min-h-[420px] flex flex-col justify-between">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#636B2F] dark:bg-[#80EF80] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#636B2F] dark:text-[#80EF80] uppercase tracking-widest">
                    STEP {steps[activeStep].num} — {steps[activeStep].tag}
                  </span>
                </div>
                <span className="font-mono text-xs opacity-60 font-bold">
                  NIR-SPEC v2.4
                </span>
              </div>

              {/* Step Content */}
              <div className="space-y-6 my-auto">
                <div className="inline-flex p-4 rounded-2xl skeu-btn">
                  {React.createElement(steps[activeStep].icon, { className: 'w-8 h-8' })}
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-black dark:text-white">
                  {steps[activeStep].title}
                </h3>

                <p className="text-base text-black/80 dark:text-white/80 leading-relaxed font-normal">
                  {steps[activeStep].desc}
                </p>

                <div className="p-4 rounded-xl skeu-inset font-mono text-xs leading-relaxed flex items-start gap-3">
                  <span className="text-[#636B2F] dark:text-[#80EF80] font-bold">INFO:</span>
                  <span>{steps[activeStep].detail}</span>
                </div>
              </div>

              {/* Footer Step Navigation */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between mt-6">
                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeStep ? 'w-8 bg-[#636B2F] dark:bg-[#80EF80]' : 'w-2 bg-black/20 dark:bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl skeu-inset text-xs font-bold disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl skeu-btn text-xs font-bold disabled:opacity-40"
                  >
                    Next Step
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
