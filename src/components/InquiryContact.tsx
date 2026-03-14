import React from 'react';
import { motion } from 'framer-motion';

export const InquiryContact: React.FC = () => {
  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden bg-contact-studio">
      <div className="container mx-auto relative z-30">
        <div className="max-w-6xl mx-auto">
          <header className="mb-24 space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)]">Get in Touch</span>
              <div className="h-px w-20 bg-white/10" />
            </div>
            <h2 className="text-6xl md:text-9xl font-display italic text-white tracking-tightest leading-[0.8]">
              Let's <br /> <span className="text-[var(--color-accent)] opacity-40">Connect.</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8 glass-panel rounded-3xl p-8 md:p-12 border-white/5 relative overflow-hidden">
                <form className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4 relative">
                         <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 block ml-2">Full Name</label>
                         <div className="relative group">
                            <input type="text" placeholder="Your Name" className="w-full bg-white/[0.02] border-b border-white/10 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:text-white/10" />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-accent)] group-focus-within:w-full transition-all duration-500" />
                         </div>
                      </div>
                      <div className="space-y-4">
                         <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 block ml-2">Email Address</label>
                         <div className="relative group">
                            <input type="email" placeholder="Your Email" className="w-full bg-white/[0.02] border-b border-white/10 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:text-white/10" />
                            <div className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-accent)] group-focus-within:w-full transition-all duration-500" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 block ml-2">Your Message</label>
                      <div className="relative group">
                        <textarea rows={4} placeholder="What project are you working on?" className="w-full bg-white/[0.02] border-b border-white/10 px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:text-white/10 resize-none" />
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-accent)] group-focus-within:w-full transition-all duration-500" />
                      </div>
                   </div>

                   <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8">
                      <button className="px-16 py-6 bg-[var(--color-accent)] text-white font-mono text-[10px] uppercase tracking-[0.5em] rounded-xl shadow-[0_10px_40px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_60px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0">
                         Send Message
                      </button>
                   </div>
                </form>
             </div>

             <div className="lg:col-span-4 space-y-12">
                <div className="glass-panel rounded-3xl p-10 border-white/5 space-y-8">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-white/20 block border-b border-white/5 pb-4">Social</span>
                   <div className="flex flex-col gap-6">
                      {['GitHub', 'LinkedIn', 'Twitter'].map(node => (
                        <a key={node} href="#" className="flex justify-between items-center group">
                           <span className="font-display italic text-2xl text-white/40 group-hover:text-white transition-colors">{node}</span>
                           <div className="w-6 h-6 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[var(--color-accent)] transition-colors text-white/20 group-hover:text-[var(--color-accent)]">
                              ↗
                           </div>
                        </a>
                      ))}
                   </div>
                </div>

                <div className="p-10 space-y-4">
                   <p className="font-mono text-[10px] text-white/20 uppercase leading-relaxed tracking-widest">
                      Currently available for freelance <br /> projects and collaborations.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryContact;
