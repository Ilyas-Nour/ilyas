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
    <section id="home" ref={containerRef} className="relative h-screen w-full flex items-center bg-black overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Cinematic Aperture Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        style={{ y: textY, opacity, scale }}
        className="z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end"
      >
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="w-full space-y-4"
          >
            <motion.h1 
              variants={itemVars}
              className="text-header-responsive font-black text-left flex flex-col items-start gap-0"
            >
              <span className="text-white font-sans uppercase leading-none">ILYAS</span>
              <span className="text-accent font-display italic font-light lowercase tracking-tighter leading-none -mt-2">nour.</span>
            </motion.h1>

            <motion.div variants={itemVars} className="pt-4 md:pt-8 w-full">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-display italic font-light text-accent/80 leading-tight tracking-tight">
                Full-Stack Developer <br />
                <span className="text-white font-sans not-italic font-black text-3xl sm:text-4xl md:text-6xl">& Websites Builder.</span>
              </h2>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end items-start gap-8 lg:gap-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="text-xs sm:text-sm md:text-base text-white/80 font-mono max-w-[320px] leading-relaxed text-left uppercase tracking-widest"
          >
            Building high-quality digital foundations for the modern web. Driven by passion, refined by execution.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic-button group w-full sm:w-auto text-center"
            >
              <span className="relative z-10">INITIALIZE_CONNECT()</span>
            </button>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 md:px-8 py-3 md:py-4 glass text-white font-mono text-[10px] md:text-xs tracking-widest hover:bg-white/5 transition-colors uppercase w-full sm:w-auto text-center"
            >
              $ view_archive
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />
    </section>
  );
};
