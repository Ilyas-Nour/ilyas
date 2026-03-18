import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { RibbonTrail } from './components/layout/RibbonTrail';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { IntroLoader } from './components/ui/IntroLoader';
import { useConsoleIdentity } from './hooks/useConsoleIdentity';
import ModernHero from './components/sections/ModernHero';
import { ScrollProgressProvider } from './context/ScrollProgressContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Lazy loaded components for lightning speed and optimized initial bundle size
const KineticBlueprint = lazy(() => import('./components/sections/KineticBlueprint'));
const TechnicalArray = lazy(() => import('./components/sections/TechnicalArray'));
const ProjectCatalog = lazy(() => import('./components/sections/ProjectCatalog'));
const InquiryContact = lazy(() => import('./components/sections/InquiryContact'));
const MassiveFooter = lazy(() => import('./components/layout/MassiveFooter'));

/**
 * Main Application Component
 * Orchestrates the global layout, smooth scrolling (Lenis), 
 * and handled the entrance sequences of the portfolio.
 */
function App() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "100vh start"] // Track the first 100vh of scroll
  });
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
      ScrollTrigger.update(); // CRITICAL: Keep ScrollTrigger in sync for Blueprint zoom
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
      <ScrollProgressProvider>
        <main ref={containerRef} className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-500 bg-[var(--color-bg)]">
          {/* Subtle Grain Texture - Global Overlay for Prismatic Aesthetic */}
          <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.015] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          <Navbar />
          {!loading && (
            <>
              <RibbonTrail />
            </>
          )}

          {/* Shutter Entry Sequence */}
          <AnimatePresence mode="wait">
            {loading && <IntroLoader onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          {/* The "Hyper-Jump" Cinematic Transition - Defining the Zoom Scene */}
          <div className="relative h-[100vh] z-20 pointer-events-none md:pointer-events-auto overflow-hidden">
            <motion.div 
              style={{ 
                scale: useTransform(scrollYProgress, [0, 1], [1, 4]),
                opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0]),
                clipPath: useTransform(
                  scrollYProgress, 
                  [0, 0.8, 1], 
                  [
                    "circle(100% at 50% 50%)",
                    "circle(100% at 50% 50%)",
                    "circle(0% at 50% 50%)"
                  ]
                ),
                pointerEvents: useTransform(scrollYProgress, [0, 0.9, 1], ["auto", "auto", "none"]) as any,
              }}
              className="sticky top-0 w-full will-change-transform"
            >
              <ModernHero warp={useTransform(scrollYProgress, [0, 0.5, 1], [0, 4, 0])} />
            </motion.div>
          </div>

          <div className="relative z-10 w-full overflow-x-clip bg-[var(--color-bg)] transition-colors duration-500">
              <Suspense fallback={<div className="h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest">Hydrating Identity...</div>}>
              {[
                { id: 'about', Component: KineticBlueprint, animate: true },
                { id: 'skills', Component: TechnicalArray, animate: true },
                { id: 'projects', Component: ProjectCatalog, animate: false },
                { id: 'contact', Component: InquiryContact, animate: true },
                { id: 'footer', Component: MassiveFooter, animate: true }
              ].map(({ id, Component, animate }) => (
                id === 'projects' ? (
                  <div key={id} id={id}>
                    <Component />
                  </div>
                ) : (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ margin: "-10%", once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="will-change-transform"
                  >
                    <Component />
                  </motion.div>
                )
              ))}
            </Suspense>
          </div>
      </main>
      </ScrollProgressProvider>
    </ThemeProvider>
  );
}

export default App;
