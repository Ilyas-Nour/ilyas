'use client';

import React, { useRef } from 'react';
import { Github, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmazingTypography from '@/components/motion/AmazingTypography';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        title: 'Animy',
        focus: 'Performance & Scalability',
        description: 'A high-performance anime streaming aggregator built for extreme concurrent loads. Features edge caching and optimized video delivery pipelines.',
        tech: ['React', 'Node.js', 'Redis', 'PostgreSQL'],
        color: '#6610f2',
        link: '#',
        github: '#'
    },
    {
        title: 'PrivaFlow',
        focus: 'Data Security & Privacy-First UI',
        description: 'An encrypted workflow management system ensuring zero-knowledge data processing. Architected with strict access controls and end-to-end encryption.',
        tech: ['Next.js', 'TypeScript', 'AES-256', 'Tailwind'],
        color: '#8e44ff',
        link: '#',
        github: '#'
    },
    {
        title: 'TopNature',
        focus: 'E-Commerce Architecture & Conversion',
        description: 'A robust e-commerce platform designed for maximum conversion rates. Implements Headless architecture for instant page loads and seamless checkout.',
        tech: ['Laravel', 'Vue.js', 'Stripe', 'MySQL'],
        color: '#00d2ff',
        link: '#',
        github: '#'
    }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className="project-card-container sticky top-[10vh] w-full min-h-[80vh] flex items-center justify-center mb-[10vh] gpu-accelerated"
            style={{ zIndex: index + 1 }}
        >
            <div className="group relative w-full h-full max-w-6xl aspect-[16/9] md:aspect-auto md:h-[70vh] bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row gap-12 transition-all duration-700 hover:border-white/10">

                {/* Background Accent Glow */}
                <div
                    className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 blur-[100px] transition-colors duration-700 group-hover:opacity-20"
                    style={{ backgroundColor: project.color }}
                />

                {/* Left: Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                    <span
                        className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
                        style={{ color: project.color }}
                    >
                        Project 0{index + 1} // {project.focus}
                    </span>

                    <AmazingTypography
                        text={project.title}
                        className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-8"
                        stagger={0.05}
                    />

                    <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-4 py-1.5 text-xs font-mono text-neutral-400 bg-white/5 border border-white/10 rounded-full">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-8">
                        <a href={project.link} className="flex items-center gap-3 text-sm font-medium text-white group/link transition-all hover:gap-5">
                            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all group-hover/link:after:w-full">
                                View System
                            </span>
                            <ArrowRight size={18} />
                        </a>
                        <a href={project.github} className="text-neutral-500 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                {/* Right: Visual (Mockup Frame) */}
                <div className="w-full md:w-1/2 relative group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <div className="w-full h-full rounded-2xl bg-[#050505] border border-white/5 overflow-hidden shadow-Inner shadow-white/5 relative">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent transform -translate-x-full group-hover:translate-x-full duration-[1500ms] transition-transform" />

                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-32 h-32 rounded-full blur-[60px] opacity-20"
                                style={{ backgroundColor: project.color }}
                            />
                            <span className="font-mono text-[10px] text-neutral-800 tracking-[0.5em] uppercase pointer-events-none">
                                System Visualization
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function CaseStudyVault() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        /* --- MOTION: Section Header Reveal --- */
        gsap.fromTo('.vault-header',
            { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
            {
                opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="vault" className="relative w-full bg-[#050505] py-32 px-6">
            <div className="max-w-7xl w-full mx-auto">

                {/* Section Header */}
                <div className="vault-header mb-24 flex items-center gap-6">
                    <AmazingTypography
                        as="h2"
                        text="03 — The Vault (Case Studies)"
                        className="text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase"
                    />
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </div>

                {/* Stacking Cards Container */}
                <div className="relative flex flex-col">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
