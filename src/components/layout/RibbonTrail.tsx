import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * RibbonTrail Component (Synchronized Stealth Jet)
 * A high-performance canvas-based cursor trail that mimics an aerodynamic vapor trail.
 * The Stealth Jet is locked to the trail's tip for perfect frame-sync.
 */
export const RibbonTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    // Physics constants for the "Stealth Jet Vapor Trail"
    const numPoints = 80; // Extended for more "Aero" presence
    const points = Array.from({ length: numPoints }, () => ({ x: 0, y: 0 }));
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let currentRotation = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update Physics (The Leader Point)
      points[0].x = mouseX;
      points[0].y = mouseY;

      // 2. Cascade Physics (The Trail)
      for (let i = 1; i < numPoints; i++) {
        const p = points[i];
        const prev = points[i - 1];
        // Lower easing factor for that "heavy" aerodynamic drag look
        p.x += (prev.x - p.x) * 0.12; 
        p.y += (prev.y - p.y) * 0.12;
      }

      // 3. Perfect Sync: Lock Jet SVG to the first point
      if (jetRef.current) {
        const jet = jetRef.current;
        jet.style.transform = `translate3d(${points[0].x}px, ${points[0].y}px, 0) translate(-50%, -50%) rotate(${currentRotation}deg)`;

        // Calculate rotation based on leader travel direction
        const dx = points[0].x - lastX;
        const dy = points[0].y - lastY;
        
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
          // Apply a small amount of smoothing to the rotation itself
          currentRotation += (targetRotation - currentRotation) * 0.15;
        }
        
        lastX = points[0].x;
        lastY = points[0].y;
      }

      // 4. Draw the Vapor Trail
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Theme-Reactive Colors
      // Dark Mode: Cobalt (#3b82f6) | Light Mode: Steel Blue (#1e40af)
      const color = isDarkMode ? '#3b82f6' : '#1e40af';
      ctx.shadowBlur = isDarkMode ? 15 : 0;
      ctx.shadowColor = color;

      for (let i = numPoints - 1; i > 0; i--) {
        const p = points[i];
        const next = points[i - 1];
        
        // Tapering opacity and thickness for the "Vapor" look
        const opacity = (1 - i / numPoints) * (isDarkMode ? 0.5 : 0.4);
        const thickness = (1 - i / numPoints) * 2.5 + 0.5;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = thickness;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme, isDarkMode]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full pointer-events-none z-[9998] opacity-60 ${isDarkMode ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
      />
      {/* Synchronized Stealth Jet Element */}
      <div 
        ref={jetRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform ${isDarkMode ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
      >
        <div className={`filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] ${isDarkMode ? 'text-[#E2E8F0]' : 'text-[#1e40af]'}`}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 16.5L13 12V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V12L2 16.5V19L10 16.5V21L8 22.5V24L11.5 23L15 24V22.5L13 21V16.5L21 19V16.5Z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default RibbonTrail;
