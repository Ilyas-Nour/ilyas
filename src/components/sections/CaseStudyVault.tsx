'use client';

import React, { useRef } from 'react';
import { Github, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: 'Animy',
        focus: 'Performance',
        description: 'A high-performance anime streaming aggregator built for extreme concurrent loads.',
        tech: ['React', 'Redis', 'Node.js'],
        color: '#818cf8',
        link: '#',
        github: '#'
    },
    {
        title: 'PrivaFlow',
        focus: 'Security',
        description: 'An encrypted workflow management system ensuring zero-knowledge processing.',
        tech: ['Next.js', 'AES-256', 'Crypto'],
        color: '#c084fc',
        link: '#',
        github: '#'
    },
    {
        title: 'TopNature',
        focus: 'E-Commerce',
        description: 'A robust e-commerce platform designed for maximum conversion rates.',
        tech: ['Laravel', 'Vue.js', 'Stripe'],
        color: '#6366f1',
        link: '#',
        github: '#'
    },
    {
        title: 'Nexus OS',
        focus: 'Interface',
        description: 'A conceptual operating system interface focused on spatial computing.',
        tech: ['Three.js', 'React', 'GLSL'],
        color: '#a855f7',
        link: '#',
        github: '#'
    }
];

export default function CaseStudyVault() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Pre-calculate 3D shards for ambient depth
    const shards = React.useMemo(() => [...Array(25)].map(() => ({
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150,
        z: Math.random() * -2000,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random()
    })), []);

    useGSAP(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
        const radius = 1200; // Orbit radius
        const totalCards = cards.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${totalCards * 1500}`,
                pin: true,
                scrub: 1.5,
                anticipatePin: 1,
            }
        });

        // Orbit Logic
        tl.to({}, {
            duration: totalCards,
            onUpdate: function () {
                const progress = this.progress();
                const totalRotation = progress * Math.PI * 2; // Full rotation potential

                cards.forEach((card, i) => {
                    const offset = (i / totalCards) * Math.PI * 2;
                    const angle = offset - totalRotation;

                    // Vertical Wheel: Y and Z change
                    const y = Math.sin(angle) * radius;
                    const z = Math.cos(angle) * radius - radius; // Offset to keep it in front

                    // Visibility and focus
                    const isFront = Math.cos(angle) > 0.8;
                    const opacity = gsap.utils.mapRange(-1, 1, 0, 1, Math.cos(angle));
                    const scale = gsap.utils.mapRange(-1, 1, 0.4, 1.2, Math.cos(angle));

                    gsap.set(card, {
                        y: y,
                        z: z,
                        opacity: opacity,
                        scale: scale,
                        rotateX: -Math.sin(angle) * 20,
                        filter: `blur(${gsap.utils.mapRange(0.8, 1, 10, 0, Math.abs(Math.cos(angle)))}px)`,
                        pointerEvents: isFront ? 'auto' : 'none',
                        zIndex: Math.round(z + radius)
                    });

                    // Inner Content Parallax
                    const content = card.querySelector('.card-content');
                    if (content) {
                        gsap.set(content, {
                            y: -y * 0.1,
                            rotateX: Math.sin(angle) * 10
                        });
                    }
                });
            }
        });

        // Focal Hub Pulse
        gsap.to('.focal-hub', {
            scale: 1.05,
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="vault" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#010204]">

            {/* 3D Static Shard Field */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1500px' }}>
                {shards.map((s, i) => (
                    <div
                        key={i}
                        className="absolute w-32 h-64 bg-accent/5 backdrop-blur-sm border border-white/5"
                        style={{
                            left: `${50 + s.x}%`,
                            top: `${50 + s.y}%`,
                            transform: `translateZ(${s.z}px) rotate(${s.rotate}deg) scale(${s.scale})`,
                            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                            opacity: 0.1
                        }}
                    />
                ))}
            </div>

            {/* THE NEXUS ORBIT */}
            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>

                {/* Focal Hub Lens (Static distortion zone) */}
                <div className="focal-hub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[75vw] h-[60vh] rounded-[5rem] border border-white/10 z-50 pointer-events-none overflow-hidden bg-radial from-accent/[0.02] to-transparent">
                    <div className="absolute inset-0 backdrop-blur-[8px] saturate-[1.6] opacity-30 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent-secondary/10" />
                    {/* Scanning Beam */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 shadow-[0_0_20px_rgba(45,212,191,0.5)] animate-[scan_6s_ease-in-out_infinite]" />
                </div>

                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card absolute w-[85vw] md:w-[65vw] lg:w-[50vw] aspect-video rounded-[3rem] overflow-hidden group"
                        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                    >
                        <div className="card-content h-full p-12 md:p-20 astral-glass-bright rounded-[3rem] relative overflow-hidden flex flex-col justify-between border border-white/10">

                            {/* Inner Visual alchemy */}
                            <div className="absolute inset-0 z-0 opacity-40">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent" />
                                <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-accent-secondary/10 blur-[100px] rounded-full" />
                            </div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-6">
                                    <span className="text-[10px] font-mono tracking-[0.6em] text-accent uppercase">Protocol // 0{index + 1}</span>
                                    <div className="flex gap-3">
                                        {project.tech.slice(0, 2).map((t, i) => (
                                            <span key={i} className="text-[8px] font-mono text-white/40 border border-white/10 px-3 py-1 rounded-full uppercase">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-6xl md:text-9xl font-display font-bold text-white tracking-tighter leading-none">
                                    {project.title}
                                </h3>

                                <p className="text-lg md:text-2xl text-slate-400 max-w-xl font-medium tracking-tight leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="relative z-10 flex items-end justify-between">
                                <div className="space-y-4">
                                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Synthesis Goal</span>
                                    <span className="text-2xl font-display text-white/60">{project.focus}</span>
                                </div>

                                <div className="flex gap-4">
                                    <a href={project.github} className="w-16 h-16 astral-glass flex items-center justify-center rounded-2xl hover:bg-accent/10 transition-colors">
                                        <Github size={24} className="text-slate-400 group-hover:text-white" />
                                    </a>
                                    <a href={project.link} className="h-16 px-8 astral-glass-bright flex items-center gap-4 rounded-2xl group/link overflow-hidden relative">
                                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] z-10 text-white">Initialize</span>
                                        <ArrowRight size={18} className="text-accent group-hover/link:translate-x-2 transition-transform z-10" />
                                        <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover/link:translate-y-0 transition-transform duration-500" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sidebar Meta Copy */}
            <div className="absolute left-12 bottom-12 z-[60] hidden lg:flex flex-col gap-6">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase font-bold">System // Synthesis</span>
                    <span className="text-2xl font-display text-white/10">Sublime Proofs</span>
                </div>
                <div className="h-24 w-px bg-white/5" />
            </div>

        </section>
    );
}

