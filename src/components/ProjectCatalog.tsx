import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: "Privaflow",
    description: "A secure, end-to-end encrypted platform for sensitive data management and private communication flows.",
    tags: ["Rust", "Wasm", "Encryption"],
    image: "/projects/privaflow.png",
  },
  {
    title: "Top Nature",
    description: "An environmental monitoring dashboard using AI to track and visualize ecological data in real-time.",
    tags: ["React", "AI", "WebGL"],
    image: "/projects/top_nature.png",
  },
  {
    title: "Animy",
    description: "A high-performance animation engine designed for complex web interfaces and cinematic interactions.",
    tags: ["TypeScript", "Motion", "CSS"],
    image: "/projects/animy.png",
  },
  {
    title: "Digital Lab",
    description: "An experimental space dedicated to exploring new web standards and modern design principles.",
    tags: ["Future Tech", "Research", "Design"],
    image: "/projects/image.png",
  }
];

const ProjectItem: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-32 border-b border-white/5 relative group"
    >
      {/* Content Column */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-[0.3em] font-bold">Project 0{index + 1}</span>
            <div className="h-px w-8 bg-white/10" />
          </div>
          
          <h3 className="text-5xl md:text-7xl font-display italic text-white group-hover:text-[var(--color-accent)] transition-colors duration-500 leading-tight">
            {project.title}
          </h3>
          
          <p className="text-lg text-white/50 font-functional leading-relaxed max-w-sm">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-1 rounded-full border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest glass hover:border-[var(--color-accent)]/30 transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        <div className="pt-8 flex items-center gap-8">
           <button className="magnetic-button">
              <span className="relative z-10">View Project</span>
           </button>
        </div>
      </div>

      {/* Visual Workspace Column */}
      <div className="lg:col-span-7 relative h-[400px] md:h-[600px] lg:h-[700px]">
        <div className="absolute inset-0 glass-panel rounded-3xl overflow-hidden border-white/10 group-hover:border-[var(--color-accent)]/30 transition-all duration-700">
          <motion.div style={{ y: imgY }} className="absolute inset-[-10%] z-0">
             <img 
               src={project.image} 
               alt={project.title}
               className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
             />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectCatalog: React.FC = () => {
  return (
    <section id="projects" className="relative py-40 px-6 overflow-hidden bg-projects-studio">
      <div className="container mx-auto relative z-30">
        <header className="mb-40 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-9xl font-display italic text-white tracking-tightest leading-[0.8]">
              Selected <br /> <span className="text-[var(--color-accent)] opacity-40">Projects.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-4">
            <p className="text-white/40 font-mono text-[11px] uppercase tracking-widest leading-relaxed">
              A collection of architectural web experiences and technical explorations.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </header>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectItem key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCatalog;
