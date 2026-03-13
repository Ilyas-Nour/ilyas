import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const InquiryContact = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-48 px-6 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col space-y-32">
          {/* Editorial Header */}
          <div className="max-w-4xl">
            <span className="text-accent font-mono text-[10px] tracking-[0.8em] uppercase block mb-8">Direct Channel</span>
            <h2 className="text-[8vw] md:text-[6vw] font-display font-black leading-none tracking-tightest text-white/90">
              Let's craft <br /> something <span className="italic font-light">meaningful</span>.
            </h2>
          </div>

          {/* Artistic Inquiry Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
             <div className="space-y-12">
                <p className="text-white/40 text-xl md:text-3xl font-light leading-tight">
                  Always open to high-impact collaborations and architectural explorations.
                </p>
                <div className="flex flex-col gap-4">
                  <a href="mailto:ilyasnour.dev@gmail.com" className="interactive text-2xl md:text-4xl text-white font-display font-medium hover:text-accent transition-colors flex items-center gap-4">
                    ilyasnour.dev@gmail.com
                    <ArrowUpRight size={24} className="opacity-40" />
                  </a>
                  <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">UTC+1 (CASABLANCA)</span>
                </div>
             </div>

             <div className="relative group">
                <form className="space-y-16">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Your Identity"
                      className="w-full bg-transparent border-b border-white/10 py-6 outline-none focus:border-accent transition-colors text-4xl md:text-6xl font-display font-bold placeholder:text-white/5 placeholder:font-light"
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      placeholder="The Inquiry"
                      rows={1}
                      className="w-full bg-transparent border-b border-white/10 py-6 outline-none focus:border-accent transition-colors text-2xl md:text-4xl font-display font-medium placeholder:text-white/5 placeholder:font-light resize-none"
                    />
                  </div>
                  
                  <button className="interactive group/btn relative py-4 flex items-center gap-6">
                    <span className="text-white font-display text-4xl font-bold group-hover/btn:text-accent transition-colors">Dispatch</span>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-accent group-hover/btn:translate-x-4 transition-all">
                      <ArrowUpRight size={20} className="text-white/40 group-hover/btn:text-accent" />
                    </div>
                  </button>
                </form>
             </div>
          </div>
        </div>
      </div>

      <footer className="mt-64 text-center border-t border-white/5 pt-20">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[1em]">Handcrafted by Ilyas Nour © 2026</p>
      </footer>
    </section>
  );
};
