import { motion } from 'framer-motion';

export const MassiveFooter = () => {
  return (
    <footer className="bg-black pt-32 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-massive font-black text-center whitespace-nowrap overflow-hidden text-white/90">
            ILYAS NOUR
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/10 pt-12">
          <div className="flex gap-12">
            {[
              { name: 'GITHUB', url: '#' },
              { name: 'LINKEDIN', url: '#' },
              { name: 'EMAIL', url: 'mailto:contact@ilyasnour.dev' }
            ].map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                className="font-mono text-xs text-muted hover:text-accent tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="text-muted font-mono text-[10px] tracking-widest uppercase">
            © 2026_ESTD_SYSTEMS_ARCH
          </div>
        </div>
      </div>
    </footer>
  );
};
