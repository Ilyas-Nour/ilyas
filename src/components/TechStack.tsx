import React from 'react';

const skillsRow1 = [
  { name: "Typescript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Rust", slug: "rust", color: "000000" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "AWS", slug: "amazonwebservices", color: "232F3E" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
];

const skillsRow2 = [
  { name: "Prisma", slug: "prisma", color: "2D3748" },
  { name: "Three.js", slug: "threedotjs", color: "000000" },
  { name: "Framer", slug: "framer", color: "0055FF" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Render", slug: "render", color: "46E3B7" },
  { name: "VS Code", slug: "visualstudiocode", color: "007ACC" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "181717" },
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">
      <div className="container mx-auto px-6 mb-20 text-center">
        <h2 className="text-6xl md:text-9xl font-serif italic text-[var(--color-text)]">Expertise.</h2>
      </div>

      <div className="space-y-4">
        {/* Row 1: Right to Left */}
        <div className="flex select-none overflow-hidden gap-10">
          <div className="flex flex-none gap-20 py-4 animate-marquee-left items-center">
            {Array(4).fill(skillsRow1).flat().map((skill, i) => (
               <div key={i} className="flex items-center gap-6 group cursor-default">
                  <img 
                    src={`https://img.icons8.com/color/48/${skill.slug}.png`} 
                    alt={skill.name}
                    className="w-10 h-10 opacity-30 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`;
                    }}
                  />
                  <span className="text-4xl md:text-6xl font-serif italic text-[var(--color-text)] opacity-5 group-hover:opacity-100 transition-opacity duration-500">
                     {skill.name}
                  </span>
               </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex select-none overflow-hidden gap-10">
          <div className="flex flex-none gap-20 py-4 animate-marquee-right items-center">
            {Array(4).fill(skillsRow2).flat().map((skill, i) => (
               <div key={i} className="flex items-center gap-6 group cursor-default">
                  <img 
                    src={`https://img.icons8.com/color/48/${skill.slug}.png`} 
                    alt={skill.name}
                    className="w-10 h-10 opacity-30 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`;
                    }}
                  />
                  <span className="text-4xl md:text-6xl font-serif italic text-[var(--color-text)] opacity-5 group-hover:opacity-100 transition-opacity duration-500">
                     {skill.name}
                  </span>
               </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 50s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 50s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
