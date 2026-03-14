import React from 'react';

const skills = [
  { name: "Typescript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Rust", slug: "rust", color: "000000" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "AWS", slug: "amazonwebservices", color: "232F3E" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  { name: "Prisma", slug: "prisma", color: "2D3748" },
  { name: "Three.js", slug: "threedotjs", color: "000000" },
  { name: "Framer", slug: "framer", color: "0055FF" },
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">
      <div className="container mx-auto px-6 mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)]">Technical Proficiencies</span>
        <h2 className="text-4xl md:text-7xl font-serif italic text-[var(--color-text)] mt-4">Expertise.</h2>
      </div>

      <div className="flex select-none overflow-hidden gap-10">
        <div className="flex flex-none gap-16 py-8 animate-marquee items-center">
          {Array(4).fill(skills).flat().map((skill, i) => (
             <div key={i} className="flex items-center gap-4 group cursor-default">
                <img 
                  src={`https://img.icons8.com/color/48/${skill.slug}.png`} 
                  alt={skill.name}
                  className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  onError={(e) => {
                    // Fallback to simpleicons if icons8 fails
                    (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`;
                  }}
                />
                <span className="text-3xl md:text-5xl font-serif italic text-[var(--color-text)] opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                   {skill.name}
                </span>
             </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
