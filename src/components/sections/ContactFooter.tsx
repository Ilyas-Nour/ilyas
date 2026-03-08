'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import AmazingTypography from '@/components/motion/AmazingTypography';

/**
 * @component GravityCore
 * @description The central light source for the Gravity Well.
 * Simulates a glowing, pulsating energy core using custom shaders.
 */
const GravityCore = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uIntensity: { value: 0.5 }
    }), []);

    useFrame((state) => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        materialRef.current.uniforms.uMouse.value.lerp(
            new THREE.Vector2(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2),
            0.05
        );
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                transparent={true}
                vertexShader={`
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    uniform float uTime;
                    
                    void main() {
                        vUv = uv;
                        vNormal = normalize(normalMatrix * normal);
                        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                        
                        vec3 pos = position;
                        float pulse = sin(uTime * 2.0 + position.y * 2.0) * 0.1;
                        pos += normal * pulse;
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    uniform float uTime;
                    uniform vec2 uMouse;

                    void main() {
                        vec3 viewDir = normalize(-vPosition);
                        float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.0);
                        
                        vec3 coreColor = vec3(0.5, 0.3, 1.0); // Indigo
                        vec3 outerColor = vec3(0.7, 0.5, 1.0); // Purple
                        
                        float pulse = (sin(uTime * 3.0) * 0.5 + 0.5) * 0.2 + 0.8;
                        vec3 finalColor = mix(coreColor, outerColor, fresnel) * pulse;
                        
                        float alpha = smoothstep(0.0, 1.0, fresnel * 2.0);
                        gl_FragColor = vec4(finalColor, alpha * 0.8);
                    }
                `}
            />
        </mesh>
    );
};

/**
 * @component ContactFooter
 * @description Radical "Gravity Well" contact section. 
 * Replaces the static UI with a physical simulation of orbiting satellites.
 */
export default function ContactFooter() {
    const containerRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);
    const email = "nour.ilyas@outlook.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/Ilyas-Nour', color: '#818cf8', angle: 0 },
        { name: 'LinkedIn', icon: <Linkedin size={24} />, url: '#', color: '#c084fc', angle: Math.PI * 0.66 },
        { name: 'Email', icon: <Mail size={24} />, url: `mailto:${email}`, color: '#6366f1', angle: Math.PI * 1.33 }
    ];

    return (
        <>
            <section ref={containerRef} id="contact" className="relative w-full h-[120vh] bg-[#030303] overflow-hidden z-10">

                {/* 3D Gravity Well Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <GravityCore />
                        {/* Starfield effect */}
                        <points>
                            <bufferGeometry>
                                <bufferAttribute
                                    attach="attributes-position"
                                    count={1000}
                                    array={new Float32Array(Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 20))}
                                    itemSize={3}
                                />
                            </bufferGeometry>
                            <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.3} />
                        </points>
                    </Canvas>
                </div>

                {/* Foreground Narrative */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none">
                    <div className="max-w-4xl text-center space-y-12">
                        <div className="space-y-4">
                            <AmazingTypography
                                as="h2"
                                text="Let's build the next"
                                className="text-5xl md:text-8xl font-display font-medium tracking-tighter text-white"
                                delay={0.2}
                            />
                            <AmazingTypography
                                as="h2"
                                text="exceptional system."
                                className="text-5xl md:text-8xl font-display font-medium tracking-tighter text-accent/40"
                                delay={0.4}
                            />
                        </div>

                        <p className="text-neutral-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            Currently exploring the intersection of clean architecture and experimental interfaces.
                            Available for high-impact collaborations.
                        </p>
                    </div>

                    {/* Interactive Satellite Orbit (Simulated via Framer Motion) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-full max-w-xl aspect-square">
                            {socialLinks.map((social, i) => (
                                <motion.div
                                    key={social.name}
                                    className="absolute pointer-events-auto"
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 20 + i * 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        top: 0,
                                        left: 0,
                                    }}
                                >
                                    <motion.a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-0 left-1/2 -translate-x-1/2 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl group hover:border-white/20 transition-all duration-500"
                                        whileHover={{ scale: 1.1, backgroundColor: social.color + '20' }}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <span className="text-white opacity-40 group-hover:opacity-100 transition-opacity">
                                                {social.icon}
                                            </span>
                                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 group-hover:text-white transition-colors">
                                                {social.name}
                                            </span>
                                        </div>
                                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight size={14} className="text-white" />
                                        </div>
                                    </motion.a>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Email CTA (Stationary but distorted) */}
                    <div className="absolute bottom-24 z-20 pointer-events-auto">
                        <div
                            onClick={copyEmail}
                            className="group relative flex items-center gap-6 px-10 py-6 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] cursor-pointer transition-all duration-700 hover:bg-white/[0.05] hover:border-accent/40 hover:scale-[1.02]"
                        >
                            <span className="text-lg md:text-2xl font-display font-medium tracking-tight text-white/50 group-hover:text-white">
                                {email}
                            </span>
                            <div className="w-px h-6 bg-white/10" />
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Check size={20} className="text-green-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Copy size={20} className="text-neutral-500 group-hover:text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Inner pulse */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-accent/0 group-hover:bg-accent/5 transition-colors duration-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="relative w-full py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-[#030303] z-30">
                <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-32 mb-24">
                    <div className="md:col-span-2 space-y-8">
                        <span className="text-3xl font-display font-medium tracking-tighter text-white block">ILYAS NOUR //</span>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                            Architecting performant digital experiences with Laravel, React, and Experimental 3D.
                            Currently pushing the limits of the web from Casablanca.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-white text-xs font-display uppercase tracking-[0.3em] font-medium opacity-40">System</h4>
                        <ul className="flex flex-col gap-6 text-sm text-neutral-500 font-medium">
                            <li><a href="#about" className="hover:text-white transition-colors">Background</a></li>
                            <li><a href="#skills" className="hover:text-white transition-colors">Expertise</a></li>
                            <li><a href="#projects" className="hover:text-white transition-colors">Curvature</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Connect</a></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-white text-xs font-display uppercase tracking-[0.3em] font-medium opacity-40">Frequency</h4>
                        <ul className="flex flex-col gap-6 text-sm text-neutral-500 font-medium">
                            <li><a href="https://github.com/Ilyas-Nour" target="_blank" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="mailto:nour.ilyas@outlook.com" className="hover:text-white transition-colors">Direct Mail</a></li>
                        </ul>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-600">
                        © 2026 Ilyas Nour — Integrated Architecture
                    </span>
                    <div className="flex items-center gap-10 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span>Loc: 33.5731° N, 7.5898° W</span>
                        </div>
                        <span>Status: Seeking High-Intensity Projects</span>
                    </div>
                </div>
            </footer>
        </>
    );
}
