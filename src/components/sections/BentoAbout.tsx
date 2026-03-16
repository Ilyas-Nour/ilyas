import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import React, { useRef } from 'react';

/**
 * Custom Geometric Icons for Bento
 */
const IdentityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#efbf04]">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 18C7 15.7909 9.23858 14 12 14C14.7614 14 17 15.7909 17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AvailabilityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3b82f6]">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#efbf04]">
    <path d="M12 21C16 17 19 13.4183 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 13.4183 8 17 12 21Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const FocusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3b82f6]">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/**
 * TextReveal Component
 * Animates text at the character level on scroll.
 */
const TextReveal: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const words = text.split(' ');

  return (
    <h3 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.4em] overflow-hidden py-1">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ 
              duration: 1, 
              delay: i * 0.05, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h3>
  );
};

export const BentoAbout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const sectionOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);
  const sectionScale = useTransform(smoothProgress, [0, 0.25], [0.98, 1]);

  const cards = [
    {
      id: 'bio',
      title: 'The Identity',
      content: 'I am a second-year Full-Stack trainee at OFPPT, dedicated to merging technical rigor with visual excellence. My work spans from complex SaaS architectures to minimalist portfolios.',
      size: 'md:col-span-2 md:row-span-2',
      Icon: IdentityIcon
    },
    {
      id: 'status',
      title: 'Availability',
      content: 'Currently seeking internship opportunities to contribute and grow within a high-impact engineering team.',
      size: 'md:col-span-1 md:row-span-1',
      Icon: AvailabilityIcon
    },
    {
      id: 'location',
      title: 'Base',
      content: 'Based in Morocco, operating at the intersection of global design trends.',
      size: 'md:col-span-1 md:row-span-1',
      Icon: LocationIcon
    },
    {
      id: 'focus',
      title: 'Current Focus',
      content: 'Building performant web applications like Animy and VaultNode, refining my eye for alchemical UI design.',
      size: 'md:col-span-2 md:row-span-1',
      Icon: FocusIcon
    }
  ];

  return (
    <section id="about" ref={containerRef} className="relative pt-20 pb-40 bg-[#050505] overflow-hidden min-h-screen">
      {/* Dynamic Glow background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-[#3b82f6]/10 to-transparent blur-[120px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ opacity: sectionOpacity, scale: sectionScale }}
          className="mb-12 md:mb-16 flex items-end justify-between"
        >
          <div className="max-w-2xl">
            <TextReveal 
              text="Who is Ilyas?"
              className="text-5xl md:text-8xl font-sans font-black uppercase text-white leading-tight mb-4"
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/40 font-sans font-light text-xl max-w-lg"
            >
              Deconstructing a developer's journey through modular insights and kinetic intent.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: i * 0.1, 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -8, x: 2, transition: { duration: 0.4 } }}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 border border-white/5 bg-[#0a0a0c] hover:border-[#efbf04]/20 transition-all duration-700 ${card.size}`}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3b82f6] opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6 scale-125 origin-left">
                    <card.Icon />
                  </div>
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-6">{card.title}</h3>
                </div>
                <div className="space-y-4">
                   <p className={`text-white font-sans font-light leading-snug ${card.id === 'bio' ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {card.content}
                  </p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-4 right-4 w-8 h-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white" />
                <div className="absolute bottom-0 right-0 h-[1px] w-full bg-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoAbout;
