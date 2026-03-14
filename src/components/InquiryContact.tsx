import React from 'react';
import { motion } from 'framer-motion';
import { KineticButton } from './KineticButton';

export const InquiryContact: React.FC = () => {
  return (
    <section id="contact" className="relative py-40 px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-20 text-center">
            <h2 className="text-6xl md:text-9xl font-serif italic text-[var(--color-text)] leading-[0.8]">
              Let's <br /> 
              <span className="opacity-40">Get in Touch.</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
             {/* Form Interface */}
             <div className="lg:col-span-8">
                <form className="space-y-16">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-4">
                         <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] block">Your Name</label>
                         <input type="text" placeholder="Ilyas Nour" className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/20" />
                      </div>
                      <div className="space-y-4">
                         <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] block">Email Address</label>
                         <input type="email" placeholder="hello@studio.com" className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/20" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] block">Your Message</label>
                      <textarea rows={4} placeholder="Tell me about your vision..." className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/20 resize-none" />
                   </div>

                   <div className="pt-8 flex">
                      <KineticButton 
                        variant="primary"
                        onClick={() => {}}
                        icon={<span>✉</span>}
                      >
                         Dispatch Message
                      </KineticButton>
                   </div>
                </form>
             </div>

             {/* Social Registry */}
             <div className="lg:col-span-4 space-y-12">
                <div className="space-y-8">
                   <div className="flex flex-col gap-8">
                      {['GitHub', 'LinkedIn', 'Twitter'].map(node => (
                        <a key={node} href="#" className="flex justify-between items-center group">
                           <span className="font-serif italic text-3xl text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">{node}</span>
                           <div className="w-10 h-10 border border-[var(--color-border)] rounded-full flex items-center justify-center group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-all duration-500">
                              ↗
                           </div>
                        </a>
                      ))}
                   </div>
                </div>

                <div className="space-y-4 opacity-50 text-center lg:text-left">
                   <p className="font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                      Based Globally. <br />
                      Working Remotely.
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
