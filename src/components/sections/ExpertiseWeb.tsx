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
      title: "The Frontend",
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"],
      description: "Crafting fluid, high-fidelity interfaces with mathematical precision."
    },
    {
      title: "The Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "NoSQL", "REST APIs"],
      description: "Architecting scalable, resilient data layers and efficient server logic."
    },
    {
      title: "The Toolbox",
      skills: ["Git", "Docker", "Figma", "Vite", "GSAP", "Linux"],
      description: "Optimizing the development flow with modern industry standards."
    }
  ];

  return (
    <section id="skills" className="section-padding bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-[var(--color-accent)] mb-6">Expertise</h2>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <h3 className="text-4xl md:text-7xl font-sans font-extrabold tracking-tighter text-[var(--color-text)] leading-[0.9]">
              Structural <br /> 
              <span className="italic font-serif font-normal opacity-50">Discovery.</span>
            </h3>
            <p className="max-w-md text-[var(--color-text-muted)] font-sans font-light text-lg leading-relaxed">
              My technical foundation is built on modern frameworks and architectural patterns, ensuring speed and reliability at scale.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12 md:space-y-24">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-[var(--color-border)] pb-12 md:pb-20 last:border-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Title and Index */}
                <div className="lg:col-span-4 flex items-baseline gap-6">
                  <span className="font-mono text-xs opacity-30">0{i + 1}</span>
                  <div>
                    <h4 className="text-3xl md:text-5xl font-serif italic text-[var(--color-text)] mb-4 transition-colors duration-500 group-hover:text-[var(--color-accent)]">
                      {cat.title}
                    </h4>
                    <p className="text-[var(--color-text-muted)] font-sans font-light max-w-sm">
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
