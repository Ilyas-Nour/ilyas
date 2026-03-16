import React, { createContext, useContext, ReactNode } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

interface ProjectScrollContextType {
  projectProgress: MotionValue<number>;
  setProjectProgress: (value: MotionValue<number>) => void;
}

const ProjectScrollContext = createContext<ProjectScrollContextType | undefined>(undefined);

export const ProjectScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const projectProgress = useMotionValue(0);

  // We'll use a listener to sync values if needed, 
  // but for Framer Motion, we can often just pass the reference.
  const setProjectProgress = (newProgress: MotionValue<number>) => {
    newProgress.on('change', (v) => projectProgress.set(v));
  };

  return (
    <ProjectScrollContext.Provider value={{ projectProgress, setProjectProgress }}>
      {children}
    </ProjectScrollContext.Provider>
  );
};

export const useProjectScroll = () => {
  const context = useContext(ProjectScrollContext);
  if (!context) {
    throw new Error('useProjectScroll must be used within a ProjectScrollProvider');
  }
  return context;
};
