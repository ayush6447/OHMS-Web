import React from 'react';
import { Mail, Stethoscope, Cpu, Code } from 'lucide-react';

export const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Ayes Chinmay',
      role: 'Mentor',
      subtitle: 'Director, SensorSpine · Assistant Professor, SOA',
      bio: 'Leading mentor in biomedical sensing and opto-mechanical instrumentation. Guiding clinical validation protocols, sensor architecture, and research methodology.',
      tag: 'DIRECTOR & MENTOR',
      email: 'ayas.chinmay@sensorspine.org',
      icon: Stethoscope,
    },
    {
      name: 'Aryan Raj',
      role: 'ML & Hardware Engineer',
      subtitle: 'NIR Hardware & Embedded Systems',
      bio: 'Specializing in dual-wavelength laser diode optical paths, InGaAs photodiode integration, and Teensy microcontroller DSP circuit design.',
      tag: 'ML & HARDWARE',
      email: 'aryan.raj@ohms-med.org',
      icon: Cpu,
    },
    {
      name: 'Rishav Singh',
      role: 'AI Developer & Software Engineer',
      subtitle: 'Signal Processing & Software Architecture',
      bio: 'Architecting digital lock-in demodulation algorithms, spectroscopic machine learning models, and real-time lipid calculation software pipelines.',
      tag: 'AI & SOFTWARE',
      email: 'rishav.singh@ohms-med.org',
      icon: Code,
    },
  ];

  return (
    <section id="team" className="py-24 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] font-mono text-xs font-bold uppercase tracking-wider">
            MEDTECH TEAM &amp; ADVISORS
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white">
            Bridging optical hardware, AI algorithms, and biomedical sensing.
          </h2>

          <p className="text-lg text-black/80 dark:text-white/80 font-normal">
            Our team combines expertise in sensor hardware engineering, machine learning signal processing, and medical device mentorship.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => {
            const Icon = member.icon;
            return (
              <div
                key={idx}
                className="skeu-panel p-8 rounded-3xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-2xl skeu-inset text-[#4CAF50] dark:text-[#80EF80] flex items-center justify-center mb-6">
                    <Icon className="w-10 h-10" />
                  </div>

                  <span className="font-mono text-[10px] font-bold tracking-wider text-black dark:text-white uppercase px-2.5 py-1 rounded-lg skeu-inset inline-block mb-3">
                    {member.tag}
                  </span>

                  <h3 className="font-heading text-2xl font-bold text-black dark:text-white">
                    {member.name}
                  </h3>

                  <div className="text-xs font-mono text-[#4CAF50] dark:text-[#80EF80] font-bold mt-1 mb-1">
                    {member.role}
                  </div>

                  <div className="text-[11px] font-mono opacity-60 font-bold mb-4">
                    {member.subtitle}
                  </div>

                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#4CAF50] dark:text-[#80EF80] hover:underline font-bold"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </a>
                  <span className="font-mono text-[10px] opacity-50 font-bold">
                    OHMS RESEARCH
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
