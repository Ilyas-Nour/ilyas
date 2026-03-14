import React from 'react';
import { motion } from 'framer-motion';

const ArtisticHero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col items-center justify-center section-padding overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[var(--color-accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-[var(--color-accent)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
           className="space-y-16"
        >
          <div className="space-y-6">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.4 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="font-mono text-[10px] uppercase tracking-[0.6em] block"
             >
               Digital Artisan & Full-Stack Developer
             </motion.span>
             
             <h1 className="text-[14vw] lg:text-[11vw] font-serif italic text-[var(--color-text)] leading-[0.85] tracking-tighter">
               Ilyas <br /> 
               <span className="text-[var(--color-accent)]">Nour.</span>
             </h1>
          </div>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
            Crafting elegant digital experiences where <br className="hidden md:block" />
            minimalism meets technical excellence.
          </p>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-10">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-14 py-6 rounded-full glass font-mono text-[10px] uppercase tracking-widest text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500"
             >
                View Selected Projects
             </motion.button>
             
             <motion.button 
               whileHover={{ x: 10 }}
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-4 group"
             >
                Get in Touch
                <span className="text-[var(--color-accent)] group-hover:translate-x-2 transition-transform duration-300">→</span>
             </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[var(--color-text)] to-transparent" />
        <span className="font-mono text-[7px] uppercase tracking-[0.5em] origin-center">Explore</span>
      </motion.div>

      {/* Grid Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
};

export default ArtisticHero;
