import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';

/**
 * KineticBlueprint Component
 * A theme-cohesive re-imagining of the "About" section.
 * Uses the same design language as the Hero: monolithic fonts, liquid backgrounds,
 * and high-contrast technical aesthetics.
 */
export const KineticBlueprint: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 50,
    restDelta: 0.001
  });

  // Parallax Header Transitions
  const entranceScale = useTransform(smoothProgress, [0, 0.2], [1.05, 1]);
  const warp = useTransform(smoothProgress, [0, 0.1, 0.2], [2, 1, 0]);

  const xLeft = useTransform(smoothProgress, [0, 0.5], [-150, 0]);
  const xRight = useTransform(smoothProgress, [0, 0.5], [150, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-[150vh] relative flex flex-col items-center py-40 overflow-hidden will-change-[transform,opacity]"
    >
      {/* Background Continuity with Warp Distortion */}
      <motion.div style={{ scale: entranceScale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <LiquidBackground theme={theme} warp={warp as any} />
        </div>

        {/* Grid Overlay - The Blueprint Aesthetic */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{ 
            backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`, 
            backgroundSize: '80px 80px' 
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="max-w-7xl mx-auto space-y-40">
          
          <div className="relative select-none mb-24">
            <motion.h2 
              style={{ x: xLeft, opacity }}
              className="text-[12vw] leading-[0.8] font-heading font-black uppercase tracking-tighter text-[var(--color-text)]"
            >
              About
            </motion.h2>
            <motion.h2 
              style={{ x: xRight, opacity, fontFamily: 'var(--font-signature)' }}
              className="text-[15vw] leading-[0.8] -mt-[4vw] font-normal text-[var(--color-text)] opacity-30 mix-blend-difference"
            >
              Me.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
             <motion.div 
               style={{ opacity }}
               className="lg:col-span-12"
             >
                <h3 className="text-4xl md:text-7xl font-sans font-extrabold text-[var(--color-text)] leading-[1.1] tracking-tighter mb-12">
                   I engineer <span className="italic font-serif font-normal text-[var(--color-accent)]">high-stakes</span> digital architecture for the modern web.
                </h3>
             </motion.div>

             {/* Pillar Blocks */}
             {[
               { title: "Technical Core", desc: "Specializing in React, Three.js, and high-performance motion systems. I build for scale and dominance." },
               { title: "Aeronautical UX", desc: "My interfaces are designed with the precision of a cockpit—focused, technical, and undeniably elite." },
               { title: "Global Reach", desc: "Based in Morocco, executing projects for clients across the global digital frontier." }
             ].map((pillar, i) => (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-4 p-10 border border-[var(--color-border)] group hover:bg-[var(--color-text)]/[0.02] transition-colors duration-500"
                >
                   <span className="font-mono text-[8px] text-[var(--color-accent)] mb-4 block">MOD_0{i+1} //</span>
                   <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-4 tracking-tight">{pillar.title}</h4>
                   <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-light uppercase tracking-widest text-justify">
                      {pillar.desc}
                   </p>
                </motion.div>
             ))}
          </div>

        </div>
      </div>

      {/* Decorative Technical Line-Art (Jet Layout) */}
      <div className="absolute right-[-10vw] bottom-[-5vh] z-0 opacity-[0.05] pointer-events-none scale-125">
         <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[var(--color-text)]">
            <path d="M400 50L750 250H50L400 50Z" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="400" cy="200" r="100" strokeWidth="1" strokeDasharray="5 5" />
            <line x1="100" y1="250" x2="700" y2="250" strokeWidth="1" />
            <line x1="400" y1="50" x2="400" y2="350" strokeWidth="1" strokeDasharray="2 2" />
         </svg>
      </div>
    </section>
  );
};

export default KineticBlueprint;
