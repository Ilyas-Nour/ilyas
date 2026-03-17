import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text, PerspectiveCamera, Icosahedron } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

/**
 * MorphingGeometry Component
 * The central 3D object that transforms on scroll.
 */
const MorphingGeometry = ({ scrollProgress, theme }: { scrollProgress: any, theme: 'light' | 'dark' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Refraction / Glass parameters
  const color = theme === 'dark' ? '#3b82f6' : '#60a5fa';
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const progress = scrollProgress.get();
    
    // Rotate based on time and scroll
    meshRef.current.rotation.x = t * 0.2 + progress * Math.PI;
    meshRef.current.rotation.y = t * 0.3;
    
    // Distort based on scroll
    // As we scroll, the geometry "stretches" and "jitters"
    if (meshRef.current.material instanceof THREE.ShaderMaterial || (meshRef.current.material as any).distort !== undefined) {
      (meshRef.current.material as any).distort = THREE.MathUtils.lerp(0.3, 0.8, progress);
      (meshRef.current.material as any).speed = THREE.MathUtils.lerp(1, 4, progress);
    }
    
    // Pulse scale
    const s = 1 + Math.sin(t * 2) * 0.05 + progress * 0.5;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Icosahedron ref={meshRef} args={[1, 15]}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Icosahedron>
    </Float>
  );
};

/**
 * MorphingBio Component
 * Experimental "About" section overhaul.
 */
export const MorphingBio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  // Layered text reveals
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [0.8, 1]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="h-[300vh] relative bg-[var(--color-bg)] overflow-hidden"
    >
      {/* The Central Singularity (3D Scene) */}
      <div className="sticky top-0 h-screen w-full z-0 flex items-center justify-center">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color={theme === 'dark' ? '#3b82f6' : '#ffffff'} />
          <MorphingGeometry scrollProgress={smoothProgress} theme={theme} />
        </Canvas>
      </div>

      {/* Narrative Overlays - Floating in 2D space relative to the 3D core */}
      <div className="relative z-10 w-full">
        
        {/* Block 01: The Core */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ opacity, scale }} className="max-w-3xl space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)] opacity-50 block">Origin // Bio</span>
            <h2 className="text-6xl md:text-[10rem] font-black text-[var(--color-text)] leading-[0.8] tracking-tighter uppercase italic mix-blend-difference">
               Fluid <br /> <span className="not-italic opacity-20">Identity.</span>
            </h2>
            <p className="text-lg md:text-2xl text-[var(--color-text-muted)] font-light leading-relaxed">
              I am a digital alchemist merging <span className="text-[var(--color-text)] font-medium underline decoration-[var(--color-accent)]">raw code</span> with high-fidelity aesthetics. 
            </p>
          </motion.div>
        </div>

        {/* Block 02: The Process (Offset) */}
        <div className="h-screen flex flex-col items-start justify-center px-6 md:px-40">
           <motion.div 
             style={{ 
               opacity: useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
               x: useTransform(smoothProgress, [0.3, 0.5], [-100, 0])
             }}
             className="max-w-xl space-y-8"
           >
              <h3 className="text-4xl md:text-7xl font-bold text-[var(--color-text)] tracking-tight">The Brutalist <br /> <span className="text-[var(--color-accent)]">Standard.</span></h3>
              <p className="text-[var(--color-text-muted)] text-base md:text-xl leading-relaxed">
                Zero friction. Maximum impact. I architect systems that don't just work—they command attention.
              </p>
              <div className="h-20 w-[1px] bg-[var(--color-accent)]" />
           </motion.div>
        </div>

        {/* Block 03: The Vision (Right Offset) */}
        <div className="h-screen flex flex-col items-end justify-center px-6 md:px-40 text-right">
           <motion.div 
             style={{ 
               opacity: useTransform(smoothProgress, [0.6, 0.8, 1], [0, 1, 0]),
               x: useTransform(smoothProgress, [0.6, 0.8], [100, 0])
             }}
             className="max-w-xl space-y-8"
           >
              <h3 className="text-4xl md:text-7xl font-bold text-[var(--color-text)] tracking-tight">Future <br /> <span className="opacity-30">Pioneer.</span></h3>
              <p className="text-[var(--color-text-muted)] text-base md:text-xl leading-relaxed">
                Specializing in Three.js and high-fidelity motion. Based in Morocco, operating from the edge of the web.
              </p>
           </motion.div>
        </div>

      </div>

      {/* Particle HUD - Subtle floating data points */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
         <div className="absolute top-20 right-20 font-mono text-[8px] uppercase tracking-widest space-y-2">
            <p>Lat: 33.5731° N</p>
            <p>Long: 7.5898° W</p>
            <p>Status: Synchronized</p>
         </div>
      </div>
    </section>
  );
};

export default MorphingBio;
