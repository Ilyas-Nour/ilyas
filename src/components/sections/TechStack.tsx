import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

/**
 * Skill Interface
 * Defines the cryptographic sigils representing technical expertise.
 * 
 * @property name   Display name of the technology.
 * @property slug   Identifier for simpleicons.org / icons8 integration.
 * @property color  Hex color code for the technology's primary branding.
 * @property category The conceptual layer this technology occupies.
 * @property isIcons8 Flag for using Icons8 CDN instead of SimpleIcons.
 */
interface Skill {
  name: string;
  slug: string;
  color: string;
  category: 'core' | 'architectural' | 'creative' | 'infrastructure';
  isIcons8?: boolean;
}

/**
 * Technical Arsenal Registry
 * Categorized collection of tools and frameworks.
 */
const skills: Skill[] = [
  // Core Sigils
  { name: "TypeScript", slug: "typescript", color: "3178C6", category: 'core' },
  { name: "React", slug: "react", color: "61DAFB", category: 'core' },
  { name: "Node.js", slug: "nodedotjs", color: "339933", category: 'core' },
  { name: "Next.js", slug: "nextdotjs", color: "ffffff", category: 'core' },
  { name: "Python", slug: "python", color: "3776AB", category: 'core' },
  { name: "Go", slug: "go", color: "00ADD8", category: 'core' },
  
  // Architectural constructs
  { name: "NestJS", slug: "nestjs", color: "E0234E", category: 'architectural' },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1", category: 'architectural' },
  { name: "Redis", slug: "redis", color: "DC382D", category: 'architectural' },
  { name: "Prisma", slug: "prisma", color: "ffffff", category: 'architectural' },
  { name: "Rust", slug: "rust", color: "ffffff", category: 'architectural' },
  { name: "Tailwind", slug: "tailwindcss", color: "38B2AC", category: 'architectural' },
  { name: "GraphQL", slug: "graphql", color: "E10098", category: 'architectural' },
  
  // Creative Enchantments
  { name: "Three.js", slug: "threedotjs", color: "ffffff", category: 'creative' },
  { name: "Framer", slug: "framer", color: "0055FF", category: 'creative' },
  { name: "GSAP", slug: "gsap", color: "88CE02", category: 'creative' },
  { name: "Socket.io", slug: "socketdotio", color: "ffffff", category: 'creative' },
  { name: "Blender", slug: "blender", color: "EB8C1F", category: 'creative' },
  { name: "Figma", slug: "figma", color: "F24E1E", category: 'creative' },
  
  // Infrastructure Ether
  { name: "AWS", slug: "amazon-web-services", color: "FF9900", category: 'infrastructure', isIcons8: true },
  { name: "Docker", slug: "docker", color: "2496ED", category: 'infrastructure' },
  { name: "Kubernetes", slug: "kubernetes", color: "326CE5", category: 'infrastructure' },
  { name: "Vercel", slug: "vercel", color: "ffffff", category: 'infrastructure' },
  { name: "Git", slug: "git", color: "F05032", category: 'infrastructure' },
  { name: "Terraform", slug: "terraform", color: "7B42BC", category: 'infrastructure' },
];

/**
 * MagneticNode Component
 * Implements a physically-modeled "magnetic" pull effect that attracts 
 * the node toward the user's cursor within a defined radius.
 */
const MagneticNode: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Use springs to simulate physical inertia and dampening
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull toward cursor (max offset scaled by 0.35)
    const pullX = (e.clientX - centerX) * 0.35;
    const pullY = (e.clientY - centerY) * 0.35;
    
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] 
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ x: springX, y: springY }}
      className="relative group cursor-none"
    >
      <div className="p-4 md:p-8 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-sm shadow-2xl shadow-black/20">
        {/* Layered Prismatic Glow - Dynamic based on brand color */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 blur-3xl opacity-20"
            style={{ backgroundColor: `#${skill.color}` }}
          />
        </div>

        {/* Adaptive Icon Fetching - Uses CDN strategy for lightning load times */}
        <img 
          src={skill.isIcons8 ? `https://img.icons8.com/color/48/${skill.slug}.png` : `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`} 
          alt={skill.name}
          className="w-10 h-10 md:w-12 md:h-12 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
          loading="lazy"
        />
        <span className="text-xs md:text-sm font-mono tracking-tighter opacity-40 group-hover:opacity-100 transition-all duration-500 uppercase">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

export const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="expertise" 
      ref={containerRef}
      className="relative pt-40 pb-10 overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Ether Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30 pointer-events-none select-none"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-[12rem] font-serif italic text-[var(--color-text)] leading-[0.8] mb-8">
              Divine <br />
              <span className="opacity-40">Arsenal.</span>
            </h2>
            <p className="max-w-xl font-mono text-[10px] md:text-sm uppercase tracking-widest opacity-50 leading-relaxed text-balance">
              The alchemical fusion of architecture and aesthetics. 
              A specialized collection of constructs forged for performance.
            </p>
          </motion.div>
        </header>

        {/* The Crystalline Grid */}
        <div className="space-y-16 md:space-y-32">
          {/* Core Sigils */}
          <div className="space-y-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 px-2 flex items-center gap-4">
              <span className="w-8 h-px bg-[var(--color-text)] opacity-20" />
              Core Sigils // [01]
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {skills.filter(s => s.category === 'core').map((skill, index) => (
                <MagneticNode key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Architectural & Creative */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 px-2 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--color-text)] opacity-20" />
                Architectural Constructs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {skills.filter(s => s.category === 'architectural').map((skill, index) => (
                  <MagneticNode key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 px-2 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--color-text)] opacity-20" />
                Creative Enchantments
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {skills.filter(s => s.category === 'creative').map((skill, index) => (
                  <MagneticNode key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="space-y-8 pb-20">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30 px-2 flex items-center gap-4">
              <span className="w-8 h-px bg-[var(--color-text)] opacity-20" />
              Infrastructure Ether
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {skills.filter(s => s.category === 'infrastructure').map((skill, index) => (
                <MagneticNode key={skill.name} skill={skill} index={index} />
              ))}
              {/* Decorative Void Node */}
              <div className="hidden lg:flex p-8 rounded-2xl border border-[var(--color-border)]/10 items-center justify-center opacity-10 grayscale">
                <span className="font-mono text-[10px] uppercase tracking-widest vertical-rl">Entropy // 0xAF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
