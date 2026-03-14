import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Core Architecture',
    tag: '_ARCH_LAYER',
    skills: ['Laravel', 'Node.js', 'PHP', 'Express', 'JWT/Auth']
  },
  {
    title: 'Interaction Systems',
    tag: '_UI_MATRIX',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Vite']
  },
  {
    title: 'Persistence Tier',
    tag: '_DATA_VAULT',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase']
  },
  {
    title: 'System Tooling',
    tag: '_INFRA_CTL',
    skills: ['Git/GitHub', 'Docker', 'Vercel', 'Postman', 'Linux']
  }
];

export const TechStack = () => {
  return (
    <section id="skills" className="py-48 px-6 lg:px-24 bg-black relative">
       <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="mb-24"
        >
          <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-4 block">_technical_sys_capabilities_v5.0</span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tightest leading-none text-white">
            T<span className="font-display italic font-light text-white/20">ec</span>h <br />
            S<span className="font-display italic font-light text-white/20">ta</span>ck.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="bg-black p-10 space-y-10 group hover:bg-white/[0.01] transition-colors duration-700"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-accent/60 tracking-widest">{category.tag}</span>
                <h4 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{category.title}</h4>
              </div>
              
              <ul className="space-y-5">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-accent transition-colors" />
                    <span className="text-sm font-sans font-light text-muted group-hover:text-white transition-colors tracking-wide">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        

      </div>
    </section>
  );
};
