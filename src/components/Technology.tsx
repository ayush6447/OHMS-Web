import React from 'react';
import { SpectrometerSandbox } from './SpectrometerSandbox';
import { Cpu, Layers, Zap, Eye } from 'lucide-react';

export const Technology: React.FC = () => {
  const techPillars = [
    {
      title: 'Dual-Wavelength NIR Emission',
      spec: '1200nm & 1720nm Bands',
      desc: 'By targeting the second overtone (1200nm) and first overtone (1720nm) vibrational absorption bands of C-H bonds, OHMS specifically isolates lipid signatures from water and hemoglobin background noise.',
      icon: Zap,
    },
    {
      title: 'InGaAs Photodiode Capture',
      spec: 'Low-Noise Optical Detection',
      desc: 'High-responsivity Indium Gallium Arsenide (InGaAs) photodiode detects attenuated light through the nail bed microvasculature, providing exceptional sensitivity across 1000nm–1750nm.',
      icon: Eye,
    },
    {
      title: 'Teensy Microcontroller Lock-In',
      spec: 'Teensy 10 kHz DSP Engine',
      desc: 'An onboard Teensy microcontroller modulates NIR emission at 10 kHz and performs phase-sensitive digital lock-in demodulation, extracting micro-volt absorption signals with >48dB SNR rejection.',
      icon: Cpu,
    },
    {
      title: 'Optical Finger Clip Alignment',
      spec: 'Pressure-Compensated Aperture',
      desc: 'The spring-loaded finger clip maintains consistent nail-bed optical coupling without melanin interference, delivering reproducible spectroscopic pathlength alignment.',
      icon: Layers,
    },
  ];

  return (
    <section id="technology" className="py-24 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-[#636B2F] dark:text-[#80EF80] font-mono text-xs font-bold uppercase tracking-wider">
            CLINICAL INSTRUMENTATION ARCHITECTURE
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
            Engineered at the intersection of optomechanics, InGaAs detection, and Teensy DSP.
          </h2>

          <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed font-normal">
            OHMS combines an ergonomic finger clip, dual-wavelength NIR laser diodes, high-sensitivity InGaAs photodiodes, and high-speed Teensy DSP processing into a non-invasive lipid spectrometer.
          </p>
        </div>

        {/* Top Grid: 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {techPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="skeu-panel p-8 rounded-3xl transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl skeu-inset text-[#636B2F] dark:text-[#80EF80] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl skeu-inset text-[#636B2F] dark:text-[#80EF80]">
                    {pillar.spec}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-black dark:text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Embedded Spectrometer Sandbox */}
        <div className="mt-12">
          <SpectrometerSandbox />
        </div>

      </div>
    </section>
  );
};
