'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticFluidCanvas from '@/components/canvas/MagneticFluidCanvas';
import AmazingTypography from '@/components/motion/AmazingTypography';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * @component PrecisionHero
 * @description The high-impact entry point of the portfolio. 
 * Integrates an 'AmbientLightCanvas' (R3F) for visual depth and utilizes GSAP 
 * for a momentum-based parallax scroll on the main headings.
 */
export default function PrecisionHero() {
    const heroRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        /* --- MOTION: Hero Parallax Scroll --- */
        if (textRef.current && heroRef.current) {
            gsap.to(textRef.current, {
                y: -100,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }
    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-center overflow-hidden gpu-accelerated z-10">
            {/* 3D Background */}
            <MagneticFluidCanvas />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 z-[1] bg-radial from-transparent via-[#020408]/40 to-[#020408] pointer-events-none" />

            {/* Foreground Content */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full">

                <div ref={textRef} className="relative z-[15]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-block text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-accent mb-6">
                            Architecting Digital Excellence
                        </span>

                        <AmazingTypography
                            text="Ilyas Nour"
                            className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold tracking-tighter leading-[0.8] text-white"
                            delay={0.4}
                        />
                        <div className="flex flex-wrap items-baseline gap-4 md:gap-8 mt-4 overflow-hidden">
                            <AmazingTypography
                                as="h2"
                                text="Full-Stack"
                                className="text-5xl md:text-8xl lg:text-[8rem] font-display font-medium tracking-tight text-white/20"
                                delay={0.6}
                            />
                            <AmazingTypography
                                as="h2"
                                text="Engineer."
                                className="text-5xl md:text-8xl lg:text-[8rem] font-display font-medium tracking-tight text-accent-gradient"
                                delay={0.8}
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                    className="mt-16 max-w-xl backdrop-blur-sm p-8 rounded-2xl astral-glass relative group"
                >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/50 to-accent-secondary/50 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed relative z-10">
                        Synthesizing clean architecture with immersive user experiences.
                        Currently sculpting high-performance applications with Laravel and the modern web stack.
                    </p>
                </motion.div>

                {/* Status Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 2 }}
                    className="absolute bottom-12 right-6 md:right-12 flex flex-col items-end gap-2"
                >
                    <div className="flex items-center gap-3 astral-glass px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Available for innovation
                    </div>
                </motion.div>

                {/* Scroll Prompt */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="absolute bottom-12 left-6 md:left-12"
                >
                    <div className="w-[1px] h-24 bg-white/5 relative overflow-hidden">
                        <motion.div
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-accent to-transparent"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

