import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { FluidCursor } from './components/FluidCursor';
import { IntroLoader } from './components/IntroLoader';
import ArtisticHero from './components/ArtisticHero';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

// Lazy loaded components for lightning speed
const IdentityArchive = lazy(() => import('./components/IdentityArchive'));
const TechStack = lazy(() => import('./components/TechStack'));
const ProjectCatalog = lazy(() => import('./components/ProjectCatalog'));
const InquiryContact = lazy(() => import('./components/InquiryContact'));
const MassiveFooter = lazy(() => import('./components/MassiveFooter'));

function App() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
        {/* Subtle Grain Texture */}
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.015] mix-blend-overlay" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }} 
        />
        
        <ThemeToggle />
        <FluidCursor />
        
        <AnimatePresence>
          {loading && <IntroLoader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <div className="relative z-10 w-full">
          <ArtisticHero />
          
          <Suspense fallback={<div className="h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest">Loading...</div>}>
            <IdentityArchive />
            <TechStack />
            <ProjectCatalog />
            <InquiryContact />
            <MassiveFooter />
          </Suspense>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
