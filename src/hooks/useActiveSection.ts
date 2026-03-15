import { useState, useEffect, useRef } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeTab, setActiveTab] = useState(sectionIds[0] || '');
  const visibilityMap = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visibilityMap.current[entry.target.id] = entry.isIntersecting;
        });

        // Determine the best active tab from all visible sections
        // We pick the one that is currently intersecting the 'active band'
        const visibleIds = sectionIds.filter(id => visibilityMap.current[id]);
        
        if (visibleIds.length > 0) {
          // If multiple are visible, pick the one furthest down the page (the latest one)
          // as we scroll down. For scrolling up, the observer updates will naturally 
          // remove the lower ones from visibilityMap.
          const latestVisible = visibleIds[visibleIds.length - 1];
          setActiveTab(latestVisible);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.5], 
        rootMargin: "-15% 0px -75% 0px" // 10% detection band starting at 15% from top
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeTab;
};
