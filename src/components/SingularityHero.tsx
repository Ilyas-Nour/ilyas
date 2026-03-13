import { motion } from 'framer-motion';

export const SingularityHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-start px-6 pt-40 pb-20 overflow-hidden">
      <div className="z-10 w-full max-w-[1400px] mx-auto">
        <div className="space-y-12">
          {/* Authentic Lead */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-accent font-display text-sm tracking-[0.4em] uppercase font-medium">
              Digital Artisan // Based in Morocco
            </span>
          </motion.div>
          
          <h1 className="text-[14vw] md:text-[11vw] font-display font-black leading-[0.8] tracking-tightest flex flex-col items-start">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-white subpixel-antialiased"
            >
              ILYAS
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent-gradient md:ml-[0.5em]"
            >
              NOUR
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
          >
            <p className="text-white/40 text-lg md:text-2xl max-w-xl font-light leading-snug">
              Creating high-fidelity digital interfaces through a balance of 
              <span className="text-white"> precise engineering </span> 
              and 
              <span className="text-white"> artistic intuition</span>.
            </p>

            <a href="#archive" className="interactive text-[10px] font-mono uppercase tracking-[0.6em] text-white/40 hover:text-accent transition-colors pb-2 border-b border-white/10">
              Initialize Exploration
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle Atmospheric Gradient */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-accent/5 blur-[180px] pointer-events-none" />
    </section>
  );
};
