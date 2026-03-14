import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: "Privaflow",
    id: "ARTIFACT_PX_001",
    description: "High-integrity encryption architecture for secure data flow.",
    tags: ["Rust", "Wasm", "Identity"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    access: "Level_04",
    status: "ENCRYPTED"
  },
  {
    title: "Top Nature",
    id: "ARTIFACT_PX_002",
    description: "Bio-organic AI interface for environmental synchronization.",
    tags: ["React", "TensorFlow", "WebGL"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    access: "Level_02",
    status: "SYNC_ACTIVE"
  },
  {
    title: "Core Aggregator",
    id: "ARTIFACT_PX_003",
    description: "Neural-linked data processing unit for high-throughput nodes.",
    tags: ["Node.js", "Redis", "Kafka"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200",
    access: "Level_05",
    status: "OPTIMIZED"
  },
  {
    title: "Artisan Lab",
    id: "ARTIFACT_PX_004",
    description: "Experimental workspace for avant-garde UI/UX research.",
    tags: ["Three.js", "Shaders", "Framer"],
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=1200",
    access: "Level_01",
    status: "LAB_STAGE"
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
      {/* HUD Background Decoration */}
      <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 font-mono text-[80px] text-white/[0.02] font-black select-none pointer-events-none uppercase">
        {project.id.split('_').pop()}
      </div>

      {/* Content Column */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-[0.3em] font-bold">Registry // {project.id}</span>
            <div className="h-px w-8 bg-white/10" />
            <span className="font-mono text-[8px] text-white/30 uppercase">{project.access}</span>
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
           <div className="flex flex-col">
              <span className="font-mono text-[7px] text-white/20 uppercase">System Status</span>
              <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">{project.status}</span>
           </div>
           <button className="magnetic-button">
              <span className="relative z-10">OPEN_ARTIFACT()</span>
           </button>
        </div>
      </div>

      {/* Visual Workspace Column */}
      <div className="lg:col-span-7 relative h-[400px] md:h-[600px] lg:h-[700px]">
        {/* Cinematic Workspace Container */}
        <div className="absolute inset-0 glass-panel rounded-3xl overflow-hidden border-white/10 group-hover:border-[var(--color-accent)]/30 transition-all duration-700">
          <motion.div style={{ y: imgY }} className="absolute inset-[-10%] z-0">
             <img 
               src={project.image} 
               alt={project.title}
               className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
             />
             {/* Scanline Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          </motion.div>

          {/* HUD Brackets */}
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent)]/20" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-[var(--color-accent)]/20" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-[var(--color-accent)]/20" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent)]/20" />

          {/* Technical Meta Labels */}
          <div className="absolute top-12 left-12 flex flex-col font-mono text-[7px] text-white/20 space-y-1">
             <span>BOUNDING_BOX: [800, 450]</span>
             <span>GEOMETRY: OPTIMIZED</span>
          </div>

          <div className="absolute bottom-12 right-12 flex items-center gap-4 py-2 px-4 glass rounded-full border border-white/10">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
             <span className="font-mono text-[8px] text-white uppercase tracking-widest">Live_Viewport_Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectCatalog: React.FC = () => {
  return (
    <section id="projects" className="relative py-40 px-6 overflow-hidden bg-projects-studio">
      {/* Anime Theme Motif */}
      <div 
        className="anime-motif opacity-[0.04]"
        style={{ backgroundImage: 'url(/assets/real_anime_hero.png)', backgroundPosition: 'center center', backgroundSize: 'cover' }} 
      />

      <div className="container mx-auto relative z-30">
        <header className="mb-40 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] py-1 px-4 border border-[var(--color-accent)]/30 rounded-full glass">Catalog_v3.2</span>
              <div className="h-px w-20 bg-white/10" />
            </div>
            <h2 className="text-6xl md:text-9xl font-display italic text-white tracking-tightest leading-[0.8]">
              Artifact <br /> <span className="text-[var(--color-accent)] opacity-40">Registry.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-4">
            <p className="text-white/40 font-mono text-[11px] uppercase tracking-widest leading-relaxed">
              Detailed technical exhibition of core architectural projects. Each entry represents a benchmark in digital engineering.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </header>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectItem key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Dense Bottom Footer Label */}
        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
           <div className="font-mono text-[8px] uppercase tracking-widest">
              Security Override: Active // Signature Valid
           </div>
           <div className="flex gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-4 w-1 ${i % 3 === 0 ? 'bg-[var(--color-accent)]' : 'bg-white/10'}`} />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCatalog;
