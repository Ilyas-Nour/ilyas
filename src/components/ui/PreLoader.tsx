'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PreLoader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = '';
                    }, 400); // Slight delay at 100%
                    return 100;
                }
                // Random incremental jumps for realistic feel
                return prev + Math.floor(Math.random() * 15) + 1;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
                >
                    {/* Progress Number */}
                    <div className="mb-4 text-4xl md:text-6xl font-black font-mono tracking-tighter">
                        {Math.min(progress, 100)}%
                    </div>

                    {/* Minimalist Progress Bar */}
                    <div className="w-64 h-[2px] bg-neutral-800 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-white origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: progress / 100 }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                        />
                    </div>

                    {/* Glitch Overlay Effect - only appears rapidly before exit */}
                    {progress >= 95 && (
                        <motion.div
                            className="absolute inset-0 bg-white mix-blend-difference pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                            transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
