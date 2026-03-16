import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mix = Math.random();
      if (mix > 0.7) {
        color.setHSL(0.55, 0.9, 0.6); // Vibrand Blue
      } else if (mix > 0.3) {
        color.setHSL(0.12, 1, 0.5); // Radiant Gold
      } else {
        color.setHSL(0.8, 0.8, 0.6); // Kinetic Purple
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.03;

    const targetX = mouse.x * 2;
    const targetY = mouse.y * 2;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
  });

  return (
    <Points positions={positions} colors={colors} ref={pointsRef}>
      <PointMaterial
        transparent
        vertexColors
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

const VibrantBackgroundMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[30, 20, 1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <MeshDistortMaterial 
        color="#1a1a1a"
        speed={3} 
        distort={0.4} 
        radius={1}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

export const Atmospheric3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
      <Canvas dpr={[1, 2]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} intensity={2} color="#3b82f6" />
        <pointLight position={[-20, -20, -20]} intensity={2} color="#efbf04" />
        <spotLight position={[0, 10, 10]} intensity={1.5} color="#ffffff" angle={0.5} penumbra={1} />
        
        <ParticleField />
        <VibrantBackgroundMesh />
      </Canvas>
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-gold-900/10 mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default Atmospheric3D;
