import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';

/**
 * Word Component for the Reading Effect
 */
const Word = ({ children, progress, range, isHighlighted }: { children: string, progress: any, range: [number, number], isHighlighted: boolean }) => {
  const baseOpacity = isHighlighted ? 0.3 : 0.15;
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const baseColor = isHighlighted ? "var(--color-accent)" : "var(--color-text-muted)";
  const color = useTransform(progress, range, [baseColor, isHighlighted ? "var(--color-accent)" : "var(--color-text)"]);
  const scale = useTransform(progress, range, [0.98, 1]);
  
  return (
    <motion.span 
      style={{ opacity, color, scale }} 
      className={`inline-block mr-[0.25em] transition-colors duration-300 ${isHighlighted ? 'italic font-serif font-normal break-keep' : 'break-words'}`}
    >
      {children}
    </motion.span>
  );
};

export const KineticBlueprint: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bioText = "I am Ilyas Nour, a digital architect from Morocco and a student at OFPPT. My work is defined by the fusion of high-performance logic and aesthetic precision. Through projects like Animy and VaultNode, I bridge the gap between complex data and elegant design. Every line of code is a step toward the 'Masterwork' standard—merging speed, stability, and artistic soul.";
  const words = bioText.split(" ");
  
  const importantWords = ["Ilyas", "Nour", "Morocco", "OFPPT", "Animy", "VaultNode", "Masterwork"];

  // Title Transforms (Restored from old version)
  const titleOpacity = 1;
  const xLeft = useTransform(smoothProgress, [0, 0.2], [-150, 0]);
  const xRight = useTransform(smoothProgress, [0, 0.2], [150, 0]);

  // Parallax Background Transitions
  const warp = useTransform(smoothProgress, [0, 0.5, 1], [0, 2, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.3, 0.8, 0.8, 0.3]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="h-[400vh] relative bg-[var(--color-bg)]"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Continuity with Warp Distortion */}
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0 text-[var(--color-text)]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <LiquidBackground theme={theme} warp={warp as any} />
          </div>
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.015]"
            style={{ 
              backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, 
              backgroundSize: '100px 100px' 
            }}
          />
        </motion.div>

        <div className="container mx-auto px-6 md:px-24 relative z-10 flex flex-col justify-start pt-[180px] md:pt-[220px] pb-12 min-h-screen">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-[3vh]">
            
            {/* Restored Old Title Layout - Now in Flow */}
            <div className="relative select-none">
              <motion.h2 
                style={{ x: xLeft, opacity: titleOpacity }}
                className="text-[clamp(2.5rem,14vw,8vh)] leading-[0.8] font-heading font-black uppercase tracking-tighter text-[var(--color-text)]"
              >
                About
              </motion.h2>
              <motion.h2 
                style={{ x: xRight, opacity: titleOpacity, fontFamily: 'var(--font-signature)' }}
                className="text-[clamp(3.5rem,18vw,11vh)] leading-[0.8] -mt-[3vh] font-normal text-[var(--color-text)] opacity-30 mix-blend-difference"
              >
                Me.
              </motion.h2>
            </div>

            {/* The Raw Narrative Paragraph */}
            <div className="flex flex-wrap text-[clamp(1.1rem,4vw,3.5vh)] font-sans font-medium leading-[1.2] md:leading-[1.3] tracking-tight max-w-full">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                const isHighlighted = importantWords.some(important => 
                  word.replace(/[.,'']/g, "").includes(important)
                );
                
                return (
                  <Word key={i} progress={smoothProgress} range={[start, end]} isHighlighted={isHighlighted}>
                    {word}
                  </Word>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Technical HUD */}
      <div className="absolute inset-x-0 bottom-10 flex justify-between px-12 md:px-24 opacity-[0.05] font-mono text-[8px] pointer-events-none uppercase tracking-[0.5em] z-20">
         <span>System Stability: Optimized</span>
         <span>Narrative State: Synchronized</span>
         <span>Status: Masterwork_V4</span>
      </div>
    </section>
  );
};

export default KineticBlueprint;

