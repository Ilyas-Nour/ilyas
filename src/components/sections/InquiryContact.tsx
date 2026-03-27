import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { InsaneContactButton } from '../ui/InsaneContactButton';
import { useLanguage } from '../../context/LanguageContext';

/**
 * InquiryContact Section Component
 * Handles user inquiries via a secure Formspree integration.
 * Includes real-time validation feedback and submission state management.
 */
export const InquiryContact = React.memo(() => {
  const { t } = useLanguage();
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

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.25], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.25], [100, 0]);

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 md:py-32 flex flex-col justify-center bg-[var(--color-bg)] px-6 relative">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <header className="mb-12 md:mb-16">
            <div className="relative select-none">
              <motion.h2 
                style={{ x: xLeft }}
                className="text-[clamp(3.5rem,15vw,12vh)] font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-[0.8]"
              >
                {t('contact.title1')}
              </motion.h2>
              <motion.h2 
                style={{ x: xRight, fontFamily: 'var(--font-signature)' }}
                className="text-[clamp(4.5rem,18vw,14vh)] leading-[0.8] -mt-[2vh] md:-mt-[3vh] font-normal text-[var(--color-text)] opacity-80"
              >
                {t('contact.title2')}
              </motion.h2>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
             {/* Form Interface Layer */}
             <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Name Input Block */}
                        <div className="space-y-4">
                           <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold block transition-colors">{t('contact.name_label')}</label>
                           <input 
                             required
                             type="text" 
                             placeholder={t('contact.name_placeholder')} 
                             value={formData.name}
                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                             className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/30" 
                           />
                        </div>
                        {/* Email Input Block */}
                        <div className="space-y-4">
                           <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold block transition-colors">{t('contact.email_label')}</label>
                           <input 
                             required
                             type="email" 
                             placeholder={t('contact.email_placeholder')} 
                             value={formData.email}
                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                             className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/30" 
                           />
                        </div>
                    </div>

                    {/* Message Textarea Block */}
                    <div className="space-y-4">
                       <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold block transition-colors">{t('contact.message_label')}</label>
                       <textarea 
                         required
                         rows={4} 
                         placeholder={t('contact.message_placeholder')} 
                         value={formData.message}
                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                         className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-xl font-serif italic text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)]/30 resize-none" 
                       />
                    </div>

                    {/* Action & Feedback Layer */}
                    <div className="pt-8 flex items-center gap-8">
                       <InsaneContactButton 
                         status={status}
                         disabled={status === 'sending' || status === 'success'}
                       >
                          {status === 'sending' ? t('contact.sending_btn') : status === 'success' ? t('contact.sent_btn') : t('contact.send_btn')}
                       </InsaneContactButton>

                       {/* Status Notifications */}
                       <AnimatePresence>
                         {status === 'error' && (
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0 }}
                             className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest"
                           >
                             {t('contact.failed')}
                           </motion.span>
                         )}
                         {status === 'success' && (
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0 }}
                             className="text-[var(--color-accent)] font-mono text-[10px] uppercase tracking-widest"
                           >
                             {t('contact.thanks')}
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
                          { name: 'GitHub', url: 'https://github.com/Ilyas-Nour', aria: 'Follow Ilyas Nour on GitHub' },
                          { name: 'LinkedIn', url: 'https://linkedin.com/in/ilyas-nour', aria: 'Connect with Ilyas Nour on LinkedIn' },
                          { name: 'Email', url: 'mailto:ilyasnourelislam@gmail.com', aria: 'Send an email to Ilyas Nour' }
                        ].map(node => (
                          <a 
                            key={node.name} 
                            href={node.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex justify-between items-center group footer-link"
                            aria-label={node.aria}
                          >
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
                        {t('contact.location')} <br />
                        {t('contact.working')}
                     </p>
                  </div>
               </div>
          </div>
        </div>

        {/* Structured Data for Search Engine Optimization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ilyas Nour",
            "jobTitle": "Full-Stack Web Developer",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Morocco"
            },
            "email": "ilyasnourelislam@gmail.com",
            "url": "https://ilyasnour.com",
            "sameAs": [
              "https://github.com/Ilyas-Nour",
              "https://linkedin.com/in/ilyas-nour"
            ]
          })}
        </script>
      </div>
    </section>
  );
});

export default InquiryContact;
