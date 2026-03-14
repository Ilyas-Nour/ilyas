import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KineticButton } from './KineticButton';

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

const HorizontalProject: React.FC<{ project: typeof projects[0], index: number }> = ({ project, index }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      // Calculate how far we need to scroll: Total width - viewport width + some padding for the end spacer
      setScrollRange(scrollRef.current.scrollWidth - window.innerWidth + 100);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.9], [0, -scrollRange]);

  return (
    <section ref={targetRef} className="relative h-[600vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-20 px-24 items-center">
          {/* Project Identity Card */}
          <div className="flex-shrink-0 w-[80vw] md:w-[60vw] space-y-12">
            <div className="space-y-6">
               <h3 className="text-7xl md:text-9xl font-serif italic text-[var(--color-text)] leading-none">{project.title}</h3>
            </div>
            
            <div className="max-w-xl space-y-8">
              <p className="text-xl md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
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
                <div className="pt-8 flex">
                  <KineticButton 
                    variant="primary"
                    onClick={() => window.open(project.link, '_blank')}
                    icon={<span>↗</span>}
                  >
                    Enter Atmosphere
                  </KineticButton>
                </div>
              )}
            </div>
          </div>

          {/* Screenshot Gallery */}
          <div className="flex gap-12 items-center">
            {project.screenshots.map((shot, idx) => (
              <motion.div 
                key={idx}
                className="flex-shrink-0 relative h-[70vh] md:h-[80vh] min-w-[350px] md:min-w-[600px] border border-[var(--color-border)] bg-[var(--color-border)]/5 rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-black/40 transition-all duration-700"
              >
                <img 
                  src={shot} 
                  alt={`${project.title} view ${idx + 1}`}
                  className="w-full h-full object-contain p-6 md:p-12 select-none"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* End of Project Card */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col items-center justify-center text-center space-y-4">
             <div className="h-px w-24 bg-[var(--color-border)] mb-4" />
             <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 italic">Scroll for Next Project</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const ProjectCatalog: React.FC = () => {
  return (
    <section id="projects" className="relative">
      <header className="pt-32 px-6 container mx-auto mb-20 text-center">
        <h2 className="text-6xl md:text-9xl font-serif italic text-[var(--color-text)] leading-tight">
           Project <br /> 
           <span className="opacity-30">Chronicles.</span>
        </h2>
      </header>

      <div className="relative">
        {projects.map((project, i) => (
          <HorizontalProject key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectCatalog;
