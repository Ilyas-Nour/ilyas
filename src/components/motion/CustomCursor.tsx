'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * @component CustomCursor
 * @description "The Prism" - A purely visual, zero-delay precision cursor.
 * Avoids all magnetic, sticky, or laggy sensations.
 */
export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // ZERO-DELAY hardware synchronization
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor="hover"]')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'auto';
        }
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference">
            {/* Precision Prism Point */}
            <motion.div
                className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ x: mouseX, y: mouseY }}
            >
                {/* Horizontal Crosshair */}
                <div className="absolute w-[18px] h-[1px] bg-white opacity-40" />
                {/* Vertical Crosshair */}
                <div className="absolute w-[1px] h-[18px] bg-white opacity-40" />

                {/* Inner core */}
                <motion.div
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    animate={{
                        scale: isClicking ? 0.8 : (isHovered ? 1.4 : 1),
                        opacity: isClicking ? 1 : 0.8
                    }}
                />

                {/* Subtle Hover Ring (Non-Magnetic) */}
                <motion.div
                    className="absolute border border-white rounded-full"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{
                        width: isHovered ? 28 : 0,
                        height: isHovered ? 28 : 0,
                        opacity: isHovered ? 0.3 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </motion.div>
        </div>
    );
}
