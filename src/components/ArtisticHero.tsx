import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArtisticHero: React.FC = () => {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" ref={scrollRef} className="relative h-screen w-full flex items-center bg-hero-studio overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Real Anime Motif Layer (Authentic High-Fidelity Art) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: 'url(/assets/real_anime_hero.png)', 
          backgroundPosition: 'right bottom',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Cinematic Aperture Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[var(--color-accent)]/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[var(--color-accent)]/10 rounded-full blur-[160px] pointer-events-none animate-pulse delay-1000" />

      {/* Background Kinetic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[100vw] h-[100vw] border border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[80vw] h-[80vw] border border-white/5 rounded-full"
        />
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end"
      >
        <div className="lg:col-span-8 flex flex-col items-start text-left relative">
          {/* Section HUD Corner */}
          <div className="absolute -top-12 -left-8 w-8 h-8 border-t border-l border-[var(--color-accent)]/20 hidden lg:block" />
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full space-y-4"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-[var(--color-accent)]/60">System_Initiated // 0xAF3</span>
              <div className="h-px w-12 bg-[var(--color-accent)]/20" />
            </div>
            
            <h1 className="text-header-responsive font-black text-left flex flex-col items-start gap-0">
              <span className="text-white font-bold uppercase leading-none tracking-tighter" style={{ fontFamily: "'Syncopate', sans-serif" }}>ILYAS</span>
              <span className="text-[var(--color-accent)] font-display italic font-light lowercase tracking-tighter leading-none -mt-4">nour.</span>
            </h1>

            <div className="pt-4 md:pt-8 w-full border-t border-white/10 relative">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-display italic font-light text-[var(--color-accent)]/80 leading-tight tracking-tight">
                Full-Stack Developer <br />
                <span className="text-white font-sans not-italic font-black text-3xl sm:text-4xl md:text-6xl">& Websites Builder.</span>
              </h2>
              {/* HUD Meta */}
              <div className="absolute -bottom-6 right-0 font-mono text-[6px] text-white/10 uppercase tracking-widest hidden md:block">
                Calibration: 0.00ms // Precision: Absolute
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end items-start gap-8 lg:gap-12 text-left relative">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-xs sm:text-sm md:text-base text-white/80 font-mono max-w-[320px] leading-relaxed uppercase tracking-widest"
          >
            Engineering premium digital architecture with artistic precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <button className="magnetic-button group w-full sm:w-auto text-center" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="relative z-10">INITIALIZE_SYNC()</span>
            </button>
            <button className="px-4 md:px-8 py-3 md:py-4 glass text-white font-mono text-[10px] md:text-xs tracking-widest hover:bg-white/5 transition-colors uppercase w-full sm:w-auto text-center" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              $ view_archive
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/20">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-white/20"
        />
      </div>
    </section>
  );
};

export default ArtisticHero;
