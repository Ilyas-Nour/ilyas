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
        materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
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
                            vec3 n = normalize(vec3(
                                map(p + vec3(0.01, 0, 0)) - map(p - vec3(0.01, 0, 0)),
                                0.01,
                                map(p + vec3(0, 0, 0.01)) - map(p - vec3(0, 0, 0.01))
                            ));
                            
                            float dif = dot(n, normalize(vec3(1.0, 2.0, -1.0))) * 0.5 + 0.5;
                            float spec = pow(max(dot(reflect(normalize(vec3(1,2,-1)), n), rd), 0.0), 32.0);
                            
                            // Astral Scape Colors: Teal/Violet
                            vec3 teal = vec3(0.17, 0.83, 0.75);
                            vec3 violet = vec3(0.66, 0.33, 0.97);
                            col = mix(vec3(0.01), teal, dif * 0.3);
                            col = mix(col, violet, 1.0 - dif);
                            col += spec * 0.6;
                        }
                        
                        col = mix(col, vec3(0.01, 0.02, 0.03), 1.0 - exp(-0.06 * t));
                        gl_FragColor = vec4(col, 1.0);
                    }
                `}
            />
        </mesh>
    );
};

export default function ContactFooter() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <section id="contact" className="relative w-full min-h-screen overflow-hidden">

            {/* Background Narrative Scape */}
            <div className="absolute inset-0 z-0 bg-[#020408]">
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5] }}>
                    <LiquidScape />
                </Canvas>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col lg:grid lg:grid-cols-12 gap-24 min-h-screen items-center">

                {/* Visual Narrative Side */}
                <div className="lg:col-span-6 space-y-16">
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <span className="text-xs font-mono tracking-[0.4em] text-accent uppercase">04 / Intersection</span>
                            <div className="h-px w-24 bg-gradient-to-r from-accent/50 to-transparent" />
                        </div>
                        <AmazingTypography
                            as="h1"
                            text="Converging Visions."
                            className="text-7xl md:text-9xl font-display font-bold tracking-tighter text-white leading-[0.85]"
                        />
                    </div>

                    <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-md font-medium">
                        Designing the future through architectural rigor and experimental alchemy.
                    </p>

                    <div className="flex flex-col gap-10">
                        <div className="flex items-center gap-8 group cursor-pointer">
                            <div className="w-16 h-16 rounded-[1.5rem] astral-glass flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                                <Mail size={24} className="text-slate-500 group-hover:text-accent" />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Communication</span>
                                <span className="text-white text-xl font-display font-medium border-b border-transparent group-hover:border-accent transition-all duration-500 pb-1">nour.ilyas@outlook.com</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 group cursor-pointer">
                            <div className="w-16 h-16 rounded-[1.5rem] astral-glass flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                                <MapPin size={24} className="text-slate-500 group-hover:text-accent" />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Coordinates</span>
                                <span className="text-white text-xl font-display font-medium">Casablanca, Morocco</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integrated Action Side */}
                <div className="lg:col-span-6 relative w-full">
                    <div className="p-[1px] w-full bg-gradient-to-b from-white/20 to-transparent rounded-[3rem]">
                        <div className="astral-glass-bright rounded-[2.95rem] p-10 md:p-16 space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                            <form onSubmit={handleSend} className="space-y-12">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block transition-colors group-focus-within:text-accent">Identification Signal</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Entity Name"
                                        className="w-full bg-transparent border-b border-white/5 py-5 text-2xl font-display text-white placeholder:text-white/5 focus:outline-none focus:border-accent transition-all duration-500"
                                    />
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block transition-colors group-focus-within:text-accent">Conceptual Pipeline</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Describe the architectural challenge..."
                                        className="w-full bg-transparent border-b border-white/5 py-5 text-2xl font-display text-white placeholder:text-white/5 focus:outline-none focus:border-accent transition-all duration-500 resize-none"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status !== 'idle'}
                                    className="w-full py-7 rounded-[1.5rem] bg-white text-black font-display font-bold text-xl flex items-center justify-center gap-4 hover:bg-accent hover:text-white transition-all duration-500 disabled:opacity-50 group/btn"
                                >
                                    {status === 'idle' && (
                                        <>Initialize Pulse <Send size={20} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" /></>
                                    )}
                                    {status === 'sending' && "Transmitting..."}
                                    {status === 'success' && "Integrated into Nexus."}
                                </motion.button>
                            </form>

                            {/* Social Connectivity */}
                            <div className="pt-10 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Connect Sequence</span>
                                <div className="flex gap-8">
                                    <a href="https://github.com/Ilyas-Nour" target="_blank" className="text-slate-500 hover:text-white transition-all duration-500 scale-125"><Github size={20} /></a>
                                    <a href="#" className="text-slate-500 hover:text-white transition-all duration-500 scale-125"><Linkedin size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -top-12 -right-12 w-80 h-80 bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
                </div>
            </div>

            {/* Sub-Footer Meta */}
            <div className="relative z-10 w-full px-8 py-16 border-t border-white/5 bg-[#020408]/60 backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
                    <span className="text-[10px] font-mono uppercase tracking-[0.8em]">© 2026 Ilyas Nour System — Neural Protocols Active</span>
                    <div className="flex gap-12 text-[10px] font-mono uppercase tracking-[0.5em]">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> Local Time: {new Date().toLocaleTimeString()}</span>
                        <span>Casablanca // Morocco</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

