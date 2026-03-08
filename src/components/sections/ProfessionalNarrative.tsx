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
        // Replaces basic fade with a premium weighted scale & gaussian blur
        const elements = gsap.utils.toArray('.gsap-reveal');

        elements.forEach((el: any) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(10px)',
                    y: 30
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-[50vh] bg-[#050505] py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden z-20">
            <div className="w-full">

                {/* Section Header */}
                <div className="mb-16 md:mb-24 flex items-center gap-6">
                    <AmazingTypography
                        as="h2"
                        text="01 — The Background"
                        className="text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase"
                    />
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </div>

                {/* Core Narrative */}
                <div className="gsap-reveal">
                    <AmazingTypography
                        text="I am a developer driven by logic and clean code."
                        className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.2] text-white"
                        stagger={0.06}
                    />

                    <div className="mt-12 flex flex-col md:flex-row gap-8 md:gap-16">
                        <p className="flex-1 text-lg md:text-xl text-neutral-400 leading-relaxed">
                            My training at OFPPT has grounded me in the fundamentals of Full-Stack development,
                            focusing on architectural patterns and database design.
                        </p>
                        <p className="flex-1 text-lg md:text-xl text-neutral-400 leading-relaxed">
                            While training builds the foundation, my personal systems—like <span className="text-white font-medium">PrivaFlow</span> and <span className="text-white font-medium">Animy</span>—prove
                            my ability to architect, refine, and ship production-ready software.
                        </p>
                    </div>
                </div>

                {/* Metrics / Status */}
                <div className="gsap-reveal mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-neutral-900">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-[#6610f2] uppercase">Status</span>
                        <span className="text-sm font-medium text-white">Available for Hire</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">Location</span>
                        <span className="text-sm font-medium text-white">Casablanca, Morocco</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">Focus</span>
                        <span className="text-sm font-medium text-white">Architecture & UX</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">Stack</span>
                        <span className="text-sm font-medium text-white">Laravel / React</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
