"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Vibrant festive colors for celebration
const FESTIVE_COLORS = [
  "#FFD700", // Royal Gold
  "#FFA500", // Warm Amber
  "#FF3366", // Festive Ruby
  "#00E676", // Fresh Green
  "#00E5FF", // Cyan Sparkle
  "#FFFFFF", // Pure White
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
}

export default function CrackerAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [burstCount, setBurstCount] = useState(0);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const isLoopRunningRef = useRef(false);
  const isScrolledRef = useRef(false);

  // Wake up loop only when there is active work to do
  const startLoopIfNeeded = useCallback(() => {
    if (isLoopRunningRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    isLoopRunningRef.current = true;

    const render = () => {
      // If scrolled deep down, stop animation to save battery
      if (isScrolledRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rocketsRef.current = [];
        particlesRef.current = [];
        isLoopRunningRef.current = false;
        return;
      }

      const hasRockets = rocketsRef.current.length > 0;
      const hasParticles = particlesRef.current.length > 0;

      // If nothing is left to draw, stop loop and sleep
      if (!hasRockets && !hasParticles) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isLoopRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;

        // Draw small rocket head
        ctx.fillStyle = "#FFF";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Reached target height -> detonate
        if (r.y <= r.targetY || r.vy >= 0) {
          // Detonate inline into lightweight sparks
          setBurstCount((c) => c + 1);
          const count = 26;
          for (let pIdx = 0; pIdx < count; pIdx++) {
            const angle = (pIdx / count) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
            const speed = Math.random() * 3.5 + 2.0;
            const color =
              FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];

            particlesRef.current.push({
              x: r.x,
              y: r.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              decay: Math.random() * 0.02 + 0.02,
              size: Math.random() * 2 + 1.2,
              color,
            });
          }
          rocketsRef.current.splice(i, 1);
        }
      }

      // 2. Update & Draw Particles (lightweight batching)
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + 0.08; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, []);

  // Launch a new rocket
  const launchRocket = useCallback(
    (targetX?: number, targetY?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = canvas.width;
      const h = canvas.height;

      const startX = targetX ? targetX : Math.random() * (w * 0.7) + w * 0.15;
      const destX = targetX ? targetX : startX + (Math.random() * 60 - 30);
      const destY = targetY ? targetY : Math.random() * (h * 0.35) + h * 0.12;

      const dy = destY - h;
      const dx = destX - startX;
      const dist = Math.hypot(dx, dy);
      const speed = 14;

      rocketsRef.current.push({
        x: startX,
        y: h,
        targetY: destY,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
        color: FESTIVE_COLORS[0],
      });

      startLoopIfNeeded();
    },
    [startLoopIfNeeded]
  );

  // Grand celebration burst (3 rockets)
  const triggerCelebration = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    launchRocket(w * 0.3, h * 0.25);
    setTimeout(() => launchRocket(w * 0.7, h * 0.22), 150);
    setTimeout(() => launchRocket(w * 0.5, h * 0.18), 320);
  }, [launchRocket]);

  // Setup Canvas & Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      if (!canvas) return;
      // Cap DPR to 1.5 for ultra-fast, smooth mobile rendering
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial festive welcoming burst
    const timer = setTimeout(() => {
      if (!isScrolledRef.current) {
        triggerCelebration();
      }
    }, 700);

    // Pause when scrolled past hero
    const handleScroll = () => {
      isScrolledRef.current = window.scrollY > 600;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerCelebration]);

  // Tap anywhere on empty space to burst crackers
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("button, a, input, select, textarea, [role='button']")) {
        return;
      }

      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      launchRocket(clientX * dpr, clientY * dpr);
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [launchRocket]);

  return (
    <>
      {/* Ultra-lightweight pointer-events-none celebration canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 h-full w-full select-none"
      />

      {/* Floating Mini Celebration Pill at bottom-left */}
      <div
        className="fixed left-3 bottom-18 sm:left-6 sm:bottom-6 z-40 select-none"
        aria-label="Festive Celebration"
      >
        <button
          type="button"
          onClick={triggerCelebration}
          className="group flex items-center gap-2 rounded-full bg-surface-container-highest/90 px-3.5 py-2 text-label-xs font-bold text-on-surface shadow-lg backdrop-blur-md border border-amber-900/15 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">
            🎆
          </span>
          <span className="hidden xs:inline sm:inline">Burst Crackers</span>
          {burstCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/20 px-1 text-[10px] font-extrabold text-amber-900">
              {burstCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
