import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArtisticHero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6 md:px-12 lg:px-24">
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

      <div className="container relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Title Section */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1 border border-white/10 rounded-full mb-8"
            >
              <span className="text-[var(--color-accent)] font-mono text-sm tracking-widest uppercase italic">The Kinetic Studio</span>
            </motion.div>
            
            <motion.h1 
              style={{ y: y1, opacity }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-display leading-[0.9] text-white"
            >
              <span className="block italic opacity-40">Ilyas</span>
              <span className="block ml-10 md:ml-20">NOUR.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 max-w-xl"
            >
              <p className="text-xl md:text-2xl text-white/60 font-functional leading-relaxed">
                A <span className="text-white italic">Web Full-Stack Developer</span> crafting high-impact digital experiences where raw performance meets avant-garde design.
              </p>
            </motion.div>
          </div>

          {/* Technical Overlay Section (Dense) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
            <div className="p-8 border border-white/5 glass-panel rounded-2xl">
              <div className="flex justify-between mb-4 border-b border-white/10 pb-2">
                <span>Core Engine</span>
                <span className="text-[var(--color-accent)]">Active</span>
              </div>
              <p className="normal-case leading-relaxed opacity-50">
                Architectural Integrity: High-Fidelity Infrastructure.
                Aesthetic Density: Calibrated to 94.2%.
              </p>
            </div>
            <div className="flex flex-col gap-2 pl-4 border-l border-white/10">
              <span>// 01 Logic Optimization</span>
              <span>// 02 Visual Narrative</span>
              <span>// 03 Interaction Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
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
