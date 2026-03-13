import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApertureIntroProps {
  onComplete: () => void;
}

export const ApertureIntro = ({ onComplete }: ApertureIntroProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
      setTimeout(onComplete, 1200);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100000] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Aperture Layer */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ clipPath: isRevealed ? 'circle(150% at 50% 50%)' : 'circle(10% at 50% 50%)' }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-accent/5 mix-blend-overlay"
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-4"
        >
          <h2 className="text-white font-display text-4xl font-light tracking-[0.2em] uppercase">
            Ilyas Nour
          </h2>
          <div className="h-px w-12 bg-white/20 mx-auto" />
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em]">
            Digital Artisan
          </p>
        </motion.div>
      </div>

      {/* Atmospheric Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')]" />
    </motion.div>
  );
};
