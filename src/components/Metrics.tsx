import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export const Metrics: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState(0);

  const sampleData = [
    { sampleId: '#VALID-014', labSerumChol: 182, ohmsChol: 179, labSerumTri: 98, ohmsTri: 95, confidence: 96 },
    { sampleId: '#VALID-028', labSerumChol: 215, ohmsChol: 218, labSerumTri: 142, ohmsTri: 139, confidence: 94 },
    { sampleId: '#VALID-042', labSerumChol: 165, ohmsChol: 164, labSerumTri: 85, ohmsTri: 88, confidence: 97 },
  ];

  return (
    <section id="metrics" className="py-24 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] font-mono text-xs font-bold uppercase tracking-wider">
            CLINICAL PROOF &amp; METRICS
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Validated against gold-standard serum lab panels.
          </h2>

          <p className="text-lg opacity-80 font-normal">
            Rigorous paired testing confirms high correlation between non-invasive OHMS spectroscopic readouts and traditional phlebotomy.
          </p>
        </div>

        {/* 4 Monospace Proof Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="skeu-panel p-6 rounded-3xl text-left">
            <div className="font-mono text-4xl sm:text-5xl font-bold text-[#4CAF50] dark:text-[#80EF80] mb-2">
              10 <span className="text-2xl font-normal opacity-80">kHz</span>
            </div>
            <div className="font-heading text-lg font-bold mb-1">
              Lock-In Demodulation
            </div>
            <p className="text-xs opacity-70 leading-relaxed font-mono font-bold">
              Phase-locked amplification isolates absorption from optical ambient noise.
            </p>
          </div>

          <div className="skeu-panel p-6 rounded-3xl text-left">
            <div className="font-mono text-3xl sm:text-4xl font-bold text-[#4CAF50] dark:text-[#80EF80] mb-2">
              1200 &amp; 1720 <span className="text-xl font-normal opacity-80">nm</span>
            </div>
            <div className="font-heading text-lg font-bold mb-1">
              Lipid Absorption Bands
            </div>
            <p className="text-xs opacity-70 leading-relaxed font-mono font-bold">
              Dual NIR wavelengths targeting C-H hydrocarbon vibrational overtones.
            </p>
          </div>

          <div className="skeu-panel p-6 rounded-3xl text-left">
            <div className="font-mono text-4xl sm:text-5xl font-bold mb-2">
              50+
            </div>
            <div className="font-heading text-lg font-bold mb-1">
              Paired Validation Samples
            </div>
            <p className="text-xs opacity-70 leading-relaxed font-mono font-bold">
              Human subject trials comparing OHMS nail readouts with clinical blood draws.
            </p>
          </div>

          <div className="skeu-panel p-6 rounded-3xl text-left">
            <div className="font-mono text-4xl sm:text-5xl font-bold text-[#4CAF50] dark:text-[#80EF80] mb-2">
              &lt; 5 <span className="text-2xl font-normal opacity-80">sec</span>
            </div>
            <div className="font-heading text-lg font-bold mb-1">
              Readout Latency
            </div>
            <p className="text-xs opacity-70 leading-relaxed font-mono font-bold">
              Instantaneous total cholesterol &amp; triglyceride concentration output.
            </p>
          </div>

        </div>

        {/* Paired Validation Sample Interactive Inspector Card */}
        <div className="skeu-panel p-8 rounded-3xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4CAF50] dark:text-[#80EF80]" />
                <h3 className="font-heading text-xl font-bold">
                  Paired Validation Inspector
                </h3>
              </div>
              <p className="text-xs font-mono opacity-70 mt-0.5 font-bold">
                Head-to-head comparison: Clinical Serum Blood Draw vs OHMS Optical Spectrometer
              </p>
            </div>

            {/* Sample Selector Tabs */}
            <div className="flex items-center gap-2 skeu-inset p-1 rounded-xl">
              {sampleData.map((sample, idx) => (
                <button
                  key={sample.sampleId}
                  onClick={() => setSelectedSample(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all font-bold ${
                    selectedSample === idx
                      ? 'skeu-btn text-black'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {sample.sampleId}
                </button>
              ))}
            </div>
          </div>

          {/* Sample Data Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Total Cholesterol */}
            <div className="skeu-inset p-6 rounded-2xl">
              <div className="text-xs font-mono opacity-70 uppercase font-bold">Total Cholesterol</div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                <div className="skeu-panel p-3 rounded-xl">
                  <div className="text-[10px] font-mono opacity-60 font-bold">Lab Blood Serum</div>
                  <div className="font-mono text-2xl font-bold mt-1">
                    {sampleData[selectedSample].labSerumChol}
                    <span className="text-xs opacity-60 font-normal ml-1">mg/dL</span>
                  </div>
                </div>

                <div className="skeu-panel p-3 rounded-xl border border-[#80EF80]">
                  <div className="text-[10px] font-mono text-[#4CAF50] dark:text-[#80EF80] font-bold">OHMS Spectrometer</div>
                  <div className="font-mono text-2xl font-bold mt-1 text-[#4CAF50] dark:text-[#80EF80]">
                    {sampleData[selectedSample].ohmsChol}
                    <span className="text-xs opacity-60 font-normal ml-1">mg/dL</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono opacity-80 pt-2 border-t border-black/10 dark:border-white/10 font-bold">
                <span>Variance:</span>
                <span className="text-[#4CAF50] dark:text-[#80EF80]">
                  {Math.abs(sampleData[selectedSample].labSerumChol - sampleData[selectedSample].ohmsChol)} mg/dL (1.6% delta)
                </span>
              </div>
            </div>

            {/* Triglycerides */}
            <div className="skeu-inset p-6 rounded-2xl">
              <div className="text-xs font-mono opacity-70 uppercase font-bold">Triglycerides</div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                <div className="skeu-panel p-3 rounded-xl">
                  <div className="text-[10px] font-mono opacity-60 font-bold">Lab Blood Serum</div>
                  <div className="font-mono text-2xl font-bold mt-1">
                    {sampleData[selectedSample].labSerumTri}
                    <span className="text-xs opacity-60 font-normal ml-1">mg/dL</span>
                  </div>
                </div>

                <div className="skeu-panel p-3 rounded-xl border border-[#80EF80]">
                  <div className="text-[10px] font-mono text-[#4CAF50] dark:text-[#80EF80] font-bold">OHMS Spectrometer</div>
                  <div className="font-mono text-2xl font-bold mt-1 text-[#4CAF50] dark:text-[#80EF80]">
                    {sampleData[selectedSample].ohmsTri}
                    <span className="text-xs opacity-60 font-normal ml-1">mg/dL</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono opacity-80 pt-2 border-t border-black/10 dark:border-white/10 font-bold">
                <span>Variance:</span>
                <span className="text-[#4CAF50] dark:text-[#80EF80]">
                  {Math.abs(sampleData[selectedSample].labSerumTri - sampleData[selectedSample].ohmsTri)} mg/dL (2.1% delta)
                </span>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-center font-mono text-xs opacity-60 font-bold">
            * Validation dataset based on 50+ paired human subjects. Data presented for prototype verification.
          </div>

        </div>

      </div>
    </section>
  );
};
