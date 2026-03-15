import { useState, useEffect, useRef } from 'react';

/**
 * useActiveSection Hook
 * Efficiently tracks the currently "active" section based on scroll position.
 * 
 * @param sectionIds Array of element IDs to monitor.
 * @returns The ID of the section that is currently most prominent in the viewport.
 * 
 * Strategy:
 * Uses IntersectionObserver with a custom rootMargin to create a narrow "detection band".
 */
export const useActiveSection = (sectionIds: string[]) => {
  const [activeTab, setActiveTab] = useState(sectionIds[0] || '');
  
  // Track visibility state of all sections to handle edge cases where multiple are visible
  const visibilityMap = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visibilityMap.current[entry.target.id] = entry.isIntersecting;
        });

        /**
         * Detection Logic:
         * 1. Filter all sections that are currently 'intersecting' the band.
         * 2. If multiple sections are caught, pick the latest one (lowest on the page)
         *    to ensure the navigation reflects progress.
         */
        const visibleIds = sectionIds.filter(id => visibilityMap.current[id]);
        
        if (visibleIds.length > 0) {
          const latestVisible = visibleIds[visibleIds.length - 1];
          setActiveTab(latestVisible);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.5], 
        // rootMargin sets the 'active band'. 
        // This configuration targets the upper-middle area of the viewport.
        rootMargin: "-15% 0px -75% 0px" 
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
