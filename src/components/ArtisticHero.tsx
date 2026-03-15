import React from 'react';
import { motion } from 'framer-motion';
import { KineticButton } from './KineticButton';

const ArtisticHero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">
      {/* Alchemical Anime Presence - Ghostly Outline */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          src="/gojo_outline_alchemical_1773527133132.png"
          alt="Atmospheric Presence"
          className="w-full h-full object-cover object-center scale-150 md:scale-100 mix-blend-screen"
        />
      </div>

      
      <div className="container mx-auto relative z-10 flex flex-col items-start text-left">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
           className="space-y-12 max-w-4xl"
        >
          <div className="space-y-6">
             <h1 className="text-[14vw] lg:text-[12vw] leading-[0.7] tracking-tight text-[var(--color-text)] relative">
                <span className="font-serif font-bold uppercase block -mb-4 tracking-[-0.05em]">Ilyas</span>
                <span className="block ml-[5vw] opacity-80" style={{ fontFamily: 'var(--font-signature)', fontSize: '0.8em' }}>Nour.</span>
             </h1>
          </div>

          <p className="text-lg md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl">
            Engineering elegant digital architecture where <br className="hidden md:block" />
            clean aesthetics meet technical excellence.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-10">
             <KineticButton 
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
             >
                Illuminate Projects
             </KineticButton>
             
             <KineticButton 
               variant="outline"
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
               className="group"
               icon={<span className="text-[var(--color-accent)] group-hover:translate-x-2 transition-transform duration-300">→</span>}
             >
                Begin Dialogue
             </KineticButton>
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
