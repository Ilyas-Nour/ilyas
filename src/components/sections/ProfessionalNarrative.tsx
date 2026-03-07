'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * @component: ProfessionalNarrative
 * @description: The 'About' section for the Monolith portfolio.
 * Direct, logic-driven copy focusing on fundamentals and production readiness.
 */
export default function ProfessionalNarrative() {
    return (
        <section id="about" className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] py-32 px-6">
            <div className="max-w-4xl w-full mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-24 flex items-center gap-6"
                >
                    <h2 className="text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase">
                        01 — Professional Narrative
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </motion.div>

                {/* Core Narrative */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.2] text-white">
                        I am a developer driven by logic and clean code.
                    </p>

                    <div className="mt-12 flex flex-col md:flex-row gap-8 md:gap-16">
                        <p className="flex-1 text-lg md:text-xl text-neutral-400 leading-relaxed">
                            My training at OFPPT has grounded me in the fundamentals of Full-Stack development,
                            focusing on architectural patterns and database design.
                        </p>
                        <p className="flex-1 text-lg md:text-xl text-neutral-400 leading-relaxed">
                            While training builds the foundation, my personal systems—like <span className="text-white font-medium">PrivaFlow</span> and <span className="text-white font-medium">Animy</span>—prove
                            my ability to architect, refine, and ship production-ready software.
                        </p>
                    </div>
                </motion.div>

                {/* Metrics / Status (Optional sophisticated detail) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-neutral-900"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-[#6610f2] uppercase">Status</span>
                        <span className="text-sm font-medium text-white">Available for Hire</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">Location</span>
                        <span className="text-sm font-medium text-white">Earth</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">Focus</span>
                        <span className="text-sm font-medium text-white">Architecture & UX</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-600 uppercase">Stack</span>
                        <span className="text-sm font-medium text-white">Laravel / React</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
