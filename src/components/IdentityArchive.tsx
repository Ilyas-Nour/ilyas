import { motion } from 'framer-motion';

export const IdentityArchive = () => {
  return (
    <section id="about" className="py-48 px-6 lg:px-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        
        {/* Left Col: The Narrative */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >

            <h2 className="text-6xl md:text-9xl font-black tracking-tightest leading-tight text-white mb-12">
               About <br />
               <span className="font-display italic font-light text-white/20">me.</span>
            </h2>
            <div className="space-y-8 max-w-2xl">
              <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-muted">
                I specialize in the intersection of <span className="text-white font-medium">high-integrity architecture</span> and cinematic digital experiences. For me, code is not just functional—it is a structural art form.
              </p>
              <p className="text-lg font-sans font-light leading-relaxed text-muted/60">
                Based in Morocco, I build digital foundations that are resilient, scalable, and visually arresting. My approach is rooted in systems thinking: every pixel and every line of backend logic must serve a larger technical purpose.
              </p>
            </div>
          </motion.div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
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
                className="space-y-4 p-8 glass rounded-2xl border-white/5"
              >
                <h4 className="font-display italic text-accent text-xl">{pillar.title}</h4>
                <p className="text-sm text-muted/60 leading-relaxed font-sans">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Col: System Data */}
        <div className="lg:col-span-5 lg:sticky lg:top-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="p-10 glass rounded-3xl border-accent/10 relative group"
          >
             <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
             
             <div className="space-y-10 font-mono text-xs tracking-widest uppercase">
               <div className="flex justify-between items-end border-b border-white/5 pb-4">
                 <span className="text-muted">_status</span>
                 <span className="text-accent underline decoration-accent/20">Web Full-Stack Trainee</span>
               </div>
               <div className="flex justify-between items-end border-b border-white/5 pb-4">
                 <span className="text-muted">_location</span>
                 <span className="text-white">Casablanca_MA</span>
               </div>
               <div className="flex justify-between items-end border-b border-white/5 pb-4">
                 <span className="text-muted">_focus</span>
                 <span className="text-white">Web & Mobile first Apps</span>
               </div>
               <div className="flex justify-between items-end border-b border-white/5 pb-4">
                 <span className="text-muted">_experience</span>
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
