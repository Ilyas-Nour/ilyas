import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Animy',
    stack: ['React', 'Laravel', 'AniList API'],
    description: 'High-performance anime streaming aggregator with real-time tracking.',
    link: '#'
  },
  {
    title: 'PrivaFlow',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL'],
    description: 'Privacy-focused data orchestration platform for enterprise systems.',
    link: '#'
  },
  {
    title: 'TopNature',
    stack: ['React', 'Tailwind', 'E-commerce'],
    description: 'Premium e-commerce experience for organic agricultural products.',
    link: '#'
  }
];

export const ProjectCatalog = () => {
  return (
    <section className="py-32 px-6 md:px-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">_selected_works</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">Project Catalog.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl group relative overflow-hidden flex flex-col min-h-[400px]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  {project.stack.map(s => (
                    <span key={s} className="text-[10px] font-mono text-accent px-2 py-1 bg-accent/10 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
              </div>
              
              <p className="text-muted mb-12 flex-1">{project.description}</p>
              
              <motion.a 
                href={project.link}
                className="inline-flex items-center gap-2 font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                VIEW_DETAILS <span className="text-lg">→</span>
              </motion.a>

              {/* Decorative Geometric Element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 border border-accent/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
