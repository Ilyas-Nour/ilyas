import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="z-10 text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase">Protocol // Digital Synthesis</span>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>

        <h1 className="text-[12vw] md:text-[8vw] font-display font-bold leading-[0.85] tracking-tighter mb-12">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            ILYAS NOUR
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block text-accent-gradient drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"
          >
            INTELLIGENCE
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed mb-12"
        >
          Architecting high-fidelity digital experiences through the convergence of 
          <span className="text-white/80"> neural aesthetics</span> and 
          <span className="text-white/80"> technical precision</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a
            href="#vault"
            className="group relative inline-flex items-center gap-3 px-8 py-4 astral-glass rounded-full overflow-hidden transition-all hover:border-accent/40"
          >
            <span className="relative z-10 text-sm font-bold tracking-widest uppercase">Explore Archive</span>
            <ArrowDownRight className="relative z-10 group-hover:rotate-45 transition-transform duration-500 text-accent" size={20} />
            <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </motion.div>
      </div>

      {/* Decorative Meta Data */}
      <div className="absolute left-10 bottom-10 hidden lg:block text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
        <div className="flex flex-col gap-2">
          <span>Lat: 33.5731 / Long: -7.5898</span>
          <span>Status: Synchronized</span>
        </div>
      </div>
      
      <div className="absolute right-10 bottom-10 hidden lg:block text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] rotate-90 origin-bottom-right">
        Scroll to initialize
      </div>
    </section>
  );
};
