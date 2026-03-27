import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Word Component for the Reading Effect
 */
const Word = ({ children, progress, range, isHighlighted }: { children: string, progress: MotionValue<number>, range: [number, number], isHighlighted: boolean }) => {
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

export const KineticBlueprint = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bioText = t('about.bio');
  const words = bioText.split(" ");
  
  const importantWords = t('about.important').split(",");

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

        <div className="container mx-auto px-6 md:px-24 relative z-10 flex flex-col justify-start pt-[20vh] md:pt-[25vh] pb-12 min-h-screen">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-[3vh] md:gap-[4vh]">
            
            {/* Restored Old Title Layout - Now in Flow */}
            <div className="relative select-none">
              <motion.h2 
                style={{ x: xLeft, opacity: titleOpacity }}
                className="text-[clamp(3.50rem,15vw,12vh)] leading-[0.8] font-heading font-black uppercase tracking-tighter text-[var(--color-text)]"
              >
                {t('about.title1')}
              </motion.h2>
              <motion.h2 
                style={{ x: xRight, opacity: titleOpacity, fontFamily: 'var(--font-signature)' }}
                className="text-[clamp(4.5rem,18vw,14vh)] leading-[0.8] -mt-[2vh] md:-mt-[3vh] font-normal text-[var(--color-text)] opacity-80"
              >
                {t('about.title2')}
              </motion.h2>
            </div>

            {/* The Raw Narrative Paragraph */}
            <div className="flex flex-wrap text-[clamp(1.2rem,4.5vw,4.2vh)] font-sans font-medium leading-[1.15] md:leading-[1.3] tracking-tight max-w-full">
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
         <span>{t('about.hud1')}</span>
         <span>{t('about.hud2')}</span>
         <span>{t('about.hud3')}</span>
      </div>
    </section>
  );
});

export default KineticBlueprint;

