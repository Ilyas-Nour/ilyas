import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Privaflow",
    description: "A secure, end-to-end encrypted platform for sensitive data management and private communication flows.",
    tags: ["Rust", "Wasm", "Encryption"],
    image: "/projects/privaflow.png",
  },
  {
    title: "Top Nature",
    description: "An environmental monitoring dashboard designed to track and visualize ecological data in real-time.",
    tags: ["React", "AI", "WebGL"],
    image: "/projects/top_nature.png",
  },
  {
    title: "Animy",
    description: "A high-performance animation engine designed for complex web interfaces and cinematic interactions.",
    tags: ["TypeScript", "Motion", "CSS"],
    image: "/projects/animy.png",
  }
];

export const ProjectCatalog: React.FC = () => {
  return (
    <section id="projects" className="relative py-40 px-6">
      <div className="container mx-auto">
        <header className="mb-32 space-y-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)]">Selected Works</span>
          <h2 className="text-6xl md:text-9xl font-serif italic text-[var(--color-text)] leading-[0.8]">
             Digital Artifacts <br /> 
             <span className="opacity-40">of Excellence.</span>
          </h2>
        </header>

        <div className="space-y-40">
           {projects.map((project, i) => (
             <motion.div 
               key={project.title}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
               className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center group"
             >
                {/* Visual Column */}
                <div className="lg:col-span-7 relative aspect-video overflow-hidden rounded-[32px] border border-[var(--color-border)] glass">
                   <motion.img 
                     src={project.image} 
                     alt={project.title}
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/40 to-transparent pointer-events-none" />
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 space-y-8">
                   <div className="space-y-4">
                      <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">Project 0{i + 1}</span>
                      <h3 className="text-5xl md:text-7xl font-serif italic text-[var(--color-text)] leading-tight">{project.title}</h3>
                      <p className="text-lg text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
                        {project.description}
                      </p>
                   </div>

                   <div className="flex flex-wrap gap-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-5 py-2 rounded-full border border-[var(--color-border)] glass font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                           {tag}
                        </span>
                      ))}
                   </div>

                   <div className="pt-6">
                      <button className="px-10 py-4 rounded-full border border-[var(--color-border)] glass font-mono text-[10px] uppercase tracking-widest hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500">
                         Explore Project
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCatalog;
