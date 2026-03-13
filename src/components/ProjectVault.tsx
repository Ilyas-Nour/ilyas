import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Animy',
    category: 'Aggregator',
    description: 'High-performance anime streaming platform with concurrent load optimization.',
    tech: ['React', 'Redis', 'Node.js'],
    accent: '#818cf8'
  },
  {
    title: 'PrivaFlow',
    category: 'Security',
    description: 'Zero-knowledge encrypted workflow management system for enterprise scales.',
    tech: ['Next.js', 'AES-256', 'Crypto'],
    accent: '#c084fc'
  },
  {
    title: 'Nexus OS',
    category: 'Interface',
    description: 'Spatial computing operating system conceptualized for future interfaces.',
    tech: ['Three.js', 'React', 'GLSL'],
    accent: '#2dd4bf'
  }
];

export const ProjectVault = () => {
  return (
    <section id="vault" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase block mb-4">The Archive</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Dimensional // Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] astral-glass rounded-[2rem] p-10 flex flex-col justify-between overflow-hidden group-hover:border-accent/30 transition-all duration-500">
                {/* Visual Accent */}
                <div 
                   className="absolute -top-24 -right-24 w-64 h-64 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                   style={{ backgroundColor: project.accent }}
                />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{project.category}</span>
                  <div className="flex gap-2">
                     <Github size={18} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                     <ArrowUpRight size={18} className="text-accent" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-4xl font-display font-bold mb-4 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 font-medium">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono py-1 px-3 border border-white/5 rounded-full text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Reveal Effect */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
