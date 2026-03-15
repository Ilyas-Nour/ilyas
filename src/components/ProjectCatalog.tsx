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

const Screenshot = ({ src, project }: { src: string, project: string }) => {
  const isMobile = src.includes('mobile');
  
  return (
    <motion.div 
      className="flex-shrink-0 device-wrapper"
      style={{ width: isMobile ? 'auto' : '65vw' }}
    >
      <div className={isMobile ? 'mobile-frame' : 'laptop-frame'}>
        <div className="device-screen">
          <img 
            src={src} 
            alt={`${project} view`}
            className="select-none"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

const HorizontalProject: React.FC<{ project: typeof projects[0], index: number }> = ({ project, index }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      // Precise range: content width - screen width + small aesthetic buffer
      setScrollRange(scrollRef.current.scrollWidth - window.innerWidth + 200);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `calc(-${scrollRange}px)`]);

  return (
    <section ref={targetRef} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-16 md:gap-24 px-6 md:px-24 items-center">
          {/* Project Identity Card */}
          <div className="flex-shrink-0 w-[90vw] md:w-[60vw] space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
               <h3 className="text-5xl md:text-9xl font-serif italic text-[var(--color-text)] leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>{project.title}</h3>
            </div>
            
            <div className="max-w-xl space-y-6 md:space-y-8">
              <p className="text-lg md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 md:px-5 py-1 md:py-2 rounded-full border border-[var(--color-border)] glass font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
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
          <div className="flex gap-16 items-center flex-nowrap">
            {project.screenshots.map((shot, idx) => (
              <Screenshot key={idx} src={shot} project={project.title} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const ProjectCatalog: React.FC = () => {
  return (
    <section id="projects" className="relative">
      <header className="pt-16 px-6 container mx-auto mb-10 md:mb-20 text-center">
        <h2 className="text-5xl md:text-9xl font-serif italic text-[var(--color-text)] leading-tight" style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}>
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
