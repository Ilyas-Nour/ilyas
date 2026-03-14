import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const ASCII_ART = `
 █████  ██████  ████████ ██ ███████  █████  ███    ██ 
██   ██ ██   ██    ██    ██ ██      ██   ██ ████   ██ 
███████ ██████     ██    ██ ███████ ███████ ██ ██  ██ 
██   ██ ██   ██    ██    ██      ██ ██   ██ ██  ██ ██ 
██   ██ ██   ██    ██    ██ ███████ ██   ██ ██   ████ 
`;

const GLITCH_LOGS = [
  "[SYSTEM] INITIALIZING ARTISAN_V1.0...",
  "[KERNEL] CURATING COLOR PALETTE...",
  "[DATA] REFINING TYPOGRAPHIC FLOW...",
  "[CRAFTSMAN] ASSEMBLING DIGITAL CANVAS...",
  "[ARTISAN] READY: WELCOME TO THE CREATION."
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
      exit={{ 
        opacity: [1, 0.8, 1, 0], 
        scale: [1, 1.05, 0.95, 1.2],
        filter: ["blur(0px)", "blur(10px)", "blur(5px)", "blur(40px)"],
      }}
      transition={{ duration: 1.2, times: [0, 0.2, 0.4, 1], ease: "easeInOut" }}
      className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center font-mono selection:bg-accent selection:text-background overflow-hidden"
    >
      {/* CRT Scanline & Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-1 bg-[length:100%_2px,3px_100%]" />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            y: ["0%", "100%"]
          }}
          transition={{ duration: 0.1, repeat: Infinity, y: { duration: 3, repeat: Infinity, ease: "linear" } }}
          className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')] mix-blend-overlay"
        />
      </div>

      {/* Shutdown Flicker Mask */}
      <motion.div 
        animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        className="absolute inset-0 bg-white z-40 pointer-events-none"
      />

      <div className="max-w-4xl w-full px-6 space-y-16 relative z-10">
        {/* Cinematic Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="text-[10px] text-accent font-bold tracking-[0.3em] uppercase">System_Reboot_Sequence</div>
            <div className="text-[14px] text-white/80 font-bold tracking-tighter">ARTISAN_CORE [V.1.0.0]</div>
          </div>
          <div className="text-right">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[10px] text-accent font-mono uppercase tracking-widest"
            >
              Protocol_Active
            </motion.div>
          </div>
        </div>

        {/* Progress Bar with Enhanced Glow */}
        <div className="space-y-4">
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/40 font-mono">
            <span>Loading_Resources</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              [Executing]
            </motion.span>
          </div>
          <div className="w-full h-1 bg-white/5 relative overflow-hidden rounded-full">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_30px_rgba(45,212,191,1)]"
            />
          </div>
        </div>

        {/* ASCII Container with Chromatic Aberration */}
        <AnimatePresence>
          {showAscii && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="relative py-12"
            >
              <pre className="text-[0.55vw] leading-none text-white/40 select-none hidden md:block text-center font-bold tracking-tighter filter grayscale">
                {ASCII_ART}
              </pre>
              <motion.pre 
                animate={{ x: [-1, 1, -1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 text-[0.55vw] leading-none text-red-500/20 select-none hidden md:block text-center font-bold tracking-tighter pointer-events-none"
              >
                {ASCII_ART}
              </motion.pre>
              <motion.pre 
                animate={{ x: [1, -1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 0.12, repeat: Infinity }}
                className="absolute inset-0 text-[0.55vw] leading-none text-blue-500/20 select-none hidden md:block text-center font-bold tracking-tighter pointer-events-none"
              >
                {ASCII_ART}
              </motion.pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Console Logs with HUD elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          <div className="space-y-3">
            {GLITCH_LOGS.slice(0, logIndex + 1).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <span className="text-white/20 text-[9px] w-8">0x0{i}</span>
                <span className={`text-[10px] font-bold tracking-widest uppercase ${i === GLITCH_LOGS.length - 1 ? 'text-accent' : 'text-white/60'}`}>
                  {log}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="hidden md:block p-4 border border-white/5 bg-white/[0.02] rounded-lg">
            <div className="text-[8px] uppercase tracking-widest text-white/30 mb-4 flex justify-between">
              <span>Memory_Stream</span>
              <span>Buffer: 1024KB</span>
            </div>
            <div className="grid grid-cols-4 gap-2 h-20 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [10, 30, 15, 40, 10] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className="w-full bg-accent/10 border-t border-accent/30"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[1000px] h-[1000px] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0"
      />
    </motion.div>
  );
};
