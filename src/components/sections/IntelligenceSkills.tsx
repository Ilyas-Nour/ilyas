'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    SiPhp, SiLaravel, SiMysql, SiPostgresql, SiJavascript,
    SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiAlpinedotjs,
    SiTailwindcss, SiGit, SiDocker, SiComposer, SiNpm,
    SiZorin, SiLinux, SiFigma, SiPostman,
    SiGraphql, SiRedis
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import { FaAws, FaWindows } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const skills = [
    { name: 'PHP', icon: SiPhp, category: 'Backend' },
    { name: 'Laravel', icon: SiLaravel, category: 'Architecture' },
    { name: 'MySQL', icon: SiMysql, category: 'Database' },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'Database' },
    { name: 'JavaScript', icon: SiJavascript, category: 'Language' },
    { name: 'TypeScript', icon: SiTypescript, category: 'Language' },
    { name: 'React.js', icon: SiReact, category: 'Frontend' },
    { name: 'Next.js', icon: SiNextdotjs, category: 'Architecture' },
    { name: 'Node.js', icon: SiNodedotjs, category: 'Backend' },
    { name: 'Alpine.js', icon: SiAlpinedotjs, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Styling' },
    { name: 'Git', icon: SiGit, category: 'Version Control' },
    { name: 'Docker', icon: SiDocker, category: 'DevOps' },
    { name: 'Composer', icon: SiComposer, category: 'Package' },
    { name: 'NPM', icon: SiNpm, category: 'Package' },
    { name: 'Zorin OS', icon: SiZorin, category: 'Environment' },
    { name: 'Linux', icon: SiLinux, category: 'System' },
    { name: 'Windows', icon: FaWindows, category: 'System' },
    { name: 'Figma', icon: SiFigma, category: 'Design' },
    { name: 'Postman', icon: SiPostman, category: 'API' },
    { name: 'REST APIs', icon: TbApi, category: 'Architecture' },
    { name: 'GraphQL', icon: SiGraphql, category: 'Architecture' },
    { name: 'Redis', icon: SiRedis, category: 'Cache' },
    { name: 'AWS', icon: FaAws, category: 'Cloud' },
    { name: 'Security', icon: MdSecurity, category: 'Practices' },
];

/**
 * @component: MagneticTile
 * @description: A wrapper that uses GSAP quickTo for a high-performance magnetic literal lean toward cursor.
 */
function MagneticTile({ children }: { children: React.ReactNode }) {
    const tileRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!tileRef.current) return;

        const el = tileRef.current;
        const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power4.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power4.out' });
        const rotateXTo = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power4.out' });
        const rotateYTo = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power4.out' });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;

            // Move the tile physically towards the cursor (Magnet effect)
            xTo(relX * 0.2);
            yTo(relY * 0.2);

            // Subtle 3D lean towards cursor
            rotateXTo(relY * -0.1);
            rotateYTo(relX * 0.1);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            rotateXTo(0);
            rotateYTo(0);
            // Snap back
            gsap.to(el, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={tileRef} className="skill-tile w-full relative perspective-1000 origin-center opacity-0 transform translate-y-12 gpu-accelerated">
            {children}
        </div>
    );
}

export default function IntelligenceSkills() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        /* --- MOTION: High-Speed Stagger Reveal --- */
        if (!sectionRef.current) return;

        // Header Reveal
        gsap.fromTo('.skills-header',
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            {
                opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );

        // Staggered Grid Reveal
        gsap.to('.skill-tile', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.5)', // Adds a slight overshoot bounce
            stagger: {
                amount: 0.8, // The total time the stagger should take to run through all items
                from: 'start' // from top-left to bottom-right (bottom-up feel)
            },
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 85%'
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="skills" className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] py-32 px-6 overflow-hidden gpu-accelerated">
            <div className="max-w-6xl w-full mx-auto">

                {/* Section Header */}
                <div className="skills-header mb-16 md:mb-24 flex items-center gap-6">
                    <h2 className="text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase">
                        02 — Technical Intelligence
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </div>

                {/* Bento Grid */}
                <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {skills.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <MagneticTile key={i}>
                                <div className="group relative w-full flex flex-col items-center justify-center p-6 h-32 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md cursor-default transition-colors duration-500 hover:bg-white/[0.04] hover:border-[#6610f2]/50 hover:shadow-[0_0_30px_rgba(102,16,242,0.15)] overflow-hidden">
                                    {/* Logo Container */}
                                    <div className="text-neutral-500 group-hover:text-white transition-colors duration-500 mb-3 group-hover:scale-110 transform-gpu flex items-center justify-center">
                                        <Icon size={32} />
                                    </div>

                                    {/* Text Reveal */}
                                    <div className="absolute bottom-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-xs font-medium tracking-wide text-[#6610f2]">
                                        {skill.name}
                                    </div>

                                    {/* Ambient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#6610f2]/0 to-[#6610f2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </MagneticTile>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
