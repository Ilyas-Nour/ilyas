import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uOpacity;
  uniform float uWarp;
  varying vec2 vUv;

  // Faster, indestructible noise for maximum hardware compatibility
  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.7, 31.1))) * 43758.5453123); }
  float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 uv = vUv;
    
    // Smooth interaction distortion
    float dist = distance(st, uMouse);
    uv += (uv - uMouse) * exp(-dist * 8.0) * 0.1;

    // Layered Noise for "Prismatic Silk" motion (Normalized)
    float n = noise(uv * (3.0 + uWarp) + uTime * 0.1);
    n += 0.5 * noise(uv * (6.0 + uWarp * 2.0) - uTime * 0.2);
    n = n / 1.5; 
    
    // Vibrant Color Blending (Electric Indigo & Teal)
    vec3 color = mix(uColor1, uColor2, n);
    
    // Controlled Highlights (Shimmer) - Reduced intensity for readability
    float shimmer = pow(max(0.0, n), 8.0);
    color += shimmer * vec3(0.7, 0.9, 1.0) * 1.2;

    // Subtle edge glow for depth
    float edge = 1.0 - length(vUv - 0.5) * 1.5;
    color *= clamp(edge, 0.6, 1.0);

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const ShaderPlane = ({ color1, color2, opacity, warp, isVisible }: { color1: string, color2: string, opacity: number, warp?: any, isVisible: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size, mouse } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uOpacity: { value: opacity },
    uWarp: { value: 0 }
  }), []); // Only initialize once

  // Reactive updates for static uniforms
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(color1);
      materialRef.current.uniforms.uColor2.value.set(color2);
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  }, [color1, color2, opacity, isVisible]);

  useFrame((state) => {
    if (isVisible && materialRef.current) {
      // Use performance.now() to avoid THREE.Clock deprecation warnings in newer Three.js versions
      materialRef.current.uniforms.uTime.value = performance.now() * 0.001;
      
      // Update uWarp directly from warp prop (which could be a MotionValue or number)
      if (warp && typeof warp.get === 'function') {
        materialRef.current.uniforms.uWarp.value = warp.get();
      } else if (typeof warp === 'number') {
        materialRef.current.uniforms.uWarp.value = warp;
      }

      const targetX = (mouse.x + 1) / 2;
      const targetY = (mouse.y + 1) / 2;
      materialRef.current.uniforms.uMouse.value.x += (targetX - materialRef.current.uniforms.uMouse.value.x) * 0.1;
      materialRef.current.uniforms.uMouse.value.y += (targetY - materialRef.current.uniforms.uMouse.value.y) * 0.1;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width * 1.5, viewport.height * 1.5, 1]} visible={isVisible}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const LiquidBackground: React.FC<{ theme: 'light' | 'dark', warp?: any }> = ({ theme, warp }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(true); // Default to true to allow initial render

  const color1 = theme === 'dark' ? '#020617' : '#94a3b8'; // Obsidian vs Steel Blue-Grey
  const color2 = theme === 'dark' ? '#1e3a8a' : '#475569'; // Cobalt vs Graphite
  const opacity = theme === 'dark' ? 1.0 : 0.4; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[-1] overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#cbd5e1]'}`}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        dpr={[1, 2]}
      >
        <ShaderPlane color1={color1} color2={color2} opacity={opacity} warp={warp} isVisible={isVisible} />
      </Canvas>
    </div>
  );
};

export default LiquidBackground;
