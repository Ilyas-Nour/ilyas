import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { IntroLoader } from './components/IntroLoader';
import ArtisticHero from './components/ArtisticHero';
import IdentityArchive from './components/IdentityArchive';
import { TechStack } from './components/TechStack';
import { ProjectCatalog } from './components/ProjectCatalog';
import { MassiveFooter } from './components/MassiveFooter';
import { InquiryContact } from './components/InquiryContact';

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <main className="relative min-h-screen font-sans overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white">
      <div className="studio-mesh" />
      <div className="studio-noise" />
      
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative z-10 w-full">
        <ArtisticHero />
        <IdentityArchive />
        <TechStack />
        <ProjectCatalog />
        <InquiryContact />
        <MassiveFooter />
      </div>
    </main>
  );
}

export default App;
