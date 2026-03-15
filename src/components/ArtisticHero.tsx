import { motion, useScroll, useTransform } from 'framer-motion';
import { KineticButton } from './KineticButton';

const ArtisticHero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Transition from masked to unmasked state as we scroll
  // Reveal starts almost immediately and completes quickly for impact
  const maskedOpacity = useTransform(scrollYProgress, [0, 0.15], [0.05, 0]);
  const unmaskedOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.15]);
  const eyeGlowScale = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">
      {/* Alchemical Anime Presence - Layered Reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Layer 1: Masked Outline (Base) */}
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.05, scale: 1 }}
          style={{ opacity: maskedOpacity }}
          transition={{ duration: 3, ease: "easeOut" }}
          src="/gojo_outline_alchemical_1773527133132.png"
          alt="Atmospheric Presence"
          className="absolute inset-0 w-full h-full object-cover object-right scale-125 md:scale-110 mix-blend-screen"
        />
        
        {/* Layer 2: Unmasked Reveal (Six Eyes) */}
        <motion.img
          src="/gojo_unmasked.png"
          alt="Six Eyes Revealed"
          style={{ 
            opacity: unmaskedOpacity,
            scale: eyeGlowScale
          }}
          className="absolute inset-0 w-full h-full object-cover object-right scale-125 md:scale-110 mix-blend-screen filter drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]"
        />
      </div>

      
      <div className="container mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
           className="space-y-8 md:space-y-12 max-w-4xl flex flex-col items-center md:items-start"
        >
          <div className="space-y-4 md:space-y-6">
             <h1 className="text-[14vw] md:text-[12vw] leading-[0.7] tracking-tight text-[var(--color-text)] relative" style={{ fontSize: 'clamp(3.5rem, 14vw, 12vw)' }}>
                <span className="font-serif font-bold uppercase block -mb-2 md:-mb-4 tracking-[-0.05em]">Ilyas</span>
                <span className="block ml-0 md:ml-[5vw] opacity-80" style={{ fontFamily: 'var(--font-signature)', fontSize: '0.8em' }}>Nour.</span>
             </h1>
          </div>

          <p className="text-base md:text-2xl text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-xl md:max-w-2xl px-4 md:px-0">
            Engineering elegant digital architecture where <br className="hidden md:block" />
            clean aesthetics meet technical excellence.
          </p>

          <div className="pt-4 md:pt-8 flex flex-col sm:flex-row items-center md:items-start gap-4 md:gap-10 w-full md:w-auto">
             <KineticButton 
               className="w-4/5 sm:w-auto text-[8px] md:text-[10px]"
               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
             >
                Illuminate Projects
             </KineticButton>
             
             <KineticButton 
               variant="outline"
               className="w-4/5 sm:w-auto text-[8px] md:text-[10px] group"
               onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
