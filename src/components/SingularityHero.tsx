import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const SingularityHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const itemVars = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden px-6 lg:px-24">
      {/* Cinematic Aperture Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        style={{ y: textY, opacity, scale }}
        className="z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
      >
        <div className="lg:col-span-8">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-2"
          >
            <motion.div variants={itemVars} className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-accent/40" />
              <span className="font-mono text-[10px] tracking-[0.5em] text-accent uppercase">Protocol_V5_Active</span>
            </motion.div>

            <motion.h1 
              variants={itemVars}
              className="text-7xl md:text-[10rem] font-black tracking-tightest leading-[0.85] text-white"
            >
              ILYAS <br />
              <span className="text-muted/20 hover:text-white transition-colors duration-1000 cursor-default">NOUR.</span>
            </motion.h1>

            <motion.div variants={itemVars} className="pt-8">
              <h2 className="text-3xl md:text-5xl font-display italic font-light text-accent/80 leading-tight tracking-tight">
                Full-Stack Developer <br />
                <span className="text-white font-sans not-italic font-black text-4xl md:text-6xl">& Systems Architect.</span>
              </h2>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end gap-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="text-sm md:text-base text-muted font-mono max-w-[280px] leading-relaxed text-left lg:text-right uppercase tracking-widest opacity-60"
          >
            Engineering high-integrity digital foundations for the modern web. Driven by architecture, refined by execution.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic-button group"
            >
              <span className="relative z-10">INITIALIZE_CONNECT()</span>
            </button>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 glass text-white font-mono text-xs tracking-widest hover:bg-white/5 transition-colors uppercase"
            >
              $ view_archive
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative System Scanning Detail */}
      <div className="absolute bottom-12 left-12 hidden md:block">
        <div className="flex flex-col gap-2">
          <div className="h-1 w-32 bg-white/5 overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="h-full w-1/2 bg-accent/40" 
            />
          </div>
          <span className="font-mono text-[8px] text-muted tracking-widest opacity-40 uppercase">System_Load_Success</span>
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />
    </section>
  );
};
