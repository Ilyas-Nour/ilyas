'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

/**
 * @component: PageTransition
 * @description: Wraps route changes in a sophisticated 'Fade and Scale' transition.
 * Avoids aggressive jitter or glitching. The current view slightly shrinks while fading out.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] // Custom refined spring-like easing 
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
