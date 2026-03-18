import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';

/**
 * TextReveal Component
 * Animates a paragraph word-by-word based on scroll progress.
 */
const TextReveal: React.FC<{ text: string; progress: any }> = ({ text, progress }) => {
  const words = text.split(' ');
  return (
    <p className="flex flex-wrap text-4xl md:text-7xl font-sans font-black uppercase leading-[0.9] tracking-tighter text-center max-w-5xl mx-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(progress, [start, end], [0.1, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="mr-[0.2em] mb-[0.2em]">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

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

  const xLeft = useTransform(smoothProgress, [0, 0.2], [-200, 0]);
  const xRight = useTransform(smoothProgress, [0, 0.2], [200, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.4], [0, 1, 1, 0]);

  // Narrative Progress (scrolling through the text)
  const revealProgress = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);
  const revealOpacity = useTransform(smoothProgress, [0.1, 0.2, 0.6, 0.7], [0, 1, 1, 0]);

  // Glass Boxes Transitions
  const glassY = useTransform(smoothProgress, [0.6, 0.9], [100, 0]);
  const glassOpacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);

  const bioText = "I build simple and fast web apps. I'm a second year student at OFPPT learning how to build better websites. I love making things that look great and run perfectly.";

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-[400vh] relative flex flex-col items-center overflow-visible"
    >
      {/* Background Continuity */}
      <motion.div style={{ scale: entranceScale }} className="absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full opacity-30 pointer-events-none">
          <LiquidBackground theme={theme} warp={warp as any} />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-24 relative z-10 w-full mb-40">
        
        {/* Sticky Header */}
        <div className="sticky top-40 h-screen flex flex-col items-center justify-center pointer-events-none">
          <div className="relative select-none mb-20">
            <motion.h2 
              style={{ x: xLeft, opacity: titleOpacity }}
              className="text-[12vw] leading-[0.8] font-heading font-black uppercase tracking-tighter text-[var(--color-text)]"
            >
              About
            </motion.h2>
            <motion.h2 
              style={{ x: xRight, opacity: titleOpacity, fontFamily: 'var(--font-signature)' }}
              className="text-[15vw] leading-[0.8] -mt-[4vw] font-normal text-[var(--color-text)] opacity-30 mix-blend-difference"
            >
              Me.
            </motion.h2>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="relative h-[200vh] flex items-center justify-center -mt-[50vh]">
          <motion.div style={{ opacity: revealOpacity }} className="sticky top-1/2 -translate-y-1/2 w-full">
            <TextReveal text={bioText} progress={revealProgress} />
          </motion.div>
        </div>

        {/* Glass Detail Boxes */}
        <motion.div 
          style={{ y: glassY, opacity: glassOpacity }}
          className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-40"
        >
          {/* Box 1: Status */}
          <div className="p-8 backdrop-blur-xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/[0.1] rounded-2xl group hover:border-[var(--color-accent)]/30 transition-colors">
            <span className="font-mono text-[10px] text-[var(--color-accent)] mb-4 block uppercase tracking-widest">Current Status</span>
            <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-2">OFPPT Trainee</h4>
            <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest leading-relaxed font-light">
              2nd Year Digital Development // Constant Growth.
            </p>
          </div>

          {/* Box 2: Location */}
          <div className="p-8 backdrop-blur-xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/[0.1] rounded-2xl group hover:border-[var(--color-accent)]/30 transition-colors">
            <span className="font-mono text-[10px] text-[var(--color-accent)] mb-4 block uppercase tracking-widest">Location</span>
            <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-2">Morocco</h4>
            <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest leading-relaxed font-light">
               The Gateway to Global Digital Architecture.
            </p>
          </div>

          {/* Box 3: Philosophy */}
          <div className="p-8 backdrop-blur-xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/[0.1] rounded-2xl group hover:border-[var(--color-accent)]/30 transition-colors">
            <span className="font-mono text-[10px] text-[var(--color-accent)] mb-4 block uppercase tracking-widest">Philosophy</span>
            <h4 className="text-2xl font-black uppercase text-[var(--color-text)] mb-2 italic font-serif">Art & Code</h4>
            <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest leading-relaxed font-light">
               Beautiful design meets high-speed performance.
            </p>
          </div>

          {/* Large Detail Box: Projects */}
          <div className="md:col-span-3 p-10 backdrop-blur-xl bg-[var(--color-accent)]/[0.02] border border-[var(--color-text)]/[0.1] rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl">
               <span className="font-mono text-[10px] text-[var(--color-accent)] mb-4 block uppercase tracking-widest">Technical Work</span>
               <h4 className="text-4xl font-black uppercase text-[var(--color-text)] mb-4 tracking-tighter">Fast Data Experts</h4>
               <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest leading-relaxed font-light">
                  Working on Animy & VaultNode to build systems that handle data with zero latency.
               </p>
            </div>
            <div className="flex flex-col items-end opacity-20 font-mono text-[8px] tracking-[0.3em] uppercase">
               <div>System: Optimized</div>
               <div>Latency: 0ms</div>
               <div>Release: Masterwork_V4</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default KineticBlueprint;
