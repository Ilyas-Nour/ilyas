'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import AmazingTypography from '@/components/motion/AmazingTypography';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * @component ContactFooter
 * @description Refined "Digital Monolith" contact section. 
 * Features a 3D tilting glass card, sophisticated masked reveals, and a sharp minimalist footer.
 */
export default function ContactFooter() {
    const containerRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const email = "nour.ilyas@outlook.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useGSAP(() => {
        if (!containerRef.current || !cardRef.current) return;

        /* --- MOTION: Section Entry --- */
        gsap.fromTo(cardRef.current,
            { opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' },
            {
                opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                }
            }
        );

        /* --- MOTION: 3D Parallax Tilt --- */
        const card = cardRef.current;
        const xTo = gsap.quickTo(card, 'rotateY', { duration: 0.7, ease: 'power3.out' });
        const yTo = gsap.quickTo(card, 'rotateX', { duration: 0.7, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Constrain rotation
            const rotateY = (mouseX / (rect.width / 2)) * 8; // Max 8 degrees
            const rotateX = (mouseY / (rect.height / 2)) * -8; // Max -8 degrees

            xTo(rotateY);
            yTo(rotateX);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="contact" className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 py-32 overflow-hidden gpu-accelerated">

            {/* Background Kinetic Dots (Subtle) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">

                {/* Section Tag */}
                <div className="mb-12 flex items-center gap-4 opacity-50">
                    <div className="w-8 h-px bg-white" />
                    <span className="text-xs font-mono uppercase tracking-[0.3em] font-medium text-white">Contact & Connect</span>
                    <div className="w-8 h-px bg-white" />
                </div>

                {/* The Digital Monolith (Glass Card) */}
                <div
                    ref={cardRef}
                    className="relative w-full aspect-video md:aspect-[21/9] bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center text-center perspective-1000 transform-gpu"
                >
                    {/* Inner Accent Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#6610f2] to-transparent opacity-50" />

                    <AmazingTypography
                        text="Let’s Architect Something Great."
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-8"
                        stagger={0.04}
                    />

                    <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
                        Currently available for internships and technical collaborations.
                        Let's focus on logic, scale, and performance.
                    </p>

                    {/* Email Copy Box */}
                    <div
                        onClick={copyEmail}
                        className="group flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer transition-all hover:bg-white/10 hover:border-[#6610f2]/50"
                    >
                        <span className="font-mono text-sm md:text-base text-neutral-300 group-hover:text-white transition-colors">{email}</span>
                        <div className="w-px h-4 bg-white/10" />
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-neutral-500 group-hover:text-white" />}
                    </div>

                    {/* Reflection effect */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                </div>

                {/* Social Grid (GSAP Row) */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl">
                    <a href="https://github.com/Ilyas-Nour" target="_blank" className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:bg-white/[0.05] hover:border-white/20">
                        <div className="flex items-center gap-4">
                            <Github className="text-neutral-500 group-hover:text-white transition-colors" size={24} />
                            <span className="text-sm font-medium text-neutral-400 group-hover:text-white">GitHub</span>
                        </div>
                        <ArrowUpRight className="text-neutral-700 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" size={16} />
                    </a>

                    <a href="#" className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:bg-white/[0.05] hover:border-white/20">
                        <div className="flex items-center gap-4">
                            <Linkedin className="text-neutral-500 group-hover:text-[#0077b5] transition-colors" size={24} />
                            <span className="text-sm font-medium text-neutral-400 group-hover:text-white">LinkedIn</span>
                        </div>
                        <ArrowUpRight className="text-neutral-700 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" size={16} />
                    </a>

                    <a href="mailto:nour.ilyas@outlook.com" className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:bg-white/[0.05] hover:border-white/20 md:col-span-1 col-span-2">
                        <div className="flex items-center gap-4">
                            <Mail className="text-neutral-500 group-hover:text-[#6610f2] transition-colors" size={24} />
                            <span className="text-sm font-medium text-neutral-400 group-hover:text-white">Contact Direct</span>
                        </div>
                        <ArrowUpRight className="text-neutral-700 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" size={16} />
                    </a>
                </div>

            </div>

            {/* Minimalist Baseline Footer */}
            <footer className="absolute bottom-0 w-full py-12 px-6 md:px-12 border-t border-white/5 bg-[#050505]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-1 items-center md:items-start">
                        <span className="text-white font-medium text-base tracking-tight italic">Shifted Logic — 2026.</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-600">Built for scale, not speed.</span>
                    </div>

                    <div className="flex items-center gap-8 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                        <span>Casablanca / Remote</span>
                        <div className="w-1 h-1 rounded-full bg-neutral-800" />
                        <span>Ilyas Nour</span>
                    </div>
                </div>
            </footer>

        </section>
    );
}
