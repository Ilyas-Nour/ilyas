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
  isSource?: boolean;
}

export const ProjectButton: React.FC<ProjectButtonProps> = ({ link, title, isSource = false }) => {
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

  const primaryLabel = isSource ? "Source Code" : "Visit Site";
  const secondaryLabel = isSource ? "View Repo" : `Explore ${title}`;

  return (
    <div className="relative isolate">
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => link && window.open(link, '_blank')}
        style={{ x: springX, y: springY }}
        className="group relative flex items-center justify-center translate-z-0"
      >
        {/* The Core Content Layer */}
        <div className={`h-11 md:h-14 ${isSource ? 'px-6 md:px-8' : 'px-8 md:px-12'} rounded-full relative overflow-hidden ${isSource ? 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]' : 'bg-[var(--color-text)] text-[var(--color-bg)]'} transition-all duration-700 ease-[0.16,1,0.3,1] flex items-center gap-3 md:gap-4 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]`}>
          {/* Animated "Prismatic" Backdrop - Subtle Glow on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          {/* Vertical Text Reveal Stack */}
          <div className={`relative h-5 md:h-7 overflow-hidden flex flex-col items-start ${isSource ? 'min-w-[80px] md:min-w-[90px]' : 'min-w-[80px] md:min-w-[100px]'}`}>
             <span className="text-[9px] md:text-[11px] font-heading font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-full py-2">
               {primaryLabel}
             </span>
             <span className="absolute top-full text-[9px] md:text-[11px] font-heading font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--color-accent)] transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-full py-2 whitespace-nowrap">
               {secondaryLabel}
             </span>
          </div>

          {/* Kinetic Icon Interaction */}
          <span className="text-sm md:text-lg transform transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110">
            {isSource ? (
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 md:w-5 md:h-5 fill-current" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            ) : '↗'}
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
