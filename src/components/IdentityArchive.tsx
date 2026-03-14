import React from 'react';
import { motion } from 'framer-motion';

export const IdentityArchive: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-[var(--color-bg)]">
      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10"
        >
          <h2 className="text-5xl md:text-7xl font-serif italic text-[var(--color-text)] leading-tight">
            About Me.
          </h2>

          <div className="space-y-8 text-xl md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
            <p>
              I am a <span className="text-[var(--color-text)] font-normal italic font-serif">full-stack developer trainee</span> in my second year at OFPPT. 
              My journey is defined by a deep-seated passion for crafting digital experiences that are as technically rigorous as they are visually compelling.
            </p>
            <p>
              I thrive on the challenge of building performant, meaningful web applications—from the intuitive interfaces of <span className="text-[var(--color-accent)]">Animy</span> and <span className="text-[var(--color-accent)]">VaultNode</span> to the expansive architecture of my personal portfolio.
            </p>
            <p className="text-lg md:text-xl opacity-80">
              Currently, I am looking to apply my technical foundation and eye for detail in an <span className="uppercase tracking-widest text-sm text-[var(--color-text)] font-medium">internship</span> environment where I can contribute to high-impact projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdentityArchive;
