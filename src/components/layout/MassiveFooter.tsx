import React from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLanguage } from '../../context/LanguageContext';

/**
 * MassiveFooter Component
 * A large-scale, high-fidelity footer designed to provide a 
 * definitive psychological closure to the site experience.
 * Features massive signature branding and artistic link arrays.
 */
export const MassiveFooter = React.memo(() => {
  const activeTab = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[var(--color-bg)] pt-32 pb-12 px-6 overflow-hidden border-t border-[var(--color-border)] relative transition-colors duration-500">
      <div className="w-full relative">
        {/* Massive Background Signature - Refined to prevent clipping and provide depth */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-x-0 -bottom-20 select-none pointer-events-none z-0 flex justify-center w-full px-[5vw]"
        >
          <h2 className="text-[clamp(12rem,40vw,22vw)] text-center whitespace-nowrap text-[var(--color-text)] opacity-[0.05] leading-none" style={{ fontFamily: 'var(--font-signature)' }}>
             Ilyas Nour
          </h2>
        </motion.div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-0">
             {/* Navigation Section (Index) */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase">{t('footer.index')}</h4>
              <nav className="flex flex-col gap-3">
                  {[
                    { name: t('nav.home'), id: 'home' },
                    { name: t('nav.about'), id: 'about' },
                    { name: t('nav.skills'), id: 'skills' },
                    { name: t('nav.projects'), id: 'projects' }
                  ].map(link => (
                    <a 
                      key={link.id}
                      href={`#${link.id}`} 
                      className="artistic-nav-link group overflow-hidden"
                    >
                      <div className="artistic-nav-inner relative flex flex-col transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-1/2">
                        <span className="text-2xl md:text-3xl font-serif italic text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-500 py-2 md:py-1">
                          {link.name}
                        </span>
                        <span className="text-2xl md:text-3xl font-serif italic text-[var(--color-accent)] py-2 md:py-1">
                          {link.name}
                        </span>
                      </div>
                    </a>
                  ))}
              </nav>
            </div>

            {/* Social Connection Section */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase">{t('footer.social')}</h4>
              <div className="flex flex-wrap gap-8">
                {[
                  { name: 'Github', url: 'https://github.com/Ilyas-Nour' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ilyasnour/' },
                  { name: 'X', url: 'https://x.com/ilyas__nour' }
                ].map(social => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`${t('footer.social')} - ${social.name}`}
                    className="group flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest">{social.name}</span>
                    <span className="text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Studio Credits Section */}
            <div className="space-y-4 md:text-right flex flex-col justify-end h-full">
              <p className="font-mono text-[10px] text-[var(--color-text-muted)] leading-relaxed uppercase tracking-widest">
                {t('footer.designed')} <br />
                {t('footer.by')} Ilyas Nour<br />
                © 2026 {t('footer.copy')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
});

export default MassiveFooter;
