import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiThreedotjs, SiFramer, SiNodedotjs, SiPostgresql, 
  SiMongodb, SiDocker, SiFigma, SiVite, SiLinux, SiGreensock 
} from 'react-icons/si';

import { IconType } from 'react-icons';

/**
 * Technical Skill Definition
 */
interface Skill {
  name: string;
  Icon: IconType;
  color: string;
}

const SHIFT_1: Skill[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#ffffff" },
  { name: "Framer", Icon: SiFramer, color: "#1E1E1E" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" }
];

const SHIFT_2: Skill[] = [
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" }
];

const MarqueeItem = React.memo(({ skill }: { skill: Skill }) => {
  const { Icon } = skill;
  return (
    <motion.div 
      whileHover={{ scale: 1.1, zIndex: 10 }}
      className="flex items-center gap-4 md:gap-6 px-6 md:px-12 py-4 md:py-8 group cursor-pointer transition-all duration-500"
    >
      <div className="relative">
        {/* Brand Glow Effect */}
        <div 
          className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"
          style={{ backgroundColor: skill.color }}
        />
        <Icon 
          className="text-4xl md:text-5xl lg:text-6xl transition-all duration-700 relative z-10"
          style={{ color: skill.color }}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[var(--color-text)] transition-colors duration-500 group-hover:text-[var(--color-text)]">
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
});

const RollingRow = ({ skills, reverse = false }: { skills: Skill[], reverse?: boolean }) => {
  // Triple the skills to ensure seamless looping without gaps
  const items = [...skills, ...skills, ...skills];
  
  return (
    <div className="flex overflow-hidden relative py-4 border-y border-[var(--color-border)]/10 bg-[var(--color-bg)] transition-colors duration-500 selection:bg-transparent">
      <motion.div 
        animate={{ x: reverse ? [0, -2500] : [-2500, 0] }}
        transition={{ 
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear"
          }
        }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {items.map((skill, i) => (
          <MarqueeItem key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

export const TechnicalArray: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-20 md:py-32 flex flex-col justify-center bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden relative">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 overflow-hidden">
        <div className="absolute left-10 top-20 text-[15vw] font-black uppercase tracking-widest leading-none rotate-90 origin-left">
          Kinetic
        </div>
        <div className="absolute right-10 bottom-20 text-[10vw] font-black uppercase tracking-widest leading-none -rotate-90 origin-right">
          Archive
        </div>
      </div>

      <div className="container mx-auto px-6 mb-12 md:mb-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-20">
          <div className="relative select-none">
            <motion.h2 
              style={{ x: xLeft }}
              className="text-[clamp(3rem,16vw,11vh)] font-heading font-black uppercase tracking-tighter text-[var(--color-text)] leading-[0.8]"
            >
              Rolling
            </motion.h2>
            <motion.h2 
              style={{ x: xRight, fontFamily: 'var(--font-signature)' }}
              className="text-[clamp(4.5rem,20vw,14vh)] leading-[0.8] -mt-[3vh] font-normal text-[var(--color-text)] opacity-30 mix-blend-difference"
            >
              protocols.
            </motion.h2>
          </div>
          
          <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] leading-relaxed pb-2 border-b border-[var(--color-border)]">
             High-performance tech stack deployment. Verified across full-stack architectures.
          </p>
        </div>
      </div>

      {/* The Kinetic Marquee System */}
      <div className="space-y-4 relative z-10">
        <RollingRow skills={SHIFT_1} />
        <RollingRow skills={SHIFT_2} reverse />
      </div>

    </section>
  );
};

export default TechnicalArray;
