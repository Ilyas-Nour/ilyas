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
      setTimeout(onComplete, 800); // Shutter duration
    }, 1800); // Total wait time

    return () => clearTimeout(timer);
  }, [onComplete]);

  const name = "ILYAS NOUR";

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-transparent overflow-hidden pointer-events-none">
      {/* Background Panels (Shutter) */}
      <motion.div
        initial={{ y: 0 }}
        animate={isReady ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050507] z-50 border-b border-white/5"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={isReady ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050507] z-50 border-t border-white/5"
      />

      {/* Content Layer */}
      <div className="relative z-50 flex flex-col items-center justify-center space-y-8">
        {/* Cinematic Name Reveal */}
        <div className="overflow-hidden py-4">
          <motion.h1
            className="text-6xl md:text-8xl font-display italic text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={isReady ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.05, 
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 0.4, delay: i * 0.05 }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* HUD Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 0, y: 20 } : { opacity: 0.4, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center space-y-2"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-white/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white">Digital_Artisan_V4</span>
            <div className="h-px w-8 bg-white/20" />
          </div>
          <div className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
            Synchronizing // Personnel_Dossier_Hash_0x94B
          </div>
        </motion.div>

        {/* Central Scanline (Visual Interest) */}
        {!isReady && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-[1px] bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent)]"
          />
        )}
      </div>

      {/* Atmospheric Scanning Overlay */}
      <motion.div 
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none z-[60] bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px]"
      />
    </div>
  );
};

export default IntroLoader;
