import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, MessageSquare, Terminal } from 'lucide-react';

export const TerminalContact = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, sending, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <section className="relative py-32 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-16">
          <Terminal className="text-accent" size={24} />
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">Initialize // Connection</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-12">
            <p className="text-white/40 text-xl leading-relaxed font-medium">
              Ready to transcend the digital ceiling? <br /> Open a direct channel for <span className="text-white">collaboration</span>, <span className="text-white">intelligence exchange</span>, or <span className="text-white">architectural inquiries</span>.
            </p>

            <div className="space-y-6">
              {[
                { icon: Globe, label: 'Timezone', value: 'UTC+1 (Casablanca)' },
                { icon: MessageSquare, label: 'Email', value: 'ilyasnour.dev@gmail.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 astral-glass flex items-center justify-center rounded-xl group-hover:border-accent/40 transition-colors">
                    <item.icon size={20} className="text-white/40 group-hover:text-accent" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{item.label}</span>
                    <span className="text-white/80 font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="relative">
            <form 
              onSubmit={handleSubmit}
              className="p-10 astral-glass rounded-[2rem] border-white/5 space-y-8 relative z-10 backdrop-blur-3xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">Identity</label>
                  <input 
                    type="text" 
                    placeholder="ENTER NAME"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent/40 transition-colors text-white font-mono text-xs placeholder:text-white/10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">Frequency</label>
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent/40 transition-colors text-white font-mono text-xs placeholder:text-white/10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">Transmission</label>
                  <textarea 
                    rows={4}
                    placeholder="TYPE MESSAGE..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent/40 transition-colors text-white font-mono text-xs placeholder:text-white/10 resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full h-14 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center gap-4 group transition-all hover:bg-accent/20 hover:border-accent/40"
              >
                <span className="font-mono text-[10px] tracking-[0.5em] text-accent uppercase font-bold">
                  {formState === 'sending' ? 'Transmitting...' : formState === 'success' ? 'Synchronized' : 'Execute Transmission'}
                </span>
                <Send size={16} className={`text-accent ${formState === 'sending' ? 'animate-pulse' : ''}`} />
              </button>
            </form>

            {/* Background Glow */}
            <motion.div 
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 0.4 : 0.2,
              }}
              className="absolute inset-0 bg-accent/20 blur-[100px] -z-10 rounded-[2rem]" 
            />
          </div>
        </div>
      </div>

      <footer className="mt-48 text-center">
        <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.8em]">© 2026 Ilyas Nour // All Protocols Reserved</span>
      </footer>
    </section>
  );
};
