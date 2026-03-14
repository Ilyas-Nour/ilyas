import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { Background } from './components/Background';
import { SingularityHero } from './components/SingularityHero';
import { BentoGrid } from './components/BentoGrid';
import { InquiryContact } from './components/InquiryContact';

function App() {
  return (
    <main className="relative min-h-screen bg-[#050505] font-sans overflow-x-hidden selection:bg-accent selection:text-background">
      <CustomCursor />
      <Background />
      
      <div className="relative z-10">
        <SingularityHero />
        
        {/* The Bento Section */}
        <BentoGrid />
        
        <InquiryContact />
      </div>

      {/* Deep Tech Subtle Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015] bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')]" />
    </main>
  );
}

export default App;
