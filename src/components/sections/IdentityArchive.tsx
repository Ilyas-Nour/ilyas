import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ParagraphReveal Component
 * Handles the word-by-word "Luminous" reveal animation for a single block of text.
 * 
 * @param text The full string to be split into words.
 * @param highlight Text segment to be rendered with a highlighted (italic/serif) style.
 * @param accent Text segment to be rendered with the accent color.
 */
const ParagraphReveal: React.FC<{ text: string; highlight?: string; accent?: string }> = ({ text, highlight, accent }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Localized scroll tracking: Each paragraph identifies its progress as it enters the primary focal area of the viewport.
  // We use a specific offset ["start 0.9", "end 0.3"] to ensure the reveal completes before the paragraph exits.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"]
  });

  // Spring physics for buttery-smooth animation transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const words = text.split(" ");
  const total = words.length;

  return (
    <div ref={ref} className="mb-16 md:mb-24 last:mb-0">
      <div className="flex flex-wrap text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-sans font-light leading-[1.1] tracking-tight antialiased text-[var(--color-text)]">
        {words.map((word, i) => {
          // Normalized mapping: Mathematically ensures every word—including the final one—reaches full clarity (1.0).
          // We introduce an 'overlap' factor to create a wave-like sequential appearance.
          const overlap = 1.5;
          const start = i / (total + overlap - 1);
          const end = (i + overlap) / (total + overlap - 1);
          
          const opacity = useTransform(smoothProgress, [start, end], [0.1, 1], { clamp: true });
          const y = useTransform(smoothProgress, [start, end], [15, 0], { clamp: true });
          const filter = useTransform(smoothProgress, [start, end], ["blur(8px)", "blur(0px)"], { clamp: true });

          const isHighlighted = highlight && word.includes(highlight.split(" ")[0]);
          const isAccent = accent && accent.includes(word);

          return (
            <span key={i} className="relative inline-block mr-[0.3em] mb-[0.1em] overflow-hidden">
              <motion.span 
                style={{ opacity, y, filter }} 
                className={`inline-block whitespace-nowrap
                  ${isHighlighted ? 'italic font-serif font-normal text-[var(--color-text)]' : ''}
                  ${isAccent ? 'text-[var(--color-accent)] font-medium' : ''}
                `}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

/**
 * IdentityArchive Section Component
 * A robust, re-engineered "About Me" section that uses localized triggers to prevent 
 * global scroll fragility and section collisions.
 */
export const IdentityArchive: React.FC = () => {
  // Centralized content archive for easy editing and maintainability
  const content = [
    { text: "I am a full-stack developer trainee in my second year at OFPPT.", highlight: "full-stack developer trainee" },
    { text: "My journey is defined by a deep-seated passion for crafting digital experiences that are as technically rigorous as they are visually compelling.", accent: "visually compelling" },
    { text: "I thrive on the challenge of building performant, meaningful web applications—from the intuitive interfaces of Animy and VaultNode to the expansive architecture of my personal portfolio.", accent: "Animy and VaultNode" },
    { text: "Currently, I am looking to apply my technical foundation and eye for detail in an internship environment where I can contribute to high-impact projects.", highlight: "internship" }
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 md:py-64 px-6 bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden min-h-screen"
    >
      <div className="container mx-auto max-w-[95%] md:max-w-[85%] relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24 flex items-center gap-4"
        >
          <div className="w-10 h-[1px] bg-[var(--color-accent)] opacity-40" />
          <h2 className="text-2xl md:text-5xl font-serif italic text-[var(--color-text)] leading-tight uppercase tracking-tighter">
            About <span className="opacity-40 font-sans not-italic">Me</span>
          </h2>
        </motion.div>

        <div className="relative z-10">
          {content.map((p, i) => (
            <ParagraphReveal key={i} {...p} />
          ))}
        </div>
      </div>

      {/* Atmospheric detail - Gradient fog for depth */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/[0.02] to-transparent pointer-events-none" />
      
      {/* Background Micro-Grid for tech-industrial feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" 
           style={{ backgroundImage: 'radial-gradient(var(--color-text) 1px, transparent 0)', backgroundSize: '70px 70px' }} 
      />
    </section>
  );
};

export default IdentityArchive;
