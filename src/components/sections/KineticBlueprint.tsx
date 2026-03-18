import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LiquidBackground } from '../ui/LiquidBackground';
import { useTheme } from '../../context/ThemeContext';

/**
 * Word Component for the Reading Effect
 */
const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["var(--color-text-muted)", "var(--color-text)"]);
  const scale = useTransform(progress, range, [0.98, 1]);
  
  return (
    <motion.span 
      style={{ opacity, color, scale }} 
      className="inline-block mr-[0.25em] transition-colors duration-300"
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

  const bioText = "I am Ilyas Nour, a second-year digital development student at OFPPT, based in the vibrant heart of Morocco. My journey in technology is driven by a profound obsession with combining high-performance logic with aesthetic precision. I don't just build websites; I architect digital experiences that feel like the future. Specializing in high-fidelity motion and distributed systems, I created Animy and VaultNode as proof that data and design can live in perfect harmony. Every line of code I write is a commitment to speed, stability, and visual excellence. I believe that a truly great web application should be as beautiful to look at as it is powerful to use. My mission is to push the boundaries of what's possible on the web, creating tools that are not only instant but also leave a lasting artistic impression. From crafting complex shaders to engineering scalable backends, I am constantly refining my craft to reach the 'Masterwork' standard.";
  const words = bioText.split(" ");

  // Parallax Background Transitions
  const warp = useTransform(smoothProgress, [0, 0.5, 1], [0, 2, 0]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="h-[400vh] relative bg-[var(--color-bg)]"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Continuity with Warp Distortion */}
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <LiquidBackground theme={theme} warp={warp as any} />
          </div>
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
            style={{ 
              backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`, 
              backgroundSize: '100px 100px' 
            }}
          />
        </motion.div>

        <div className="container mx-auto px-6 md:px-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* The Big Narrative Box */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-12 md:p-24 border border-[var(--color-border)] bg-[var(--color-text)]/[0.02] backdrop-blur-sm group overflow-hidden"
            >
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-[var(--color-accent)] mb-12 block uppercase tracking-[0.5em] opacity-50">
                   Identity // The Narrative Archive
                </span>
                
                <h3 className="text-4xl md:text-6xl font-sans font-black text-[var(--color-text)] leading-[1.1] tracking-tighter uppercase mb-16 border-l-4 border-[var(--color-accent)] pl-8">
                   Digital <br /> Architect.
                </h3>
                
                <div className="flex flex-wrap text-2xl md:text-5xl font-sans font-medium leading-[1.3] tracking-tight">
                  {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length);
                    return (
                      <Word key={i} progress={smoothProgress} range={[start, end]}>
                        {word}
                      </Word>
                    );
                  })}
                </div>
              </div>

              {/* Decorative HUD Elements */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
                 <div className="font-mono text-[8px] uppercase tracking-widest text-right space-y-1">
                    <p>Status: Pinned_Active</p>
                    <p>Mode: Sequential_Reveal</p>
                    <p>Buffer: 100%</p>
                 </div>
              </div>

              {/* Dynamic Progress Bar */}
              <motion.div 
                style={{ scaleX: smoothProgress }}
                className="absolute bottom-0 left-0 h-1 w-full bg-[var(--color-accent)] origin-left"
              />
            </motion.div>

          </div>
        </div>

        {/* Floating About Me Title (Fades as we read) */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.15], [0.3, 0]),
            y: useTransform(smoothProgress, [0, 0.15], [0, -50])
          }}
          className="absolute top-20 left-24 pointer-events-none select-none"
        >
           <h2 className="text-[10vw] font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-none italic opacity-10">
              About
           </h2>
        </motion.div>

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

