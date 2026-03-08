'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AmbientLightCanvas from '@/components/canvas/AmbientLightCanvas';
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
                y: -150, // Subtle upward movement
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1, // Momentum-based scrub
                }
            });
        }
    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-center overflow-hidden gpu-accelerated z-10">
            {/* 3D Background */}
            <AmbientLightCanvas />

            {/* Foreground Content */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full pointer-events-none">

                <div className="relative z-[15]">
                    <AmazingTypography
                        text="Ilyas Nour —"
                        className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter leading-[1.1] text-white"
                        delay={1.0}
                    />
                    <AmazingTypography
                        as="h2"
                        text="Full-Stack Developer."
                        className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter leading-[1.1] text-neutral-500"
                        delay={1.2}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
                    className="mt-12 max-w-2xl"
                >
                    <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed">
                        I specialize in building scalable web applications with Laravel and React. <br className="hidden md:block" />
                        Currently based in Casablanca, focusing on clean architecture and high-performance logic.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4"
                >
                    <div className="w-[1px] h-12 bg-neutral-800 relative overflow-hidden">
                        <motion.div
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                            className="absolute inset-0 bg-white"
                        />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 hidden md:block">
                        Scroll to explore
                    </span>
                </motion.div>

            </div>
        </section>
    );
}
