import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * DecryptText Component
 * Animates text with a "data-leak" / "decryption" effect.
 */
const DecryptText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    let iteration = 0;
    
    const startAnimation = () => {
      const interval = setInterval(() => {
        setDisplayText((prev) => 
          text.split("").map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1/3;
      }, 30);
    };

    timeout = setTimeout(startAnimation, delay * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

/**
 * IdentityArchive Component
 * The cinematic re-imagining of the "About" section.
 */
export const IdentityArchive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Filmstrip movement - items slide into focus
  const y1 = useTransform(smoothProgress, [0, 0.4], [200, 0]);
  const y2 = useTransform(smoothProgress, [0.2, 0.6], [200, 0]);
  const y3 = useTransform(smoothProgress, [0.4, 0.8], [200, 0]);

  const blur1 = useTransform(smoothProgress, [0, 0.3, 0.4], [20, 10, 0]);
  const blur2 = useTransform(smoothProgress, [0.2, 0.5, 0.6], [20, 10, 0]);
  const blur3 = useTransform(smoothProgress, [0.4, 0.7, 0.8], [20, 10, 0]);

  const opacity1 = useTransform(smoothProgress, [0, 0.3, 0.4], [0, 0.5, 1]);
  const opacity2 = useTransform(smoothProgress, [0.2, 0.5, 0.6], [0, 0.5, 1]);
  const opacity3 = useTransform(smoothProgress, [0.4, 0.7, 0.8], [0, 0.5, 1]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-[200vh] relative bg-[var(--color-bg)] flex flex-col items-center justify-start py-40 overflow-hidden"
    >
      {/* Background Parallax Reflection */}
      <motion.div 
        style={{ 
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.1, 0.05]),
          scale: useTransform(smoothProgress, [0, 1], [0.8, 1.2]),
          rotate: -5
        }}
        className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none"
      >
        <h1 className="text-[40vw] font-black uppercase tracking-tighter text-[var(--color-text)] opacity-20 whitespace-nowrap">
          Identity
        </h1>
      </motion.div>

      {/* Narrative Blocks (Filmstrip) */}
      <div className="container mx-auto px-6 md:px-24 relative z-10 space-y-[40vh]">
        
        {/* Block 01: The Core */}
        <motion.div 
          style={{ y: y1, filter: `blur(${blur1}px)`, opacity: opacity1 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)] mb-8 block">
            [ ARCHIVE_01 : THE_VISION ]
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-[var(--color-text)] leading-[0.9] tracking-tighter uppercase mb-8">
            <DecryptText text="DIGITAL" delay={0.5} /><br />
            <span className="opacity-30">ARCHITECT.</span>
          </h2>
          <p className="text-xl md:text-3xl text-[var(--color-text-muted)] font-light leading-relaxed max-w-2xl">
            I don't just build websites. I craft <span className="text-[var(--color-text)] font-medium">immersive digital dimensions</span> where every pixel has a heartbeat. 
          </p>
        </motion.div>

        {/* Block 02: The Philosophy */}
        <motion.div 
          style={{ y: y2, filter: `blur(${blur2}px)`, opacity: opacity2 }}
          className="max-w-4xl ml-auto text-right"
        >
          <span className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)] mb-8 block">
            [ ARCHIVE_02 : BRUTALISM ]
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-[var(--color-text)] leading-[0.9] tracking-tighter uppercase mb-8">
            <span className="opacity-30">TECHNICAL</span><br />
            <DecryptText text="PRECISE." delay={0.8} />
          </h2>
          <p className="text-xl md:text-3xl text-[var(--color-text-muted)] font-light leading-relaxed max-w-2xl ml-auto">
            My work lives at the intersection of <span className="text-[var(--color-text)] font-medium italic">aesthetic chaos</span> and mathematical perfection.
          </p>
        </motion.div>

        {/* Block 03: The Mission */}
        <motion.div 
          style={{ y: y3, filter: `blur(${blur3}px)`, opacity: opacity3 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)] mb-8 block">
            [ ARCHIVE_03 : THE_GOAL ]
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-[var(--color-text)] leading-[0.9] tracking-tighter uppercase mb-8">
            <DecryptText text="USER" delay={1.1} /><br />
            <span className="opacity-30">EMPOWERED.</span>
          </h2>
          <p className="text-xl md:text-3xl text-[var(--color-text-muted)] font-light leading-relaxed max-w-2xl">
            Every line of code is a commitment to performance, accessibility, and <span className="text-[var(--color-accent)] font-bold">visual dominance</span>.
          </p>
        </motion.div>

      </div>

      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <motion.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-10"
        />
      </div>
    </section>
  );
};

export default IdentityArchive;
