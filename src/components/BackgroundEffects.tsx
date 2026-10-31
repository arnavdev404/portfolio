"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const COLORS = {
  dark: {
    dot: [217, 136, 136, 0.5] as const,
    spotlight: [217, 136, 136, 0.06] as const,
  },
  light: {
    dot: [199, 108, 108, 0.55] as const,
    spotlight: [199, 108, 108, 0.04] as const,
  },
} as const;

const GRID_SPACING = 40;
const DOT_RADIUS = 1.15;
const HOVER_RADIUS = 180;
const HOVER_RADIUS_SQ = HOVER_RADIUS * HOVER_RADIUS;
const SPOTLIGHT_RADIUS = 280;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -10000, y: -10000 });
  const scrollRef = useRef(0);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let lastFrameTime = 0;
    let dpr = 1;

    const resize = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      canvas.style.display = mobile ? "none" : "block";
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (mobile) mouseRef.current = { x: -10000, y: -10000 };
    };

    let lastMouseTime = 0;
    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) return;
      const now = performance.now();
      if (now - lastMouseTime < 32) return;
      lastMouseTime = now;
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -10000, y: -10000 };
    };
    const handleScroll = () => { scrollRef.current = window.scrollY; };
    const handleVisibility = () => { isVisibleRef.current = document.visibilityState === "visible"; };
    const rgba = (color: readonly [number, number, number, number]) =>
      `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;

    const draw = (timestamp: number) => {
      animationId = requestAnimationFrame(draw);
      if (!isVisibleRef.current || canvas.style.display === "none") return;
      const delta = timestamp - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL);
      ctx.clearRect(0, 0, width, height);

      const { x: mx, y: my } = mouseRef.current;
      // The idle canvas is completely transparent. Reveal the subtle radial light
      // and the dot grid only while the pointer is inside the viewport.
      if (mx >= 0 && my >= 0 && mx <= width && my <= height) {
        const colors = themeRef.current === "dark" ? COLORS.dark : COLORS.light;
        const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, SPOTLIGHT_RADIUS);
        spotlight.addColorStop(0, rgba(colors.spotlight));
        spotlight.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = spotlight;
        ctx.fillRect(mx - SPOTLIGHT_RADIUS, my - SPOTLIGHT_RADIUS, SPOTLIGHT_RADIUS * 2, SPOTLIGHT_RADIUS * 2);

        const parallaxOffset = (scrollRef.current * 0.03) % GRID_SPACING;
        const startX = Math.max(0, Math.floor((mx - HOVER_RADIUS) / GRID_SPACING) * GRID_SPACING);
        const endX = Math.min(width, mx + HOVER_RADIUS);
        const startY = Math.max(0, Math.floor((my - HOVER_RADIUS) / GRID_SPACING) * GRID_SPACING);
        const endY = Math.min(height, my + HOVER_RADIUS);

        ctx.fillStyle = rgba(colors.dot);
        for (let gx = startX; gx <= endX; gx += GRID_SPACING) {
          for (let gy = startY; gy <= endY; gy += GRID_SPACING) {
            const dy = gy + parallaxOffset;
            const dx = mx - gx;
            const ddy = my - dy;
            const distanceSquared = dx * dx + ddy * ddy;
            if (distanceSquared >= HOVER_RADIUS_SQ) continue;
            const distance = Math.sqrt(distanceSquared);
            const intensity = 1 - distance / HOVER_RADIUS;
            const radius = DOT_RADIUS + intensity * 2.1;
            ctx.globalAlpha = 0.22 + intensity * 0.78;
            ctx.beginPath();
            ctx.arc(gx, dy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    resize();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
