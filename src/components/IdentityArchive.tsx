import React from 'react';
import { motion } from 'framer-motion';

export const IdentityArchive: React.FC = () => {
  return (
    <section id="about" className="relative py-40 px-6 overflow-hidden bg-about-studio">
      {/* Anime Theme Motif */}
      <div 
        className="anime-motif opacity-[0.05]"
        style={{ backgroundImage: 'url(/assets/real_anime_hero.png)', backgroundPosition: 'right bottom', backgroundSize: 'contain' }} 
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-40 space-y-12">
               <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] block">File // Alpha_01</span>
                  <div className="h-px w-full bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
               </div>

               <div className="space-y-6">
                  {[
                    { label: "Subject", value: "Ilyas Nour" },
                    { label: "Clearance", value: "Level_05" },
                    { label: "Sectors", value: "Full-Stack / AI" },
                    { label: "Hash", value: "0x8A2B9C" }
                  ].map((meta, i) => (
                    <div key={i} className="space-y-1 group">
                       <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 group-hover:text-[var(--color-accent)]/40 transition-colors">{meta.label}</span>
                       <p className="text-sm text-white font-mono uppercase tracking-tighter">{meta.value}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-8 opacity-20">
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center rounded-lg">
                     <span className="font-mono text-[8px] rotate-90 whitespace-nowrap">CLASSIFIED</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Dossier Content */}
          <div className="lg:col-span-6 relative">
            {/* Visual Scanline Decor */}
            <div className="absolute -left-8 inset-y-0 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/20 to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <h3 className="text-5xl md:text-7xl font-display italic leading-[1.1] text-white">
                Designing systems that <span className="text-[var(--color-accent)] opacity-60">breathe</span> and code that <span className="italic">endures.</span>
              </h3>

              <div className="space-y-8 text-white/60 font-functional text-lg leading-relaxed">
                <p>
                  As an artisan of the digital realm, I don't just build websites; I engineer **interactive narratives**. My approach sits at the raw intersection of technical precision and artistic intuition.
                </p>
                <p>
                  Every line of logic is a deliberate stroke, aimed at creating performance-driven environments that feel as good as they look. From monolithic backend structures to fluid frontend dynamics.
                </p>
              </div>

              {/* Technical Benchmarks */}
              <div className="pt-16 border-t border-white/5 grid grid-cols-2 gap-8">
                 {[
                   { label: "Architecture", value: "Scalable" },
                   { label: "Interface", value: "Tactile" },
                   { label: "Logic", value: "Rigorous" },
                   { label: "Output", value: "Mastery" }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2 group">
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover:text-[var(--color-accent)] transition-colors">{stat.label}</span>
                        <span className="font-mono text-[7px] text-white/10 uppercase">Verified</span>
                      </div>
                      <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          whileInView={{ x: "0%" }}
                          transition={{ delay: i * 0.1, duration: 1.5 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" 
                        />
                      </div>
                      <p className="font-mono text-xs text-white uppercase tracking-widest">{stat.value}</p>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>

          {/* Visual Profile Marker */}
          <div className="lg:col-span-3 h-[500px] relative group overflow-hidden">
            <div className="absolute inset-0 glass-panel rounded-3xl border-white/10 group-hover:border-[var(--color-accent)]/50 transition-all duration-700">
               <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent" />
               <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden">
                  <span className="text-[20vw] lg:text-[10vw] font-black italic text-white/[0.02] select-none uppercase">Studio</span>
               </div>
               
               {/* Abstract Geometry Lines */}
               <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.05" />
                  <path d="M10,10 L90,90 M90,10 L10,90" stroke="white" strokeWidth="0.05" />
               </svg>

               <div className="absolute bottom-8 left-8 space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-3 bg-[var(--color-accent)]/40" />)}
                  </div>
                  <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest leading-none block">Archive_Sync_Status: 100%</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentityArchive;
