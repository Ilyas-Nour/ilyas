import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Text, PerspectiveCamera, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Technical Specs for "The Singularity"
 */
const CATEGORIES = [
  {
    id: "FE",
    title: "Frontend",
    skills: ["React", "Three.js", "Framer", "TS", "Next.js", "GSAP"],
    color: "#FF3B30"
  },
  {
    id: "BE",
    title: "Backend",
    skills: ["Node.js", "Postgres", "Mongo", "Docker", "Express", "Redis"],
    color: "#FF3B30"
  },
  {
    id: "SY",
    title: "Systems",
    skills: ["Git", "Linux", "Figma", "Vite", "CI/CD", "Optim"],
    color: "#FF3B30"
  }
];

const ParticleCore = ({ activeId, pulse }: { activeId: string | null, pulse: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const count = 15000;
  
  const [positions, rotations] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rot = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      rot[i * 3] = Math.random() * Math.PI;
      rot[i * 3 + 1] = Math.random() * Math.PI;
      rot[i * 3 + 2] = Math.random() * Math.PI;
    }
    return [pos, rot];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    
    // Pulse effect
    const pulseScale = pulse ? 1.5 + Math.sin(t * 20) * 0.2 : 1;
    
    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);
      
      // Gravitational pull toward center
      const dist = Math.sqrt(x * x + y * y + z * z);
      const force = 0.01 * (1 / (dist + 0.1));
      
      // Mouse interaction
      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;
      const mDist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
      const mForce = mDist < 2 ? (2 - mDist) * 0.05 : 0;
      
      // Update position with noise and gravity
      x -= x * 0.005 + (x - mx) * mForce;
      y -= y * 0.005 + (y - my) * mForce;
      z -= z * 0.005;
      
      // Boundary reset
      if (dist < 0.5) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 4 + Math.random() * 1;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      }
      
      posAttr.setXYZ(i, x * pulseScale, y * pulseScale, z * pulseScale);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.1;
    pointsRef.current.rotation.x = t * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF3B30"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
};

const SkillLabel = ({ cat, index, onSelect, isActive }: { cat: any, index: number, onSelect: (id: string) => void, isActive: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const radius = 5;
    const angle = (t * 0.2) + (index * (Math.PI * 2) / 3);
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = Math.sin(t * 0.5 + index) * 0.5;
    meshRef.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={meshRef} onClick={() => onSelect(cat.id)} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          fontSize={0.6}
          color={isActive ? "#FF3B30" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {cat.title}
        </Text>
      </Float>
    </group>
  );
};

export const TechnicalArray: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);
  const { theme } = useTheme();

  const handleSelect = (id: string) => {
    setActiveCategory(id === activeCategory ? null : id);
    setPulse(true);
    setTimeout(() => setPulse(false), 500);
  };

  const selectedData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section id="skills" className="h-[120vh] relative bg-[#020205] overflow-hidden">
      {/* 3D Kinetic Singularity */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FF3B30" />
          
          <ParticleCore activeId={activeCategory} pulse={pulse} />
          
          <React.Suspense fallback={null}>
            {CATEGORIES.map((cat, i) => (
              <SkillLabel 
                key={cat.id} 
                cat={cat} 
                index={i} 
                onSelect={handleSelect}
                isActive={activeCategory === cat.id}
              />
            ))}
          </React.Suspense>
        </Canvas>
      </div>

      {/* Narrative HUD Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none p-8 md:p-20 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[#FF3B30] uppercase tracking-[1em]">The Singularity</span>
            <div className="h-[1px] w-24 bg-[#FF3B30] opacity-50" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic opacity-20">
            TECHNICAL <br /> CORE.
          </h2>
        </div>

        {/* Cinematic Skill Ejection Display */}
        <AnimatePresence>
          {activeCategory && selectedData && (
            <motion.div 
              initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 max-w-sm pointer-events-auto"
            >
              <div className="bg-white/5 backdrop-blur-3xl border-l-4 border-[#FF3B30] p-8 md:p-12 space-y-8">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[#FF3B30] uppercase tracking-[0.5em]">Selected Category</span>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">{selectedData.title}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {selectedData.skills.map((skill, i) => (
                    <motion.div 
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="h-[1px] w-full bg-white/10 mb-2 overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full w-full bg-[#FF3B30]"
                        />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 pt-8 border-t border-white/10 lead-relaxed">
                   Gravitational distortion detected. Synchronizing skill neural nodes with hardware registry.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom HUD Feedback */}
        <div className="flex justify-between items-end">
          <div className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/20 space-y-1">
            <p>Protocol: Kinetic_Singularity_v5</p>
            <p>Particles: 15,000_Active_Points</p>
            <p>Status: ARCHIVE_SYNCHRONIZED</p>
          </div>
          <div className="text-right">
             <span className="text-6xl md:text-9xl font-black text-white/5 select-none font-heading uppercase leading-none">003</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 group pointer-events-none opacity-20">
         <span className="font-mono text-[10px] vertical-text uppercase tracking-[1em] text-white whitespace-nowrap">Explore Singularity</span>
         <div className="w-[1px] h-32 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#FF3B30]"
            />
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}} />
    </section>
  );
};

export default TechnicalArray;
