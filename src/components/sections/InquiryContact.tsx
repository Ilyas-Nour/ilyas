import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KineticButton } from '../ui/KineticButton';

/**
 * InquiryContact Section Component
 * Handles user inquiries via a secure Formspree integration.
 * Includes real-time validation feedback and submission state management.
 */
export const InquiryContact: React.FC = () => {
  // state: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  /**
   * Handle Form Submission
   * Dispatches data to Formspree endpoint and updates UI state accordingly.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      // Integration with Formspree (mnjgbpyy)
      const response = await fetch('https://formspree.io/f/mnjgbpyy', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="min-h-screen py-32 flex flex-col justify-center bg-transparent px-6">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <header className="mb-12 md:mb-16">
            <h3 className="text-5xl md:text-8xl font-heading font-black tracking-tighter text-[var(--color-text)] uppercase leading-[0.8]">
              Get in <br /> <span className="opacity-20 font-signature font-normal" style={{ fontFamily: 'var(--font-signature)' }}>Touch.</span>
            </h3>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
             {/* Form Interface Layer */}
             <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Name Input Block */}
                        <div className="space-y-4">
                           <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold block transition-colors">Your Name</label>
                           <input 
                             required
                             type="text" 
                             placeholder="Ilyas Nour" 
                             value={formData.name}
                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                             className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/30" 
                           />
                        </div>
                        {/* Email Input Block */}
                        <div className="space-y-4">
                           <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold block transition-colors">Email Address</label>
                           <input 
                             required
                             type="email" 
                             placeholder="hello@studio.com" 
                             value={formData.email}
                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                             className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/30" 
                           />
                        </div>
                    </div>

                    {/* Message Textarea Block */}
                    <div className="space-y-4">
                       <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold block transition-colors">Your Message</label>
                       <textarea 
                         required
                         rows={4} 
                         placeholder="Tell me about your vision..." 
                         value={formData.message}
                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                         className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/30 resize-none" 
                       />
                    </div>

                    {/* Action & Feedback Layer */}
                    <div className="pt-8 flex items-center gap-8">
                       <KineticButton 
                         type="submit"
                         variant="primary"
                         disabled={status === 'sending' || status === 'success'}
                         icon={<span className={status === 'sending' ? 'animate-pulse' : ''}>{status === 'success' ? '✓' : '✉'}</span>}
                       >
                          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send Message'}
                       </KineticButton>

                       {/* Status Notifications */}
                       <AnimatePresence>
                         {status === 'error' && (
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0 }}
                             className="text-red-500 font-mono text-[10px] uppercase tracking-widest"
                           >
                             Submission Failed. Try again?
                           </motion.span>
                         )}
                         {status === 'success' && (
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0 }}
                             className="text-[var(--color-accent)] font-mono text-[10px] uppercase tracking-widest"
                           >
                             Received. Thanks.
                           </motion.span>
                         )}
                       </AnimatePresence>
                    </div>
                 </form>
              </div>

              {/* Social Registry Block */}
              <div className="lg:col-span-4 space-y-12">
                 <div className="space-y-8">
                    <div className="flex flex-col gap-8">
                       {[
                         { name: 'GitHub', url: 'https://github.com/Ilyas-Nour' },
                         { name: 'LinkedIn', url: 'https://linkedin.com/in/ilyas-nour' },
                         { name: 'Email', url: 'mailto:ilyasnourelislam@gmail.com' }
                       ].map(node => (
                         <a key={node.name} href={node.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group footer-link">
                            <span className="font-serif italic text-3xl transition-colors">{node.name}</span>
                            <div className="w-10 h-10 border border-[var(--color-border)] rounded-full flex items-center justify-center group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-all duration-500">
                               ↗
                            </div>
                         </a>
                       ))}
                    </div>
                 </div>

                 {/* Operational Context */}
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
