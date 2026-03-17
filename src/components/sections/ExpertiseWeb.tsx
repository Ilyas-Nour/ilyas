import React from 'react';
import { motion } from 'framer-motion';

/**
 * ExpertiseWeb Component
 * Replaces TechStack with a more structured and premium visualization of skills.
 * Focused on category-based discovery and theme-adaptivity.
 */
export const ExpertiseWeb: React.FC = () => {
  const categories = [
    {
      title: "Design & UX",
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"],
      description: "I make websites that look and feel good."
    },
    {
      title: "Inside the Code",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "NoSQL", "REST APIs"],
      description: "I build the parts that handle your data and keep things running."
    },
    {
      title: "The Toolbox",
      skills: ["Git", "Docker", "Figma", "Vite", "GSAP", "Linux"],
      description: "Optimizing the development flow with modern industry standards."
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-32 flex flex-col justify-center bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex-none mb-8 md:mb-12">
          <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-[var(--color-accent)] mb-2">Skills</h2>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h3 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter text-[var(--color-text)] leading-[0.9]">
              What I <br /> 
              <span className="italic font-serif font-normal opacity-50 text-3xl md:text-6xl">Can Do.</span>
            </h3>
            <p className="max-w-md text-[var(--color-text-muted)] font-sans font-light text-sm leading-relaxed">
              I use modern tools to build websites that are fast and easy to use.
            </p>
          </div>
        </div>

        {/* Categories Grid - Viewport Tightened */}
        <div className="flex-1 min-h-0 space-y-4 md:space-y-6 overflow-hidden">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-[var(--color-border)] pb-6 md:pb-10 last:border-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Title and Index */}
                <div className="lg:col-span-4 flex items-baseline gap-6">
                  <span className="font-mono text-xs opacity-30">0{i + 1}</span>
                  <div>
                    <h4 className="text-xl md:text-3xl font-serif italic text-[var(--color-text)] mb-1 md:mb-2 transition-colors duration-500 group-hover:text-[var(--color-accent)]">
                      {cat.title}
                    </h4>
                    <p className="text-[var(--color-text-muted)] font-sans font-light text-xs max-w-sm">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills Cloud */}
                <div className="lg:col-span-8 flex flex-wrap gap-3 md:gap-4">
                  {cat.skills.map((skill, j) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text)] font-sans text-xs md:text-sm tracking-wider uppercase bg-transparent hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500 cursor-default flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseWeb;
