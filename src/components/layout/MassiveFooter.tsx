import { motion } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';

/**
 * MassiveFooter Component
 * A large-scale, high-fidelity footer designed to provide a 
 * definitive psychological closure to the site experience.
 * Features massive signature branding and artistic link arrays.
 */
export const MassiveFooter = () => {
  const activeTab = useActiveSection(['home', 'about', 'expertise', 'projects', 'contact']);
  
  return (
    <footer className="bg-[var(--color-bg)] pt-32 pb-12 px-6 overflow-hidden border-t border-[var(--color-border)] relative transition-colors duration-500">
      <div className="w-full relative">
        {/* Massive Background Signature - Refined to prevent clipping and provide depth */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-x-0 -bottom-20 select-none pointer-events-none z-0 flex justify-center w-full px-[5vw]"
        >
          <h2 className="text-[28vw] md:text-[22vw] text-center whitespace-nowrap text-[var(--color-text)] opacity-[0.05] leading-none" style={{ fontFamily: 'var(--font-signature)' }}>
             Ilyas Nour
          </h2>
        </motion.div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-0">
             {/* Navigation Section (Index) */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase">Index</h4>
              <nav className="flex flex-col gap-3">
                  {[
                    { name: 'Home', id: 'home' },
                    { name: 'About', id: 'about' },
                    { name: 'Expertise', id: 'expertise' },
                    { name: 'Projects', id: 'projects' }
                  ].map(link => (
                    <a 
                      key={link.id}
                      href={`#${link.id}`} 
                      className="footer-link-nav w-fit !px-0"
                    >
                      {/* Artistic Link Effect - Uses dataset for text duplication in CSS if needed */}
                      <span className="artistic-link" data-text={link.name}>
                        <span className="artistic-link-text text-lg font-serif italic text-[var(--color-text)]">{link.name}</span>
                      </span>
                    </a>
                  ))}
              </nav>
            </div>

            {/* Social Connection Section */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase">Social</h4>
              <div className="flex flex-wrap gap-8">
                {[
                  { name: 'Github', url: 'https://github.com/Ilyas-Nour' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ilyasnour/' },
                  { name: 'X', url: 'https://x.com/ilyas__nour' },
                  { name: 'Instagram', url: '#' }
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                    <span className="font-mono text-xs uppercase tracking-widest">{social.name}</span>
                    <span className="text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Studio Credits Section */}
            <div className="space-y-8 md:text-right flex flex-col justify-end">
              <h4 className="text-[10px] font-mono tracking-[0.4em] text-[var(--color-text-muted)] uppercase md:text-right">Studio</h4>
              <p className="font-mono text-[10px] text-[var(--color-text-muted)] leading-relaxed uppercase tracking-widest">
                Designed & Developed <br />
                by Ilyas Nour<br />
                © 2026 Creative Archive
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default MassiveFooter;
