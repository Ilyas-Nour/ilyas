import React from 'react';
import { motion } from 'framer-motion';

export const IdentityArchive: React.FC = () => {
  return (
    <section id="about" className="relative py-40 px-6 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Typographic Introduction */}
          <div className="lg:col-span-7 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-8xl font-serif italic leading-[1.1] text-[var(--color-text)]">
                Artisanship in <br />
                <span className="text-[var(--color-accent)]">Digital Engineering.</span>
              </h2>

              <div className="space-y-8 text-lg md:text-xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl">
                <p>
                  I believe that the best digital products are born at the intersection of rigorous technical logic and intentional design. My work is dedicated to creating high-performance environments that feel as good as they function.
                </p>
                <p>
                  With a focus on full-stack development and creative technology, I build scalable systems that endure. From complex backend architectures to fluid, interactive frontends, every step is a deliberate move towards excellence.
                </p>
              </div>
            </motion.div>

            {/* Simple Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-[var(--color-border)]">
               {[
                 { label: "Performance", value: "Optimized" },
                 { label: "Architecture", value: "Scalable" },
                 { label: "Interface", value: "Tactile" },
                 { label: "Commitment", value: "Excellence" }
               ].map((stat, i) => (
                 <div key={i} className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">{stat.label}</span>
                    <p className="font-sans text-sm text-[var(--color-text)] font-medium uppercase tracking-widest">{stat.value}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Minimalist Profile/Identity Block */}
          <div className="lg:col-span-5 relative">
             <div className="glass rounded-[40px] p-12 aspect-[4/5] flex flex-col justify-end border-[var(--color-border)] overflow-hidden group">
                {/* Background Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative z-10 space-y-6">
                   <div className="space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)]">Location</span>
                      <p className="text-2xl font-serif italic text-[var(--color-text)]">Remote / Global</p>
                   </div>
                   
                   <div className="space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)]">Experience</span>
                      <p className="text-2xl font-serif italic text-[var(--color-text)]">5+ Years of Studio Work</p>
                   </div>
                </div>

                {/* Abstract Line Decor */}
                <div className="absolute top-12 right-12 opacity-10">
                   <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="48" stroke="var(--color-text)" strokeWidth="0.5" />
                      <line x1="2" y1="50" x2="98" y2="50" stroke="var(--color-text)" strokeWidth="0.5" />
                      <line x1="50" y1="2" x2="50" y2="98" stroke="var(--color-text)" strokeWidth="0.5" />
                   </svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentityArchive;
