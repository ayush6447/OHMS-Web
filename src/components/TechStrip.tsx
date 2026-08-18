import React from 'react';

export const TechStrip: React.FC = () => {
  const specs = [
    '10 kHz Lock-In Amplification',
    '1200 & 1720 nm Lipid Bands',
    '50+ Paired Validation Samples',
    'Opto-Mechanical Nail-Bed Aperture',
    'Continuous Hemodynamic Trend Tracking',
  ];

  return (
    <div className="w-full bg-[#80EF80] dark:bg-[#0A0A0A] py-4 border-y border-black/10 dark:border-[#80EF80]/30 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop grid/flex layout */}
        <div className="hidden md:flex items-center justify-between text-black dark:text-[#80EF80] font-mono text-sm tracking-wide font-bold">
          {specs.slice(0, 3).map((spec, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3 group cursor-default">
                <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-[#80EF80] animate-pulse" />
                <span className="transition-colors">
                  {spec}
                </span>
              </div>
              {idx < 2 && <span className="text-black dark:text-white text-lg font-bold">◆</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile scrolling marquee */}
        <div className="md:hidden flex overflow-x-auto no-scrollbar space-x-6 text-black dark:text-[#80EF80] font-mono text-xs whitespace-nowrap py-1 font-bold">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-black dark:text-white">◆</span>
              <span>{spec}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
