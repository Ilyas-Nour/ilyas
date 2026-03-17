import React, { createContext, useContext, useState } from 'react';

interface ScrollProgressContextType {
  progress: number;
  setProgress: (val: number) => void;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
}

const ScrollProgressContext = createContext<ScrollProgressContextType | undefined>(undefined);

export const ScrollProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ScrollProgressContext.Provider value={{ progress, setProgress, isVisible, setIsVisible }}>
      {children}
    </ScrollProgressContext.Provider>
  );
};

export const useScrollProgress = () => {
  const context = useContext(ScrollProgressContext);
  if (!context) {
    throw new Error('useScrollProgress must be used within a ScrollProgressProvider');
  }
  return context;
};
