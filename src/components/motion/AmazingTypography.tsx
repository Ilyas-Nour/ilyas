'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Props {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    delay?: number;
    stagger?: number;
}

/**
 * @component AmazingTypography
 * @description Uses SplitType to split text into lines and animates them up from a mask.
 * This satisfies the "amazing text display" requirement.
 */
export default function AmazingTypography({
    text,
    className = "",
    as: Component = 'h1',
    delay = 0,
    stagger = 0.1
}: Props) {
    const textRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        // Split text into lines
        const split = new SplitType(textRef.current, { types: 'lines', lineClass: 'overflow-hidden cursor-default' });

        // For each line, wrap the text in a div to serve as the animated element
        split.lines?.forEach(line => {
            const content = line.innerHTML;
            line.innerHTML = `<div class="line-internal gpu-accelerated">${content}</div>`;
        });

        const lines = textRef.current.querySelectorAll('.line-internal');

        gsap.fromTo(lines,
            { yPercent: 100 },
            {
                yPercent: 0,
                duration: 1.5,
                delay: delay,
                ease: 'power4.out',
                stagger: stagger,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            split.revert();
        };
    }, { scope: textRef });

    return (
        <Component ref={textRef as any} className={`amazing-text ${className}`}>
            {text}
        </Component>
    );
}
