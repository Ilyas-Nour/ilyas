import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * ProjectButton Component
 * A premium, experience-driven button designed specifically for the Project Catalog.
 * Features:
 * 1. Magnetic Physics: Attracts the button toward the cursor.
 * 2. Dual-Layer Reveal: High-contrast text shift on hover.
 * 3. Theme Adaptability: Automatically swaps colors based on global text/bg variables.
 * 4. Micro-Interactions: Orbiting ring and icon displacement.
 */
interface ProjectButtonProps {
  link?: string;
  title: string;
}

export const ProjectButton: React.FC<ProjectButtonProps> = ({ link, title }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Motion values for magnetic physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth, dampened motion
  const springX = useSpring(x, { stiffness: 100, damping: 12 });
  const springY = useSpring(y, { stiffness: 100, damping: 12 });

  /**
   * Handle Mouse Pointer Tracking
   * Calculates the distance from button center to drive magnetic pull.
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Constrain pull to a reasonable range
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  /**
   * Return Button to Rest State
   */
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative isolate">
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => link && window.open(link, '_blank')}
        style={{ x: springX, y: springY }}
        className="group relative flex items-center justify-center"
      >
        {/* The Core Content Layer */}
        <div className="h-12 md:h-14 px-10 md:px-12 rounded-full relative overflow-hidden bg-[var(--color-text)] text-[var(--color-bg)] transition-all duration-700 ease-[0.16,1,0.3,1] flex items-center gap-4 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          {/* Animated "Prismatic" Backdrop - Subtle Glow on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          {/* Vertical Text Reveal Stack */}
          <div className="relative h-6 md:h-7 overflow-hidden flex flex-col items-start min-w-[100px]">
             <span className="text-[10px] md:text-[11px] font-heading font-black uppercase tracking-[0.3em] transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-full py-2">
               Visit Site
             </span>
             <span className="absolute top-full text-[10px] md:text-[11px] font-heading font-black uppercase tracking-[0.3em] text-[var(--color-accent)] transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-full py-2 whitespace-nowrap">
               Explore {title}
             </span>
          </div>

          {/* Kinetic Icon Interaction */}
          <span className="text-base md:text-lg transform transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110">
            ↗
          </span>
        </div>

        {/* Outer Magnetic Ring - Provides a larger visual footprint and depth */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute -inset-3 rounded-full border border-[var(--color-border)] opacity-0 group-hover:opacity-40 transition-all duration-700 pointer-events-none scale-105 group-hover:scale-110"
        />
        
        {/* Secondary "Glitch" Ring for Light Diffusion */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute -inset-1 rounded-full border border-[var(--color-accent)] opacity-0 group-hover:opacity-20 transition-all duration-1000 pointer-events-none blur-[2px]"
        />
      </motion.button>
    </div>
  );
};
