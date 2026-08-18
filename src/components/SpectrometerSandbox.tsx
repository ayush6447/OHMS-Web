import React, { useState } from 'react';
import { Sliders, Zap } from 'lucide-react';

export const SpectrometerSandbox: React.FC = () => {
  const [wavelength, setWavelength] = useState<number>(1200);

  const getAbsorbance = (wl: number) => {
    const peak1 = Math.exp(-Math.pow(wl - 1200, 2) / (2 * Math.pow(25, 2))) * 0.85;
    const peak2 = Math.exp(-Math.pow(wl - 1720, 2) / (2 * Math.pow(30, 2))) * 0.95;
    const base = 0.12 + Math.sin(wl / 100) * 0.03;
    return Math.min(1.0, peak1 + peak2 + base);
  };

  const currentAbsorbance = getAbsorbance(wavelength);

  const getPeakInfo = (wl: number) => {
    if (Math.abs(wl - 1200) <= 30) {
      return {
        label: 'Cholesterol C-H 2nd Overtone Peak',
        type: 'TOTAL CHOLESTEROL',
        color: '#80EF80',
        desc: 'Resonance band corresponding to 2nd C-H vibrational stretch in cholesterol ring structures.',
      };
    }
    if (Math.abs(wl - 1720) <= 35) {
      return {
        label: 'Triglyceride C-H 1st Overtone Peak',
        type: 'TRIGLYCERIDES',
        color: '#80EF80',
        desc: 'Primary absorption overtone band for long-chain fatty acid hydrocarbon bonds.',
      };
    }
    return {
      label: 'Tissue Optical Window / Background',
      type: 'BASELINE SCATTER',
      color: '#8A9490',
      desc: 'Subterranean tissue absorption background isolated by 10 kHz lock-in demodulation.',
    };
  };

  const peakInfo = getPeakInfo(wavelength);

  return (
    <div className="skeu-panel p-6 sm:p-8 rounded-3xl space-y-6 text-black dark:text-white transition-colors duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading text-lg font-bold text-black dark:text-white">
              Interactive NIR Absorption Spectrum
            </h4>
            <p className="text-xs opacity-60 font-mono font-bold">
              Simulated 1000nm – 1800nm Lipid Band Sweeper
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] font-mono text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-[#80EF80]" />
          <span>10 kHz Lock-In Active</span>
        </div>
      </div>

      {/* SVG Spectrum Curve Canvas */}
      <div className="relative h-48 w-full skeu-inset rounded-2xl p-4 overflow-hidden">
        
        <div className="absolute top-2 left-[25%] -translate-x-1/2 text-[10px] font-mono text-black dark:text-white skeu-inset px-2 py-0.5 rounded-lg border border-[#80EF80]/40 font-bold">
          1200nm (Cholesterol)
        </div>
        <div className="absolute top-2 left-[90%] -translate-x-1/2 text-[10px] font-mono text-black dark:text-white skeu-inset px-2 py-0.5 rounded-lg border border-[#80EF80]/40 font-bold">
          1720nm (Triglycerides)
        </div>

        <svg className="w-full h-full overflow-visible" viewBox="1000 0 800 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#80EF80" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#80EF80" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#80EF80" stopOpacity="0.2" />
              <stop offset="90%" stopColor="#80EF80" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#80EF80" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <path
            d="M 1000 100 L 1000 80 Q 1100 85, 1175 40 T 1225 40 T 1300 80 Q 1500 85, 1680 15 T 1750 15 L 1800 80 L 1800 100 Z"
            fill="url(#spectrumGradient)"
          />

          <path
            d="M 1000 80 Q 1100 85, 1175 40 T 1225 40 T 1300 80 Q 1500 85, 1680 15 T 1750 15 L 1800 80"
            fill="none"
            stroke="#80EF80"
            strokeWidth="3.5"
          />

          <line
            x1={wavelength}
            y1="0"
            x2={wavelength}
            y2="100"
            stroke="#80EF80"
            strokeWidth="2"
            strokeDasharray="4 2"
          />

          <circle
            cx={wavelength}
            cy={100 - currentAbsorbance * 85}
            r="6"
            fill="#80EF80"
            stroke="#000000"
            strokeWidth="2"
          />
        </svg>

      </div>

      {/* Slider Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span>Target Wavelength:</span>
          <span className="text-sm font-bold text-[#4CAF50] dark:text-[#80EF80]">{wavelength} nm</span>
        </div>
        <input
          type="range"
          min="1000"
          max="1800"
          step="5"
          value={wavelength}
          onChange={(e) => setWavelength(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#80EF80] skeu-inset"
        />
        <div className="flex justify-between text-[10px] font-mono opacity-60 font-bold">
          <span>1000 nm</span>
          <span>1200 nm Peak</span>
          <span>1500 nm</span>
          <span>1720 nm Peak</span>
          <span>1800 nm</span>
        </div>
      </div>

      {/* Live Band Analysis Card */}
      <div className="p-4 rounded-2xl skeu-inset flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#80EF80]"
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              {peakInfo.type}
            </span>
          </div>
          <div className="text-sm font-heading font-bold text-black dark:text-white mt-1">
            {peakInfo.label}
          </div>
          <p className="text-xs opacity-70 mt-0.5">
            {peakInfo.desc}
          </p>
        </div>

        <div className="skeu-panel p-3 rounded-xl font-mono text-center min-w-[120px]">
          <div className="text-[10px] opacity-60 uppercase font-bold">Absorbance</div>
          <div className="text-xl font-bold text-[#4CAF50] dark:text-[#80EF80] mt-0.5">
            {currentAbsorbance.toFixed(3)}
          </div>
          <div className="text-[9px] text-[#4CAF50] dark:text-[#80EF80] font-bold mt-0.5">Δ OD Units</div>
        </div>
      </div>

    </div>
  );
};
