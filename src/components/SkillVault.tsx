import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#3B82F6' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#ffffff' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#38BDF8' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', color: '#FF2D20' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', color: '#777BB4' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#DC382D' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', color: '#ffffff' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
];

export const SkillVault = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-10%" });

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 px-6 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-24 text-left border-l-4 border-accent-blue pl-8"
        >
          <span className="font-mono text-[10px] text-accent-blue uppercase tracking-[0.4em] block mb-4">Engineering Capabilities</span>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none">
            Capability <br />
            <span className="italic font-light text-accent-pink">Mosaic.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-48 bg-white/[0.03] border border-white/5 rounded-3xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10"
            >
              {/* Individual Glow */}
              <div 
                className="absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ backgroundColor: skill.color }}
              />

              <div className="w-10 h-10 relative z-10">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/30 group-hover:text-white/80 transition-colors">
                  {skill.name}
                </span>
                <div 
                  className="h-[2px] w-0 group-hover:w-8 transition-all duration-500 origin-left"
                  style={{ backgroundColor: skill.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
