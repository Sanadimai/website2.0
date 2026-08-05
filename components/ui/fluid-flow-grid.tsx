'use client';

/* eslint-disable react-hooks/set-state-in-effect -- matchMedia is browser-only and must be sampled after mount; the initial state is the SSR-safe default. */

import React, { useEffect, useRef, useState } from 'react';

export type FlowPalette = {
    /** Solid canvas background. */
    bg: string;
    /** Resting stroke, as "r, g, b". */
    line: string;
    /** Stroke inside the cursor's force field, as "r, g, b". */
    accent: string;
};

type Props = {
    /** Omit to keep the original blue theme, which follows prefers-color-scheme. */
    palette?: FlowPalette;
    className?: string;
    /** Replaces the default CURRENT headline overlay. */
    children?: React.ReactNode;
};

export default function FluidFlowGrid({ palette, className, children }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [reducedMotion, setReducedMotion] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // ui-ux-pro-max `reduced-motion`: draw one static frame instead of animating.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            // Size to the parent box, not the viewport, so the field can sit
            // inside a section instead of only working as a full-screen page.
            const rect = canvas.parentElement?.getBoundingClientRect();
            width = rect?.width || window.innerWidth;
            height = rect?.height || window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.targetX = -1000;
            mouse.targetY = -1000;
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        let time = 0;

        const render = () => {
            if (!reducedMotion) time += 0.008;

            // Mouse smooth interpolation
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            const bgColor = palette ? palette.bg : isDarkMode ? '#080d1a' : '#f0f7ff';
            const lineBaseColor = palette
                ? palette.line
                : isDarkMode
                  ? '59, 130, 246'
                  : '30, 64, 175';
            const accentBlue = palette
                ? palette.accent
                : isDarkMode
                  ? '147, 197, 253'
                  : '29, 78, 216';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            const spacing = 35;
            const cols = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;

            ctx.lineWidth = 1.2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Trigonometric fluid turbulence angle
                    let angle = Math.sin(x * 0.003 + time) + Math.cos(y * 0.003 + time);

                    // Distance to mouse force field
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let isNear = false;
                    if (dist < 220 && dist > 0) {
                        isNear = true;
                        const pushAngle = Math.atan2(dy, dx) + Math.PI;
                        const force = 1 - dist / 220;
                        angle = angle * (1 - force) + pushAngle * force;
                    }

                    const lineLen = isNear ? 22 : 14;
                    const x2 = x + Math.cos(angle) * lineLen;
                    const y2 = y + Math.sin(angle) * lineLen;

                    const alpha = isNear
                        ? 0.8
                        : 0.15 + Math.sin(x * 0.01 + y * 0.01 + time) * 0.1;

                    ctx.strokeStyle = isNear
                        ? `rgba(${accentBlue}, ${alpha})`
                        : `rgba(${lineBaseColor}, ${alpha})`;

                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDarkMode, palette, reducedMotion]);

    return (
        <div
            className={
                className ??
                'relative w-full h-screen overflow-hidden select-none bg-slate-950'
            }
        >
            <canvas ref={canvasRef} className="absolute inset-0 block cursor-default" />

            {children ?? (
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none mix-blend-difference text-white">
                    <h1 className="font-mono text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                        CURRENT
                    </h1>
                    <p className="mt-4 font-mono text-xs md:text-sm max-w-lg opacity-70">
                        Smooth directional flow field rendered in calm, neutral blue tones.
                    </p>
                </div>
            )}
        </div>
    );
}
