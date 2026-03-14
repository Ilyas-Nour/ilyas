import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

export const BentoGrid = () => {
  return (
    <section className="px-6 md:px-24 py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[minmax(200px,auto)]">
        
        {/* Row 1: About Me / Intro (2x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 bento-card flex flex-col justify-between group"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">_identity</span>
            <h3 className="text-3xl font-display font-medium leading-tight">
              Driven by <span className="text-accent italic font-mono">architecture</span> and clean execution.
            </h3>
          </div>
          <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-mono text-xs">IN</span>
            </div>
            <p className="text-xs text-foreground/40 font-mono tracking-tight">Solving complex problems with modern stacks.</p>
          </div>
        </motion.div>

        {/* Row 1: GitHub Stats Placeholder (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-card flex flex-col gap-4 group"
        >
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">_activity</span>
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="flex gap-1 flex-wrap">
              {[...Array(28)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-sm ${i % 3 === 0 ? 'bg-accent/40' : i % 5 === 0 ? 'bg-accent' : 'bg-white/5'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-foreground/40 mt-2">1,248 Contributions this year</span>
          </div>
        </motion.div>

        {/* Row 1: Quick Links / Socials (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-card flex flex-col justify-between group"
        >
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">_connect</span>
          <div className="flex flex-col gap-3">
            {['GitHub', 'LinkedIn', 'CV.pdf'].map((link) => (
              <a key={link} href="#" className="flex items-center justify-between group/link">
                <span className="text-sm font-mono text-foreground/60 group-hover/link:text-foreground transition-colors">{link}</span>
                <span className="text-accent opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Row 2-3: Featured Project: Brikouli (2x2) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bento-card group flex flex-col bg-gradient-to-br from-white/[0.03] to-transparent"
        >
          <div className="relative aspect-video rounded-xl bg-white/5 mb-8 overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-foreground/10 font-black text-6xl select-none">
                BRIKOULI
             </div>
             <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 font-mono text-[10px] text-accent">
               <span>P2P MARKETPLACE</span>
               <span className="text-white/20">|</span>
               <span>LARAVEL + REACT</span>
            </div>
            <h3 className="text-4xl font-display font-medium tracking-tighter">Brikouli</h3>
            <p className="text-foreground/40 font-sans text-sm leading-relaxed max-w-md">
              A P2P service marketplace for the Moroccan market. Built with Laravel 11 and React. Features a custom booking system and real-time search.
            </p>
          </div>
          <div className="mt-auto pt-8 flex gap-4">
             <span className="px-3 py-1 glass rounded text-[9px] font-mono text-foreground/40">v1.0.4</span>
             <span className="px-3 py-1 glass rounded text-[9px] font-mono text-foreground/40">Deployment: Live</span>
          </div>
        </motion.div>

        {/* Row 2: Tech Stack (2x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 bento-card flex flex-col gap-8 group overflow-hidden"
        >
          <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">_tech_stack</span>
          <div className="flex items-center gap-10 whitespace-nowrap">
             {techStack.map((tech) => (
               <div key={tech.name} className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
                 <img src={tech.icon} alt={tech.name} className="w-8 h-8 opacity-40 group-hover:opacity-100" />
                 <span className="text-[9px] font-mono text-foreground/20">{tech.name}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Row 3: Current Focus (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-card flex flex-col justify-between group bg-accent/5"
        >
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">_focus</span>
          <div className="space-y-2">
            <h4 className="text-lg font-display font-medium">Scalable Systems</h4>
            <p className="text-xs text-foreground/40 font-mono">Exploring microservices and advanced caching.</p>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="w-3/4 h-full bg-accent" />
          </div>
        </motion.div>

        {/* Row 3: Experience Snapshot (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bento-card flex flex-col justify-between group border-accent/20"
        >
          <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">_academia</span>
          <div className="space-y-2">
            <h4 className="text-lg font-display font-medium text-foreground">ISTA Ben M'sik</h4>
            <p className="text-xs text-foreground/40 font-mono">2nd Year / Full-Stack</p>
          </div>
          <div className="text-[10px] font-mono text-accent/50">Lvl. 02 Development</div>
        </motion.div>

      </div>
    </section>
  );
};
