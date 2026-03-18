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

  const xLeft = useTransform(smoothProgress, [0, 0.4], [-200, 0]);
  const xRight = useTransform(smoothProgress, [0, 0.4], [200, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Dossier Spec Node Parallax
  const nodeY1 = useTransform(smoothProgress, [0.1, 0.4], [300, 0]);
  const nodeY2 = useTransform(smoothProgress, [0.3, 0.6], [400, 0]);
  const nodeY3 = useTransform(smoothProgress, [0.5, 0.8], [500, 0]);
  const nodeX1 = useTransform(smoothProgress, [0.1, 0.4], [-50, 0]);
  const nodeX2 = useTransform(smoothProgress, [0.3, 0.6], [50, 0]);
  const nodeX3 = useTransform(smoothProgress, [0.5, 0.8], [-80, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-[300vh] relative flex flex-col items-center py-40 overflow-visible will-change-[transform,opacity]"
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

      <div className="container mx-auto px-6 md:px-24 relative z-10 w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="relative select-none mb-40 sticky top-40">
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

          {/* Dossier Monolithic Bio */}
          <motion.div 
            style={{ opacity }}
            className="w-full max-w-5xl mb-96"
          >
            <h3 className="text-5xl md:text-9xl font-sans font-black text-[var(--color-text)] leading-[0.85] tracking-tighter uppercase mb-20 text-center md:text-left">
               I engineer <span className="italic font-serif font-normal text-[var(--color-accent)]">high-stakes</span> <br /> digital architecture for <br /> the modern web.
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8 items-start opacity-40 font-mono text-[9px] uppercase tracking-widest border-l border-[var(--color-border)] pl-8 ml-4">
               <div>[ STATUS: ARCHITECT_ACTIVE ]</div>
               <div>[ BASE: MOROCCO_NORTH_AFRICA ]</div>
               <div>[ REACH: GLOBAL_FRONTIER ]</div>
            </div>
          </motion.div>

          {/* Dossier Spread Node: Animy */}
          <motion.div 
            style={{ y: nodeY1, x: nodeX1, opacity }}
            className="self-start max-w-md p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.01] backdrop-blur-sm mb-64"
          >
             <span className="font-mono text-[8px] text-[var(--color-accent)] mb-4 block">NODE_CORE // SCALABLE ARCHITECT</span>
             <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-6 tracking-tight">Animy Protocol</h4>
             <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-light uppercase tracking-widest text-justify">
                Built for high-performance synchronization. Mastered real-time distributed systems using NestJS, Redis, and Socket.io to achieve global reliability.
             </p>
          </motion.div>

          {/* Dossier Spread Node: VaultNode */}
          <motion.div 
            style={{ y: nodeY2, x: nodeX2, opacity }}
            className="self-end max-w-md p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.01] backdrop-blur-sm mb-64"
          >
             <span className="font-mono text-[8px] text-[var(--color-accent)] mb-4 block">NODE_EDGE // WASM PERFORMANCE</span>
             <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-6 tracking-tight">VaultNode Edge</h4>
             <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-light uppercase tracking-widest text-justify">
                Pushed the limits of client-side execution. From WASM-based file processing to Top Nature's fluid commerce, precision engineering at $0 latency.
             </p>
          </motion.div>

          {/* Dossier Spread Node: The Philosophy */}
          <motion.div 
            style={{ y: nodeY3, x: nodeX3, opacity }}
            className="self-center max-w-lg p-12 border-t border-[var(--color-border)] bg-gradient-to-b from-[var(--color-text)]/[0.02] to-transparent mb-40 text-center"
          >
             <span className="font-mono text-[10px] text-[var(--color-accent)] mb-8 block font-bold">SYSTEM_LOG // FINAL_REPORT</span>
             <h4 className="text-4xl font-black uppercase text-[var(--color-text)] mb-8 tracking-tighter italic font-serif">Aesthetic Chaos <br /><span className="opacity-30">vs Mathematical</span><br /> Perfection.</h4>
             <p className="text-[var(--color-text-muted)] text-xs leading-relaxed font-light uppercase tracking-[0.2em]">
                Bridging the gap between artistic vision and alchemical code. Every line of code is a commitment to performance, accessibility, and visual dominance.
             </p>
          </motion.div>

        </div>
      </div>

      {/* Diagnostic HUD Decorative Layer */}
      <div className="absolute inset-x-0 bottom-20 flex justify-between px-12 md:px-24 opacity-[0.05] font-mono text-[10px] pointer-events-none">
         <div className="space-y-4">
            <div>POS: 31.7917° N, 7.0926° W</div>
            <div>ALT: FE_CORE_OVERLAY</div>
            <div>SIG: ENCRYPTED_STABLE</div>
         </div>
         <div className="space-y-4 text-right">
            <div>MEM: STABLE_V9.2</div>
            <div>VER: REL_ARCH_07</div>
            <div>HUD: DIAG_ACTIVE</div>
         </div>
      </div>
    </section>
  );
};

export default KineticBlueprint;
