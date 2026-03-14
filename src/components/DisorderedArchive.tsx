import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const projects = [
  {
    title: "ANIMY",
    category: "AGGREGATOR",
    tech: "NODE.JS",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "VAULT",
    category: "CRYPTOGRAPHY",
    tech: "PYTHON",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "SANCTUARY",
    category: "ARCHITECTURE",
    tech: "REACT",
    image: "https://images.unsplash.com/photo-1600607687940-47a000dfed5a?auto=format&fit=crop&q=80&w=1200",
  }
];

export const DisorderedArchive = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-10%" });

  return (
    <section id="works" ref={containerRef} className="relative py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-foreground leading-none tracking-tightest">
              Selected <br /><span className="text-foreground/20 italic font-light">Artifacts</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/40 font-mono text-sm leading-relaxed uppercase tracking-widest">
            A curation of high-integrity digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-foreground/[0.02] mb-8">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-foreground/30 uppercase font-bold">
                  <span>{project.category}</span>
                  <div className="h-[1px] w-6 bg-foreground/10" />
                  <span>{project.tech}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-black text-foreground tracking-tighter">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
