import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface Skill {
  name: string;
  level: number; // 0-100 for visual progress
}

interface Category {
  id: string;
  title: string;
  skills: Skill[];
  description: string;
}

const CATEGORIES: Category[] = [
  {
    id: "FE_01",
    title: "Frontend Architect",
    description: "Crafting high-fidelity, kinetic interfaces with surgical precision.",
    skills: [
      { name: "React", level: 95 },
      { name: "Three.js", level: 85 },
      { name: "Framer Motion", level: 98 },
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "GSAP", level: 88 }
    ]
  },
  {
    id: "BE_02",
    title: "System Engineer",
    description: "Building robust, scalable backends that power complex data flows.",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 82 },
      { name: "Docker", level: 75 },
      { name: "Express", level: 92 },
      { name: "Redis", level: 70 }
    ]
  },
  {
    id: "TL_03",
    title: "Command & Control",
    description: "Mastering the toolset for absolute technical efficiency.",
    skills: [
      { name: "Git", level: 95 },
      { name: "Linux", level: 88 },
      { name: "Figma", level: 80 },
      { name: "Vite", level: 94 },
      { name: "CI/CD", level: 78 },
      { name: "Performace Opt", level: 90 }
    ]
  }
];

const SkillRibbon = ({ cat, index, scrollVelocity }: { cat: Category, index: number, scrollVelocity: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Kinetic Skew Effect based on scroll velocity
  const skew = useTransform(scrollVelocity, [-2000, 2000], [-10, 10]);
  const skewSpring = useSpring(skew, { stiffness: 400, damping: 50 });

  return (
    <motion.div 
      style={{ skewY: skewSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group border-b border-[var(--color-border)] last:border-b-0 py-12 md:py-20 cursor-crosshair overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Massive Category Title */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-[10px] text-[var(--color-accent)] opacity-50">{cat.id}</span>
            <div className="h-[1px] w-8 bg-[var(--color-accent)] opacity-30" />
          </div>
          <h3 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[var(--color-text)] transition-all duration-700 group-hover:text-[var(--color-accent)] group-hover:italic">
            {cat.title.split(" ")[0]} 
            <span className="block opacity-20 group-hover:opacity-100 transition-opacity duration-700">{cat.title.split(" ").slice(1).join(" ")}</span>
          </h3>
        </div>

        {/* Technical Description - Fades in on hover or scroll */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : 20 }}
          className="max-w-xs md:max-w-sm"
        >
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed text-[var(--color-text-muted)]">
            {cat.description}
          </p>
        </motion.div>
      </div>

      {/* The "Archive" Drawer - Horizontal Expansion on Hover */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden bg-[var(--color-accent)]/[0.03] backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {cat.skills.map((skill, i) => (
            <motion.div 
              key={skill.name}
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between items-end">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text)]">{skill.name}</span>
                <span className="font-mono text-[8px] text-[var(--color-accent)]">{skill.level}%</span>
              </div>
              <div className="h-[2px] w-full bg-[var(--color-border)] relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isHovered ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="absolute h-full bg-[var(--color-accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Kinetic Background Text Overlay */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 opacity-[0.02] select-none pointer-events-none overflow-hidden">
        <span className="text-[25vw] font-black uppercase whitespace-nowrap leading-none">
          {cat.title}
        </span>
      </div>
    </motion.div>
  );
};

export const TechnicalArray: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scrollVelocity = useVelocity(scrollYProgress);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative bg-[var(--color-bg)] border-t border-[var(--color-border)] py-32"
    >
      {/* HUD Header */}
      <div className="container mx-auto px-6 mb-20 md:mb-32">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-[1px] flex-1 bg-[var(--color-accent)] opacity-20" />
          <span className="font-mono text-[10px] uppercase tracking-[1em] text-[var(--color-accent)]">Technical Archive</span>
          <div className="h-[1px] flex-1 bg-[var(--color-accent)] opacity-20" />
        </div>
        
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-[var(--color-text)] leading-[0.8]">
          The <br /> <span className="italic opacity-30 select-none">Kinetic Grid.</span>
        </h2>
      </div>

      {/* The Vault Array */}
      <div className="flex flex-col">
        {CATEGORIES.map((cat, i) => (
          <SkillRibbon 
            key={cat.id} 
            cat={cat} 
            index={i} 
            scrollVelocity={scrollVelocity} 
          />
        ))}
      </div>

      {/* Global Metadata Hud */}
      <div className="container mx-auto px-6 mt-32 flex flex-col md:flex-row justify-between items-end gap-12 border-t border-[var(--color-border)] pt-12">
        <div className="max-w-sm space-y-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] leading-relaxed">
            All systems synchronized. Skills quantified across full-stack architectural deployments. Kinetic displacement active.
          </p>
          <div className="flex gap-4">
             {["REDLINE_ID", "ARCHIVE_09", "MASTERWORK"].map(tag => (
               <span key={tag} className="font-mono text-[8px] border border-[var(--color-border)] px-2 py-1 text-[var(--color-accent)]">{tag}</span>
             ))}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
           <span className="text-6xl md:text-8xl font-black opacity-10 leading-none">03</span>
           <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Core Systems</span>
        </div>
      </div>
    </section>
  );
};

export default TechnicalArray;
