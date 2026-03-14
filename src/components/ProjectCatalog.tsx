import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: "Privaflow",
    description: "Encryption-First Architecture",
    tags: ["Security", "Encryption", "Architecture"],
    image: "/projects/privaflow.png",
    size: "lg",
    offset: 0
  },
  {
    title: "Top Nature",
    description: "Organic Visual Intelligence",
    tags: ["Motion", "AI", "Design"],
    image: "/projects/top_nature.png",
    size: "md",
    offset: 20
  },
  {
    title: "Core Aggregator",
    description: "High-Throughput Data Node",
    tags: ["Backend", "Efficiency", "Scale"],
    image: "/projects/aggregator.png",
    size: "md",
    offset: -20
  },
  {
    title: "Artisan Lab",
    description: "Avant-Garde Experiments",
    tags: ["Creative", "WebGL", "UX"],
    image: "/projects/lab.png",
    size: "sm",
    offset: 10
  }
];

export const ProjectCatalog: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden bg-projects-studio">
      {/* Anime Motif Layer */}
      <div 
        className="anime-motif opacity-[0.03]"
        style={{ backgroundImage: 'url(/assets/anime_hero.png)', backgroundSize: 'cover', backgroundPosition: 'center center' }} 
      />
      <div className="container mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] block">Exhibition // v2.0</span>
            <h2 className="text-6xl md:text-8xl font-display italic text-white leading-[0.8]">The Studio Moodboard</h2>
          </div>
          <p className="max-w-xs text-white/40 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
            Curated artifacts of engineering integrity. Each capture represents a standard of performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[240px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative glass-panel rounded-3xl overflow-hidden cursor-pointer
                ${project.size === 'lg' ? 'md:col-span-8 md:row-span-2' : ''}
                ${project.size === 'md' ? 'md:col-span-4 md:row-span-2' : ''}
                ${project.size === 'sm' ? 'md:col-span-4 md:row-span-1' : ''}
              `}
              style={{ marginTop: project.offset }}
            >
              {/* Uncropped Screenshot Container */}
              <div className="absolute inset-0 p-8 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-95 group-hover:scale-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+Artifact";
                  }}
                />
              </div>

              {/* Technical Overlay */}
              <div className="absolute inset-0 border border-white/5 opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              {/* Top Meta */}
              <div className="absolute top-6 left-6 flex items-center gap-4 py-2 px-4 border border-white/10 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                 <span className="font-mono text-[8px] text-[var(--color-accent)]">0{i+1}</span>
                 <span className="font-mono text-[8px] text-white uppercase tracking-widest">{project.title}</span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="space-y-1">
                   <h3 className="text-2xl font-display italic text-white">{project.title}</h3>
                   <p className="font-mono text-[9px] text-white/50 uppercase tracking-widest">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[8px] border border-white/10 px-2 py-0.5 rounded-full text-white/30">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Aesthetic Filler Block */}
          <div className="md:col-span-4 md:row-span-1 glass-panel rounded-3xl p-8 flex flex-col justify-center border-dashed border-white/10 opacity-30">
            <span className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-accent-secondary)]">Warning: Architecture_Active</span>
            <p className="font-mono text-[9px] uppercase leading-relaxed mt-2 italic">Standardizing high-integrity visual output.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCatalog;
