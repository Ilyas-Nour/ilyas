import { useEffect } from 'react';

/**
 * useConsoleIdentity Hook
 * Injects a high-fidelity ASCII brand signature and technical manifest 
 * into the browser's developer console.
 * 
 * Purpose: Provides a professional touch for fellow developers and 
 * establishes the "Creative Archive" brand identity at the technical layer.
 */
export const useConsoleIdentity = () => {
  useEffect(() => {
    // Brand Signature Logic
    const signature = `
    ██╗██╗     ██╗   ██╗ █████╗ ███████╗    ███╗   ██╗ ██████╗ ██╗   ██╗██████╗ 
    ██║██║     ╚██╗ ██╔╝██╔══██╗██╔════╝    ████╗  ██║██╔═══██╗██║   ██║██╔══██╗
    ██║██║      ╚████╔╝ ███████║███████╗    ██╔██╗ ██║██║   ██║██║   ██║██████╔╝
    ██║██║       ╚██╔╝  ██╔══██║╚════██║    ██║╚██╗██║██║   ██║██║   ██║██╔══██╗
    ██║███████╗   ██║   ██║  ██║███████║    ██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║
    ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
    `;

    console.log(
      `%c${signature}%c\n⚡ Digital Architecture by Ilyas Nour\n🛠 Built with React, GSAP, & Framer Motion\n\n%c"Alchemical code for the modern web."%c`,
      'color: #6366f1; font-weight: bold;',
      'color: #888; font-style: italic;',
      'color: #6366f1; font-weight: bold; font-style: italic;',
      'color: inherit;'
    );
  }, []);
};

export default useConsoleIdentity;
