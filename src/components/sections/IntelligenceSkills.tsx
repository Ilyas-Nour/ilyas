'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

/**
 * @config: Core Skills Data
 * Represents the 25+ professional tools requested by the user.
 * Using high-quality React Icons (Simple Icons) for real technical representation.
 */
const skills = [
    { name: 'PHP', icon: SiPhp, category: 'Backend' },
    { name: 'Laravel', icon: SiLaravel, category: 'Architecture' },
    { name: 'MySQL', icon: SiMysql, category: 'Database' },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'Database' },
    { name: 'JavaScript (ES6+)', icon: SiJavascript, category: 'Language' },
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
 * @component: IntelligenceSkills
 * @description: A dense bento grid of glass tiles.
 * Interactions: Subtly lifts on Y-axis and glows Electric Indigo (#6610f2) on hover.
 */
export default function IntelligenceSkills() {
    return (
        <section id="skills" className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] py-32 px-6">
            <div className="max-w-6xl w-full mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-24 flex items-center gap-6"
                >
                    <h2 className="text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase">
                        02 — Technical Intelligence
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </motion.div>

                {/* Bento Grid layout for 25+ items */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                    {skills.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                                }}
                                className="group relative flex flex-col items-center justify-center p-6 h-32 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md cursor-default transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-[#6610f2]/50 hover:shadow-[0_0_30px_rgba(102,16,242,0.15)] overflow-hidden"
                            >
                                {/* SVG Logo Container */}
                                <div className="text-neutral-500 group-hover:text-white transition-colors duration-500 mb-3 group-hover:scale-110 transform-gpu flex items-center justify-center">
                                    <Icon size={32} />
                                </div>

                                {/* Sharp Minimalist Font Reveal */}
                                <div className="absolute bottom-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-xs font-medium tracking-wide text-[#6610f2]">
                                    {skill.name}
                                </div>

                                {/* Ambient Hover Glow behind icon */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#6610f2]/0 to-[#6610f2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
