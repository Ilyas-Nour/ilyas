import { motion } from 'framer-motion';

export const SingularityHero = () => {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden px-6">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="z-10 text-center max-w-5xl"
      >
        <motion.div variants={itemVars} className="mb-6">
          <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">Software_Engineer_System [v4.0]</span>
        </motion.div>

        <motion.h1 
          variants={itemVars}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          ILYAS NOUR. <br />
          <span className="text-muted">Web Full-Stack Developer.</span>
        </motion.h1>

        <motion.p 
          variants={itemVars}
          className="text-lg md:text-2xl text-muted font-light max-w-2xl mx-auto leading-relaxed"
        >
          Building high-integrity digital systems. <br className="hidden md:block" />
          Focused on performance, scalability, and robust user experiences.
        </motion.p>

        <motion.div 
          variants={itemVars}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center"
        >
          <button className="magnetic-button">
            Initialize_Contact()
          </button>
          <button className="px-8 py-4 glass text-white font-mono hover:bg-white/5 transition-colors">
            $ view_catalog
          </button>
        </motion.div>
      </motion.div>

      {/* Background Grid Detail */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
};
