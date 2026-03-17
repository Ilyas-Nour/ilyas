import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * ParticleSystem Component
 * Renders 10,000 particles that react to mouse and scroll.
 */
const ParticleSystem = ({ scrollProgress, theme }: { scrollProgress: any, theme: 'light' | 'dark' }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const count = 10000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const progress = scrollProgress.get();
    
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    
    for (let i = 0; i < count; i++) {
       const x = posAttr.getX(i);
       const y = posAttr.getY(i);
       const z = posAttr.getZ(i);
       
       // Magnetic pull toward mouse
       const mx = mouse.x * 10;
       const my = mouse.y * 10;
       
       const dx = mx - x;
       const dy = my - y;
       const dist = Math.sqrt(dx * dx + dy * dy);
       
       // Swirl effect
       const swirl = Math.sin(t * 0.5 + z * 0.1) * 0.02;
       
       // Warp speed effect on scroll
       const warp = progress * 10;
       
       posAttr.setXYZ(
         i, 
         x + dx * 0.01 * (1 / (dist + 1)) + swirl,
         y + dy * 0.01 * (1 / (dist + 1)) + swirl,
         z + Math.sin(t + i) * 0.01 + warp
       );
       
       // Boundary reset for warp
       if (posAttr.getZ(i) > 10) posAttr.setZ(i, -10);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={theme === 'dark' ? '#3b82f6' : '#60a5fa'}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

/**
 * DataStorm Component
 * Interactive Skills overhaul using a hyperspace particle simulation.
 */
export const DataStorm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const contentOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { title: "Frontend", tech: "React / Next.js / Three.js / GSAP" },
    { title: "Backend", tech: "Node.js / Express / PostgreSQL / MongoDB" },
    { title: "Tools", tech: "Git / Docker / Figma / Linux" }
  ];

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="h-[200vh] relative bg-[var(--color-bg)] border-t border-[var(--color-border)] overflow-hidden"
    >
      {/* 3D Particle Scene */}
      <div className="sticky top-0 h-screen w-full z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ParticleSystem scrollProgress={smoothProgress} theme={theme} />
        </Canvas>
      </div>

      {/* Narrative Overlays */}
      <div className="relative z-10 w-full pt-20">
        <div className="container mx-auto px-6">
           <motion.div style={{ opacity: contentOpacity }} className="text-center mb-40">
              <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-[var(--color-accent)] mb-4">Neural Data</h2>
              <h3 className="text-6xl md:text-9xl font-black text-[var(--color-text)] uppercase leading-[0.8] tracking-tighter italic">
                The <br /> <span className="not-italic opacity-20">Storm.</span>
              </h3>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-[40vh]">
              {skills.map((s, i) => (
                <motion.div 
                   key={s.title}
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.2, duration: 1 }}
                   className="p-8 border border-[var(--color-border)] bg-[var(--color-text)]/[0.02] backdrop-blur-xl group hover:border-[var(--color-accent)] transition-colors duration-500"
                >
                   <span className="font-mono text-[8px] text-[var(--color-accent)] mb-4 block">0{i+1} // NODE</span>
                   <h4 className="text-3xl font-bold text-[var(--color-text)] mb-4 tracking-tighter uppercase">{s.title}</h4>
                   <p className="text-[var(--color-text-muted)] font-mono text-xs leading-relaxed uppercase tracking-widest leading-loose">
                      {s.tech}
                   </p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="absolute bottom-10 left-10 z-20 font-mono text-[8px] uppercase tracking-tighter opacity-30">
         <p>Protocol: Magnetized_Particles</p>
         <p>Count: 10,000_Active_Nodes</p>
         <p>Warp_Index: {smoothProgress.get().toFixed(2)}</p>
      </div>
    </section>
  );
};

export default DataStorm;
