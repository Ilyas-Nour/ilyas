import { motion } from 'framer-motion';

export const MassiveFooter = () => {
  return (
    <footer className="bg-[#050507] pt-48 pb-12 px-6 overflow-hidden border-t border-white/5 relative">
      <div className="w-full relative">
        {/* Massive Background Brandmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-x-0 -top-24 select-none pointer-events-none z-0"
        >
          <h2 className="text-[25vw] font-black text-center whitespace-nowrap text-white/[0.03] flex justify-center items-center leading-none">
            <span className="font-display italic">ILYAS</span>
            <span className="font-mono tracking-tighter">NOUR</span>
          </h2>
        </motion.div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32">
             {/* Site Navigation */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-white/60 uppercase">_navigation</h4>
              <nav className="flex flex-col gap-4">
                  <a href="#home" className="text-2xl font-display font-light text-white hover:text-accent transition-colors w-fit">Home</a>
                  <a href="#projects" className="text-2xl font-display font-light text-white hover:text-accent transition-colors w-fit">Catalog</a>
                  <a href="#contact" className="text-2xl font-display font-light text-white hover:text-accent transition-colors w-fit">Connect</a>
                  <a href="#about" className="text-2xl font-display font-light text-white hover:text-accent transition-colors w-fit">About</a>
              </nav>
            </div>

            {/* Social Connection */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-white/60 uppercase">_connect</h4>
              <div className="flex flex-wrap gap-8">
                {[
                  { name: 'Github', url: 'https://github.com/Ilyas-Nour' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ilyasnour/' },
                  { name: 'X', url: 'https://x.com/ilyas__nour' }
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <span className="font-mono text-xs uppercase tracking-widest">{social.name}</span>
                    <span className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-8 text-right">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-white/60 uppercase text-right">_system_auth</h4>
              <p className="font-mono text-[10px] text-white/70 leading-relaxed uppercase tracking-widest">
                Built with React + Vite<br />
                Deployed via Vercel Edge<br />
                © 2026_ESTD_SYSTEMS_ARCH
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default MassiveFooter;
