import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const ASCII_ART = `
 ██████  ██ ███    ██  ██████  ██    ██ ██       █████  ██████  ██ ████████ ██    ██ 
██       ██ ████   ██ ██       ██    ██ ██      ██   ██ ██   ██ ██    ██     ██  ██  
██   ███ ██ ██ ██  ██ ██   ███ ██    ██ ██      ███████ ██████  ██    ██      ████   
██    ██ ██ ██  ██ ██ ██    ██ ██    ██ ██      ██   ██ ██   ██ ██    ██       ██    
 ██████  ██ ██   ████  ██████   ██████  ███████ ██   ██ ██   ██ ██    ██       ██    
`;

const GLITCH_LOGS = [
  "[SYSTEM] INITIALIZING SINGULARITY PROTOCOL...",
  "[KERNEL] LOADING PRISMATIC CORE...",
  "[DATA] RECONSTRUCTING NEURAL PATHWAYS...",
  "[WEAVER] SPINNING REALITY FABRIC...",
  "[SINGULARITY] STABILIZED: WELCOME TO THE VOID."
];

export const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const [logIndex, setLogIndex] = useState(0);
  const [showAscii, setShowAscii] = useState(false);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < GLITCH_LOGS.length - 1) return prev + 1;
        clearInterval(logInterval);
        return prev;
      });
    }, 400);

    const asciiTimeout = setTimeout(() => setShowAscii(true), 500);
    const endTimeout = setTimeout(() => onComplete(), 3500);

    return () => {
      clearInterval(logInterval);
      clearTimeout(asciiTimeout);
      clearTimeout(endTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100000] bg-background flex flex-col items-center justify-center font-mono selection:bg-accent selection:text-background overflow-hidden"
    >
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')] opacity-10 mix-blend-overlay" />

      <div className="max-w-4xl w-full px-6 space-y-12">
        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(45,212,191,0.5)]"
          />
        </div>

        {/* ASCII Container */}
        <AnimatePresence>
          {showAscii && (
            <motion.pre
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[0.6vw] leading-none text-white/40 select-none hidden md:block"
            >
              {ASCII_ART}
            </motion.pre>
          )}
        </AnimatePresence>

        {/* Console Logs */}
        <div className="space-y-2">
          {GLITCH_LOGS.slice(0, logIndex + 1).map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 group"
            >
              <span className="text-white/20 text-[10px]">0x0{i}</span>
              <span className={`text-[11px] font-bold tracking-widest ${i === GLITCH_LOGS.length - 1 ? 'text-accent' : 'text-white/60'}`}>
                {log}
              </span>
              {i === logIndex && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-4 bg-accent"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,4,8,0.9)_100%)] pointer-events-none" />
    </motion.div>
  );
};
