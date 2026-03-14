import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const InquiryContact = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section id="contact" className="relative py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-black overflow-hidden selection:bg-accent selection:text-black">
      {/* Dynamic Focal Glows - React to field focus */}
      <AnimatePresence>
        {focusedField && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full blur-[200px] pointer-events-none z-0"
            style={{ 
              background: `radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)` 
            }}
          />
        )}
      </AnimatePresence>

      <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Col: High-Impact Typography */}
        <div className="lg:col-span-6 space-y-12 md:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-8 block">_system_uplink_v5.0</span>
            <h2 className="text-header-responsive font-black text-white">
              L<span className="font-display italic font-light text-white/20">et's</span> <br />
              S<span className="font-display italic font-light text-white/20">y</span>nc.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="space-y-8 md:space-y-10"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-sans font-light leading-relaxed text-muted max-w-xl">
              Available for <span className="text-white">architectural consultation</span> and precision technical partnerships.
            </p>
            
            <div className="pt-8 flex flex-col gap-10 md:gap-12 w-full">
              <a href="mailto:ilyasnourelislam@gmail.com" className="group w-full md:w-fit break-all">
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase block mb-2 transition-transform group-hover:-translate-y-1">_direct_comms</span>
                <span className="text-2xl sm:text-3xl md:text-5xl font-display italic font-light text-white group-hover:text-accent transition-colors duration-500">
                   ilyasnourelislam@gmail.com
                </span>
              </a>

              <div className="flex flex-wrap gap-8 md:gap-10">
                {[
                  { name: 'Github', url: 'https://github.com/Ilyas-Nour' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ilyasnour/' },
                  { name: 'Twitter/X', url: 'https://x.com/ilyas__nour' }
                ].map((social, i) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="font-mono text-[9px] md:text-xs tracking-[0.3em] text-white/60 group-hover:text-white transition-colors uppercase">
                      [{social.name}]
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Col: Bento Data Matrix Form */}
        <div className="lg:col-span-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="p-1 glass rounded-[32px] md:rounded-[40px] border-white/5 bg-white/[0.02] w-full"
          >
            <div className="p-8 md:p-16 space-y-12 md:space-y-16">
              <form className="space-y-10 md:space-y-12 w-full">
                {[
                  { id: 'name', label: '01_Identity', type: 'text', placeholder: 'SPECIFY_NAME' },
                  { id: 'email', label: '02_Channel', type: 'email', placeholder: 'CONTACT_EMAIL' },
                  { id: 'message', label: '03_Objective', type: 'textarea', placeholder: 'TRANSMIT_DETAILS' }
                ].map((field) => (
                  <div key={field.id} className="space-y-4 group/field w-full">
                    <label className={`font-mono text-[9px] tracking-[0.4em] uppercase transition-colors duration-500 ${focusedField === field.id ? 'text-accent' : 'text-white/60'}`}>
                      {field.label}
                    </label>
                    <div className="relative w-full">
                      {field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          placeholder={field.placeholder}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-white/10 py-4 md:py-6 font-display text-xl sm:text-2xl md:text-3xl text-white placeholder:text-white/5 focus:border-accent transition-all focus:outline-none resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-white/10 py-4 md:py-6 font-display text-xl sm:text-2xl md:text-3xl text-white placeholder:text-white/5 focus:border-accent transition-all focus:outline-none"
                        />
                      )}
                      {/* Active Border Glow */}
                      <motion.div 
                        initial={false}
                        animate={{ scaleX: focusedField === field.id ? 1 : 0 }}
                        className="absolute bottom-0 left-0 w-full h-px bg-accent shadow-[0_0_20px_rgaba(0,229,255,1)] origin-left"
                      />
                    </div>
                  </div>
                ))}

                <button 
                  className="w-full h-20 md:h-24 mt-8 relative group overflow-hidden rounded-2xl border border-accent/20 hover:border-accent transition-colors bg-accent/[0.03]"
                >
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors" />
                  
                  {/* Scan Line Animation */}
                  <motion.div
                    animate={{ y: ['-100%', '300%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute inset-x-0 h-px bg-accent/30 z-0"
                  />
                  
                  <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-[0.5em] text-accent uppercase font-bold group-hover:scale-105 transition-transform block">
                    Execute_Uplink()
                  </span>
                </button>
              </form>

              {/* Technical Status Footer */}
              <div className="pt-12 border-t border-white/5 flex justify-between items-center text-[9px] font-mono tracking-widest text-white/40 uppercase">
                <span>_ready_for_transmission</span>
                <span>encrypted_at_source_992x</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
