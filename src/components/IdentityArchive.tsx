import { motion } from 'framer-motion';

export const IdentityArchive = () => {
  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden h-fit">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Col: The Narrative */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >

            <h2 className="text-header-responsive font-black text-white mb-12">
               About <br />
               <span className="font-display italic font-light text-white/40">me.</span>
            </h2>
            <div className="space-y-8 max-w-3xl">
              <p className="text-xl sm:text-2xl md:text-3xl font-sans font-light leading-relaxed text-muted">
                I am a <span className="text-white font-medium">Web Full-Stack Developer</span> focused on building stable, logic-driven systems.
              </p>
              <p className="text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed text-white/80">
                Through projects like <span className="text-accent underline decoration-accent/20">Animy</span>, <span className="text-accent underline decoration-accent/20">PrivaFlow</span>, and <span className="text-accent underline decoration-accent/20">TopNature</span>, I specialize in transforming complex challenges into clean and reliable solutions. I develop with a priority on data integrity and long-term scalability, ensuring every platform I build is functional, efficient, and easy to maintain.
              </p>
            </div>
          </motion.div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-12">
            {[
              { title: 'Architectural Integrity', desc: 'Building systems that withstand scale through modular, clean, and documented logic.' },
              { title: 'Visual Excellence', desc: 'Crafting premium interfaces that prioritize typography, spacing, and micro-interactions.' }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="space-y-4 p-8 glass rounded-2xl border-white/5 w-full"
              >
                <h4 className="font-display italic text-accent text-xl">{pillar.title}</h4>
                <p className="text-sm text-white/80 leading-relaxed font-sans">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Col: System Data */}
        <div className="lg:col-span-5 lg:sticky lg:top-48 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="p-6 md:p-10 glass rounded-3xl border-accent/10 relative group w-full"
          >
             <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
             
             <div className="space-y-8 md:space-y-10 font-mono text-[10px] md:text-xs tracking-widest uppercase">
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/5 pb-4 gap-2">
                 <span className="text-white/80">_status</span>
                 <span className="text-accent underline decoration-accent/20">Web Full-Stack Trainee</span>
               </div>
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/5 pb-4 gap-2">
                 <span className="text-white/80">_location</span>
                 <span className="text-white">Casablanca_MA</span>
               </div>
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/5 pb-4 gap-2">
                 <span className="text-white/80">_focus</span>
                 <span className="text-white">Web & Mobile first Apps</span>
               </div>
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/5 pb-4 gap-2">
                 <span className="text-white/80">_experience</span>
                 <span className="text-white">More than 1 Year Technical Development</span>
               </div>
               
               <div className="pt-10 space-y-4">
                 <div className="flex items-center gap-4">
                   <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                   <span className="text-[10px] text-accent">AVAILABLE_FOR_STRATEGIC_COLLABORATION</span>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
