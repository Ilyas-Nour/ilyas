import { motion } from 'framer-motion';

export const InquiryContact = () => {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 bg-background overflow-hidden border-t border-foreground/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
             <h2 className="text-5xl md:text-8xl font-display font-black text-foreground leading-[0.95] tracking-tightest mb-10">
              Let's <br /><span className="text-foreground/20 italic font-light underline decoration-foreground/10 decoration-1 pb-2">Collaborate</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/50 font-sans font-light leading-relaxed max-w-sm">
              Available for architectural consultation and precision engineering.
            </p>
            
            <div className="mt-16 space-y-8">
              <a href="mailto:ilyas@nour.com" className="group flex items-center gap-4 text-xl md:text-2xl font-display font-light text-foreground hover:text-foreground/60 transition-colors">
                <span className="w-10 h-[1px] bg-foreground/10 group-hover:w-16 group-hover:bg-foreground/40 transition-all duration-500" />
                ilyas@nour.com
              </a>
              <div className="flex gap-6 pl-14">
                {['LinkedIn', 'GitHub', 'X'].map((social) => (
                  <a key={social} href="#" className="text-[10px] font-mono tracking-widest text-foreground/40 hover:text-foreground transition-colors uppercase">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 bg-foreground/[0.01] border border-foreground/[0.05] rounded-2xl"
          >
            <form className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-mono tracking-[0.4em] text-foreground/20 uppercase">Identity</label>
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-foreground/10 py-3 font-display text-lg focus:border-foreground/40 transition-colors focus:outline-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-mono tracking-[0.4em] text-foreground/20 uppercase">Email Address</label>
                <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-foreground/10 py-3 font-display text-lg focus:border-foreground/40 transition-colors focus:outline-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-mono tracking-[0.4em] text-foreground/20 uppercase">Message</label>
                <textarea rows={3} placeholder="Tell me about your vision" className="w-full bg-transparent border-b border-foreground/10 py-3 font-display text-lg focus:border-foreground/40 transition-colors focus:outline-none resize-none" />
              </div>
              
              <button className="group w-full py-5 bg-foreground text-background font-display font-black text-lg tracking-tighter rounded-full overflow-hidden transition-transform active:scale-[0.98]">
                Submit Transmission
              </button>
            </form>
          </motion.div>

        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-32 pt-24 border-t border-foreground/5 text-center">
        <span className="text-xl font-display font-light italic text-foreground tracking-widest opacity-20 uppercase">
          Ilyas Nour &copy; 2024
        </span>
      </div>
    </section>
  );
};
