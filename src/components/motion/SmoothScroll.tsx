'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

/**
 * @component: SmoothScroll
 * @description: Provides global momentum scrolling using Lenis.
 * Essential for the high-end feel of the Monolith & Glass architecture.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
