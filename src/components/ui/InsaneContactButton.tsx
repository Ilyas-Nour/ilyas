import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface InsaneContactButtonProps {
  children: React.ReactNode;
  status: 'idle' | 'sending' | 'success' | 'error';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

/**
 * Synthetic Success Chime Utility
 * Uses Web Audio API to generate a high-fidelity sound without external assets.
 */
const playSuccessSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.1); // E6
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  } catch (e) {
    console.error('AudioContext failed', e);
  }
};

export const InsaneContactButton: React.FC<InsaneContactButtonProps> = ({ 
  children, 
  status,
  type = 'submit',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  
  // Magnetic Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  // Prismatic Rotation
  const rotateX = useTransform(mouseYSpring, [-30, 30], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-30, 30], [-10, 10]);

  useEffect(() => {
    if (status === 'success') {
      playSuccessSound();
    }
  }, [status]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull (stronger for "insane" feel)
    const pullX = (e.clientX - centerX) * 0.35;
    const pullY = (e.clientY - centerY) * 0.35;
    
    x.set(pullX);
    y.set(pullY);

    // CSS Glow Tracker
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    buttonRef.current.style.setProperty('--x', `${mouseX}px`);
    buttonRef.current.style.setProperty('--y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        x: mouseXSpring, 
        y: mouseYSpring,
        rotateX,
        rotateY,
        perspective: 1000
      }}
      className={`relative px-12 py-5 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-[11px] uppercase tracking-[0.3em] overflow-hidden group transition-all duration-300 ${disabled ? 'opacity-50 grayscale' : 'hover:scale-105 active:scale-95'}`}
    >
      {/* Prismatic Glow Layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(var(--color-accent-rgb), 0.4), transparent 40%)`
        }}
      />

      {/* Internal "Glitch" Content Wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 font-bold"
          >
            {status === 'idle' && (
              <>
                <span className="group-hover:skew-x-12 transition-transform duration-300">Start Transmission</span>
                <span className="text-[var(--color-accent)] animate-pulse">_</span>
                <span className="opacity-40 font-light translate-x-4 grayscale group-hover:translate-x-0 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">✉</span>
              </>
            )}
            {status === 'sending' && (
              <>
                <span className="italic">Processing...</span>
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="inline-block"
                >
                  ⚡
                </motion.span>
              </>
            )}
            {status === 'success' && (
              <span className="text-[var(--color-accent)] font-black tracking-[0.5em] scale-110">Received.</span>
            )}
            {status === 'error' && (
              <span className="text-red-500 font-bold">Resend?</span>
            )}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
         <motion.div 
           animate={{ y: ["-100%", "200%"] }}
           transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
           className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
         />
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};
