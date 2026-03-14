import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { Background } from './components/Background';
import { SingularityHero } from './components/SingularityHero';
import { IdentityArchive } from './components/IdentityArchive';
import { TechStack } from './components/TechStack';
import { ProjectCatalog } from './components/ProjectCatalog';
import { MassiveFooter } from './components/MassiveFooter';
import { InquiryContact } from './components/InquiryContact';

function App() {
  return (
    <main className="relative min-h-screen bg-black font-sans overflow-x-hidden selection:bg-accent selection:text-black">
      <CustomCursor />
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Background />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="relative z-10">
        <SingularityHero />
        
        <IdentityArchive />
        
        <TechStack />
        
        <ProjectCatalog />
        
        <div className="relative z-20 bg-black shadow-[0_-50px_100px_rgba(0,0,0,1)]">
          <InquiryContact />
        </div>

        <MassiveFooter />
      </div>

      {/* OLED Grit / Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')]" />
    </main>
  );
}

export default App;
