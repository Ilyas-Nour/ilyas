import React from 'react';

const skillsRow = [
  "Typescript", "React", "Node.js", "Rust", "Prisma", "AWS", "Framer Motion", "TailwindCSS", "WebGL", "Three.js"
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)]">Technical Proficiencies</span>
        <h2 className="text-4xl md:text-6xl font-serif italic text-[var(--color-text)] mt-4">Expertise</h2>
      </div>

      <div className="flex select-none overflow-hidden gap-10">
        <div className="flex flex-none gap-20 py-10 animate-marquee">
          {Array(4).fill(skillsRow).flat().map((skill, i) => (
             <span key={i} className="text-4xl md:text-6xl font-serif italic text-[var(--color-text)] opacity-10 hover:opacity-100 transition-opacity duration-500 cursor-default">
                {skill}
             </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
