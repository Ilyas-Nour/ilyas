import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import { useTheme } from '../../context/ThemeContext';

/**
 * Custom GLSL Shader for Prismatic Caustics
 */
const ShimmerShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#0a0a2a') }, 
    uColor2: { value: new THREE.Color('#14b8a6') }, 
    uNoiseScale: { value: 2.0 },
    uIntensity: { value: 1.0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uNoiseScale;
    uniform float uIntensity;
    uniform vec2 uMouse;
    uniform float uScroll;
    varying vec2 vUv;

    // Standard hash function for noise
    vec3 hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.6)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    // Gradient Noise
    float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(dot(hash(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                           dot(hash(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
                       mix(dot(hash(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                           dot(hash(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x), u.y),
                   mix(mix(dot(hash(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                           dot(hash(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
                       mix(dot(hash(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                           dot(hash(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x), u.y), u.z);
    }

    void main() {
      vec2 uv = vUv;
      
      // Interaction distortion
      float dist = distance(uv, uMouse);
      uv += (uv - uMouse) * exp(-dist * 10.0) * 0.05;

      // Layered Noise for Caustics
      float n = noise(vec3(uv * uNoiseScale, uTime * 0.2 + uScroll * 0.5));
      n += 0.5 * noise(vec3(uv * uNoiseScale * 2.0, uTime * 0.4));
      
      // Prismatic color blending
      vec3 color = mix(uColor1, uColor2, n * 0.5 + 0.5);
      
      // Add "shimmer" highlights
      float shimmer = pow(max(0.0, n), 3.0) * uIntensity;
      color += vec3(shimmer) * vec3(0.8, 0.9, 1.0);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

/**
 * ShimmerBackground Canvas Component
 */
const ShimmerBackground = ({ scrollProgress, theme }: { scrollProgress: any, theme: 'light' | 'dark' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();

  const color1 = theme === 'dark' ? '#020617' : '#cbd5e1';
  const color2 = theme === 'dark' ? '#3b82f6' : '#64748b';

  const uniforms = useMemo(() => ({
    ...ShimmerShader.uniforms,
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(color1);
      materialRef.current.uniforms.uColor2.value.set(color2);
    }
  }, [color1, color2]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5), 0.1);
      materialRef.current.uniforms.uScroll.value = scrollProgress.get();
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial 
        ref={materialRef}
        {...ShimmerShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

/**
 * ShimmerAbout Component
 * Atmospheric About section featuring "The Prismatic Shimmer".
 */
export const ShimmerAbout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  useGSAP(() => {
    // Narrative Stagger
    gsap.from(".shimmer-narrative", {
      opacity: 0,
      y: 30,
      duration: 1.5,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-[var(--color-bg)] flex items-center py-32 transition-colors duration-500"
    >
      {/* Background Shader Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <ShimmerBackground scrollProgress={scrollYProgress} theme={theme} />
        </Canvas>
      </div>

      {/* Decorative Overlay (Micro-Grid) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`, backgroundSize: '100px 100px' }}
      />

      <div className="container mx-auto px-6 md:px-24 relative z-20">
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="max-w-5xl space-y-24"
        >
          {/* Header Block */}
          <div className="shimmer-narrative">
            <span className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)] mb-8 block">Project : Identity</span>
            <h2 className="text-6xl md:text-[9rem] font-black text-[var(--color-text)] leading-[0.8] tracking-tighter uppercase italic font-serif">
              Prismatic <br /> <span className="not-italic font-sans opacity-20">Presence.</span>
            </h2>
          </div>

          {/* Core Philosophy Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
             <div className="lg:col-span-8 shimmer-narrative">
                <p className="text-2xl md:text-5xl text-[var(--color-text)] font-light leading-tight">
                  I architect <span className="text-[var(--color-accent)] italic">atmospheric</span> digital spaces where aesthetic intuition meets brutal technical precision.
                </p>
             </div>
             
             <div className="lg:col-span-4 shimmer-narrative space-y-6 pt-4">
                <p className="text-[var(--color-text-muted)] font-sans text-sm leading-relaxed uppercase tracking-widest">
                  Specializing in React, Three.js, and high-fidelity motion. Based in Morocco, operating globally.
                </p>
                <div className="h-[1px] w-20 bg-[var(--color-accent)] opacity-50" />
             </div>
          </div>

          {/* Cards Grid - Glassmorphic Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 shimmer-narrative">
             {[
               { title: "Strategy", desc: "Understanding the core 'Why' before drafting the 'How'." },
               { title: "Design", desc: "Crafting narratives through light, motion, and typography." },
               { title: "Development", desc: "Building resilient, zero-error systems for the modern web." }
             ].map((item, i) => (
                <div key={i} className="group p-10 border border-[var(--color-border)] bg-[var(--color-text)]/[0.02] backdrop-blur-2xl hover:bg-[var(--color-text)]/[0.05] transition-all duration-700">
                   <span className="font-mono text-[8px] text-[var(--color-accent)] mb-6 block">0{i+1} //</span>
                   <h4 className="text-2xl text-[var(--color-text)] font-serif italic mb-4">{item.title}</h4>
                   <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Narrative Progress Indicator */}
      <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-4">
         <div className="h-40 w-[1px] bg-[var(--color-border)] relative overflow-hidden">
            <motion.div 
              style={{ height: '100%', scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full bg-[var(--color-accent)] origin-top"
            />
         </div>
         <span className="font-mono text-[8px] text-[var(--color-text-muted)] opacity-50 uppercase tracking-widest [writing-mode:vertical-lr]">Chronology</span>
      </div>
    </section>
  );
};

export default ShimmerAbout;
