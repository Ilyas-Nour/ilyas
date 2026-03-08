'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/**
 * @component MolecularAssemblyLoader
 * @description A radical, high-fidelity preloader. 
 * Molecules float randomly in 3D space and converge to form 'ILYAS NOUR' 
 * as loading progresses, before imploding in a flash of light.
 */
export default function MolecularAssemblyLoader() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 1200;
        const text = "ILYAS NOUR";
        let progressObj = { value: 0 };

        // Disable scroll
        document.body.style.overflow = 'hidden';

        class Particle {
            x: number;
            y: number;
            targetX: number;
            targetY: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            alpha: number;

            constructor(tx: number, ty: number) {
                this.targetX = tx;
                this.targetY = ty;
                this.originX = Math.random() * canvas!.width;
                this.originY = Math.random() * canvas!.height;
                this.x = this.originX;
                this.y = this.originY;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 1.5 + 0.5;
                this.color = Math.random() > 0.5 ? '#818cf8' : '#c084fc';
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update(progress: number) {
                // Progress moves from 0 to 1
                const curTargetX = this.originX + (this.targetX - this.originX) * progress;
                const curTargetY = this.originY + (this.targetY - this.originY) * progress;

                const dx = curTargetX - this.x;
                const dy = curTargetY - this.y;

                this.vx += dx * 0.05;
                this.vy += dy * 0.05;
                this.vx *= 0.85;
                this.vy *= 0.85;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
            }
        }

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Create temporary canvas to sample text points
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d')!;
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;

            const fontSize = Math.min(canvas.width / 10, 120);
            tempCtx.font = `600 ${fontSize}px Inter, sans-serif`;
            tempCtx.textAlign = 'center';
            tempCtx.textBaseline = 'middle';
            tempCtx.fillText(text, canvas.width / 2, canvas.height / 2);

            const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height).data;
            const points = [];

            // Sample points from text
            const step = Math.max(1, Math.floor(canvas.width / 200));
            for (let y = 0; y < canvas.height; y += step) {
                for (let x = 0; x < canvas.width; x += step) {
                    const alpha = imageData[(y * canvas.width + x) * 4 + 3];
                    if (alpha > 128) {
                        points.push({ x, y });
                    }
                }
            }

            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const p = points[Math.floor(Math.random() * points.length)] || { x: canvas.width / 2, y: canvas.height / 2 };
                particles.push(new Particle(p.x, p.y));
            }
        };

        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => setIsComplete(true), 1500);
            }
        });

        tl.to(progressObj, {
            value: 1,
            duration: 3.5,
            ease: "power2.inOut",
        });

        // Flash/Implosion effect
        tl.to(containerRef.current, {
            filter: "brightness(5) contrast(2)",
            opacity: 0,
            scale: 1.2,
            duration: 0.8,
            ease: "power4.in"
        });

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(progressObj.value);
                p.draw();
            });
            animationFrameId = requestAnimationFrame(loop);
        };

        setup();
        loop();

        const handleResize = () => setup();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {!isComplete && (
                <div
                    ref={containerRef}
                    className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden pointer-events-none"
                >
                    <canvas ref={canvasRef} className="w-full h-full" />

                    {/* Subtle "Initializing" marker */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500 opacity-40">
                            Assembling Core
                        </span>
                        <div className="w-24 h-[1px] bg-white/5 relative overflow-hidden">
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-y-0 w-1/2 bg-accent/20"
                            />
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
