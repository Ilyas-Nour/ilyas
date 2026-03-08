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
            animate={hidden ? "hidden" : "visible"}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center"
        >
            <div className="flex items-center gap-2 p-2 bg-white/[0.03] border border-white/[0.05] backdrop-blur-2xl rounded-full shadow-2xl">
                {NavItems.map((item, i) => {
                    const Icon = item.icon;
                    const isHovered = hovered === i;

                    return (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex items-center justify-center h-12 rounded-full overflow-hidden px-4 group transition-all"
                            initial={false}
                            animate={{
                                width: isHovered ? 'auto' : 48,
                                backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    size={18}
                                    className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-neutral-500'}`}
                                />
                                <AnimatePresence mode="wait">
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -5 }}
                                            className="text-xs font-display font-medium tracking-widest text-white uppercase whitespace-nowrap"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Refractive highlight */}
                            {isHovered && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </motion.a>
                    );
                })}
            </div>

            {/* Magnetic Brand Indicator */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.6em]">System.active</span>
                <div className="w-px h-4 bg-accent/20 mt-1" />
            </div>
        </motion.nav>
    );
}
