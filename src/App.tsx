import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { IntroLoader } from './components/IntroLoader';
import ArtisticHero from './components/ArtisticHero';

// Lazy loaded components for lightning speed
const IdentityArchive = lazy(() => import('./components/IdentityArchive'));
const TechStack = lazy(() => import('./components/TechStack'));
const ProjectCatalog = lazy(() => import('./components/ProjectCatalog'));
const InquiryContact = lazy(() => import('./components/InquiryContact'));
const MassiveFooter = lazy(() => import('./components/MassiveFooter'));

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white bg-[var(--color-background)]">
      {/* Universal Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')] mix-blend-overlay" />
      
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative z-10 w-full">
        <ArtisticHero />
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center opacity-5 font-mono text-[8px] uppercase tracking-widest">Hydrating_Module...</div>}>
          <IdentityArchive />
          <TechStack />
          <ProjectCatalog />
          <InquiryContact />
          <MassiveFooter />
        </Suspense>
      </div>
    </main>
  );
}

export default App;
