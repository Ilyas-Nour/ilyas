import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Skill Data Structure
 */
const skillCategories = [
  {
    name: "Design & UX",
    color: "#3b82f6", // Electric Cobalt
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"]
  },
  {
    name: "Inside the Code",
    color: "#60a5fa", 
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "NoSQL", "REST APIs"]
  },
  {
    name: "The Toolbox",
    color: "#93c5fd",
    skills: ["Git", "Docker", "Figma", "Vite", "GSAP", "Linux"]
  }
];

/**
 * SkillNode Component
 * Represents an individual skill orbiting its hub.
 */
const SkillNode = ({ name, color, hubPosition, index, total }: { name: string, color: string, hubPosition: THREE.Vector3, index: number, total: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  // Physics state
  const radius = 3 + Math.random() * 2;
  const speed = 0.5 + Math.random() * 0.5;
  const offset = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime() * speed + offset;
    
    // Calculate orbital position
    const targetX = hubPosition.x + Math.cos(t) * radius;
    const targetY = hubPosition.y + Math.sin(t) * radius;
    const targetZ = hubPosition.z + Math.sin(t * 0.5) * 2;

    // Mouse influence (Gravity Swarm)
    const mouseX = mouse.x * 10;
    const mouseY = mouse.y * 10;
    const distToMouse = Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2));
    
    const influence = Math.exp(-distToMouse * 0.5) * 2;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX + (mouseX - targetX) * influence, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY + (mouseY - targetY) * influence, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    
    // Scale pulse
    meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
  });

  return (
    <group ref={meshRef}>
      <Text
        fontSize={0.4}
        color="white"
        font="/fonts/Inter-Bold.ttf" // Fallback to default if not found
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={color}
      >
        {name}
      </Text>
      <Sphere args={[0.1, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </Sphere>
    </group>
  );
};

/**
 * CategoryHub Component
 * The central gravitational point for a set of skills.
 */
const CategoryHub = ({ category, position }: { category: typeof skillCategories[0], position: [number, number, number] }) => {
  const hubPos = new THREE.Vector3(...position);
  
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[position[0], position[1] + 1.5, position[2]]}
          fontSize={0.8}
          color={category.color}
          anchorX="center"
          maxWidth={5}
          textAlign="center"
          font="/fonts/Inter-Black.ttf"
        >
          {category.name.toUpperCase()}
        </Text>
      </Float>
      
      {category.skills.map((skill, i) => (
        <SkillNode 
          key={skill} 
          name={skill} 
          color={category.color} 
          hubPosition={hubPos} 
          index={i} 
          total={category.skills.length} 
        />
      ))}
    </group>
  );
};

/**
 * NeuralMatrix Component
 * 3D Interactive Skills Overhaul.
 */
export const NeuralMatrix: React.FC = () => {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" className="h-[120vh] relative bg-[var(--color-bg)] border-t border-[var(--color-border)] overflow-hidden">
      {/* Background HUD Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 font-mono text-[8px] space-y-2 uppercase tracking-tight">
          <p>SYSTEM_STATUS: STABLE</p>
          <p>NEURAL_LOAD: OPTIMAL</p>
          <p>GRAVITY_ENGINE: ACTIVE</p>
        </div>
      </div>

      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-[var(--color-accent)] mb-4">Neural Network</h2>
        <h3 className="text-4xl md:text-7xl font-black text-[var(--color-text)] uppercase leading-[0.8] tracking-tighter">
          Mastery <br /> <span className="opacity-20 italic font-serif font-normal">Matrix.</span>
        </h3>
      </div>

      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <CategoryHub category={skillCategories[0]} position={[-8, 0, 0]} />
        <CategoryHub category={skillCategories[1]} position={[0, -2, 0]} />
        <CategoryHub category={skillCategories[2]} position={[8, 0, 0]} />

        {/* Dynamic connection lines could be added here for extra "WOW" */}
      </Canvas>

      {/* Narrative Footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-xl px-6 text-center">
        <p className="text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-[0.3em] leading-relaxed">
          Hover to disrupt the gravitational hubs. Each node represents a technical commitment to excellence.
        </p>
      </div>
    </section>
  );
};

export default NeuralMatrix;
