import React from 'react';
import { motion } from 'framer-motion';

export const InquiryContact: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Header Panel (Bento) */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-12 md:p-20 flex flex-col justify-between">
            <div className="flex justify-between items-start gap-12">
              <div className="space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] block">Connection // Portal</span>
                <h2 className="text-5xl md:text-8xl font-display italic text-white leading-tight">The Final Sync</h2>
              </div>
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                src="/projects/signature.jpg"
                alt="Ilyas Signature"
                loading="eager"
                fetchPriority="high"
                className="w-32 md:w-48 invert grayscale mix-blend-screen opacity-60"
              />
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="mt-12 max-w-xl"
            >
              <p className="text-xl md:text-2xl text-white/40 font-functional leading-relaxed">
                Ready to engineer the next <span className="text-white italic">Avant-Garde</span> digital standard? Initiate the synchronization sequence.
              </p>
            </motion.div>
          </div>

          {/* Social / Contact Info Panel (Bento) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex-1 glass-panel rounded-3xl p-8 border-[var(--color-accent)]/20 shadow-[0_0_40px_rgba(59,130,246,0.05)]">
               <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 block mb-6">// Transmission_Nodes</span>
               <div className="space-y-6">
                  {['LinkedIn', 'GitHub', 'Twitter', 'Email'].map(link => (
                    <a key={link} href="#" className="flex justify-between items-center group">
                      <span className="text-lg font-display italic text-white/60 group-hover:text-white transition-colors">{link}</span>
                      <div className="w-8 h-px bg-white/10 group-hover:bg-[var(--color-accent)] transition-all group-hover:w-12" />
                    </a>
                  ))}
               </div>
            </div>
            <div className="glass-panel rounded-3xl p-8 border-white/5 bg-[var(--color-accent-secondary)]/5">
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 block mb-2">Location // Node</span>
                <p className="text-white/60 font-mono text-xs">GLOBAL_REMOTE [4.19.2.1]</p>
            </div>
          </div>

          {/* Form Panel (Bento - Wide) */}
          <div className="lg:col-span-12 glass-panel rounded-3xl p-12 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                 <label className="font-mono text-[9px] uppercase tracking-widest text-white/30 ml-2">Identify_Entity</label>
                 <input type="text" placeholder="Full Name..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors font-functional" />
              </div>
              <div className="space-y-2">
                 <label className="font-mono text-[9px] uppercase tracking-widest text-white/30 ml-2">Transmission_Address</label>
                 <input type="email" placeholder="Email Address..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors font-functional" />
              </div>
              <div className="lg:col-span-2 space-y-2">
                 <label className="font-mono text-[9px] uppercase tracking-widest text-white/30 ml-2">Input_Brief</label>
                 <input type="text" placeholder="Tell me about the project architecture..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--color-accent)]/50 transition-colors font-functional" />
              </div>
            </div>
            
            <div className="mt-12 flex justify-between items-center">
               <div className="hidden md:flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">System_Status: Awaiting_Input</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-1 bg-[var(--color-accent)]/10" />)}
                  </div>
               </div>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-12 py-5 bg-[var(--color-accent)] text-white font-mono text-[10px] uppercase tracking-[0.4em] rounded-xl shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_60px_rgba(59,130,246,0.5)] transition-all"
               >
                 Send Transmission
               </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryContact;
