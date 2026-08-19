import React from 'react';
import { Mail, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const navLinks = [
    { name: 'The Problem', href: '#problem' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Technology', href: '#technology' },
    { name: 'Metrics', href: '#metrics' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <footer className="bg-white dark:bg-[#0A0A0A] text-black dark:text-white pt-20 pb-12 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Call to action header banner */}
        <div className="skeu-panel p-8 sm:p-12 rounded-3xl mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-[#636B2F] dark:text-[#80EF80] uppercase tracking-wider mb-2 font-bold">
              NON-INVASIVE LIPID SPECTROMETRY
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Cholesterol &amp; triglycerides — without needles.
            </h3>
            <p className="text-sm opacity-75 mt-1 max-w-xl font-normal">
              Join us in advancing continuous cardiovascular monitoring through non-invasive near-infrared opto-mechanics.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 skeu-btn font-bold text-sm px-6 py-3 rounded-xl shadow-md shrink-0"
          >
            <span>Get in touch</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Footer Links & Brand info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#636B2F] text-white dark:bg-[#80EF80] dark:text-black flex items-center justify-center border border-white/60">
                <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-white animate-pulse" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                OHMS
              </span>
            </div>

            <p className="text-xs opacity-70 leading-relaxed max-w-sm font-normal">
              Non-invasive opto-mechanical hemodynamic spectrometer measuring total cholesterol and triglycerides through the fingernail.
            </p>

            <div className="font-mono text-xs opacity-70 pt-2 flex items-center gap-2 font-bold">
              <Mail className="w-4 h-4 text-[#636B2F] dark:text-[#80EF80]" />
              <a href="mailto:rishavrajvansh@proton.me" className="hover:underline">
                rishavrajvansh@proton.me
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs text-[#636B2F] dark:text-[#80EF80] font-bold uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-sm opacity-80 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#636B2F] dark:hover:text-[#80EF80] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs text-[#636B2F] dark:text-[#80EF80] font-bold uppercase tracking-wider">
              System Specs
            </div>
            <ul className="space-y-1.5 font-mono text-xs opacity-70 font-bold">
              <li>Finger Clip Alignment</li>
              <li>1200nm &amp; 1720nm NIR Laser</li>
              <li>InGaAs Photodiode Sensor</li>
              <li>Teensy DSP Lock-In Engine</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono opacity-50 gap-4 font-bold">
          <div>
            © 2026 · Medical-grade prototype. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>OHMS Spectrometry Lab</span>
            <span>•</span>
            <span>Dr. Ayes Chinmay · Aryan Raj · Rishav Singh</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
