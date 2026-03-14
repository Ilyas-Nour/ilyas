import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      setTimeout(onComplete, 1000); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-transparent overflow-hidden pointer-events-none">
      {/* Background Panels (Shutter) */}
      <motion.div
        initial={{ y: 0 }}
        animate={isReady ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50 border-b border-[var(--color-border)]"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={isReady ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50 border-t border-[var(--color-border)]"
      />

      {/* Content Layer */}
      <div className="relative z-[60] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 0, scale: 0.95 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
          className="text-center space-y-6"
        >
          <h1 className="text-6xl md:text-8xl flex flex-col items-center leading-[0.9] tracking-tighter text-[var(--color-text)]">
            <span className="font-sans font-bold uppercase mb-2">Ilyas</span>
            <span className="font-serif italic font-light lowercase">Nour.</span>
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            <motion.div 
               animate={{ width: [0, 100, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="h-px bg-[var(--color-accent)]" 
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)] opacity-60">
              Digital Studio
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroLoader;
