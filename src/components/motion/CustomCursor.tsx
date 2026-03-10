'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * @component CustomCursor
 * @description "The Astral Lens" - A high-fidelity refractive cursor.
 */
export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const lens = lensRef.current;
        if (!cursor || !lens) return;

        // Hide real cursor
        document.body.style.cursor = 'none';

        const onMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            // Precision Point (Zero delay)
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'none'
            });

            // The Lens (Smooth lag for organic feel)
            gsap.to(lens, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'expo.out'
            });
        };

        const onMouseDown = () => {
            gsap.to(lens, { scale: 0.8, duration: 0.3 });
            gsap.to(cursor, { scale: 2, duration: 0.3 });
        };

        const onMouseUp = () => {
            gsap.to(lens, { scale: 1, duration: 0.5 });
            gsap.to(cursor, { scale: 1, duration: 0.5 });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .astral-glass')) {
                gsap.to(lens, { width: 160, height: 160, duration: 0.6, ease: 'back.out(2)' });
            } else {
                gsap.to(lens, { width: 128, height: 128, duration: 0.6, ease: 'back.out(2)' });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, [isVisible]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
            {/* The Lens (Refractive Layer) */}
            <div
                ref={lensRef}
                className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/5 pointer-events-none transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    backdropFilter: 'blur(8px) saturate(1.8)',
                    background: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.05) 0%, transparent 70%)'
                }}
            />

            {/* Precision Dot */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
}

