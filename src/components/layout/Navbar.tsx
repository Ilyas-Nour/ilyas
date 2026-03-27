import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollProgress } from '../../context/ScrollProgressContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, Language } from '../../context/LanguageContext';

/**
 * Navbar Component
 * High-fidelity navigation interface with dynamic theme switching 
 * and prismatic text reveal effects.
 */
const NavLinks = React.memo(({ activeTab }: { activeTab: string }) => {
  const { t } = useLanguage();
  
  const links = [
    { name: t('nav.home'), id: 'home' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.skills'), id: 'skills' },
    { name: t('nav.projects'), id: 'projects' }
  ];

  return (
    <div className="hidden md:flex items-center gap-10 font-heading font-medium text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
       {links.map(item => (
        <motion.a 
          key={item.id} 
          href={`#${item.id}`} 
          className={`navbar-link group/link ${activeTab === item.id ? 'active' : ''}`}
          initial="initial"
          whileHover="hover"
          aria-label={item.name}
        >
          <div className="relative overflow-hidden flex items-center">
             {/* Primary Layer */}
             <div className="flex">
              {item.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: 0 },
                    hover: { y: '-120%' }
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                    delay: i * 0.02
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* Secondary Hover Layer */}
            <div className="absolute inset-0 flex">
              {item.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: '120%' },
                    hover: { y: 0 }
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                    delay: i * 0.02
                  }}
                  className="inline-block text-[var(--color-text)]"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.a>
       ))}
    </div>
  );
});

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, isVisible } = useScrollProgress();
  const { theme, toggleTheme } = useTheme();
  
  // Custom hook to track which section is currently centered in the viewport
  const activeTab = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setIsLangOpen(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  
  useEffect(() => {
    /**
     * Handle Scroll Events
     * Triggers the "glass" look when the user scrolls away from the top.
     */
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{ position: 'fixed' }}
        className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-700 px-6 md:px-12 py-6 ${
          scrolled ? 'glass py-4' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Identity Block - Upgraded with Kinetic Typography & Signature Reveal */}
          <motion.a 
            href="#home" 
            className="relative flex items-center group overflow-visible py-2"
            initial="initial"
            whileHover="hover"
          >
            <div className="relative font-serif italic text-2xl md:text-3xl leading-none flex items-baseline gap-0">
              {"Ilyas.".split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    initial: { y: 0, opacity: 1 },
                    hover: { 
                      y: [-2, 2, -2],
                      transition: { 
                        repeat: Infinity, 
                        duration: 1.5, 
                        delay: index * 0.1,
                        ease: "easeInOut"
                      } 
                    }
                  }}
                  className="inline-block text-[var(--color-text)] relative z-20"
                >
                  {char}
                </motion.span>
              ))}

              {/* Signature Flourish Reveal */}
              <motion.span
                variants={{
                  initial: { opacity: 0, x: -10, scale: 0.8 },
                  hover: { opacity: 0.4, x: 5, scale: 1.2 }
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-4 -top-2 font-signature text-3xl text-[var(--color-accent)] pointer-events-none select-none z-10 blur-[1px] group-hover:blur-0 transition-all duration-700"
              >
                Ilyas
              </motion.span>
            </div>

            {/* Dynamic Underline System */}
            <motion.div 
               className="absolute bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-text)] to-transparent"
               variants={{
                 initial: { scaleX: 0, opacity: 0 },
                 hover: { scaleX: 1, opacity: 0.6 }
               }}
               transition={{ duration: 0.5, ease: "circOut" }}
            />
            
            {/* Prismatic Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-[var(--color-accent)] rounded-full blur-2xl opacity-0 -z-10 group-hover:opacity-10"
              variants={{
                hover: { scale: [1, 1.5, 1], opacity: 0.1 }
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.a>

          {/* Navigation Links - Desktop Only */}
          <NavLinks activeTab={activeTab} />

          {/* Action Interface Block */}
          <div className="flex items-center gap-4 md:gap-8">
             {/* Language Switcher Interface - Upgraded with Flags & Dropdown */}
             <div className="hidden sm:block relative px-3 py-1.5 border border-[var(--color-border)] rounded-sm bg-[var(--color-bg)]/50 backdrop-blur-sm z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen(!isLangOpen);
                  }}
                  className="flex items-center gap-2 group"
                >
                  <span className="text-[10px] font-mono font-bold text-[var(--color-text)] uppercase tracking-widest">
                    {language}
                  </span>
                  <span className={`text-[8px] transition-transform duration-500 ${isLangOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-2 left-0 w-full min-w-[100px] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl overflow-hidden rounded-sm"
                    >
                      {(['en', 'fr', 'es'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`w-full flex items-center px-4 py-3 text-left hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-300 ${
                            language === lang ? 'bg-[var(--color-text)]/5 opacity-40' : ''
                          }`}
                        >
                          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em]">
                            {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'Español'}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             <button 
               onClick={toggleTheme}
               className="relative w-10 h-10 flex items-center justify-center group"
               title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
               aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
               <motion.div 
                 className="absolute inset-0 border border-[var(--color-border)] rounded-sm group-hover:rotate-90 transition-all duration-700"
               />
               <span className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-500 mt-0.5">
                 {theme === 'dark' ? '☼' : '☾'}
               </span>
             </button>
             
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[10001]"
               aria-label="Toggle Navigation Menu"
               aria-expanded={isMenuOpen}
             >
               <motion.span 
                 animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                 className="w-6 h-0.5 bg-[var(--color-text)] block transition-transform duration-500"
               />
               <motion.span 
                 animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                 className="w-6 h-0.5 bg-[var(--color-text)] block transition-all duration-500"
               />
               <motion.span 
                 animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                 className="w-6 h-0.5 bg-[var(--color-text)] block transition-transform duration-500"
               />
             </button>

             <motion.a 
               href="#contact" 
               className="hidden sm:flex group relative px-10 py-3.5 items-center justify-center"
               whileHover="hover"
               initial="initial"
             >
               {/* Stability Wrapper - ensures the hit area is defined by the padding/size of this element */}
               <div className="absolute inset-0 pointer-events-none overflow-visible">
                 {/* Dynamic Corner Accents */}
                 <motion.div 
                   className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-text)] opacity-40 group-hover:opacity-100"
                   variants={{ initial: { x: 0, y: 0 }, hover: { x: -8, y: -8, scale: 1.2 } }}
                   transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                 />
                 <motion.div 
                   className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-text)] opacity-40 group-hover:opacity-100"
                   variants={{ initial: { x: 0, y: 0 }, hover: { x: 8, y: -8, scale: 1.2 } }}
                   transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                 />
                 <motion.div 
                   className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-text)] opacity-40 group-hover:opacity-100"
                   variants={{ initial: { x: 0, y: 0 }, hover: { x: -8, y: 8, scale: 1.2 } }}
                   transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                 />
                 <motion.div 
                   className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-text)] opacity-40 group-hover:opacity-100"
                   variants={{ initial: { x: 0, y: 0 }, hover: { x: 8, y: 8, scale: 1.2 } }}
                   transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                 />

                 {/* Main Border Layer */}
                 <motion.div 
                   className="absolute inset-0 border border-[var(--color-border)]"
                   variants={{ hover: { borderColor: 'var(--color-text)', scale: 1.05 } }}
                   transition={{ duration: 0.4 }}
                 />
                 
                 {/* High-Contrast Fill Transition */}
                 <motion.div 
                   className="absolute inset-0 bg-[var(--color-text)]"
                   variants={{ initial: { clipPath: 'inset(100% 0 0 0)' }, hover: { clipPath: 'inset(0% 0 0 0)' } }}
                   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 />

                 {/* Subtle Scanning Light Effect */}
                 <motion.div 
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
                   style={{ opacity: theme === 'dark' ? 0.3 : 0.1 }}
                 />
               </div>

               <span className="relative z-10 font-heading font-black text-[10px] uppercase tracking-[0.4em] text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors duration-500 pointer-events-none">
                 {t('nav.contact')}
               </span>
             </motion.a>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full h-screen bg-[var(--color-bg)] z-[10000] flex flex-col items-center justify-center gap-12 pt-20"
            >
              {[
                { name: t('nav.home'), id: 'home' },
                { name: t('nav.about'), id: 'about' },
                { name: t('nav.skills'), id: 'skills' },
                { name: t('nav.projects'), id: 'projects' },
                { name: t('nav.contact'), id: 'contact' }
              ].map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl font-serif italic text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <div className="flex gap-4 mt-8">
                {(['en', 'fr', 'es'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-6 py-3 flex items-center text-xs font-mono border rounded-sm transition-all ${
                      language === lang 
                        ? 'bg-[var(--color-text)] text-[var(--color-bg)] border-transparent' 
                        : 'text-[var(--color-text-muted)] border-[var(--color-border)] bg-transparent'
                    }`}
                  >
                    <span>{lang.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              
              <div className="absolute bottom-12 flex gap-8 opacity-40">
                 <span className="font-mono text-[9px] uppercase tracking-widest">ilyasnour.com</span>
                 <span className="font-mono text-[9px] uppercase tracking-widest">© 2026</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Bar for Projects */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none overflow-hidden">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: progress, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--color-accent)] origin-left z-50"
                style={{ scaleX: progress }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* SVG Filters for Liquid Prismatic Distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Navbar;
