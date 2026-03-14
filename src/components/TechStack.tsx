import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 'Expert', category: 'Frontend', size: 'lg', color: '#61DAFB' },
  { name: 'TypeScript', level: 'Expert', category: 'Logic', size: 'md', color: '#3178C6' },
  { name: 'Node.js', level: 'Senior', category: 'Backend', size: 'md', color: '#339933' },
  { name: 'Next.js', level: 'Expert', category: 'Framework', size: 'lg', color: '#ffffff' },
  { name: 'Tailwind', level: 'Expert', category: 'Styling', size: 'sm', color: '#06B6D4' },
  { name: 'PostgreSQL', level: 'Senior', category: 'Data', size: 'md', color: '#4169E1' },
  { name: 'Framer Motion', level: 'Expert', category: 'Motion', size: 'md', color: '#ff0055' },
  { name: 'GraphQL', level: 'Senior', category: 'API', size: 'sm', color: '#E10098' },
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] block mb-4">Core Infrastructure</span>
          <h2 className="text-5xl md:text-7xl font-display italic text-white leading-tight">Technological Tapestry</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px]">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative glass-panel rounded-2xl p-6 flex flex-col justify-between overflow-hidden group border-white/5 hover:border-[var(--color-accent)]/30 transition-colors
                ${skill.size === 'lg' ? 'md:col-span-2 md:row-span-2' : ''}
                ${skill.size === 'md' ? 'md:row-span-2' : ''}
              `}
            >
              {/* Animated Glow Back */}
              <div 
                className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: skill.color }}
              />

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">{skill.category}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-display text-white mb-1">{skill.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">{skill.level}</p>
              </div>

              {/* Decorative Index */}
              <span className="absolute bottom-2 right-4 font-mono text-[8px] text-white/10 uppercase italic">Artifact_{i+1}</span>
            </motion.div>
          ))}
          
          {/* Aesthetic Filler Card */}
          <div className="md:col-span-2 glass-panel rounded-2xl p-8 flex items-center justify-center border-dashed border-white/10 opacity-40">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-center">Continuous System Deployment...</p>
          </div>
        </div>
      </div>
    </section>
  );
};
