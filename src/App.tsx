import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { FluidCursor } from './components/layout/FluidCursor';
import { IntroLoader } from './components/ui/IntroLoader';
import ArtisticHero from './components/sections/ArtisticHero';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Navbar } from './components/layout/Navbar';
import { useConsoleIdentity } from './hooks/useConsoleIdentity';

// Lazy loaded components for lightning speed and optimized initial bundle size
const IdentityArchive = lazy(() => import('./components/sections/IdentityArchive'));
const TechStack = lazy(() => import('./components/sections/TechStack'));
const ProjectCatalog = lazy(() => import('./components/sections/ProjectCatalog'));
const InquiryContact = lazy(() => import('./components/sections/InquiryContact'));
const MassiveFooter = lazy(() => import('./components/layout/MassiveFooter'));

/**
 * Main Application Component
 * Orchestrates the global layout, smooth scrolling (Lenis), 
 * and handled the entrance sequences of the portfolio.
 */
function App() {
  // Initialize console branding effect
  useConsoleIdentity();
  
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Highly-optimized smooth scroll initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount for performance
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
        {/* Subtle Grain Texture - Global Overlay for Prismatic Aesthetic */}
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <Navbar />
        <FluidCursor />

        {/* Shutter Entry Sequence */}
        <AnimatePresence>
          {loading && <IntroLoader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <div className="relative z-10 w-full">
          {/* Hero Section Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
          >
            <ArtisticHero />
          </motion.div>

          {/* Sequential Section Rendering with Suspense */}
          <Suspense fallback={<div className="h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest">Loading Digital Architecture...</div>}>
            {[
              { id: 'about', Component: IdentityArchive },
              { id: 'skills', Component: TechStack },
              { id: 'projects', Component: ProjectCatalog },
              { id: 'contact', Component: InquiryContact },
              { id: 'footer', Component: MassiveFooter }
            ].map(({ id, Component }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ margin: "-5%" }} // Trigger animation slightly before entering viewport
                transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
                className="will-change-transform"
              >
                <Component />
              </motion.div>
            ))}
          </Suspense>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
