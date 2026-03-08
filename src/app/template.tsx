'use client';

import { motion } from 'framer-motion';

/**
 * @component Template
 * @description Next.js Page Template used for orchestrating Framer Motion exit/entry animations
 * between route changes. Provides a solid 'curtain' reveal effect.
 */
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <motion.div
                className="fixed inset-0 z-[80] bg-black origin-top pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
                {children}
            </motion.main>
        </>
    );
}
