import { motion } from 'framer-motion';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-background pointer-events-none overflow-hidden transition-colors duration-700">
      {/* Minimal Texture (Removed decorative grids) */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      
      {/* Noise Grain (Subtle for visual comfort) */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://res.cloudinary.com/dzv9s1psp/image/upload/v1671536417/noise_btp0vj.png')]" />
    </div>
  );
};
