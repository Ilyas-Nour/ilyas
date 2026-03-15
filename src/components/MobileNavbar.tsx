import React from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

export const MobileNavbar: React.FC = () => {
  const activeTab = useActiveSection(['home', 'about', 'expertise', 'projects', 'contact']);

  const navItems = [
    { name: 'Home', id: 'home', icon: '◈' },
    { name: 'About', id: 'about', icon: '◎' },
    { name: 'Expert', id: 'expertise', icon: '⌬' },
    { name: 'Works', id: 'projects', icon: '⧉' },
    { name: 'Inquire', id: 'contact', icon: '✦' }
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] md:hidden w-[90vw] max-w-sm"
    >
      <div className="glass rounded-2xl border border-[var(--color-border)] px-4 py-3 flex justify-between items-center shadow-2xl backdrop-blur-xl bg-[rgba(var(--color-bg-rgb),0.5)]">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="relative flex flex-col items-center gap-1 group"
          >
            <span className={`text-xl transition-all duration-500 ${activeTab === item.id ? 'text-[var(--color-accent)] scale-110' : 'text-[var(--color-text-muted)] opacity-50'}`}>
              {item.icon}
            </span>
            <span className={`font-mono text-[8px] uppercase tracking-widest transition-all duration-500 ${activeTab === item.id ? 'text-[var(--color-text)] opacity-100' : 'text-[var(--color-text-muted)] opacity-30'}`}>
              {item.name}
            </span>
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="mobile-active-glint"
                className="absolute -inset-2 bg-[var(--color-accent)]/5 rounded-xl -z-10 blur-sm"
              />
            )}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNavbar;
