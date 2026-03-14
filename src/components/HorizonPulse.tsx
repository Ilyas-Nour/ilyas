import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HorizonPulseProps {
  onComplete: () => void;
}

export const HorizonPulse = ({ onComplete }: HorizonPulseProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 800);
    const timer2 = setTimeout(() => setPhase(2), 2500);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100000] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Horizontal Scanning Beam */}
      <motion.div
        initial={{ top: "-10%", opacity: 0 }}
        animate={{ 
          top: phase >= 1 ? "110%" : "-10%",
          opacity: phase >= 1 ? [0, 1, 0] : 0 
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_50px_rgba(45,212,191,0.8)] z-20"
      />

      {/* Atmospheric Focal Shift */}
      <div className="relative z-10 text-center space-y-8">
        <motion.div
          animate={{ 
            filter: phase === 0 ? "blur(20px)" : "blur(0px)",
            opacity: phase === 0 ? 0 : 1,
            scale: phase === 0 ? 0.8 : 1
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-mono text-accent tracking-[1em] uppercase block mb-4">
            Initializing Masterpiece
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tightest leading-none">
            ZENITH
          </h1>
        </motion.div>

        <motion.div
          animate={{ opacity: phase >= 1 ? 0.4 : 0 }}
          className="h-[1px] w-24 bg-white mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-accent"
          />
        </motion.div>
      </div>

      {/* Prismatic Reveal Flash */}
      <motion.div
        animate={{ 
          opacity: phase === 2 ? [0, 1, 0] : 0,
          scale: phase === 2 ? [1, 2, 3] : 1
        }}
        className="absolute inset-0 bg-accent/10 border-y border-accent/20 z-0"
      />

      <div className="noise-texture opacity-[0.05]" />
    </motion.div>
  );
};
