import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skills = [
  { name: 'Core', items: ['React', 'TypeScript', 'Node.js'], x: -15, y: -10 },
  { name: 'Motion', items: ['Three.js', 'Framer Motion', 'GSAP'], x: 20, y: -15 },
  { name: 'Systems', items: ['Redis', 'Docker', 'AWS'], x: -20, y: 15 },
  { name: 'Focus', items: ['Branding', 'Interaction', 'Visuals'], x: 15, y: 10 },
];

export const NeuralBio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] py-32 bg-background flex items-center justify-center">
      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <span className="text-accent font-mono text-[10px] tracking-[0.8em] uppercase block mb-12">Authentic Approach</span>
        
        <h2 className="text-4xl md:text-7xl font-display font-medium leading-tight mb-24 tracking-tight text-white/90">
          I build digital spaces that feel <br />
          <span className="italic font-light">tangible</span> and <span className="text-accent">deliberate</span>.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-white font-display text-2xl font-bold">{skill.name}</h3>
                <div className="h-px w-full bg-white/5" />
                <div className="flex flex-col gap-2">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="text-white/40 text-sm font-light uppercase tracking-widest">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </section>
  );
};
