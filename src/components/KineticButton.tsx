import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface KineticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'outline' | 'primary';
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const KineticButton: React.FC<KineticButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'outline',
  icon,
  type = 'button',
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set relative coordinates for the CSS radial gradient
    buttonRef.current.style.setProperty('--x', `${mouseX}px`);
    buttonRef.current.style.setProperty('--y', `${mouseY}px`);

    // Magnetic pull effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const pullX = (mouseX - centerX) * 0.15;
    const pullY = (mouseY - centerY) * 0.15;
    
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`btn-kinetic ${variant === 'primary' ? 'btn-kinetic-primary' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span>{children}</span>
      {icon && <span className="transform group-hover:translate-x-1 transition-transform">{icon}</span>}
    </motion.button>
  );
};

export default KineticButton;
