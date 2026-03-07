'use client';

import React, { createContext, useContext, useRef, useEffect } from 'react';

interface SoundContextType {
    playHover: () => void;
    playClick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const hoverAudio = useRef<HTMLAudioElement | null>(null);
    const clickAudio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        hoverAudio.current = new Audio('/sounds/hover.mp3');
        clickAudio.current = new Audio('/sounds/click.mp3');

        // Preload
        hoverAudio.current.load();
        clickAudio.current.load();

        hoverAudio.current.volume = 0.2;
        clickAudio.current.volume = 0.4;
    }, []);

    const playHover = () => {
        if (hoverAudio.current) {
            hoverAudio.current.currentTime = 0;
            hoverAudio.current.play().catch(() => { });
        }
    };

    const playClick = () => {
        if (clickAudio.current) {
            clickAudio.current.currentTime = 0;
            clickAudio.current.play().catch(() => { });
        }
    };

    return (
        <SoundContext.Provider value={{ playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
