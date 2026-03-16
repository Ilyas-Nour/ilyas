import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useProjectScroll } from '../../context/ProjectScrollContext';

/**
 * Navbar Component
 * High-fidelity navigation interface with dynamic theme switching 
 * and prismatic text reveal effects.
 */
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Custom hook to track which section is currently centered in the viewport
  const activeTab = useActiveSection(['home', 'about', 'expertise', 'projects', 'contact']);
  
  const { projectProgress } = useProjectScroll();

  // State for the theme toggle (syncs with document data-theme attribute)
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    /**
     * Handle Scroll Events
     * Triggers the "glass" look when the user scrolls away from the top.
     */
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initialize theme from document state or fallback to dark
    const initialTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark';
    setActiveTheme(initialTheme);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Toggle Global Theme
   * Updates state, localStorage, and document attributes for persistent dark/light mode.
   */
  const toggleTheme = () => {
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setActiveTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-700 px-6 md:px-12 py-6 ${
          scrolled ? 'glass py-4' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Identity Block */}
          <a href="#" className="flex flex-col group">
            <span className="font-serif italic text-2xl md:text-3xl text-[var(--color-text)] leading-none transform group-hover:skew-x-2 transition-transform duration-500">Ilyas.</span>
          </a>

          {/* Navigation Links - Prismatic Effect Registry */}
          <div className="hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-widest">
             {[
               { name: 'Home', id: 'home' },
               { name: 'About', id: 'about' },
               { name: 'Expertise', id: 'expertise' },
               { name: 'Projects', id: 'projects' }
             ].map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className={`navbar-link ${activeTab === item.id ? 'active' : ''}`}
              >
                <span className="prismatic-link">
                   {/* Characters are mapped individually for sequential animation delay */}
                  {item.name.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="prismatic-char"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </a>
             ))}
          </div>

          {/* Action Interface Block */}
          <div className="flex items-center gap-6">
             <button 
               onClick={toggleTheme}
               className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500"
               title={`Switch to ${activeTheme === 'dark' ? 'light' : 'dark'} mode`}
             >
               {activeTheme === 'dark' ? '☼' : '☾'}
             </button>
             
             <a 
               href="#contact" 
               className="hidden sm:flex px-6 py-2 border border-[var(--color-text)] rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-all duration-500"
             >
               Inquire
             </a>
          </div>
        </div>

        {/* Project Progress Bar - Only visible when in the projects section */}
        <AnimatePresence>
          {activeTab === 'projects' && (
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-accent)] origin-left shadow-[0_0_8px_var(--color-accent)]"
              style={{ scaleX: projectProgress }}
            />
          )}
        </AnimatePresence>
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
