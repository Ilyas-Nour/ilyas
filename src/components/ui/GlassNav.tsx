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
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-6"
        >
            <div className="flex items-center gap-2 p-1.5 astral-glass rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5">
                {NavItems.map((item, i) => {
                    const Icon = item.icon;
                    const isHovered = hovered === i;

                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex items-center h-10 px-4 rounded-full transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-3 z-10 relative">
                                <Icon
                                    size={15}
                                    className={`transition-all duration-500 ${isHovered ? 'text-accent scale-110' : 'text-slate-400 group-hover:text-slate-200'}`}
                                />
                                <span
                                    className={`text-[10px] font-mono font-medium tracking-[0.3em] uppercase whitespace-nowrap overflow-hidden transition-all duration-500 ${isHovered
                                        ? 'w-auto opacity-100'
                                        : 'w-0 opacity-0'
                                        } ${isHovered ? 'text-white' : 'text-slate-500'}`}
                                >
                                    {item.name}
                                </span>
                            </div>

                            {/* Refractive Pill */}
                            {isHovered && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                                    style={{ backdropFilter: 'blur(10px) saturate(200%)' }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}

                            {/* Glow Effect */}
                            <div className={`absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
                        </a>
                    );
                })}
            </div>

            {/* Magnetic status bead */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-6 bg-gradient-to-b from-accent/50 to-transparent" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.6em] ml-1">System.Sync</span>
            </motion.div>
        </motion.nav>
    );
}

