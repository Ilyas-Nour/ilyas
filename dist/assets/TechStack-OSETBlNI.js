import{j as e}from"./react-vendor-BS8-NE-3.js";import"./vendor-5j7VWcuS.js";const s=[{name:"Typescript",slug:"typescript",color:"3178C6"},{name:"React",slug:"react",color:"61DAFB"},{name:"Node.js",slug:"nodedotjs",color:"339933"},{name:"Rust",slug:"rust",color:"000000"},{name:"Next.js",slug:"nextdotjs",color:"000000"},{name:"AWS",slug:"amazonwebservices",color:"232F3E"},{name:"Tailwind",slug:"tailwindcss",color:"06B6D4"},{name:"Prisma",slug:"prisma",color:"2D3748"},{name:"Three.js",slug:"threedotjs",color:"000000"},{name:"Framer",slug:"framer",color:"0055FF"}],c=()=>e.jsxs("section",{className:"relative py-24 overflow-hidden bg-[var(--color-bg)] transition-colors duration-500",children:[e.jsxs("div",{className:"container mx-auto px-6 mb-16",children:[e.jsx("span",{className:"font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--color-accent)]",children:"Technical Proficiencies"}),e.jsx("h2",{className:"text-4xl md:text-7xl font-serif italic text-[var(--color-text)] mt-4",children:"Expertise."})]}),e.jsx("div",{className:"flex select-none overflow-hidden gap-10",children:e.jsx("div",{className:"flex flex-none gap-16 py-8 animate-marquee items-center",children:Array(4).fill(s).flat().map((a,t)=>e.jsxs("div",{className:"flex items-center gap-4 group cursor-default",children:[e.jsx("img",{src:`https://img.icons8.com/color/48/${a.slug}.png`,alt:a.name,className:"w-8 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500",onError:r=>{r.target.src=`https://cdn.simpleicons.org/${a.slug}/${a.color}`}}),e.jsx("span",{className:"text-3xl md:text-5xl font-serif italic text-[var(--color-text)] opacity-10 group-hover:opacity-100 transition-opacity duration-500",children:a.name})]},t))})}),e.jsx("style",{children:`
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
      `})]});export{c as TechStack,c as default};
