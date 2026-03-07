'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
    const [isMuted, setIsMuted] = useState(false);

    return (
        <button
            onClick={() => setIsMuted(!isMuted)}
            className="fixed bottom-10 right-10 z-[60] w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all active:scale-95 mix-blend-difference"
            aria-label="Toggle Sound"
        >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
    );
}
