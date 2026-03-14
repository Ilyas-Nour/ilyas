import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', icon: 'react', level: 'Expert', category: 'Frontend', size: 'lg', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'typescript', level: 'Expert', category: 'Logic', size: 'md', color: '#3178C6' },
  { name: 'Node.js', icon: 'nodedotjs', level: 'Senior', category: 'Backend', size: 'md', color: '#339933' },
  { name: 'Next.js', icon: 'nextdotjs', level: 'Expert', category: 'Framework', size: 'lg', color: '#ffffff' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', level: 'Expert', category: 'Styling', size: 'sm', color: '#06B6D4' },
  { name: 'PostgreSQL', icon: 'postgresql', level: 'Senior', category: 'Data', size: 'md', color: '#4169E1' },
  { name: 'Framer Motion', icon: 'framer', level: 'Expert', category: 'Motion', size: 'md', color: '#ff0055' },
  { name: 'GraphQL', icon: 'graphql', level: 'Senior', category: 'API', size: 'sm', color: '#E10098' },
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#050507]">
      {/* HUD Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Anime Motif Layer */}
      <div 
        className="anime-motif opacity-[0.04]"
        style={{ backgroundImage: 'url(/assets/anime_skills.png)', backgroundPosition: 'center center' }} 
      />

      {/* Background HUD Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto relative z-30">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] px-4 py-1 border border-[var(--color-accent)]/20 rounded-full glass">System Architecture</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--color-accent)]/30 to-transparent" />
          </div>
          <h2 className="text-5xl md:text-8xl font-display italic text-white text-center leading-none">Technological Dashboard</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 auto-rows-[160px]">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`relative glass-panel rounded-lg p-5 flex flex-col justify-between overflow-hidden group border-white/5 hover:border-[var(--color-accent)]/40 transition-all duration-500
                ${skill.size === 'lg' ? 'md:col-span-2 md:row-span-2' : ''}
                ${skill.size === 'md' ? 'md:row-span-2' : ''}
              `}
            >
              {/* Mecha HUD Brackets */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--color-accent)]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--color-accent)]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--color-accent)]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--color-accent)]/30 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Animated Scan Line */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent z-0"
              />

              <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[7px] uppercase tracking-widest text-[var(--color-accent)] opacity-60">CAT_{skill.category}</span>
                  <span className="font-mono text-[6px] text-white/20">UUID: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 group-hover:border-[var(--color-accent)]/30 transition-colors">
                  <img 
                    src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace('#', '')}`}
                    alt={skill.name}
                    className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-500"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-display text-white group-hover:text-[var(--color-accent)] transition-colors leading-none mb-2">{skill.name}</h3>
                <div className="flex items-center gap-2">
                   <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Senior' ? '85%' : '75%' }}
                        className="h-full bg-[var(--color-accent)]/40"
                      />
                   </div>
                   <span className="font-mono text-[8px] uppercase tracking-tighter text-white/40">{skill.level}</span>
                </div>
              </div>

              {/* Data Annotation */}
              <div className="absolute bottom-2 right-4 pointer-events-none flex flex-col items-end">
                <span className="font-mono text-[6px] text-white/10 uppercase tracking-widest italic line-clamp-1">Artifact_Node_S0{i+1}</span>
                <span className="font-mono text-[5px] text-white/5 uppercase">Status_Link_Stable</span>
              </div>
            </motion.div>
          ))}
          
          {/* Aesthetic HUD Filler */}
          <div className="md:col-span-2 flex flex-col gap-4">
             <div className="flex-1 glass-panel rounded-lg p-6 flex flex-col justify-center border-dashed border-white/10 opacity-30">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(j => <div key={j} className="w-1 h-3 bg-[var(--color-accent)]/20" />)}
                </div>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] leading-relaxed">
                  Initializing technological synchronization... <br />
                  Visual artifacts calibrated. <br />
                  Integrity: nominal.
                </p>
             </div>
             <div className="h-[60px] glass-panel rounded-lg flex items-center justify-between px-6 border-white/5 opacity-20">
                <span className="font-mono text-[8px] text-white/40 uppercase">Load_v1.2.4</span>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full border border-white/20 animate-pulse" />
                   <div className="w-2 h-2 rounded-full border border-white/20 animate-pulse delay-75" />
                   <div className="w-2 h-2 rounded-full border border-white/20 animate-pulse delay-150" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
