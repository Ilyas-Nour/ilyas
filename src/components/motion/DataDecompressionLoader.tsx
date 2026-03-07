'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function DataDecompressionLoader() {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const lineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Counter logic
    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 8) + 2; // Fast random increments
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                setTimeout(() => setIsLoaded(true), 100); // Small pause at 100 before animating out
            }
            setProgress(current);
        }, 40);

        return () => clearInterval(interval);
    }, []);

    // GSAP Outro Animation (Camera Shutter Reveal)
    useGSAP(() => {
        if (isLoaded && lineRef.current && containerRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                }
            });

            /* --- MOTION: Camera Shutter Reveal --- */
            tl.to(lineRef.current, {
                height: '100vh',
                duration: 0.6,
                ease: 'power4.inOut' // Premium weighted expansion
            })
                .to(containerRef.current, {
                    scaleX: 0,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    transformOrigin: 'center center'
                }, "-=0.2"); // Overlap slightly with line expansion
        }
    }, { dependencies: [isLoaded] });

    return (
        <AnimatePresence>
            <div
                ref={containerRef}
                className="fixed inset-0 z-[999] bg-[#000000] flex items-center justify-center font-mono text-white pointer-events-none origin-center"
            >
                {/* The thin, sharp Electric Indigo line */}
                <div
                    ref={lineRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-0 bg-[#6610f2] shadow-[0_0_15px_rgba(102,16,242,0.8)]"
                />

                {/* The 0-100 Percentage Counter */}
                {!isLoaded && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 mix-blend-difference">
                        <span className="text-[#6610f2] text-xs uppercase tracking-widest mr-2">SYS_LOAD</span>
                        <span className="text-4xl font-light tracking-tighter">
                            {progress.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xl text-neutral-500">%</span>
                    </div>
                )}
            </div>
        </AnimatePresence>
    );
}
