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
      setTimeout(onComplete, 800); 
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-transparent overflow-hidden pointer-events-none">
      {/* Background Panels (Shutter) */}
      <motion.div
        initial={{ y: 0 }}
        animate={isReady ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={isReady ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--color-bg)] z-50"
      />

      {/* Content Layer */}
      <div className="relative z-[60] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 0, scale: 0.9 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl text-[var(--color-text)] tracking-tight" style={{ fontFamily: 'var(--font-signature)' }}>
            Ilyas Nour
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroLoader;
