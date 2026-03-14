import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skillsRow1 = [
  { name: 'React', icon: 'react', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
  { name: 'Node.js', icon: 'nodedotjs', color: '#339933' },
  { name: 'Next.js', icon: 'nextdotjs', color: '#ffffff' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4' },
  { name: 'Three.js', icon: 'threedotjs', color: '#ffffff' },
  { name: 'Framer Motion', icon: 'framer', color: '#ff0055' },
  { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' },
  { name: 'AWS', icon: 'amazonwebservices', color: '#FF9900' }, // Corrected slug and vibrant brand color
  { name: 'Docker', icon: 'docker', color: '#2496ED' },
  { name: 'Postman', icon: 'postman', color: '#FF6C37' },
];

const skillsRow2 = [
  { name: 'GraphQL', icon: 'graphql', color: '#E10098' },
  { name: 'Prisma', icon: 'prisma', color: '#2D3748' },
  { name: 'Redis', icon: 'redis', color: '#DC382D' },
  { name: 'Python', icon: 'python', color: '#3776AB' },
  { name: 'Vite', icon: 'vite', color: '#646CFF' },
  { name: 'GitHub', icon: 'github', color: '#ffffff' },
  { name: 'Firebase', icon: 'firebase', color: '#FFCA28' },
  { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
  { name: 'Go', icon: 'go', color: '#00ADD8' },
  { name: 'Svelte', icon: 'svelte', color: '#FF3E00' },
  { name: 'Kubernetes', icon: 'kubernetes', color: '#326CE5' },
];

const MarqueeRow: React.FC<{ items: typeof skillsRow1; direction: number }> = ({ items, direction }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex gap-4 py-4 overflow-hidden mask-fade relative">
      <motion.div
        animate={isPaused ? {} : { x: direction === 1 ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-4 whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-4 glass hover:border-[var(--color-accent)]/40 transition-all duration-300 group relative"
          >
            <div className="p-2 rounded bg-white/5 border border-white/5 group-hover:border-[var(--color-accent)]/30 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.2)] transition-all">
              <img
                src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace('#', '')}`}
                alt={skill.name}
                className="w-5 h-5 object-contain transition-all duration-500"
                width={20}
                height={20}
              />
            </div>
            <span className="font-mono text-xs text-white/60 group-hover:text-white uppercase tracking-widest">{skill.name}</span>
            {/* Mecha Brackets */}
            <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-[var(--color-accent)]/20 opacity-0 group-hover:opacity-100" />
            <div className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-[var(--color-accent)]/20 opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#050507]">
      {/* HUD Scanline */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="container mx-auto relative z-30">
        <div className="mb-12">
           <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] opacity-60">System_Core_Skills</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display italic text-white leading-tight">Technological Spectrum</h2>
        </div>

        <div className="space-y-4">
          <MarqueeRow items={skillsRow1} direction={1} />
          <MarqueeRow items={skillsRow2} direction={-1} />
        </div>

        {/* Dense Status Annotations */}
        <div className="mt-12 flex justify-between items-end border-t border-white/5 pt-6 opacity-20 hidden md:flex">
            <div className="font-mono text-[7px] space-y-1">
               <p>STATUS: MODULE_LOAD_NOMINAL</p>
               <p>HASH: 0x94B2E1 // BUFFER: ACTIVE</p>
            </div>
            <div className="flex gap-4">
               {[1,2,3,4,5,6].map(i => <div key={i} className={`w-1 h-4 ${i < 4 ? 'bg-[var(--color-accent)]' : 'bg-white/10'}`} />)}
            </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
