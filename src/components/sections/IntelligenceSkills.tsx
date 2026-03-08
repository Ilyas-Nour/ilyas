'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    SiPhp, SiLaravel, SiMysql, SiPostgresql, SiJavascript,
    SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiAlpinedotjs,
    SiTailwindcss, SiGit, SiDocker, SiNpm,
    SiZorin, SiLinux, SiFigma, SiPostman,
    SiGraphql, SiRedis, SiHtml5, SiCss,
    SiPython, SiRedux, SiVuedotjs,
    SiAngular, SiJquery, SiBootstrap, SiSass,
    SiMui, SiExpress, SiNestjs, SiMongodb,
    SiPrisma, SiFirebase, SiSupabase, SiAppwrite,
    SiGithub, SiNginx, SiVite, SiWebpack,
    SiBabel, SiVercel, SiUbuntu,
    SiDebian
} from 'react-icons/si';
import { TbApi, TbHierarchy } from 'react-icons/tb';
import { FaWindows, FaAws } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const skills = [
    // --- ROW 1 TREND ---
    { name: 'HTML5', icon: SiHtml5, color: '#e34f26', category: 'Frontend' },
    { name: 'CSS3', icon: SiCss, color: '#1572b6', category: 'Frontend' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'Language' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', category: 'Language' },
    { name: 'PHP', icon: SiPhp, color: '#777bb4', category: 'Backend' },
    { name: 'Python', icon: SiPython, color: '#3776ab', category: 'Language' },
    { name: 'React', icon: SiReact, color: '#61dafb', category: 'Frontend' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'Architecture' },
    { name: 'Redux', icon: SiRedux, color: '#764abc', category: 'State' },
    { name: 'Redux Toolkit', icon: SiRedux, color: '#764abc', category: 'State' },
    { name: 'Vue.js', icon: SiVuedotjs, color: '#4fc08d', category: 'Frontend' },
    { name: 'Angular', icon: SiAngular, color: '#dd0031', category: 'Frontend' },
    { name: 'jQuery', icon: SiJquery, color: '#0769ad', category: 'Frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4', category: 'Styling' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952b3', category: 'Styling' },
    { name: 'Sass', icon: SiSass, color: '#cc6699', category: 'Styling' },
    { name: 'Material UI', icon: SiMui, color: '#007fff', category: 'Styling' },
    { name: 'Figma', icon: SiFigma, color: '#f24e1e', category: 'Design' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'Backend' },
    { name: 'Express.js', icon: SiExpress, color: '#ffffff', category: 'Backend' },
    { name: 'NestJS', icon: SiNestjs, color: '#e0234e', category: 'Backend' },
    { name: 'Laravel', icon: SiLaravel, color: '#ff2d20', category: 'Architecture' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1', category: 'Database' },
    { name: 'MySQL', icon: SiMysql, color: '#4479a1', category: 'Database' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248', category: 'Database' },

    // --- ROW 2 TREND ---
    { name: 'Redis', icon: SiRedis, color: '#dc382d', category: 'Cache' },
    { name: 'Prisma', icon: SiPrisma, color: '#2d3748', category: 'ORM' },
    { name: 'GraphQL', icon: SiGraphql, color: '#e10098', category: 'API' },
    { name: 'Firebase', icon: SiFirebase, color: '#ffca28', category: 'BaaS' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e', category: 'BaaS' },
    { name: 'Appwrite', icon: SiAppwrite, color: '#f02d65', category: 'BaaS' },
    { name: 'Git', icon: SiGit, color: '#f05032', category: 'Version Control' },
    { name: 'GitHub', icon: SiGithub, color: '#ffffff', category: 'Platform' },
    { name: 'Docker', icon: SiDocker, color: '#2496ed', category: 'DevOps' },
    { name: 'NGINX', icon: SiNginx, color: '#009639', category: 'Server' },
    { name: 'Vite', icon: SiVite, color: '#646cff', category: 'Build' },
    { name: 'Webpack', icon: SiWebpack, color: '#8dd6f9', category: 'Build' },
    { name: 'Babel', icon: SiBabel, color: '#f9dc3e', category: 'Build' },
    { name: 'npm', icon: SiNpm, color: '#cb3837', category: 'Package' },
    { name: 'AWS', icon: FaAws, color: '#232f3e', category: 'Cloud' },
    { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'Cloud' },
    { name: 'Postman', icon: SiPostman, color: '#ff6c37', category: 'API' },
    { name: 'Zorin OS', icon: SiZorin, color: '#0cc2f2', category: 'System' },
    { name: 'Ubuntu', icon: SiUbuntu, color: '#e9430f', category: 'System' },
    { name: 'Debian', icon: SiDebian, color: '#a81d33', category: 'System' },
    { name: 'Linux', icon: SiLinux, color: '#fcc624', category: 'System' },
    { name: 'Windows', icon: FaWindows, color: '#00adef', category: 'System' },
    { name: 'VS Code', icon: VscCode, color: '#007acc', category: 'Editor' },
    { name: 'UML', icon: TbHierarchy, color: '#ffffff', category: 'Architecture' },
];

/**
 * @component IntelligenceSkills
 * @description Displays technical competencies in a dynamic dual-row marquee.
 * Features brand-colored logos and names with infinite horizontal scrolling
 * moving in opposite directions for a high-end, living look.
 */
export default function IntelligenceSkills() {
    const sectionRef = useRef<HTMLElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

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

        // Infinite Marquee Logic: uses xPercent for a resolution-independent seamless loop
        const setupMarquee = (row: HTMLDivElement, direction: number) => {
            // Duplicate content once to ensure we have a trailing set to loop into
            const content = row.innerHTML;
            row.innerHTML = content + content;

            // Animate from 0 to -50% (or vice versa) for a perfect loop
            const animation = gsap.fromTo(row,
                { xPercent: direction > 0 ? 0 : -50 },
                {
                    xPercent: direction > 0 ? -50 : 0,
                    duration: 60, // Slow, premium crawl
                    ease: 'none',
                    repeat: -1,
                }
            );

            row.addEventListener('mouseenter', () => animation.pause());
            row.addEventListener('mouseleave', () => animation.play());
        };

        // Initialize rows with slight delay to ensure offsetWidth is captured correctly
        setTimeout(() => {
            setupMarquee(row1Ref.current!, 1);  // Right to Left
            setupMarquee(row2Ref.current!, -1); // Left to Right
        }, 100);

    }, { scope: sectionRef });

    // Split skills into two rows
    const row1Skills = skills.slice(0, Math.ceil(skills.length / 2));
    const row2Skills = skills.slice(Math.ceil(skills.length / 2));

    return (
        <section ref={sectionRef} id="skills" className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#050505] py-24 px-6 md:px-12 lg:px-24 overflow-hidden gpu-accelerated z-30">
            <div className="w-full">

                {/* Section Header */}
                <div className="skills-header mb-20 flex items-center gap-6">
                    <h2 className="text-sm font-display tracking-[0.2em] text-neutral-500 uppercase">
                        02 — Core Expertise
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Marquee Rows */}
                <div className="flex flex-col gap-8 w-full">
                    {/* Row 1: Right to Left */}
                    <div className="relative w-full overflow-hidden py-4">
                        <div ref={row1Ref} className="flex gap-4 whitespace-nowrap will-change-transform">
                            {row1Skills.map((skill, i) => {
                                const Icon = skill.icon;
                                return (
                                    <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 group cursor-default">
                                        <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
                                            <Icon size={28} />
                                        </div>
                                        <span className="text-sm font-medium tracking-wide transition-colors duration-300" style={{ color: skill.color }}>
                                            {skill.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Row 2: Left to Right */}
                    <div className="relative w-full overflow-hidden py-4">
                        <div ref={row2Ref} className="flex gap-4 whitespace-nowrap will-change-transform">
                            {row2Skills.map((skill, i) => {
                                const Icon = skill.icon;
                                return (
                                    <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 group cursor-default">
                                        <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
                                            <Icon size={28} />
                                        </div>
                                        <span className="text-sm font-medium tracking-wide transition-colors duration-300" style={{ color: skill.color }}>
                                            {skill.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
