'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AmbientLightCanvas from '@/components/canvas/AmbientLightCanvas';

/**
 * @component: PrecisionHero
 * @description: The entry point of the Monolith portfolio. 
 * Features stark typography and a subtle 3D ambient background.
 */
export default function PrecisionHero() {
    return (
        <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
            {/* 3D Background */}
            <AmbientLightCanvas />

            {/* Foreground Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter leading-[1.1] text-white">
                        Ilyas Nour <span className="text-neutral-500">—</span> <br className="hidden md:block" />
                        Full-Stack Engineer.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="mt-8 max-w-2xl"
                >
                    <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed">
                        Specializing in Laravel, SQL, and Architecture. <br className="hidden md:block" />
                        Currently refining digital systems at OFPPT Ben M’sik.
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
