import React from 'react';
import { motion } from 'framer-motion';

/**
 * BentoAbout Component
 * A modern modular layout for the "About Me" information.
 * Fully responsive and theme-adaptive.
 */
export const BentoAbout: React.FC = () => {
  const cards = [
    {
      id: 'bio',
      title: 'The Identity',
      content: 'I am a second-year Full-Stack trainee at OFPPT, dedicated to merging technical rigor with visual excellence. My work spans from complex SaaS architectures to minimalist portfolios.',
      size: 'md:col-span-2 md:row-span-2',
      icon: '🆔'
    },
    {
      id: 'status',
      title: 'Availability',
      content: 'Currently seeking internship opportunities to contribute and grow within a high-impact engineering team.',
      size: 'md:col-span-1 md:row-span-1',
      icon: '✨'
    },
    {
      id: 'location',
      title: 'Base',
      content: 'Based in Morocco, operating at the intersection of global design trends.',
      size: 'md:col-span-1 md:row-span-1',
      icon: '📍'
    },
    {
      id: 'focus',
      title: 'Current Focus',
      content: 'Building performant web applications like Animy and VaultNode, refining my eye for alchemical UI design.',
      size: 'md:col-span-2 md:row-span-1',
      icon: '🛠️'
    }
  ];

  return (
    <section id="about" className="section-padding bg-[var(--color-bg)]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-serif italic text-[var(--color-text)] leading-tight mb-6">
              Who is <br /> <span className="not-italic font-sans font-extrabold uppercase text-[var(--color-accent)]">Ilyas?</span>
            </h2>
            <p className="text-[var(--color-text-muted)] font-sans font-light text-lg md:text-xl">
              Deconstructing a developer's journey through modular insights.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-30">Identity // Archive</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-accent)]/30 transition-all duration-700 ${card.size}`}
            >
              {/* Card Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-6 opacity-80">{card.icon}</div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">{card.title}</h3>
                </div>
                <p className={`text-[var(--color-text)] font-sans font-light leading-relaxed ${card.id === 'bio' ? 'text-xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl'}`}>
                  {card.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoAbout;
