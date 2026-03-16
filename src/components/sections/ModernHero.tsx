import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';

/**
 * ModernHero Component
 * A high-impact, typographic-first hero section.
 * Focused on premium motion, theme-adaptivity, and responsiveness.
 */
export const ModernHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-driven parallax for typography "breath" effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Typography shift and blur based on scroll
  const yIlyas = useTransform(smoothProgress, [0, 1], [0, -100]);
  const yNour = useTransform(smoothProgress, [0, 1], [0, 100]);
  const blur = useTransform(smoothProgress, [0, 0.5], ["blur(0px)", "blur(20px)"]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500"
    >
      {/* Background Kinetic Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-radial from-[var(--color-accent)]/10 to-transparent blur-[120px]"
        />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center">
        {/* Massive Motion Typography */}
        <div className="relative mb-12 md:mb-20 select-none">
          <motion.h1 
            style={{ y: yIlyas, filter: blur, opacity }}
            className="text-[18vw] leading-[0.8] font-serif font-bold uppercase tracking-tighter text-[var(--color-text)] opacity-10"
          >
            Ilyas
          </motion.h1>
          <motion.h1 
            style={{ y: yNour, filter: blur, opacity, fontFamily: 'var(--font-signature)' }}
            className="text-[25vw] leading-[0.8] ml-[10vw] -mt-[5vw] text-[var(--color-accent)] mix-blend-difference"
          >
            Nour.
          </motion.h1>
        </div>

        {/* Hero Bio & Intent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center text-center space-y-8 max-w-3xl"
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl font-sans font-light tracking-tight text-[var(--color-text)]">
              Full-Stack Developer <span className="text-[var(--color-accent)] italic font-serif">&</span> UI/UX Architect
            </h2>
            <p className="text-sm md:text-lg text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-xl mx-auto">
              Crafting high-performance digital solutions where structural <br className="hidden md:block" />
              integrity meets visual poetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <KineticButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Recent Artworks
            </KineticButton>
            <KineticButton
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Initiate Contact
            </KineticButton>
          </div>
        </motion.div>
      </div>

      {/* Modern Static Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="font-mono text-[8px] uppercase tracking-[0.6em] rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-text)] to-transparent" />
      </div>

      {/* Edge Micro-Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(var(--color-text) 1px, transparent 0)', backgroundSize: '60px 60px' }}
      />
    </section>
  );
};

export default ModernHero;
