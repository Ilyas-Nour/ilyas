import React from 'react';
import { motion } from 'framer-motion';

const IdentityArchive: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-about-studio">
      {/* Anime Motif Layer */}
      <div 
        className="anime-motif opacity-[0.05]"
        style={{ backgroundImage: 'url(/assets/anime_about.png)', backgroundPosition: 'right bottom' }} 
      />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Section Marker */}
          <div className="lg:col-span-2">
            <div className="sticky top-32">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] block mb-4">Archive // 01</span>
              <h2 className="text-4xl font-display italic text-white/20">The Architect's Ledger</h2>
            </div>
          </div>

          {/* Dense Bio Section */}
          <div className="lg:col-span-7 relative">
            {/* HUD Corner Accents */}
            <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-[var(--color-accent)]/30 opacity-40" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[8px] text-[var(--color-accent)]/40 uppercase">Archive_Link // 01</span>
                <div className="h-px w-8 bg-white/5" />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-display leading-tight text-white">
                Designing systems that <span className="italic text-[var(--color-accent-secondary)]">breathe</span> and code that <span className="opacity-40">endures</span>.
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/70 font-functional text-lg leading-relaxed">
                <p>
                  As an artisan of the digital realm, I don't just build websites; I engineer interactive narratives. My approach sits at the raw intersection of technical precision and artistic intuition.
                </p>
                <p>
                  Every line of logic is a deliberate stroke, aimed at creating performance-driven environments that feel as good as they look. From monolithic backend structures to fluid frontend dynamics.
                </p>
              </div>

              {/* Technical Annotations (Dense Overlay) */}
              <div className="pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Precision", value: "99.9%" },
                  { label: "Efficiency", value: "Optimized" },
                  { label: "Design", value: "Avant-Garde" },
                  { label: "Logic", value: "Rigorous" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">{stat.label}</span>
                    <p className="text-sm text-white font-mono uppercase">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visual Density Side (Mosaic style image/shape) */}
          <div className="lg:col-span-3 h-[400px] relative group">
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/50 transition-colors" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/50 transition-colors" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 glass-panel rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl italic opacity-5 select-none">Studio</span>
              </div>
              {/* Abstract Architecture Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.2" />
              </svg>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/5 flex gap-12 text-white/20 font-mono text-[9px] uppercase tracking-widest">
           <span>Status: Active Collaboration</span>
           <span>Hash: 0x8A2B9C</span>
        </div>
      </div>
    </section>
  );
};

export default IdentityArchive;
