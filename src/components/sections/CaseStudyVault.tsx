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

const staticParticles = [...Array(30)].map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    z: Math.random() * -3000,
    opacity: 0.05 + Math.random() * 0.1
}));

export default function CaseStudyVault() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const items = gsap.utils.toArray('.project-card') as HTMLElement[];

        // Intensity of the tunnel depth
        const totalScroll = items.length * 2000;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${totalScroll}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        items.forEach((item, i) => {
            // Journey: Distance (-3000px) -> Focal (0px) -> Past (2000px)
            tl.fromTo(item,
                {
                    z: -4000,
                    opacity: 0,
                    filter: 'blur(30px) brightness(0.5)',
                    scale: 0.2,
                    rotateX: 10,
                    rotateY: -5
                },
                {
                    z: 0,
                    opacity: 1,
                    filter: 'blur(0px) brightness(1)',
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    ease: "power2.inOut",
                    duration: 1
                },
                i * 1.5
            )
                .to(item, {
                    z: 4000,
                    opacity: 0,
                    filter: 'blur(50px) brightness(2)',
                    scale: 5,
                    rotateX: -10,
                    ease: "power2.in",
                    duration: 1
                }, (i * 1.5) + 0.8);

            // Title Fragment Reveal
            const title = item.querySelector('.project-title');
            if (title) {
                gsap.fromTo(title,
                    { opacity: 0, letterSpacing: '1.5em', filter: 'blur(15px)' },
                    {
                        opacity: 1, letterSpacing: '-0.02em', filter: 'blur(0px)',
                        duration: 0.6,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: item,
                            containerAnimation: tl,
                            start: "center 60%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="projects" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#020408]">

            {/* Ambient Dimensional Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1000px' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.03)_0%,transparent_70%)]" />
                {staticParticles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
                        style={{
                            left: p.left,
                            top: p.top,
                            transform: `translateZ(${p.z}px)`,
                            opacity: p.opacity
                        }}
                    />
                ))}
            </div>

            {/* Fixed Central Focal Lens (Refractive) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[65vh] rounded-[4rem] border border-white/5 pointer-events-none z-20 overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-[4px] saturate-[1.4] opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-radial from-accent/[0.04] to-transparent" />
                {/* Scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-[scan_4s_linear_infinite]" />
            </div>

            {/* Section Header */}
            <div className="absolute top-16 left-0 w-full px-8 md:px-24 z-30 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-mono tracking-[0.6em] text-accent uppercase">Dimensional // Archive</span>
                    <div className="h-px w-32 bg-accent/30" />
                </div>
                <h2 className="text-5xl md:text-8xl font-display font-medium text-white/5 tracking-tighter select-none">
                    Artifacts —
                </h2>
            </div>

            {/* THE SPATIAL TUNNEL */}
            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card absolute w-[90vw] md:w-[70vw] lg:w-[55vw] aspect-video p-[1px] shadow-[0_120px_250px_-50px_rgba(0,0,0,1)] rounded-[3rem] overflow-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="astral-glass-bright rounded-[2.95rem] h-full p-12 md:p-24 relative overflow-hidden backdrop-blur-3xl">

                            {/* Inner Visual Alchemical layers */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-30" />
                                <div className="absolute top-[-30%] right-[-10%] w-full h-full bg-radial from-accent-secondary/15 to-transparent blur-[150px] opacity-40" />
                            </div>

                            {/* Project Content */}
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="space-y-10">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono tracking-[0.5em] text-accent uppercase font-bold">Sequence</span>
                                            <span className="text-2xl font-display text-white/20">0{index + 1}</span>
                                        </div>
                                        <div className="h-10 w-px bg-white/10" />
                                        <div className="flex gap-4">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[9px] font-mono text-slate-500 border border-white/5 bg-white/[0.03] px-4 py-1.5 rounded-full uppercase tracking-widest font-semibold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="project-title text-7xl md:text-9xl font-display font-bold text-white tracking-[1.5em] leading-[0.85] filter blur-[15px] opacity-0 transition-all">
                                        {project.title}
                                    </h3>

                                    <p className="text-xl md:text-3xl text-slate-300 max-w-2xl leading-relaxed font-light tracking-tight">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mt-16">
                                    <div className="flex items-center gap-10">
                                        <a href={project.link} className="flex items-center gap-5 text-xs font-mono tracking-[0.4em] text-white uppercase group/btn py-4 border-b border-white/5 hover:border-accent transition-all duration-700">
                                            <span>Initialize Journey</span>
                                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-accent group-hover/btn:bg-accent/10 transition-all">
                                                <ArrowRight size={20} className="text-accent transition-transform group-hover/btn:translate-x-2" />
                                            </div>
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <a href={project.github} className="w-14 h-14 astral-glass rounded-2xl flex items-center justify-center border-none hover:scale-110 hover:bg-accent/10 transition-all duration-500 text-slate-500 hover:text-white">
                                            <Github size={24} />
                                        </a>
                                        <span className="text-[10px] font-mono tracking-[0.3em] text-white/10 uppercase vertical-text hidden md:block select-none">Dimensional Repository</span>
                                    </div>
                                </div>
                            </div>

                            {/* Refractive Scanning highlight */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent/5 via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

