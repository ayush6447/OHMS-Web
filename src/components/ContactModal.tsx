import React, { useState } from 'react';
import { X, Mail, Check, Copy, Send, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const email = 'rishavrajvansh@proton.me';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="skeu-panel text-black dark:text-white w-full max-w-lg rounded-3xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#636B2F] text-white dark:bg-[#80EF80] dark:text-black p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-black/10 text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider mb-3">
            GET IN TOUCH
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-bold">
            Connect with the OHMS Team
          </h3>
          <p className="text-sm font-medium opacity-90 mt-1">
            Inquire about prototype specs, research partnerships, or clinical trials.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Direct Email Copy Box */}
          <div className="skeu-inset p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl skeu-btn flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono opacity-60 uppercase font-bold">Direct Inquiry Email</div>
                <div className="font-mono text-sm font-bold truncate">
                  {email}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-2 rounded-xl skeu-btn font-mono text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Inquiry Form */}
          {submitted ? (
            <div className="p-6 rounded-2xl skeu-inset text-center space-y-3">
              <ShieldCheck className="w-10 h-10 text-[#636B2F] dark:text-[#80EF80] mx-auto" />
              <h4 className="font-heading text-lg font-bold">
                Inquiry Sent Successfully
              </h4>
              <p className="text-xs opacity-80">
                Thank you for your interest in OHMS. We will respond to your inquiry shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-mono text-black skeu-btn font-bold px-4 py-2 rounded-xl"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono opacity-60 uppercase mb-1 font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl skeu-inset text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono opacity-60 uppercase mb-1 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.morgan@hospital.org"
                  className="w-full px-4 py-2.5 rounded-xl skeu-inset text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono opacity-60 uppercase mb-1 font-bold">
                  Message / Partnership Inquiry
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Interested in reviewing clinical validation data or exploring trial deployment..."
                  className="w-full px-4 py-2.5 rounded-xl skeu-inset text-sm outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full skeu-btn text-black font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Send Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
