'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmazingTypography from '@/components/motion/AmazingTypography';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * @component ProfessionalNarrative
 * @description The 'About' section of the portfolio. 
 * Replaces standard fades with a premium GSAP-driven 'Scale & Blur' reveal 
 * to maintain the cinematic aesthetic of the Monolith design system.
 */
export default function ProfessionalNarrative() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        /* --- MOTION: Section Entry Logic --- */
        const elements = gsap.utils.toArray('.gsap-reveal');

        elements.forEach((el: any) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    scale: 0.98,
                    filter: 'blur(15px)',
                    y: 40
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-[70vh] py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden z-20">
            <div className="w-full max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <span className="text-xs font-mono tracking-[0.4em] text-accent uppercase">01 / Foundation</span>
                        <div className="h-px w-24 bg-gradient-to-r from-accent/50 to-transparent" />
                    </div>
                    <AmazingTypography
                        as="h2"
                        text="Philosophy —"
                        className="text-4xl md:text-6xl font-display font-medium text-white/40"
                    />
                </div>

                {/* Core Narrative */}
                <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-12">
                        <AmazingTypography
                            text="Architecture is the silence between the logic."
                            className="text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.05] text-white"
                            stagger={0.06}
                        />
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                            I construct digital ecosystems where performance meets aesthetic precision. My background is rooted in the rigor of technical mastery and the fluidity of creative design.
                        </p>
                    </div>

                    <div className="lg:col-span-7 astral-glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed relative z-10">
                            From the initial architectural blueprint to the final pixel-perfect interaction, I ensure every system is built to scale, endure, and inspire. My work on <span className="text-white font-semibold">PrivaFlow</span> and <span className="text-white font-semibold">Animy</span> showcases my dedication to shipping excellence.
                        </p>
                    </div>
                </div>

                {/* Bento Status Grid */}
                <div className="gsap-reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <div className="astral-glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between aspect-square md:aspect-auto md:h-48">
                        <span className="text-[10px] font-mono tracking-widest text-accent uppercase">Expertise</span>
                        <span className="text-lg md:text-xl font-display font-medium text-white">Full-Stack<br />Systems</span>
                    </div>
                    <div className="astral-glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between aspect-square md:aspect-auto md:h-48 border-accent/20">
                        <span className="text-[10px] font-mono tracking-widest text-accent uppercase">Availability</span>
                        <span className="text-lg md:text-xl font-display font-medium text-white">Scaling<br />Now</span>
                    </div>
                    <div className="astral-glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between aspect-square md:aspect-auto md:h-48">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Focus</span>
                        <span className="text-lg md:text-xl font-display font-medium text-white">Clean<br />Architect</span>
                    </div>
                    <div className="astral-glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between aspect-square md:aspect-auto md:h-48">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Location</span>
                        <span className="text-lg md:text-xl font-display font-medium text-white">Casablanca<br />Based</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

