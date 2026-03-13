import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'ANIMY',
    id: '01',
    tags: ['AGGREGATOR', 'NODE.JS'],
    description: 'CONCURRENT LOAD OPTIMIZATION ENGINE.',
    color: '#818cf8',
  },
  {
    title: 'PRIVAFlow',
    id: '02',
    tags: ['AES-256', 'NEXT.JS'],
    description: 'ZERO-KNOWLEDGE WORKFLOW ENCRYPTION.',
    color: '#c084fc',
  },
  {
    title: 'Nexus OS',
    id: '03',
    tags: ['THREE.JS', 'GLSL'],
    description: 'SPATIAL COMPUTING INTERFACE DESIGN.',
    color: '#2dd4bf',
  }
];

export const DisorderedArchive = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="archive" ref={containerRef} className="relative py-48 px-6 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-48">
          <span className="text-accent font-mono text-[10px] tracking-[1em] uppercase block mb-8">Selected works</span>
          <h2 className="text-[10vw] font-display font-black leading-none tracking-tightest text-white/90">
            AESTHETIC <br /> <span className="text-white subpixel-antialiased">PROOF</span>
          </h2>
        </div>

        <div className="space-y-64">
          {projects.map((project, i) => (
             <ProjectItem key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className={`relative w-full md:w-4/5 ${index % 2 === 0 ? 'ml-0' : 'ml-auto text-right'} group`}
    >
      <div className="relative inline-block">
        <h3 className="text-[8vw] font-display font-black leading-none tracking-tighter text-white/80 group-hover:text-white transition-colors cursor-none interactive">
          {project.title}
        </h3>
        <div className="flex gap-4 mt-6 font-mono text-[10px] text-white/40 uppercase tracking-widest ${index % 2 === 0 ? 'justify-start' : 'justify-end'}">
           {project.tags.map((t, idx) => (
             <span key={idx} className="border-b border-white/10 pb-1 hover:text-accent transition-colors">
                {t}
             </span>
           ))}
        </div>
        <p className="mt-12 text-white/40 max-w-xl font-light text-lg md:text-xl leading-relaxed ${index % 2 === 0 ? 'text-left' : 'text-right ml-auto'}">
           {project.description}
        </p>
      </div>
    </motion.div>
  );
};
