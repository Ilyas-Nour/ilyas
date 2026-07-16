import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 w-full h-[50vh] min-h-[300px]">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 border-2 border-t-[var(--color-accent)] border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear"
          }}
        />
        
        {/* Second outer ring rotating opposite way */}
        <motion.div
          className="absolute inset-1 border border-b-[var(--color-text)] border-t-transparent border-r-transparent border-l-transparent rounded-full opacity-30"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />

        {/* Central pulsing core */}
        <motion.div
          className="w-3.5 h-3.5 bg-[var(--color-accent)] rounded-full"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Futuristic status text */}
      <motion.span
        className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text)]/40"
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        Resolving Grid
      </motion.span>
    </div>
  );
};
