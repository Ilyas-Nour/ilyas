import React from 'react';
import PrecisionHero from '@/components/sections/PrecisionHero';
import ProfessionalNarrative from '@/components/sections/ProfessionalNarrative';
import IntelligenceSkills from '@/components/sections/IntelligenceSkills';
import CaseStudyVault from '@/components/sections/CaseStudyVault';
import ContactFooter from '@/components/sections/ContactFooter';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center bg-[#050505]">

      {/* 1. The 'Precision' Hero Section */}
      <PrecisionHero />

      {/* 2. Professional Narrative */}
      <ProfessionalNarrative />

      {/* 3. Intelligence Skills */}
      <IntelligenceSkills />

      {/* 4. Case Study Vault */}
      <CaseStudyVault />

      {/* 5. Artistic Contact & Footer */}
      <ContactFooter />

    </main>
  );
}
