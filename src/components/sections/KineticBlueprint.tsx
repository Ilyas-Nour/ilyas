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
  const keywords = ["simple", "fast", "better", "great", "perfectly", "second", "OFPPT"];
  
  return (
    <p className="flex flex-wrap text-2xl md:text-5xl font-sans font-medium leading-[1.1] tracking-tight text-center max-w-4xl mx-auto text-[var(--color-text)]">
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,]/g, "");
        const isHighlight = keywords.includes(cleanWord);
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(progress, [start, end], [0.1, 1]);
        
        return (
          <motion.span 
            key={i} 
            style={{ opacity }} 
            className={`mr-[0.3em] mb-[0.2em] ${isHighlight ? 'font-serif italic text-[var(--color-accent)] opacity-90' : ''}`}
          >
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

  // Simple Header Animations
  const entranceScale = useTransform(smoothProgress, [0, 0.2], [1.05, 1]);
  const warp = useTransform(smoothProgress, [0, 0.1, 0.2], [2, 1, 0]);

  // Title Entrance (No longer sticky)
  const titleY = useTransform(smoothProgress, [0, 0.2], [50, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);

  // Narrative Progress (Sticky reading experience)
  const revealProgress = useTransform(smoothProgress, [0.35, 0.75], [0, 1]);
  const revealOpacity = useTransform(smoothProgress, [0.3, 0.4, 0.7, 0.8], [0, 1, 1, 0]);

  // Glass Boxes Transitions
  const glassY = useTransform(smoothProgress, [0.8, 0.95], [50, 0]);
  const glassOpacity = useTransform(smoothProgress, [0.8, 0.85], [0, 1]);

  const bioText = "I build simple and fast web apps that work perfectly on every screen. Currently, I'm a second year student at OFPPT where I study digital development and better ways to code. I love mixing beautiful designs with high-speed performance to make tools that people actually enjoy using. My goal is to keep learning and building things that feel instant and look amazing.";

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-[400vh] relative flex flex-col items-center overflow-visible z-50 bg-[var(--color-bg)]"
    >
      {/* Background Continuity */}
      <motion.div style={{ scale: entranceScale }} className="absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full opacity-20 pointer-events-none">
          <LiquidBackground theme={theme} warp={warp as any} />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-24 relative z-10 w-full mb-40">
        
        {/* Cinematic Header - Natural Scroll */}
        <motion.div 
          style={{ y: titleY, opacity: titleOpacity }}
          className="pt-40 pb-60 flex flex-col items-start select-none"
        >
          <h2 className="text-[12vw] leading-[0.8] font-heading font-black uppercase tracking-tighter text-[var(--color-text)]">
            About
          </h2>
          <h2 
            style={{ fontFamily: 'var(--font-signature)' }}
            className="text-[15vw] leading-[0.8] -mt-[4vw] font-normal text-[var(--color-text)] opacity-30"
          >
            Me.
          </h2>
        </motion.div>

        {/* Narrative Section - Large Breathing Room */}
        <div className="relative h-[200vh] flex items-center justify-center">
          <motion.div style={{ opacity: revealOpacity }} className="sticky top-1/2 -translate-y-1/2 w-full">
            <TextReveal text={bioText} progress={revealProgress} />
          </motion.div>
        </div>

        {/* Glass Detail Boxes */}
        <motion.div 
          style={{ y: glassY, opacity: glassOpacity }}
          className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-20"
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
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default KineticBlueprint;
