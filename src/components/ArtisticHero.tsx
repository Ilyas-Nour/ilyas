import React from 'react';
import { motion } from 'framer-motion';

const ArtisticHero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-[var(--color-accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto relative z-10 flex flex-col items-start text-left">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
           className="space-y-12 max-w-4xl"
        >
          <div className="space-y-6">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="font-mono text-[10px] uppercase tracking-[0.6em] block text-[var(--color-text)] opacity-40"
             >
               Digital Artisan & Full-Stack Developer
             </motion.span>
             
             <h1 className="text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tighter text-[var(--color-text)]">
               <span className="font-sans font-bold uppercase block mb-2">Ilyas</span>
               <span className="font-serif italic font-light lowercase">Nour.</span>
             </h1>
          </div>

          <p className="text-lg md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl">
            Engineering elegant digital architecture where <br className="hidden md:block" />
            clean aesthetics meet technical excellence.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-10">
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-12 py-5 rounded-full border border-[var(--color-border)] glass font-mono text-[10px] uppercase tracking-widest text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500"
             >
                View Selected Projects
             </motion.button>
             
             <motion.button 
               whileHover={{ x: 10 }}
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-4 group"
             >
                Start a Conversation
                <span className="text-[var(--color-accent)] group-hover:translate-x-2 transition-transform duration-300">→</span>
             </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator - Left Aligned Hook */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex flex-col items-start gap-6"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[var(--color-text)] to-transparent" />
        <span className="font-mono text-[7px] uppercase tracking-[0.5em]">Explore</span>
      </motion.div>

      {/* Grid Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ backgroundImage: 'radial-gradient(var(--color-text) 0.5px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
};

export default ArtisticHero;
