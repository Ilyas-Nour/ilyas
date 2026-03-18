import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';
import { ProjectButton } from '../ui/ProjectButton';
import { useScrollProgress } from '../../context/ScrollProgressContext';

/**
 * Project Interface
 * Defines the schema for digital artifacts displayed in the catalog.
 */
const projects = [
  {
    title: "Animy",
    description: "Animy is a social-first anime and manga discovery platform designed to connect fans through real-time interaction and personalized tracking. It shifts the focus from simple content browsing to building a community around shared interests, allowing users to curate their journeys and share them with friends.",
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
    description: "VaultNode is a cutting-edge, privacy-focused productivity suite designed for high-performance file manipulation. Leveraging WebAssembly and local-only AI, it empowers users to process media, edit PDFs, and transform data entirely within the browser, ensuring absolute privacy without compromising on speed.",
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
    description: "An online store for buying plants. It is fast, easy to use, and has a very smooth design.",
    tags: ["Next.js 16", "React 19", "E-commerce", "Stripe", "Prisma"],
    screenshots: [
      "/projects/topnature1.png", "/projects/topnature2.png", 
      "/projects/topnature3.png", "/projects/topnature4.png"
    ],
  }
];

/**
 * Screenshot Component
 * Renders a project image within a responsive device frame.
 * 
 * @param src Absolute path to the image asset.
 * @param project Project title for accessibility (alt tag).
 */
const Screenshot = React.memo(({ src, project }: { src: string, project: string }) => {
  const isMobile = src.includes('mobile');
  
  return (
    <motion.div 
      className="flex-shrink-0 device-wrapper"
      style={{ width: isMobile ? '70vw' : '85vw' }}
    >
      {/* Desktop Device Frames - Hidden on Mobile for clean verticality */}
      <div className={`${isMobile ? 'mobile-frame' : 'laptop-frame'} hidden md:block`}>
        <div className="device-screen">
          <img 
            src={src} 
            alt={`${project} view`}
            className="select-none"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Mobile-only Raw Display Layer */}
      <div className="md:hidden w-full rounded-xl overflow-hidden border border-[var(--color-border)] shadow-xl">
        <img 
          src={src} 
          alt={`${project} mobile view`}
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
});

/**
 * HorizontalProject Component
 * Creates a "Section-within-a-Section" horizontal scroll experience for desktop,
 * and a traditional vertical stack for mobile devices.
 */
const HorizontalProject: React.FC<{ project: typeof projects[0], index: number }> = ({ project, index }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const { setProgress, setIsVisible } = useScrollProgress();

  // Robust ResizeObserver to handle dynamic content width (image loads, etc)
  useLayoutEffect(() => {
    if (isMobileViewport) return;

    const updateRange = () => {
      if (scrollRef.current) {
        const range = scrollRef.current.scrollWidth - window.innerWidth + 200;
        setScrollRange(Math.max(0, range));
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateRange();
    });

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    // Also listen to window resize for viewport changes
    window.addEventListener('resize', updateRange);
    updateRange();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateRange);
    };
  }, [isMobileViewport]);

  // Viewport detection
  useEffect(() => {
    const checkMobile = () => setIsMobileViewport(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync horizontal displacement with vertical scroll progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Update global progress bar
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Only set visible if within bounds
      if (latest > 0 && latest < 1) {
        setIsVisible(true);
        setProgress(latest);
      } else if (latest <= 0 || latest >= 1) {
        // This hide logic might be tricky if two projects overlap slightly
        // But since they are separated by 400vh sections, it should be fine.
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, setProgress, setIsVisible]);

  // Handle visibility more robustly
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold: 0 }
    );
    if (targetRef.current) observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [setIsVisible]);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `calc(-${scrollRange}px)`]);

  // Mobile Fragment - UX optimized for vertical touch interaction
  if (isMobileViewport) {
    return (
      <div className="px-6 py-20 space-y-12">
        <div className="space-y-6">
          <h3 className="text-5xl font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-none">{project.title}</h3>
          <p className="text-lg text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full border border-[var(--color-border)] glass font-mono text-[8px] uppercase tracking-widest text-[var(--color-text-muted)]">
                {tag}
              </span>
            ))}
          </div>
          {project.link && (
            <div className="pt-4 flex">
              <ProjectButton 
                link={project.link}
                title={project.title}
              />
            </div>
          )}
        </div>
        <div className="space-y-8">
          {project.screenshots.map((shot, idx) => (
            <Screenshot key={idx} src={shot} project={project.title} />
          ))}
        </div>
      </div>
    );
  }

  // Desktop Component - Experience-driven horizontal gallery
  return (
    <section ref={targetRef} className="relative h-[400vh] md:h-[500vh]">
      <div className="sticky top-0 flex h-screen overflow-hidden z-30 items-center">
        <motion.div ref={scrollRef} style={{ x }} className="flex gap-12 md:gap-24 px-6 md:px-24 items-center">
          {/* Project Identity Card */}
          <div className="flex-shrink-0 w-[85vw] md:w-[60vw] space-y-6 md:space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="space-y-4 md:space-y-6">
               <h3 className="text-5xl md:text-9xl font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>{project.title}</h3>
            </div>
            
            <div className="max-w-xl space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
              <p className="text-base md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 md:px-5 py-1 md:py-2 rounded-full border border-[var(--color-border)] glass font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <div className="pt-4 md:pt-8 flex">
                  <ProjectButton 
                    link={project.link}
                    title={project.title}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Screenshot Gallery Array */}
          <div className="flex gap-12 md:gap-16 items-center flex-nowrap pr-[10vw] md:pr-0">
            {project.screenshots.map((shot, idx) => (
              <Screenshot key={idx} src={shot} project={project.title} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * ProjectCatalog Section Component
 * High-performance exhibition of finished works.
 * Uses predictive scroll mapping to drive horizontal motion.
 */
export const ProjectCatalog: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.15], [80, 0]);

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex flex-col justify-start bg-[var(--color-bg)] border-t border-[var(--color-border)] pt-8 md:pt-12">
      <header className="container mx-auto mb-2 md:mb-4 px-6">
        <div className="relative select-none">
          <motion.h2 
            style={{ x: xLeft }}
            className="text-[clamp(3rem,16vw,11vh)] font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-[0.8]"
          >
            My
          </motion.h2>
          <motion.h2 
            style={{ x: xRight, fontFamily: 'var(--font-signature)' }}
            className="text-[clamp(4.5rem,20vw,14vh)] leading-[0.8] -mt-[3vh] font-normal text-[var(--color-text)] opacity-80"
          >
            Work.
          </motion.h2>
        </div>
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
