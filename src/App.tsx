import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { ApertureIntro } from './components/ApertureIntro';
import { Background } from './components/Background';
import { SingularityHero } from './components/SingularityHero';
import { DisorderedArchive } from './components/DisorderedArchive';
import { NeuralBio } from './components/NeuralBio';
import { InquiryContact } from './components/InquiryContact';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [isIntroDone, setIsIntroDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
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
    <main className="relative min-h-screen bg-background">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {!isIntroDone && (
          <ApertureIntro onComplete={() => setIsIntroDone(true)} />
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-2000 ${isIntroDone ? 'opacity-100' : 'opacity-0'}`}>
        <Background />
        <SingularityHero />
        <NeuralBio />
        <DisorderedArchive />
        <InquiryContact />
      </div>

      {/* Global Aesthetics */}
      <div className="noise-texture opacity-[0.02]" />
      
      {/* Cinematic Frame */}
      <div className="fixed inset-0 border-[20px] border-background z-[50000] pointer-events-none hidden md:block" />
    </main>
  );
}

export default App;
