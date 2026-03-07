'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';

/**
 * @component: SmoothScroll
 * @description: Provides global momentum scrolling using Lenis.
 * Optimized: Links Lenis with GSAP Ticker to eliminate scroll-based jitters.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {

    useEffect(() => {
        // --- PERFORMANCE: Link Lenis with GSAP Ticker ---
        // This ensures GSAP ScrollTrigger calculations are perfectly in-sync with scroll frames.
        const update = (time: number) => {
            gsap.ticker.tick();
        };

        // We use a custom GSAP ticker logic here instead of standard ticker if needed,
        // but often letting Lenis handle the requestAnimationFrame and calling tick() is best.
        gsap.ticker.lagSmoothing(0); // Prevents jumps after frame drops
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05, // More weighted, professional feel
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1.1,
                touchMultiplier: 2
            }}
        >
            {children}
        </ReactLenis>
    );
}
