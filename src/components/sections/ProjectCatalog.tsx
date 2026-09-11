import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';
import { ProjectButton } from '../ui/ProjectButton';
import { useScrollProgress } from '../../context/ScrollProgressContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Project Interface
 * Defines the schema for digital artifacts displayed in the catalog.
 */
// Project data is now managed within the component to support live translation

/**
 * Screenshot Component
 * Renders a project image within a responsive device frame.
 * 
 * @param src Absolute path to the image asset.
 * @param project Project title for accessibility (alt tag).
 * @param description Detailed description of what the screenshot shows.
 */
const Screenshot = React.memo(({ src, project, description = "interface showcase" }: { src: string, project: string, description?: string }) => {
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
            alt={`${project} - ${description}`}
            className="select-none"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      
      {/* Mobile-only Raw Display Layer */}
      <div className="md:hidden w-full rounded-xl overflow-hidden border border-[var(--color-border)] shadow-xl">
        <img 
          src={src} 
          alt={`${project} - ${description} mobile`}
          className="w-full h-auto"
          decoding="async"
        />
      </div>
    </motion.div>
  );
});

/**
 * MobileProjectCard Component
 * Premium card-based project showcase optimized for mobile.
 * Each project is a self-contained card with an integrated image slider.
 */
const MobileProjectCard = React.memo(({ project, index, t }: { project: any, index: number, t: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleDragEnd = useCallback((_: any, info: { offset: { x: number }, velocity: { x: number } }) => {
    const threshold = containerWidth * 0.15;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -400) {
      setCurrentIndex(prev => Math.min(prev + 1, project.screenshots.length - 1));
    } else if (offset > threshold || velocity > 400) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  }, [containerWidth, project.screenshots.length]);

  const goNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, project.screenshots.length - 1));
  }, [project.screenshots.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const isMobileScreenshot = project.screenshots[currentIndex]?.includes('mobile');

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Project Card */}
      <div className="mx-4 rounded-2xl border border-[var(--color-border)]/20 bg-[var(--color-bg)] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
        
        {/* Image Slider Area — fixed aspect ratio prevents empty space */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden bg-black/20"
          style={{ aspectRatio: isMobileScreenshot ? '9/16' : '16/10' }}
        >
          <motion.div
            className="flex h-full"
            animate={{ x: -currentIndex * containerWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            style={{ touchAction: 'pan-y' }}
          >
            {project.screenshots.map((src: string, idx: number) => (
              <div
                key={idx}
                className="flex-shrink-0 h-full flex items-center justify-center"
                style={{ width: containerWidth || '100%' }}
              >
                <img
                  src={src}
                  alt={`${project.title} - Screenshot ${idx + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  onLoad={() => idx === 0 && setImgLoaded(true)}
                />
              </div>
            ))}
          </motion.div>

          {/* Gradient overlay at bottom for depth */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />

          {/* Navigation arrows — thumb accessible */}
          {currentIndex > 0 && (
            <button 
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 active:scale-90 transition-transform z-10"
              aria-label="Previous screenshot"
            >
              ‹
            </button>
          )}
          {currentIndex < project.screenshots.length - 1 && (
            <button 
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 active:scale-90 transition-transform z-10"
              aria-label="Next screenshot"
            >
              ›
            </button>
          )}

          {/* Slide counter badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm z-10">
            <span className="font-mono text-[9px] text-white/80 tracking-wider">
              {currentIndex + 1} / {project.screenshots.length}
            </span>
          </div>
        </div>

        {/* Dot indicators — compact, scrollable for many slides */}
        <div className="flex items-center justify-center gap-1 py-3 px-4 overflow-x-auto">
          {project.screenshots.map((_: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-5 h-1.5 bg-[var(--color-text)]'
                  : 'w-1.5 h-1.5 bg-[var(--color-text)]/15'
              }`}
              aria-label={`Go to screenshot ${idx + 1}`}
            />
          ))}
        </div>

        {/* Project Info */}
        <div className="px-5 pb-6 space-y-4">
          {/* Title & Index */}
          <div className="flex items-end justify-between gap-2">
            <h3 className="text-[clamp(1.8rem,8vw,3rem)] font-display italic text-[var(--color-text)] leading-[0.9] tracking-tight" style={{ fontWeight: 400 }}>
              {project.title}
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-40 pb-1 flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-[13px] text-[var(--color-text-muted)] font-sans font-light leading-[1.6]">
            {project.description}
          </p>

          {/* Tags — inline flow */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 bg-[var(--color-text)]/5 border border-[var(--color-border)]/15 text-[8px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons — full width for thumb targets */}
          <div className="flex gap-2.5 pt-1">
            {project.link && (
              <button
                onClick={() => window.open(project.link, '_blank')}
                className="flex-1 h-11 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
              >
                <span className="text-[10px] font-heading font-black uppercase tracking-[0.2em]">Visit Site</span>
                <span className="text-xs">↗</span>
              </button>
            )}
            {project.github && (
              <button
                onClick={() => window.open(project.github, '_blank')}
                className={`${project.link ? 'flex-1' : 'flex-1'} h-11 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform`}
              >
                <span className="text-[10px] font-heading font-black uppercase tracking-[0.2em]">Source</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});


/**
 * HorizontalProject Component
 * Creates a "Section-within-a-Section" horizontal scroll experience for desktop,
 * and a traditional vertical stack for mobile devices.
 */
const HorizontalProject = React.memo(({ project, index }: { project: any, index: number }) => {
  const { t } = useLanguage();
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
    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
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

  // Mobile-First: Premium Card Layout
  if (isMobileViewport) {
    return <MobileProjectCard project={project} index={index} t={t} />;
  }

  // Desktop Component - Experience-driven horizontal gallery
  return (
    <article ref={targetRef} className="relative h-[400vh] md:h-[500vh]">
      <div className="sticky top-0 flex h-screen overflow-hidden z-30 items-center">
        <motion.div ref={scrollRef} style={{ x, willChange: 'transform' }} className="flex gap-12 md:gap-24 px-6 md:px-24 items-center">
          {/* Project Identity Card */}
          <div className="flex-shrink-0 w-[85vw] md:w-[60vw] space-y-6 md:space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="space-y-4 md:space-y-6">
               <h3 className="text-[clamp(3.5rem,15vw,9rem)] md:text-9xl font-display italic text-[var(--color-text)] leading-[0.85] tracking-tight" style={{ fontWeight: 400 }}>{project.title}</h3>
            </div>
            
            <div className="max-w-xl space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
              <p className="text-base md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 md:px-5 py-1 md:py-2 rounded-full border border-[var(--color-border)] glass font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-[var(--color-text)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-4 md:pt-8 flex flex-wrap gap-4">
                {project.link && (
                  <ProjectButton 
                    link={project.link}
                    title={project.title}
                  />
                )}
                {project.github && (
                  <ProjectButton 
                    link={project.github}
                    title={project.title}
                    isSource
                  />
                )}
              </div>
            </div>
          </div>

          {/* Screenshot Gallery Array */}
          <div className="flex gap-12 md:gap-16 items-center flex-nowrap pr-[10vw] md:pr-0">
            {project.screenshots.map((shot: string, idx: number) => (
              <Screenshot key={idx} src={shot} project={project.title} description={`Module View ${idx + 1}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
});

/**
 * ProjectCatalog Section Component
 * High-performance exhibition of finished works.
 * Uses predictive scroll mapping to drive horizontal motion.
 */
export const ProjectCatalog = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobileViewport(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    {
      title: "Animy",
      description: t('projects.animy.desc'),
      tags: ["NestJS", "Redis", "Socket.io", "PostgreSQL", "Next.js"],
      link: "https://animy.xyz/",
      github: "https://github.com/Ilyas-Nour/animy-frontend",
      screenshots: [
        "/projects/animy1.webp", "/projects/animy2.webp", "/projects/animy3.webp", 
        "/projects/animy4.webp", "/projects/animy5.webp", "/projects/animy6.webp",
        "/projects/animy7.webp", "/projects/animy8.webp", "/projects/animy9.webp",
        "/projects/animy10.webp", "/projects/animy11.webp",
        "/projects/animy-mobile1.webp", "/projects/animy-mobile2.webp",
        "/projects/animy-mobile3.webp", "/projects/animy-mobile4.webp",
        "/projects/animy-mobile5.webp"
      ],
    },
    {
      title: "PrivaFlow",
      description: t('projects.privaflow.desc'),
      tags: ["FFmpeg WASM", "Next.js 16", "React 19", "PDF-Lib", "AI"],
      link: "https://vaultnode.vercel.app",
      github: "https://github.com/Ilyas-Nour/VaultNode",
      screenshots: [
        "/projects/priva1.webp", "/projects/priva2.webp", "/projects/priva3.webp",
        "/projects/priva4.webp", "/projects/priva5.webp", "/projects/priva6.webp",
        "/projects/priva7.webp", "/projects/priva8.webp",
        "/projects/priva-mobile1 copy.webp", "/projects/priva-mobile2 copy.webp",
        "/projects/priva-mobile3 copy.webp", "/projects/priva-mobile4.webp"
      ],
    },
    {
      title: "Top Nature",
      description: t('projects.topnature.desc'),
      tags: ["Next.js 16", "React 19", "E-commerce", "Stripe", "Prisma"],
      github: "https://github.com/Ilyas-Nour/TopNature",
      screenshots: [
        "/projects/topnature1.webp", "/projects/topnature2.webp", 
        "/projects/topnature3.webp", "/projects/topnature4.webp"
      ],
    }
  ];

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "start start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex flex-col justify-start bg-[var(--color-bg)] border-t border-[var(--color-border)] pt-8 md:pt-12">
      <header ref={headerRef} className="container mx-auto mb-2 md:mb-4 px-5 md:px-6 overflow-hidden">
        <div className="relative select-none">
          <h2 className="sr-only">Exploration of Published Projects and Digital Artifacts</h2>
          <div aria-hidden="true">
            <motion.div 
              style={{ x: xLeft }}
              className="text-[clamp(3rem,16vw,11vh)] font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-[0.8]"
            >
              {t('projects.my_work')}
            </motion.div>
            <motion.div 
              style={{ x: xRight, fontFamily: 'var(--font-signature)' }}
              className="text-[clamp(4.5rem,20vw,14vh)] leading-[0.8] -mt-[3vh] font-normal text-[var(--color-text)] opacity-80"
            >
              {t('projects.work_suffix')}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile: vertical card stack with spacing. Desktop: horizontal scroll sections */}
      <div className={`relative ${isMobileViewport ? 'flex flex-col gap-6 pb-8 pt-4' : ''}`}>
        {projects.map((project, i) => (
          <HorizontalProject key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
});

export default ProjectCatalog;
