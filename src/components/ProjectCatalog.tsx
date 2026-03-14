import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    id: '01',
    title: 'Animy',
    stack: ['React', 'Laravel', 'RestAPI'],
    description: 'High-performance streaming engine with real-time tracking.',
    link: 'https://animy-frontend.vercel.app/',
    stats: { build: 'STABLE', latency: '24ms' }
  },
  {
    id: '02',
    title: 'PrivaFlow',
    stack: ['Node.js', 'PostgreSQL', 'Auth'],
    description: 'Privacy-focused data orchestration platform for secure systems.',
    link: 'https://vaultnode.vercel.app/en',
    stats: { build: 'PRODUCTION', latency: '12ms' }
  },
  {
    id: '03',
    title: 'TopNature',
    stack: ['Vite', 'Tailwind', 'Commerce'],
    description: 'Premium e-commerce architecture for organic scale.',
    link: '#',
    stats: { build: 'ARCHIVED', latency: 'N/A' }
  }
];

export const ProjectCatalog = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Global Background Interaction */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000" 
           style={{ backgroundColor: hoveredIndex !== null ? 'rgba(0, 229, 255, 0.02)' : 'transparent' }} 
      />

      <div className="relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-4 block">_catalog_index_v5.0</span>
            <h2 className="text-header-responsive font-black text-white">
              S<span className="font-display italic font-light italic text-white/20">el</span>ected <br />
              W<span className="font-display italic font-light italic text-white/20">or</span>ks.
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-muted font-mono text-[9px] md:text-[10px] tracking-widest leading-relaxed uppercase opacity-60">
              A curated collection of digital systems engineered for performance and precision. Each project represents a unique architectural challenge.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-3xl">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-black p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12 transition-all duration-700 hover:bg-white/[0.02]"
            >
              <div className="flex items-start gap-6 md:gap-12">
                <span className="font-mono text-accent/60 text-lg md:text-xl group-hover:text-accent transition-colors">
                  {project.id}
                </span>
                
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-700">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map(s => (
                      <span key={s} className="text-[10px] font-mono tracking-widest text-white/70 group-hover:text-accent transition-colors border border-white/10 px-3 py-1 rounded-full bg-white/5 group-hover:border-accent/40">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:max-w-xs text-left lg:text-right space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-white/70 font-sans font-light leading-relaxed group-hover:text-white transition-colors">
                  {project.description}
                </p>
                <div className="flex lg:justify-end gap-6 pt-4 grayscale group-hover:grayscale-0 transition-all opacity-20 group-hover:opacity-100">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-white/50 uppercase tracking-[0.2em]">Build_State</div>
                    <div className="text-[10px] font-mono text-accent uppercase tracking-widest">{project.stats.build}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-white/50 uppercase tracking-[0.2em]">Core_Latency</div>
                    <div className="text-[10px] font-mono text-white uppercase tracking-widest">{project.stats.latency}</div>
                  </div>
                </div>
              </div>

              {/* Hover Icon Reveal */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-10 group-hover:translate-x-0 hidden lg:block">
                <span className="text-7xl font-light text-accent/20">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
