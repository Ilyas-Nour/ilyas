import { motion } from 'framer-motion';

export const InquiryContact = () => {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 bg-background overflow-hidden border-t border-foreground/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
             <h2 className="text-6xl md:text-8xl font-display font-black text-white leading-none tracking-tightest mb-10">
              Let's <br />
              <span className="text-white/20 italic font-light hover:text-accent transition-colors duration-500 cursor-default">
                Collaborate.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted font-sans font-light leading-relaxed max-w-sm">
              Available for architectural consultation and precision engineering.
            </p>
            
            <div className="mt-16 space-y-10">
              <a href="mailto:ilyasnourelislam@gmail.com" className="group relative inline-block text-2xl md:text-3xl font-display font-light text-white overflow-hidden">
                <span className="relative z-10 group-hover:text-accent transition-colors duration-500">ilyasnourelislam@gmail.com</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-accent group-hover:translate-x-full transition-transform duration-700" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </a>

              <div className="flex gap-8">
                {[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ilyasnour/' },
                  { name: 'GitHub', url: 'https://github.com/Ilyas-Nour' },
                  { name: 'X', url: 'https://x.com/ilyas__nour' }
                ].map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="relative group text-[10px] font-mono tracking-widest text-muted hover:text-white transition-colors uppercase">
                    {social.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 md:p-16 glass rounded-3xl relative group"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl" />
            
            <form className="space-y-12 relative z-10">
              <div className="space-y-4 group/input">
                <label className="text-[10px] font-mono tracking-[0.4em] text-muted uppercase group-focus-within/input:text-accent transition-colors">01_Identity</label>
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/10 py-4 font-display text-xl focus:border-accent transition-colors focus:outline-none" />
              </div>
              
              <div className="space-y-4 group/input">
                <label className="text-[10px] font-mono tracking-[0.4em] text-muted uppercase group-focus-within/input:text-accent transition-colors">02_Status</label>
                <textarea rows={2} placeholder="Brief Project Overview" className="w-full bg-transparent border-b border-white/10 py-4 font-display text-xl focus:border-accent transition-colors focus:outline-none resize-none" />
              </div>
              
              <button className="magnetic-button w-full rounded-xl overflow-hidden group/btn">
                <span className="relative z-20">SUBMIT_TRANSMISSION()</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};
