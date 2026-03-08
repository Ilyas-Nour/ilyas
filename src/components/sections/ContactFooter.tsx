'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import AmazingTypography from '@/components/motion/AmazingTypography';

/**
 * @component LiquidScapeShader
 * @description A high-fidelity Raymarching Liquid Landscape.
 * SDF-based liquid metal that reacts to mouse position.
 */
const LiquidScape = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
    }), [viewport.width, viewport.height]);

    useFrame((state) => {
        if (!materialRef.current) return;
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        materialRef.current.uniforms.uMouse.value.lerp(
            new THREE.Vector2(mouse.x, mouse.y),
            0.05
        );
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform float uTime;
                    uniform vec2 uMouse;
                    uniform vec2 uResolution;
                    varying vec2 vUv;

                    // Standard noise-based Raymarching for "Liquid Scape"
                    float map(vec3 p) {
                        float d = p.y + 1.0;
                        d += sin(p.x * 0.5 + uTime) * 0.2;
                        d += sin(p.z * 0.3 + uTime * 0.5) * 0.2;
                        
                        // Cursor interference
                        vec2 m = uMouse * 5.0;
                        float dist = length(p.xz - m);
                        d -= exp(-dist * dist) * 0.5;
                        
                        return d * 0.5;
                    }

                    void main() {
                        vec2 uv = (vUv - 0.5) * 2.0;
                        vec3 ro = vec3(0.0, 2.0, -5.0);
                        vec3 rd = normalize(vec3(uv, 1.5));
                        
                        float t = 0.0;
                        for(int i = 0; i < 64; i++) {
                            vec3 p = ro + rd * t;
                            float d = map(p);
                            if(d < 0.001 || t > 20.0) break;
                            t += d;
                        }
                        
                        vec3 p = ro + rd * t;
                        vec3 col = vec3(0.02); // Deep black
                        
                        if(t < 20.0) {
                            // Simple lighting for the liquid
                            vec3 n = normalize(vec3(
                                map(p + vec3(0.01, 0, 0)) - map(p - vec3(0.01, 0, 0)),
                                0.01,
                                map(p + vec3(0, 0, 0.01)) - map(p - vec3(0, 0, 0.01))
                            ));
                            
                            float dif = dot(n, normalize(vec3(1.0, 2.0, -1.0))) * 0.5 + 0.5;
                            float spec = pow(max(dot(reflect(normalize(vec3(1,2,-1)), n), rd), 0.0), 32.0);
                            
                            col = mix(vec3(0.05), vec3(0.5, 0.3, 1.0), dif * 0.3);
                            col += spec * 0.8;
                        }
                        
                        // Atmospheric fog
                        col = mix(col, vec3(0.01, 0.01, 0.02), 1.0 - exp(-0.05 * t));
                        
                        gl_FragColor = vec4(col, 1.0);
                    }
                `}
            />
        </mesh>
    );
};

/**
 * @component ContactFooter
 * @description "The Scape" Artistic Contact Section.
 * Immersive 3D liquid landscape with integrated contact architecture.
 */
export default function ContactFooter() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <section id="contact" className="relative w-full min-h-screen bg-[#030303] overflow-hidden">

            {/* Background Narrative Scape */}
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5] }}>
                    <LiquidScape />
                </Canvas>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col md:grid md:grid-cols-2 gap-24 min-h-screen items-center">

                {/* Visual Narrative Side */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <AmazingTypography
                            as="h2"
                            text="The Scape"
                            className="text-[10px] font-mono uppercase tracking-[0.8em] text-accent"
                        />
                        <AmazingTypography
                            as="h1"
                            text="Collaborative Intelligence."
                            className="text-6xl md:text-8xl font-display font-medium tracking-tighter text-white leading-[0.9]"
                        />
                    </div>

                    <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
                        Merging architectural precision with experimental design.
                        Let's define the next digital frontier together.
                    </p>

                    <div className="flex flex-col gap-8 pt-12">
                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                                <Mail size={18} className="text-neutral-500 group-hover:text-white" />
                            </div>
                            <div>
                                <span className="block text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Inquiries</span>
                                <span className="text-white font-display">nour.ilyas@outlook.com</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                                <MapPin size={18} className="text-neutral-500 group-hover:text-white" />
                            </div>
                            <div>
                                <span className="block text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Base</span>
                                <span className="text-white font-display">Casablanca, Morocco</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integrated Action Side */}
                <div className="relative w-full">
                    <div className="p-1 w-full bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem]">
                        <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-12 border border-white/5 space-y-12 shadow-2xl">
                            <form onSubmit={handleSend} className="space-y-12">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block transition-colors group-focus-within:text-accent">Identification</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Identity Name"
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-display text-white placeholder:text-white/5 focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block transition-colors group-focus-within:text-accent">Communication Payload</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="What architectural vision are we building?"
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-display text-white placeholder:text-white/5 focus:outline-none focus:border-accent transition-all resize-none"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status !== 'idle'}
                                    className="w-full py-6 rounded-2xl bg-white text-black font-display font-bold text-lg flex items-center justify-center gap-4 hover:bg-accent hover:text-white transition-all disabled:opacity-50"
                                >
                                    {status === 'idle' && (
                                        <>Transmit Pulse <Send size={18} /></>
                                    )}
                                    {status === 'sending' && "Transmitting..."}
                                    {status === 'success' && "Integrated."}
                                </motion.button>
                            </form>

                            {/* Social Connectivity */}
                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Connect Sequence</span>
                                <div className="flex gap-6">
                                    <a href="https://github.com/Ilyas-Nour" target="_blank" className="text-neutral-500 hover:text-white transition-colors"><Github size={20} /></a>
                                    <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative 3D elements */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                </div>
            </div>

            {/* Sub-Footer Meta */}
            <div className="relative z-10 w-full px-6 py-12 border-t border-white/5 bg-[#030303]/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
                    <span className="text-[9px] font-mono uppercase tracking-[0.6em]">© 2026 Ilyas Nour System — All Protocols Reserved</span>
                    <div className="flex gap-10 text-[9px] font-mono uppercase tracking-[0.4em]">
                        <span>33.57° N / 7.58° W</span>
                        <span>Casablanca // Morocco</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
