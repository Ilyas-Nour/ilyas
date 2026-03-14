import { motion } from 'framer-motion';

export const SingularityHero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-24 pt-32 pb-16 overflow-hidden">
      {/* Background Radial Gradients */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="flex flex-col items-start gap-4"
        >
          {/* Status Badge */}
          <div className="flex items-center gap-3 px-3 py-1 glass rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80">Available for Projects</span>
          </div>

          <div className="flex flex-col items-start gap-2">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-[#F1F5F9] tracking-tightest leading-none z-20">
              ILYAS <span className="text-[#10B981] underline decoration-white/5 underline-offset-8 decoration-2">NOUR</span>
            </h1>
            <div className="flex items-center gap-4 mt-2 font-mono text-sm md:text-xl text-slate-400 z-20">
              <span className="text-[#10B981]">&gt;</span>
              <span>Full-Stack Developer & Student</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-3xl"
          >
            <p className="text-lg md:text-2xl font-sans font-light text-foreground/50 leading-relaxed md:leading-snug">
              Specializing in <span className="text-foreground font-medium">React</span>, <span className="text-foreground font-medium">Laravel</span>, and <span className="text-foreground font-medium">Robust System Design</span>. 2nd-year student at <span className="text-accent italic">ISTA Ben M'sik</span>, focused on building scalable web solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex gap-6"
          >
            <button className="px-8 py-4 bg-accent text-background font-mono font-bold rounded-lg hover:scale-105 active:scale-95 transition-all">
              Initialize_Contact()
            </button>
            <button className="px-8 py-4 glass text-foreground font-mono rounded-lg hover:bg-white/10 transition-all">
              View_Projects.zip
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Sub-structural details */}
      <div className="absolute right-24 bottom-24 hidden lg:block opacity-20 pointer-events-none">
         <div className="font-mono text-xs text-foreground/40 space-y-2 select-none">
           <div>SYSTEM_STATUS: OK</div>
           <div>UPTIME: 99.9%</div>
           <div>LOC: 33.5731° N, 7.5898° W</div>
         </div>
      </div>
    </section>
  );
};
