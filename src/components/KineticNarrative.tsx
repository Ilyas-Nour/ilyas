import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em]"
    >
      {children}
    </motion.span>
  );
};

export const KineticNarrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"]
  });

  const text = "A Full-Stack Developer dedicated to building robust and scalable web applications. I bridge the gap between complex backend logic and intuitive frontend design, creating seamless user experiences that drive measurable results.";
  const words = text.split(" ");

  return (
    <section id="narrative" ref={containerRef} className="relative py-32 min-h-[60vh] flex items-center px-6 md:px-24 bg-background">
      <div className="max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-12 flex flex-col gap-4"
        >
          <span className="text-[10px] font-mono tracking-[0.5em] text-foreground/30 uppercase">Professional Profile</span>
          <h2 className="text-2xl md:text-3xl font-display font-light italic text-foreground tracking-widest uppercase">
            About me
          </h2>
        </motion.div>
        
        <div className="flex flex-wrap text-3xl md:text-6xl lg:text-7xl font-sans font-black text-foreground leading-[1.1] tracking-tightest">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.4; 
            const end = start + 0.2;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
};
