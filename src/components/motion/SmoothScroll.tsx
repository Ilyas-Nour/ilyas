'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * @component SmoothScroll
 * @description Bulletproof momentum scroll for high-end pinning.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync ScrollTrigger on every frame
        lenis.on('scroll', ScrollTrigger.update);

        // Frame-Sync via GSAP Ticker
        const updateTick = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateTick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateTick);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="smooth-scroll-wrapper relative">
            {children}
        </div>
    );
}
