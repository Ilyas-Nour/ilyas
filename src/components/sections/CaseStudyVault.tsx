'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
    {
        title: 'Animy',
        focus: 'Performance & Scalability',
        description: 'A high-performance anime streaming aggregator built for extreme concurrent loads. Features edge caching and optimized video delivery pipelines.',
        tech: ['React', 'Node.js', 'Redis', 'PostgreSQL'],
        link: '#',
        github: '#'
    },
    {
        title: 'PrivaFlow',
        focus: 'Data Security & Privacy-First UI',
        description: 'An encrypted workflow management system ensuring zero-knowledge data processing. Architected with strict access controls and end-to-end encryption.',
        tech: ['Next.js', 'TypeScript', 'AES-256', 'Tailwind'],
        link: '#',
        github: '#'
    },
    {
        title: 'TopNature',
        focus: 'E-Commerce Architecture & Conversion',
        description: 'A robust e-commerce platform designed for maximum conversion rates. Implements Headless architecture for instant page loads and seamless checkout.',
        tech: ['Laravel', 'Vue.js', 'Stripe', 'MySQL'],
        link: '#',
        github: '#'
    }
];

/**
 * @component: ProjectCard
 * @description: Renders a high-end glassmorphic project card.
 * Uses Framer Motion for a side-slide reveal with dynamic Gaussian blur.
 */
function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row gap-8 bg-white/[0.02] border border-white/[0.05] p-8 md:p-12 rounded-2xl backdrop-blur-md overflow-hidden hover:bg-white/[0.04] transition-colors duration-500"
        >
            {/* Decorative Mockup Area (Left) */}
            <div className="w-full md:w-5/12 aspect-[4/3] bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden relative group-hover:border-[#6610f2]/30 transition-colors duration-500 flex items-center justify-center">
                {/* Abstract representation of a screenshot/mockup */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="w-24 h-px bg-[#6610f2] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-x-150 transition-transform duration-500" />
                <span className="text-neutral-700 font-mono text-xs uppercase tracking-widest relative z-10 group-hover:text-[#6610f2]/50 transition-colors duration-500">
                    Visual Asset / Mockup
                </span>
            </div>

            {/* Content Area (Right) */}
            <div className="w-full md:w-7/12 flex flex-col justify-center">
                <span className="text-[#6610f2] font-mono text-xs tracking-widest uppercase mb-4">
                    Focus: {project.focus}
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                    {project.title}
                </h3>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 rounded-md">
                            {t}
                        </span>
                    ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-6 mt-auto">
                    <a href={project.link} className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#6610f2] transition-colors group/link">
                        <span>View Live System</span>
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                    <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                        <Github size={16} />
                        <span>Repository</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * @component: CaseStudyVault
 * @description: The main projects section containing the vault of case studies.
 */
export default function CaseStudyVault() {
    return (
        <section id="vault" className="relative w-full min-h-screen bg-[#050505] py-32 px-6">
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
                        03 — The Vault (Case Studies)
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </motion.div>

                {/* Projects List */}
                <div className="flex flex-col gap-16 md:gap-24">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
