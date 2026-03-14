import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Animy",
    description: "A high-performance anime and manga aggregator with a full social suite. Features real-time chat, global notifications, and a multi-source video failover system optimized for premium streaming.",
    tags: ["NestJS", "Redis", "Socket.io", "PostgreSQL", "Next.js"],
    link: "https://animy-frontend.vercel.app",
    screenshots: [
      "/projects/animy1.png", "/projects/animy2.png", "/projects/animy3.png", 
      "/projects/animy4.png", "/projects/animy5.png", "/projects/animy6.png",
      "/projects/animy7.png", "/projects/animy8.png", "/projects/animy9.png",
      "/projects/animy10.png", "/projects/animy11.png", "/projects/animy12.png",
      "/projects/animy-mobile1.png", "/projects/animy-mobile2.png"
    ],
  },
  {
    title: "VaultNode",
    description: "A privacy-first, edge-computing utility suite for file manipulation. Executes 100% of processing locally using WASM and Web Crypto APIs, ensuring sensitive data never leaves the device.",
    tags: ["FFmpeg WASM", "Next.js 16", "React 19", "PDF-Lib", "AI"],
    link: "https://vaultnode.vercel.app",
    screenshots: [
      "/projects/privaflow_hero.png", "/projects/privaflow1.png", "/projects/privaflow2.png",
      "/projects/privaflow3.png", "/projects/privaflow4.png", "/projects/privaflow5.png",
      "/projects/privaflow6.png", "/projects/privaflow7.png", "/projects/privaflow8.png",
      "/projects/priva-mobile1.png", "/projects/priva-mobile2.png", "/projects/priva-mobile3.png"
    ],
  },
  {
    title: "Top Nature",
    description: "A high-fidelity botanical e-commerce sanctuary (Protocol 3.0). Built on a bleeding-edge stack featuring React 19 and Next.js 16, with Stripe integration and a custom kinetic UI design system.",
    tags: ["Next.js 16", "React 19", "E-commerce", "Stripe", "Prisma"],
    screenshots: [
      "/projects/topnature1.png", "/projects/topnature2.png", 
      "/projects/topnature3.png", "/projects/topnature4.png"
    ],
  }
];

export const ProjectCatalog: React.FC = () => {
  return (
    <section id="projects" className="relative py-40 px-6">
      <div className="container mx-auto">
        <header className="mb-32 space-y-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)] font-bold">Project Vault</span>
          <h2 className="text-6xl md:text-9xl font-serif italic text-[var(--color-text)] leading-[0.8]">
             Visual Archive <br /> 
             <span className="opacity-40">of Experience.</span>
          </h2>
        </header>

        <div className="space-y-64">
           {projects.map((project, i) => (
             <motion.div 
               key={project.title}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
               className="space-y-16"
             >
                {/* Project Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                   <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-widest">Archive 0{i + 1}</span>
                        <div className="h-px flex-1 bg-[var(--color-border)]" />
                      </div>
                      <h3 className="text-6xl md:text-8xl font-serif italic text-[var(--color-text)] leading-none">{project.title}</h3>
                   </div>
                   <div className="lg:col-span-5 space-y-8">
                      <p className="text-xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                         {project.tags.map(tag => (
                           <span key={tag} className="px-5 py-2 rounded-full border border-[var(--color-border)] glass font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                              {tag}
                           </span>
                         ))}
                      </div>
                      {project.link && (
                        <motion.a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block px-10 py-4 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-[10px] uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-black/20"
                        >
                           Visit Site ↗
                        </motion.a>
                      )}
                   </div>
                </div>

                {/* Immersive Gallery Section */}
                <div className="relative group overflow-hidden">
                   {/* Horizontal Cinematic Scroll */}
                   <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar">
                      {project.screenshots.map((shot, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: idx * 0.05,
                            duration: 0.5,
                            ease: "easeOut"
                          }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="flex-shrink-0 relative h-[60vh] md:h-[75vh] min-w-[300px] border border-[var(--color-border)] bg-[var(--color-border)]/5 rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-black/20 transition-all duration-500"
                        >
                           <img 
                             src={shot} 
                             alt={`${project.title} view ${idx + 1}`}
                             className="w-full h-full object-contain p-4 md:p-8 select-none"
                           />
                        </motion.div>
                      ))}
                   </div>
                   
                   {/* Scroll Indicator Overlay */}
                   <div className="flex items-center justify-center gap-4 mt-8">
                      <div className="w-12 h-px bg-[var(--color-border)]" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.4em] opacity-40">Scroll Archive</span>
                      <div className="w-12 h-px bg-[var(--color-border)]" />
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
