import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';

/**
 * ModernHero Component
 * A massive, high-impact typographic hero section.
 * Typography occupies ~80% of width for a monolithic feel.
 * No background layers or slices - pure 3D background.
 */
export const ModernHero: React.FC<{ warp?: any }> = ({ warp }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
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
  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500 pt-32 md:pt-40"
    >
      {/* Background Kinetic Shader Layer with Warp prop */}
      <LiquidBackground theme={theme} warp={warp} />

      <div className="container mx-auto relative z-10 flex flex-col items-center">
        {/* Massive Motion Typography - Precision Positioned with Smart Contrast */}
        <div className="relative mb-6 md:mb-10 select-none text-center">
          <motion.h1 
            style={{ y: yIlyas, opacity }}
            className="text-[clamp(5.5rem,14vw,12vw)] leading-[0.7] font-serif font-bold uppercase tracking-tighter text-[var(--color-text)] mix-blend-difference drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            Ilyas
          </motion.h1>
          <motion.h1 
            style={{ y: yNour, opacity, fontFamily: 'var(--font-signature)' }}
            className="text-[clamp(7.5rem,20vw,18vw)] leading-[0.7] -mt-[4vw] text-[#E2E8F0] mix-blend-difference drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            Nour.
          </motion.h1>
        </div>

        {/* Hero Bio & Strategic Intent - Centered Elite Registry Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center gap-10 pt-8 text-center"
        >
          {/* Technical Spec Stack */}
          <div className="flex flex-col items-center space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mix-blend-difference">
                <span className="text-2xl md:text-6xl font-serif italic text-[var(--color-text)]">Web</span>
                <span className="text-2xl md:text-6xl font-black font-sans uppercase tracking-tighter text-[var(--color-text)]">Developer.</span>
              </div>
            </div>
            <p className="text-base md:text-2xl font-light text-[var(--color-text)] mix-blend-difference leading-relaxed max-w-lg mx-auto">
              I build <span className="font-mono uppercase tracking-tighter text-[#E2E8F0] font-bold">Fast</span> and <span className="font-mono uppercase tracking-tighter text-[#E2E8F0] font-bold">Beautiful</span> digital experiences.
            </p>
          </div>

          {/* Action Interface Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-3 md:px-12 md:py-4 overflow-hidden border border-[var(--color-text)] bg-[var(--color-text)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--color-text-rgb),0.2)]"
            >
              <div className="absolute inset-0 bg-[var(--color-bg)] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 font-heading font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[var(--color-bg)] group-hover:text-[var(--color-text)] transition-colors duration-500">
                See My Work //
              </span>
            </button>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-3 md:px-12 md:py-4 overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-text)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[var(--color-text)] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 font-heading font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors duration-500">
                Contact Me.
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernHero;
