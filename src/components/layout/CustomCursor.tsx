import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Initial check and subsequent listeners
    const hoverQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(hoverQuery.matches);

    const handler = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    hoverQuery.addEventListener('change', handler);
    return () => hoverQuery.removeEventListener('change', handler);
  }, []);

  // High-inertia spring config for "expensive" feel
  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Trails for the "colors following the cursor" effect
  const trailConfigs = [
    { damping: 15, stiffness: 200, mass: 0.3, color: '#1A1A1B' },
    { damping: 20, stiffness: 150, mass: 0.5, color: 'rgba(26, 26, 27, 0.1)' },
    { damping: 25, stiffness: 100, mass: 0.8, color: 'rgba(26, 26, 27, 0.05)' },
  ];

  const trails = trailConfigs.map(config => ({
    x: useSpring(mouseX, config),
    y: useSpring(mouseY, config),
    color: config.color
  }));

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.astral-glass') ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  if (!supportsHover) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999]">
      {/* Prismatic Rainbow Trail */}
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          style={{
            x: trail.x,
            y: trail.y,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: trail.color,
          }}
          animate={{
            scale: isHovered ? [1, 1.8, 1] : 1,
            opacity: isHovered ? 0.8 : 0.4,
            filter: isHovered ? "blur(25px)" : "blur(15px)",
          }}
          transition={{
            scale: { repeat: Infinity, duration: 1.5, delay: i * 0.1 }
          }}
          className="absolute w-8 h-8 rounded-full mix-blend-screen"
        />
      ))}

      {/* Inertia Point */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
        }}
        className="absolute w-2 h-2 bg-white rounded-full mix-blend-difference z-10"
      />
      
      {/* Elegant Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 80 : 25,
          height: isHovered ? 80 : 25,
          opacity: isHovered ? 0.6 : 0.2,
          borderWidth: isHovered ? '1px' : '2px',
        }}
        transition={{ duration: 0.4 }}
        className="absolute rounded-full border border-white filter blur-[1px] z-20"
      />
    </div>
  );
};
