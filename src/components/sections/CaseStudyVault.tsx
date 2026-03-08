'use client';

import React, { useRef, useEffect } from 'react';
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !scrollContainerRef.current) return;

        const items = gsap.utils.toArray('.project-item') as HTMLElement[];

        // Calculate the horizontal distance to move the track
        const scrollAmount = scrollContainerRef.current.scrollWidth - window.innerWidth;

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollAmount * 2}`, // Extend pinning duration
                pin: true,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        // Translate the entire container track
        tl.to(scrollContainerRef.current, {
            x: -scrollAmount,
            ease: "none",
        });

        // Curvature / Scaling effect for items
        items.forEach((item) => {
            gsap.fromTo(item,
                { scale: 0.8, opacity: 0.3, filter: 'blur(10px)' },
                {
                    scale: 1, opacity: 1, filter: 'blur(0px)',
                    ease: "sine.inOut",
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: tl,
                        start: "left 85%",
                        end: "left 50%",
                        scrub: true,
                    }
                }
            );

            gsap.to(item, {
                scale: 0.8, opacity: 0.3, filter: 'blur(10px)',
                ease: "sine.inOut",
                scrollTrigger: {
                    trigger: item,
                    containerAnimation: tl,
                    start: "left 25%",
                    end: "left -5%",
                    scrub: true,
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="projects" className="relative w-full h-screen bg-[#030303] overflow-hidden flex flex-col justify-center">

            {/* Header */}
            <div className="absolute top-20 left-0 w-full px-6 md:px-12 lg:px-24 z-20">
                <div className="flex items-center gap-6">
                    <AmazingTypography
                        as="h2"
                        text="03 — Curvature Gallery"
                        className="text-sm font-display tracking-[0.2em] text-neutral-500 uppercase"
                    />
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
            </div>

            {/* Horizontal Track */}
            <div ref={scrollContainerRef} className="flex items-center h-[60vh] px-[20vw] gap-[15vw]">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-item relative flex-shrink-0 w-[70vw] md:w-[45vw] aspect-video group"
                    >
                        {/* 3D Card Shell */}
                        <div className="relative w-full h-full bg-[#080808] border border-white/[0.04] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_50px_rgba(129,140,248,0.1)]">

                            {/* Visual Background (refraction-like) */}
                            <div className="absolute inset-0 z-0 opacity-40">
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-transparent"
                                    style={{ backgroundColor: `${project.color}10` }}
                                />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                                <div>
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">
                                        // {project.focus}
                                    </span>
                                    <h3 className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-white mb-4">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm md:text-lg max-w-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <a href={project.link} className="flex items-center gap-2 text-xs font-display tracking-widest text-white uppercase group/btn">
                                            <span>Explore Case</span>
                                            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                        </a>
                                        <a href={project.github} className="text-neutral-500 hover:text-white transition-colors">
                                            <Github size={18} />
                                        </a>
                                    </div>
                                    <div className="hidden md:flex gap-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-[9px] font-mono text-neutral-600 border border-white/5 px-2 py-1 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Highlight */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Background Ambient Text (Experimental) */}
            <div className="absolute bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-5">
                <span className="text-[15vh] font-display font-bold text-white whitespace-nowrap tracking-tighter mix-blend-overlay">
                    EXPERIMENTAL ARCHITECTURE // BEYOND THE GRID // EXPERIMENTAL ARCHITECTURE //
                </span>
            </div>

        </section>
    );
}
