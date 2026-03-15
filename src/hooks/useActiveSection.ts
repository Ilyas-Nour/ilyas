import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeTab, setActiveTab] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              setActiveTab(entry.target.id);
            }
          });
        },
        { 
          threshold: [0.1, 0.2, 0.3, 0.5], 
          rootMargin: "-10% 0px -70% 0px" // Prioritize the top of the section
        }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [sectionIds]);

  return activeTab;
};
