import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BoutiqueIntroProps {
  onComplete: () => void;
}

export const BoutiqueIntro = ({ onComplete }: BoutiqueIntroProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1000);
    const timer2 = setTimeout(() => setPhase(2), 2600);
    const timer3 = setTimeout(() => onComplete(), 3800);

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
      className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Editorial Scanning Line */}
      <motion.div
        initial={{ top: "-10%", opacity: 0 }}
        animate={{ 
          top: phase >= 1 ? "110%" : "-10%",
          opacity: phase >= 1 ? [0, 1, 0] : 0 
        }}
        transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 w-full h-[1px] bg-foreground/30 z-20"
      />

      {/* Variable Focal Reveal */}
      <motion.div
        animate={{ 
          filter: phase === 0 ? "blur(30px)" : "blur(0px)",
          opacity: phase === 0 ? 0 : 1,
          scale: phase === 0 ? 0.9 : 1
        }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 text-center"
      >
        <span className="text-[9px] font-mono text-foreground/20 tracking-[1.5em] uppercase block mb-6">
          Established Portfolio
        </span>
        <h1 className="text-6xl md:text-9xl font-display font-light italic text-foreground tracking-tightest leading-none">
          ILYAS<span className="font-black not-italic">NOUR</span>
        </h1>
        <div className="mt-12 overflow-hidden h-px w-32 bg-foreground/10 mx-auto relative">
           <motion.div 
             initial={{ x: "-100%" }}
             animate={{ x: "100%" }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-foreground/60 w-1/2"
           />
        </div>
      </motion.div>

      {/* Grain Overlay */}
      <div className="noise-texture opacity-[0.05] pointer-events-none" />
      
      {/* Background Mask */}
      <motion.div
        animate={{ 
          y: phase === 2 ? "-100%" : "0%"
        }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-[#050505] z-0"
      />
    </motion.div>
  );
};
