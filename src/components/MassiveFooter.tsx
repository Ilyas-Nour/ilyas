import React from 'react';
import { motion } from 'framer-motion';

export const MassiveFooter = () => {
  return (
    <footer className="bg-[var(--color-bg)] pt-48 pb-12 px-6 overflow-hidden border-t border-[var(--color-border)] relative transition-colors duration-500">
      <div className="w-full relative">
        {/* Massive Background Brandmark with Premium Font Pairing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-x-0 -top-24 select-none pointer-events-none z-0"
        >
          <h2 className="text-[25vw] text-center whitespace-nowrap text-[var(--color-text)] opacity-[0.03] flex justify-center items-center leading-none">
            <span className="font-sans font-bold uppercase">ILYAS</span>
            <span className="font-serif italic font-light lowercase px-4">NOUR</span>
          </h2>
        </motion.div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32">
             {/* Navigation */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase">Index</h4>
              <nav className="flex flex-col gap-4">
                  <a href="#home" className="text-2xl font-serif italic text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors w-fit">Home</a>
                  <a href="#projects" className="text-2xl font-serif italic text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors w-fit">Projects</a>
                  <a href="#about" className="text-2xl font-serif italic text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors w-fit">Studio</a>
                  <a href="#contact" className="text-2xl font-serif italic text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors w-fit">Connect</a>
              </nav>
            </div>

            {/* Social */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase">Social</h4>
              <div className="flex flex-wrap gap-8">
                {[
                  { name: 'Github', url: 'https://github.com/Ilyas-Nour' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ilyasnour/' },
                  { name: 'X', url: 'https://x.com/ilyas__nour' }
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                    <span className="font-mono text-xs uppercase tracking-widest">{social.name}</span>
                    <span className="text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div className="space-y-8 text-right">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase text-right">Studio</h4>
              <p className="font-mono text-[10px] text-[var(--color-text-muted)] leading-relaxed uppercase tracking-widest">
                Designed & Developed <br />
                by Ilyas Nour<br />
                © 2026 Studio
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MassiveFooter;
