import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches && !document.documentElement.classList.contains('light'));
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-[100] px-4 py-2 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
    >
      {isDark ? 'Light' : 'Dark'} Mode
    </motion.button>
  );
};
