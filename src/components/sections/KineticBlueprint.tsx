import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';

/**
 * KineticBlueprint Component
 * A high-density Bento Grid redesign of the About section.
 * Features project-specific "Spec Tiles" with a premium technical aesthetic.
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
      className="min-h-[150vh] relative flex flex-col items-center py-40 overflow-hidden"
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
        <div className="max-w-7xl mx-auto">
          
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

          {/* Bento Grid Masterwork */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Main Identity Tile */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-8 md:row-span-2 relative p-12 border border-[var(--color-border)] bg-[var(--color-text)]/[0.02] overflow-hidden group"
            >
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-[var(--color-accent)] mb-8 block uppercase tracking-[0.3em]">Identity // Ilyas Nour</span>
                <h3 className="text-4xl md:text-8xl font-sans font-black text-[var(--color-text)] leading-[0.9] tracking-tighter uppercase mb-10">
                   I build <br /> <span className="italic font-serif font-normal text-[var(--color-accent)] opacity-80">Simple & Fast</span> <br /> Web Apps.
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-light uppercase tracking-widest max-w-2xl">
                   I'm a 2nd year student at OFPPT learning how to build better websites. I love making things that look great and run perfectly.
                </p>
              </div>
              {/* Decorative Scanline */}
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/5 to-transparent h-20 w-full opacity-20 pointer-events-none"
              />
            </motion.div>

            {/* Personal Journey Tile */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-4 md:row-span-2 p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.03] flex flex-col group hover:border-[var(--color-accent)]/30 transition-colors duration-500"
            >
               <div className="flex flex-col flex-grow">
                  <span className="font-mono text-[8px] text-[var(--color-accent)] mb-4 block uppercase tracking-widest">My Path // Growth</span>
                  <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-6 tracking-tight">Digital Architect</h4>
                  <p className="text-[var(--color-text-muted)] text-base md:text-xl leading-relaxed font-sans font-medium tracking-tight flex-grow">
                     I am a second-year digital development student at OFPPT, passionate about crafting seamless user experiences. My focus is on combining high-performance logic with aesthetic precision to build tools that feel like the future.
                  </p>
               </div>
            </motion.div>

            {/* Animy/VaultNode Tiles */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.01] flex flex-col justify-center relative overflow-hidden group"
            >
               <span className="font-mono text-[8px] text-[var(--color-accent)] mb-2 block tracking-widest uppercase">Projects // Fast Data</span>
               <h4 className="text-xl font-black uppercase text-[var(--color-text)] tracking-tight">Animy & VaultNode</h4>
               <p className="text-[var(--color-text-muted)] text-[10px] leading-relaxed font-light uppercase tracking-widest mt-2">
                  Building tools that handle data fast and apps that feel instant. No more waiting.
               </p>
            </motion.div>

            {/* Status & Location Tile */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 p-10 border border-[var(--color-border)] bg-[var(--color-accent)]/[0.03] flex items-center justify-between group"
            >
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-[var(--color-accent)]/30 flex items-center justify-center font-mono text-[10px] text-[var(--color-accent)]">
                     2Y
                  </div>
                  <div>
                     <h4 className="text-xl font-black uppercase text-[var(--color-text)] tracking-tight">OFPPT Trainee</h4>
                     <p className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest mt-1">Status: Second Year // Location: Morocco</p>
                  </div>
               </div>
               <div className="hidden md:block opacity-20 text-[8px] font-mono tracking-tighter">
                  31.7917° N <br /> 7.0926° W
               </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Decorative Technical HUD */}
      <div className="absolute inset-x-0 bottom-10 flex justify-between px-12 md:px-24 opacity-[0.05] font-mono text-[8px] pointer-events-none uppercase tracking-[0.5em]">
         <span>System Stability: Optimized</span>
         <span>Latency: 0ms</span>
         <span>Status: Masterwork_V3</span>
      </div>
    </section>
  );
};

export default KineticBlueprint;
