import React from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KineticButton } from './KineticButton';

gsap.registerPlugin(ScrollTrigger);

/**
 * ArtisticHero Component
 * Implements a high-impact atmospheric reveal using a dual-layered image system.
 * Visual Logic:
 * 1. Base Layer: Masked outline (initial state).
 * 2. Reveal Layer: Full character artwork (triggered by scroll).
 * 
 * Features adaptive blending modes for theme synchronization.
 */
const ArtisticHero: React.FC = () => {
  // GSAP ScrollTrigger for precise image transition
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "+=1", // Absolute minimum for near-instant swap effect
        scrub: true,
      }
    });

    // Fade out the masked outline and fade in the unmasked detail
    tl.to("#gojo-masked", {
      opacity: 0,
      ease: "none"
    }, 0);

    tl.to("#gojo-unmasked", {
      opacity: 0.3,
      ease: "none"
    }, 0);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">
      {/* Alchemical Anime Presence - Layered Dynamic Outline */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Layer 1: Masked (Initial State) */}
        <motion.img
          id="gojo-masked"
          initial={{ opacity: 0.1, scale: 1 }}
          src="/gojo_outline_alchemical_1773527133132.png"
          alt="Masked Presence"
          className="w-full h-full object-cover object-center scale-150 md:scale-110 
                     mix-blend-screen brightness-100 invert-0
                     dark:mix-blend-screen dark:brightness-100 dark:invert-0
                     [&:not(.dark *)]:invert [&:not(.dark *)]:brightness-[1.2] [&:not(.dark *)]:mix-blend-multiply"
        />
        {/* Layer 2: Unmasked (Revealed State) */}
        <motion.img
          id="gojo-unmasked"
          initial={{ opacity: 0, scale: 1 }}
          src="/gojo_unmasked_adaptive.png"
          alt="Unmasked Presence"
          className="absolute inset-0 w-full h-full object-cover object-center scale-150 md:scale-110 
                     mix-blend-screen brightness-100 invert-0
                     dark:mix-blend-screen dark:brightness-100 dark:invert-0
                     [&:not(.dark *)]:invert [&:not(.dark *)]:brightness-[1.2] [&:not(.dark *)]:mix-blend-multiply"
        />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-start text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
          className="space-y-12 max-w-4xl"
        >
          <div className="space-y-6">
            <h1 className="text-[12vw] leading-[0.7] tracking-tight text-[var(--color-text)] relative" style={{ fontSize: 'clamp(3rem, 12vw, 12vw)' }}>
              <span className="font-serif font-bold uppercase block -mb-2 md:-mb-4 tracking-[-0.05em]">Ilyas</span>
              <span className="block ml-[10vw] md:ml-[5vw] opacity-80" style={{ fontFamily: 'var(--font-signature)', fontSize: '0.8em' }}>Nour.</span>
            </h1>
          </div>

          <p className="text-base md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-xl md:max-w-2xl px-4 md:px-0">
            Engineering elegant digital architecture where <br className="hidden md:block" />
            clean aesthetics meet technical excellence.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-10">
            <KineticButton
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Illuminate Projects
            </KineticButton>

            <KineticButton
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group"
              icon={<span className="text-[var(--color-accent)] group-hover:translate-x-2 transition-transform duration-300">→</span>}
            >
              Begin Dialogue
            </KineticButton>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator - Left Aligned Hook */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex flex-col items-start gap-6"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[var(--color-text)] to-transparent" />
        <span className="font-mono text-[7px] uppercase tracking-[0.5em]">Explore</span>
      </motion.div>

      {/* Grid Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: 'radial-gradient(var(--color-text) 0.5px, transparent 0)', backgroundSize: '40px 40px' }}
      />
    </section>
  );
};

export default ArtisticHero;
