import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, darkMode, onToggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Problem', href: '#problem' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Technology', href: '#technology' },
    { name: 'Metrics', href: '#metrics' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#80EF80] text-black shadow-md group-hover:scale-105 transition-transform border border-white/60">
              <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-black dark:text-white leading-none">
                OHMS
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#4CAF50] dark:text-[#80EF80] uppercase mt-0.5 font-bold">
                Spectrometer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-black/80 dark:text-white/80 hover:text-[#4CAF50] dark:hover:text-[#80EF80] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Light/Dark Toggle + System Badge + Skeuomorphic CTA */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl skeu-inset text-black dark:text-white hover:opacity-80 transition-opacity"
              aria-label="Toggle Light/Dark Theme"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#80EF80]" /> : <Moon className="w-4 h-4 text-black" />}
            </button>

            {/* Live System Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-black dark:text-white text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#80EF80] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#80EF80]"></span>
              </span>
              <span className="font-bold">10 kHz LOCK-IN ACTIVE</span>
            </div>

            {/* Primary Skeuomorphic CTA */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 skeu-btn text-black font-bold text-sm px-5 py-2.5 rounded-xl"
            >
              <span>Get in touch</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl skeu-inset text-black dark:text-white"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#80EF80]" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenContact}
              className="skeu-btn text-black text-xs font-bold px-3.5 py-2 rounded-xl"
            >
              Contact
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black dark:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF6F6] dark:bg-[#050505] border-b border-black/10 dark:border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md skeu-inset text-black dark:text-white text-xs font-mono w-fit">
            <span className="w-2 h-2 rounded-full bg-[#80EF80] animate-pulse" />
            <span className="font-bold">10 kHz LOCK-IN ACTIVE</span>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-black dark:text-white hover:text-[#4CAF50] dark:hover:text-[#80EF80] transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full text-center skeu-btn text-black font-bold py-2.5 rounded-xl shadow-sm mt-4"
          >
            Get in touch
          </button>
        </div>
      )}
    </header>
  );
};
