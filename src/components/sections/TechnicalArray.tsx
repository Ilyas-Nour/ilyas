import React from 'react';
import { motion } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';

/**
 * TechnicalArray Component
 * A high-precision HUD-inspired Skills section.
 * Replaces the experimental Data Storm with a design that matches the "Obsidian & Cobalt" context.
 */
export const TechnicalArray: React.FC = () => {
  const categories = [
    {
      title: "Tactical Frontend",
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"],
      id: "FE_MOD_01"
    },
    {
      title: "System Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "NoSQL", "REST APIs"],
      id: "BE_MOD_02"
    },
    {
      title: "Technical Control",
      skills: ["Git", "Docker", "Figma", "Vite", "GSAP", "Linux"],
      id: "TL_MOD_03"
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-40 flex flex-col justify-center bg-[var(--color-bg)] border-t border-[var(--color-border)] relative overflow-hidden">
      {/* Background Decor: Massive Registry Numbers */}
      <div className="absolute left-10 top-20 opacity-[0.02] select-none pointer-events-none">
        <span className="text-[30vw] font-black leading-none">00</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-[var(--color-text)] tracking-tighter uppercase leading-[0.8]">
             My <br /> <span className="opacity-20 italic font-serif font-normal" style={{ fontFamily: 'var(--font-signature)' }}>Skills.</span>
          </h2>
        </div>

        {/* HUD Array Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 group h-full"
            >
              <div className="relative h-full p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.02] backdrop-blur-md overflow-hidden transition-all duration-700 group-hover:border-[var(--color-accent)]">
                
                {/* Module Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] text-[var(--color-accent)]">{cat.id}</span>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                </div>

                <h3 className="text-3xl font-black uppercase text-[var(--color-text)] mb-6 tracking-tight">
                  {cat.title}
                </h3>

                {/* Blueprint Visualization (SVG Animation) */}
                <div className="h-2 w-full bg-[var(--color-border)] mb-10 overflow-hidden relative">
                   <motion.div 
                     initial={{ x: "-100%" }}
                     whileInView={{ x: "100%" }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                   />
                </div>

                {/* Skills Interactive List */}
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill) => (
                    <KineticButton 
                      key={skill} 
                      variant="outline"
                      className="text-[10px] px-4 py-2 uppercase tracking-widest border-[var(--color-border)] hover:border-[var(--color-accent)] pointer-events-auto"
                    >
                      {skill}
                    </KineticButton>
                  ))}
                </div>

                {/* Animated Corner: HUD Style */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-50 group-hover:scale-100" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-50 group-hover:scale-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="mt-32 container mx-auto px-6 border-t border-[var(--color-border)] pt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
         <p className="font-mono text-[8px] uppercase tracking-[0.3em] max-w-sm">
            All systems verified. Technical proficiency calculated based on high-performance deployment standards.
         </p>
         <div className="flex gap-10">
            {["2024_CORE", "SECURED", "H_FIDELITY"].map(tag => (
              <span key={tag} className="font-mono text-[8px] uppercase tracking-widest border border-[var(--color-text)] px-2 py-1">{tag}</span>
            ))}
         </div>
      </div>
    </section>
  );
};

export default TechnicalArray;
