import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle Component
 * A persistent UI controller that enables users to switch between 
 * 'light' and 'dark' visual modes.
 * Uses Framer Motion for a vertical "slide-and-fade" icon transition.
 */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-[1000] p-4 rounded-full glass flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle visual theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon - Visible in Dark Mode */}
        <motion.div
          animate={{
            y: theme === 'dark' ? 0 : 30,
            opacity: theme === 'dark' ? 1 : 0
          }}
          className="absolute inset-0 flex items-center justify-center text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M18.75 12a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
          </svg>
        </motion.div>

        {/* Moon Icon - Visible in Light Mode */}
        <motion.div
          animate={{
            y: theme === 'light' ? 0 : -30,
            opacity: theme === 'light' ? 1 : 0
          }}
          className="absolute inset-0 flex items-center justify-center text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
};
