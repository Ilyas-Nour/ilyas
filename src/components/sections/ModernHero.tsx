import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';
import { Atmospheric3D } from '../ui/Atmospheric3D';

/**
 * ModernHero Component
 * A massive, high-impact typographic hero section.
 * Typography occupies ~80% of width for a monolithic feel.
 * No background layers or slices - pure 3D background.
 */
export const ModernHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Simple scroll transformations for the content itself
  const contentOpacity = useTransform(smoothProgress, [0.7, 0.9], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.9], [1, 0.85]);
  const contentY = useTransform(smoothProgress, [0, 0.9], [0, -50]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505]"
    >
      {/* Layer 0: High-Energy 3D Atmosphere - FULLY VISIBLE */}
      <div className="absolute inset-0 z-0">
        <Atmospheric3D />
      </div>

      {/* Layer 1: Monolithic Content - Direct Placement */}
      <motion.div 
        style={{ 
          opacity: contentOpacity, 
          scale: contentScale,
          y: contentY
        }}
        className="relative z-10 flex flex-col items-center text-center w-full px-4"
      >
        <div className="w-full max-w-[90vw] md:max-w-[80vw]">
          <div className="flex flex-col items-center">
            <h1 className="text-[15vw] md:text-[18vw] font-sans font-black uppercase tracking-tighter text-white leading-[0.7] mb-0 whitespace-nowrap">
              Ilyas
            </h1>
            <h1 
              className="text-[12vw] md:text-[14vw] font-signature text-[#efbf04] -mt-[6vw] mb-[4vw] italic drop-shadow-[0_0_30px_rgba(239,191,4,0.3)]" 
              style={{ fontFamily: 'var(--font-signature)' }}
            >
              Nour.
            </h1>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl md:text-6xl font-sans font-bold uppercase tracking-[0.2em] text-white">
              Web Full-Stack
            </h2>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#efbf04] to-transparent opacity-50" />
            <h2 className="text-xl md:text-3xl font-mono uppercase tracking-[0.5em] text-white/40 italic">
              Developer
            </h2>
          </div>
        </div>

        <div className="flex gap-6 mt-16 relative z-50">
          <KineticButton
            variant="primary"
            className="px-16 py-6 !text-[12px] font-mono tracking-[0.3em] border border-white/5 uppercase"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Work
          </KineticButton>
          <KineticButton
            variant="outline"
            className="px-16 py-6 !text-[12px] font-mono tracking-[0.3em] border border-white/10 uppercase"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Initiate
          </KineticButton>
        </div>
      </motion.div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Minimal noise overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-5"
        style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />
    </section>
  );
};

export default ModernHero;
