"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";

const COLORS = {
  dark: {
    dot: [217, 136, 136, 0.12] as const,
    dotHover: [217, 136, 136, 0.5] as const,
    spotlight: [217, 136, 136, 0.06] as const,
    particle: [217, 136, 136, 0.25] as const,
  },
  light: {
    dot: [199, 108, 108, 0.18] as const,
    dotHover: [199, 108, 108, 0.55] as const,
    spotlight: [199, 108, 108, 0.04] as const,
    particle: [199, 108, 108, 0.18] as const,
  },
} as const;

const GRID_SPACING = 40;
const DOT_RADIUS = 1;
const HOVER_RADIUS = 180;
const HOVER_RADIUS_SQ = HOVER_RADIUS * HOVER_RADIUS;
const SPOTLIGHT_RADIUS = 280;
const MAX_PARTICLES = 8;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const isVisibleRef = useRef(true);
  const isMobileRef = useRef(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768 || "ontouchstart" in window;
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const getColorSet = useCallback(() => {
    return themeRef.current === "dark" ? COLORS.dark : COLORS.light;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isMobileRef.current) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let lastFrameTime = 0;
    const particles: Particle[] = [];

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: height + 10,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.08),
        size: Math.random() * 1.5 + 0.5,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 350 + 200,
      };
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let lastMouseTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseTime < 32) return; // ~30fps throttle
      lastMouseTime = now;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const rgba = (c: readonly [number, number, number, number]) =>
      `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;

    const draw = (timestamp: number) => {
      animationId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;

      const delta = timestamp - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = timestamp - (delta % FRAME_INTERVAL);

      const colors = getColorSet();
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scroll = scrollRef.current;
      const parallaxOffset = (scroll * 0.03) % GRID_SPACING;

      // --- Spotlight glow behind cursor ---
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, SPOTLIGHT_RADIUS);
        gradient.addColorStop(0, rgba(colors.spotlight));
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(mx - SPOTLIGHT_RADIUS, my - SPOTLIGHT_RADIUS, SPOTLIGHT_RADIUS * 2, SPOTLIGHT_RADIUS * 2);
      }

      // --- Dot grid with hover interaction ---
      for (let gx = 0; gx < width; gx += GRID_SPACING) {
        for (let gy = -GRID_SPACING; gy < height + GRID_SPACING; gy += GRID_SPACING) {
          const dy = gy + parallaxOffset;
          const ddx = mx - gx;
          const ddy = my - dy;
          const distSq = ddx * ddx + ddy * ddy;

          if (distSq < HOVER_RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            const intensity = 1 - dist / HOVER_RADIUS;
            const size = DOT_RADIUS + intensity * 2;
            ctx.globalAlpha = 0.2 + intensity * 0.7;
            ctx.fillStyle = rgba(colors.dotHover);
            ctx.beginPath();
            ctx.arc(gx, dy, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = rgba(colors.dot);
            ctx.beginPath();
            ctx.arc(gx, dy, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;

      // --- Floating particles ---
      if (particles.length < MAX_PARTICLES && Math.random() < 0.01) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life < 25) {
          p.opacity = (p.life / 25) * 0.35;
        } else if (p.life > p.maxLife - 30) {
          p.opacity = ((p.maxLife - p.life) / 30) * 0.35;
        }

        if (p.life >= p.maxLife || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = rgba(colors.particle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getColorSet]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
