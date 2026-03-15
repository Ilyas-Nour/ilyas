import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const activeTab = useActiveSection(['home', 'about', 'expertise', 'projects', 'contact']);
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const initialTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark';
    setActiveTheme(initialTheme);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          {/* Brand / Logo */}
          <a href="#" className="flex flex-col group">
            <span className="font-serif italic text-2xl md:text-3xl text-[var(--color-text)] leading-none transform group-hover:skew-x-2 transition-transform duration-500">Ilyas.</span>
          </a>

          {/* Navigation Links - Desktop Only */}
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
                <span className="artistic-link" data-text={item.name}>
                  <span className="artistic-link-text">{item.name}</span>
                </span>
              </a>
             ))}
          </div>

          {/* Action Controls */}
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
      </motion.nav>

    </>
  );
};

export default Navbar;
