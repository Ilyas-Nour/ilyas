'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * @component GlassNav
 * @description Top-fixed navigation leveraging deep backdrop-filter blurs.
 * Uses Framer Motion to automatically hide on scroll down and reveal on scroll up, 
 * maximizing screen real estate for the user.
 */
export default function GlassNav() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 inset-x-0 z-[100] h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-center px-6"
        >
            <div className="w-full max-w-7xl flex items-center justify-between">
                {/* Brand */}
                <div className="text-white font-medium tracking-tight flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span>ILYAS NOUR</span>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
                    <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
                    <a href="#skills" className="hover:text-white transition-colors duration-300">Skills</a>
                    <a href="#vault" className="hover:text-white transition-colors duration-300">The Vault</a>
                </div>

                {/* Action */}
                <button className="px-5 py-2 text-sm text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 focus:ring-2 focus:ring-indigo-500/50 outline-none">
                    Contact
                </button>
            </div>
        </motion.nav>
    );
}
