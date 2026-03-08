'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Lightbulb, Briefcase, Mail } from 'lucide-react';

const NavItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Expertise', icon: Lightbulb, href: '#skills' },
    { name: 'Projects', icon: Briefcase, href: '#vault' },
    { name: 'Contact', icon: Mail, href: '#contact' },
];

/**
 * @component ShardNav
 * @description Magnetic, refractive navigation dock.
 * Minimalist "shards" that expand into full labels on hover.
 */
export default function GlassNav() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [hovered, setHovered] = useState<number | null>(null);

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
                visible: { y: 0, opacity: 1 },
                hidden: { y: -20, opacity: 0 },
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-4"
        >
            {/* Magnetic Brand Indicator */}
            <div className="flex flex-col items-center opacity-40">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.6em]">System.active</span>
                <div className="w-px h-3 bg-accent/30 mt-1" />
            </div>

            <div className="flex items-center gap-1 p-1.5 bg-black/40 border border-white/10 backdrop-blur-md rounded-full shadow-2xl">
                {NavItems.map((item, i) => {
                    const Icon = item.icon;
                    const isHovered = hovered === i;

                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex items-center h-11 px-4 rounded-full transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-2.5 z-10 relative">
                                <Icon
                                    size={16}
                                    className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-neutral-500'}`}
                                />
                                <span
                                    className={`text-[11px] font-display font-medium tracking-widest uppercase whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered
                                        ? 'w-auto opacity-100 ml-0'
                                        : 'w-0 opacity-0 ml-[-10px]'
                                        } ${isHovered ? 'text-white' : 'text-neutral-500'}`}
                                >
                                    {item.name}
                                </span>
                            </div>

                            {/* Performant Snappy Pill */}
                            {isHovered && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full z-0"
                                    transition={{ type: 'spring', stiffness: 600, damping: 40 }}
                                />
                            )}

                            {/* Refractive Glow */}
                            <div className={`absolute inset-0 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        </a>
                    );
                })}
            </div>
        </motion.nav>
    );
}
