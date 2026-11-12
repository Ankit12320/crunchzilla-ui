"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Color palettes for authentic Indian festival firecrackers & sparks
const PALETTES = [
  // Royal Gold & Saffron (Mithila / Festive Amber)
  ["#FFD700", "#FFA500", "#FF8C00", "#FFF8DC", "#FFDAB9"],
  // Ruby Crimson & Terracotta
  ["#FF3366", "#FF5E7E", "#E63946", "#FF9999", "#FFE5E5"],
  // Emerald & Mint Green
  ["#00F5D4", "#2EC4B6", "#10B981", "#6EE7B7", "#D1FAE5"],
  // Multi-colored Diwali / Celebration Fiesta
  ["#FF1493", "#00F5D4", "#FFD700", "#7B2CBF", "#FF85A1", "#FFFFFF"],
  // Electric Violet & Champagne
  ["#9D4EDD", "#C77DFF", "#E0AAFF", "#FFEEDD", "#FFF3B0"],
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
  gravity: number;
  drag: number;
  sparkle: boolean;
  history: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  palette: string[];
  style: "peony" | "willow" | "crackle" | "ring";
  trail: { x: number; y: number; alpha: number }[];
}

interface FlashGlow {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function CrackerAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [burstCount, setBurstCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // References for animation state
  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const flashesRef = useRef<FlashGlow[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(soundEnabled);
  const isPlayingRef = useRef(isPlaying);
  const isScrolledOutOfViewRef = useRef(false);

  // Keep refs in sync with states
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Audio synthesis using Web Audio API (Zero external assets)
  const playCrackerSound = useCallback(
    (type: "launch" | "burst" | "crackle") => {
      if (!soundEnabledRef.current) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;

        if (type === "launch") {
          // Whistle / rocket ascent sound
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(780, now + 0.4);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        } else if (type === "burst") {
          // Boom / explosion sound synthesized from filtered white noise
          const bufferSize = ctx.sampleRate * 0.5;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450, now);
          filter.frequency.exponentialRampToValueAtTime(50, now + 0.4);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          whiteNoise.start(now);
          whiteNoise.stop(now + 0.5);
        } else if (type === "crackle") {
          // Sparkling crackle
          for (let i = 0; i < 5; i++) {
            const burstTime = now + 0.05 * i + Math.random() * 0.04;
            const bufferSize = Math.floor(ctx.sampleRate * 0.06);
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let j = 0; j < bufferSize; j++) {
              output[j] = Math.random() * 2 - 1;
            }

            const pop = ctx.createBufferSource();
            pop.buffer = noiseBuffer;

            const filter = ctx.createBiquadFilter();
            filter.type = "highpass";
            filter.frequency.setValueAtTime(1400, burstTime);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.08, burstTime);
            gain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.05);

            pop.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            pop.start(burstTime);
            pop.stop(burstTime + 0.06);
          }
        }
      } catch {
        // Silently catch audio errors (e.g. browser policy)
      }
    },
    []
  );

  // Spawn bursting cracker particles at (x, y)
  const detonateRocket = useCallback(
    (
      x: number,
      y: number,
      palette: string[],
      style: "peony" | "willow" | "crackle" | "ring"
    ) => {
      setBurstCount((prev) => prev + 1);
      playCrackerSound(style === "crackle" ? "crackle" : "burst");

      // Ephemeral Flash illumination
      flashesRef.current.push({
        x,
        y,
        radius: Math.min(window.innerWidth * 0.35, 220),
        color: palette[0] || "#FFF",
        alpha: 0.35,
        decay: 0.06,
      });

      const particleCount =
        style === "willow" ? 85 : style === "ring" ? 70 : 90;

      for (let i = 0; i < particleCount; i++) {
        let vx = 0;
        let vy = 0;
        let drag = 0.96;
        let gravity = 0.07;
        let decay = Math.random() * 0.012 + 0.015;
        let size = Math.random() * 2.8 + 1.6;
        const color = palette[Math.floor(Math.random() * palette.length)];

        if (style === "ring") {
          const angle = (i / particleCount) * Math.PI * 2;
          const speed = Math.random() * 1.5 + 4.2;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          gravity = 0.05;
          drag = 0.95;
        } else if (style === "willow") {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4.5 + 1.2;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed - 0.5;
          gravity = 0.12; // Falls like a golden fountain/willow
          drag = 0.97;
          decay = Math.random() * 0.007 + 0.009; // Lingers longer
          size = Math.random() * 2.2 + 1.2;
        } else if (style === "crackle") {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.5 + 1.5;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.91; // High drag for popping sparkles
          gravity = 0.04;
          decay = Math.random() * 0.02 + 0.02;
          size = Math.random() * 3 + 2;
        } else {
          // Standard Peony spherical burst
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5.8 + 1.2;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        }

        particlesRef.current.push({
          x,
          y,
          vx,
          vy,
          alpha: 1,
          decay,
          size,
          color,
          gravity,
          drag,
          sparkle: Math.random() > 0.35,
          history: [],
        });
      }
    },
    [playCrackerSound]
  );

  // Launch a new rocket upwards
  const launchRocket = useCallback(
    (
      startX?: number,
      startY?: number,
      destX?: number,
      destY?: number,
      forcedPalette?: string[]
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      const x = startX ?? Math.random() * (width * 0.8) + width * 0.1;
      const y = startY ?? height;

      const targetX = destX ?? x + (Math.random() * 120 - 60);
      const targetY =
        destY ?? Math.random() * (height * 0.45) + height * 0.12;

      const deltaX = targetX - x;
      const deltaY = targetY - y;
      const distance = Math.hypot(deltaX, deltaY);

      // Rocket speed
      const speed = Math.random() * 3 + 12;
      const vx = (deltaX / distance) * speed;
      const vy = (deltaY / distance) * speed;

      const palette =
        forcedPalette ||
        PALETTES[Math.floor(Math.random() * PALETTES.length)];

      const styles: ("peony" | "willow" | "crackle" | "ring")[] = [
        "peony",
        "willow",
        "crackle",
        "ring",
      ];
      const style = styles[Math.floor(Math.random() * styles.length)];

      rocketsRef.current.push({
        x,
        y,
        targetY,
        vx,
        vy,
        color: palette[0],
        palette,
        style,
        trail: [],
      });

      playCrackerSound("launch");
    },
    [playCrackerSound]
  );

  // Multi-cracker grand festive blast
  const triggerGrandFestiveBurst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Launch 3 rockets with different timings and target locations
    launchRocket(width * 0.25, height, width * 0.28, height * 0.2);
    setTimeout(() => {
      launchRocket(width * 0.75, height, width * 0.72, height * 0.22);
    }, 200);
    setTimeout(() => {
      launchRocket(width * 0.5, height, width * 0.5, height * 0.15);
    }, 450);
  }, [launchRocket]);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial festive welcoming crackers sequence
    const timer1 = setTimeout(() => {
      if (isPlayingRef.current) {
        launchRocket(
          window.innerWidth * 0.35,
          window.innerHeight,
          window.innerWidth * 0.35,
          window.innerHeight * 0.25
        );
      }
    }, 600);

    const timer2 = setTimeout(() => {
      if (isPlayingRef.current) {
        launchRocket(
          window.innerWidth * 0.65,
          window.innerHeight,
          window.innerWidth * 0.65,
          window.innerHeight * 0.2
        );
      }
    }, 1400);

    const timer3 = setTimeout(() => {
      if (isPlayingRef.current) {
        launchRocket(
          window.innerWidth * 0.5,
          window.innerHeight,
          window.innerWidth * 0.5,
          window.innerHeight * 0.16
        );
      }
    }, 2400);

    // Periodic ambient cracker launcher
    let nextAmbientTime = Date.now() + 3800;

    // Animation frame loop
    const render = () => {
      // Clear canvas with transparent clearRect
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (
        isPlayingRef.current &&
        !isScrolledOutOfViewRef.current &&
        !document.hidden
      ) {
        const now = Date.now();
        if (now >= nextAmbientTime) {
          launchRocket();
          // Next burst in 3.5 to 6 seconds
          nextAmbientTime = now + Math.random() * 2500 + 3500;
        }
      }

      // 1. Draw Flashes
      for (let i = flashesRef.current.length - 1; i >= 0; i--) {
        const f = flashesRef.current[i];
        f.alpha -= f.decay;
        if (f.alpha <= 0) {
          flashesRef.current.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          f.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${f.alpha * 0.8})`);
        gradient.addColorStop(0.3, `${f.color}${Math.floor(f.alpha * 255).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];

        r.trail.push({ x: r.x, y: r.y, alpha: 0.9 });
        if (r.trail.length > 8) {
          r.trail.shift();
        }

        // Draw rocket spark trail
        ctx.beginPath();
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          const trAlpha = (t / r.trail.length) * 0.7;
          ctx.fillStyle = `rgba(255, 215, 0, ${trAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (t / r.trail.length) * 2.2 + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw rocket head
        ctx.fillStyle = "#FFF7D6";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        r.x += r.vx;
        r.y += r.vy;

        // Check if rocket reached its target height or apex
        if (r.vy >= 0 || r.y <= r.targetY) {
          detonateRocket(r.x, r.y, r.palette, r.style);
          rocketsRef.current.splice(i, 1);
        }
      }

      // 3. Update and Draw Cracker Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Add history for smooth tail
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 4) {
          p.history.shift();
        }

        // Twinkle flicker calculation
        const currentAlpha = p.sparkle
          ? p.alpha * (0.6 + Math.random() * 0.4)
          : p.alpha;

        // Draw particle tail
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = currentAlpha * 0.6;
          ctx.lineWidth = p.size * 0.7;
          ctx.stroke();
        }

        // Draw particle spark head
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra bright core for sparkling particles
        if (p.sparkle && Math.random() > 0.4) {
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1.0;
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    // Scroll listener: pause if user scrolls far down to optimize performance
    const handleScroll = () => {
      isScrolledOutOfViewRef.current = window.scrollY > 1500;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [detonateRocket, launchRocket]);

  // Handle user clicks on empty screen areas to burst crackers right there!
  useEffect(() => {
    const handleWindowClick = (e: MouseEvent | TouchEvent) => {
      // Don't trigger if clicked on interactive elements (buttons, links, inputs, dropdowns)
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "button, a, input, select, textarea, [role='button'], .no-cracker"
      );
      if (interactive) return;

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

      // Launch rocket towards click location
      const canvas = canvasRef.current;
      if (!canvas) return;
      const height = window.innerHeight;
      launchRocket(clientX + (Math.random() * 40 - 20), height, clientX, clientY);
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [launchRocket]);

  return (
    <>
      {/* 
        High-performance full-viewport fireworks canvas.
        pointer-events-none ensures all clicks pass through cleanly to page components.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 h-full w-full select-none"
      />

      {/* Floating Interactive Festive Cracker Pill Controller */}
      <div
        className="fixed left-4 bottom-20 sm:left-6 sm:bottom-6 z-40 flex items-center gap-2 select-none"
        aria-label="Festive Firecrackers Celebration Control"
      >
        {isMinimized ? (
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            title="Open Festive Cracker Menu"
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-roasted-terracotta to-spiced-tangerine text-white shadow-xl ring-2 ring-amber-300/60 transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <span className="text-xl animate-bounce">🎆</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 rounded-full bg-surface-container-highest/95 p-1.5 backdrop-blur-md border border-amber-900/15 shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all">
            {/* Burst Button */}
            <button
              type="button"
              onClick={triggerGrandFestiveBurst}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-roasted-terracotta via-amber-600 to-spiced-tangerine px-3.5 py-2 text-label-sm font-bold text-pure-parchment shadow-md transition-all duration-200 hover:brightness-110 active:scale-95"
            >
              <span className="text-base group-hover:rotate-12 transition-transform">
                🎆
              </span>
              <span>Burst Crackers</span>
              {burstCount > 0 && (
                <span className="flex h-5 items-center justify-center rounded-full bg-white/25 px-1.5 text-[11px] font-extrabold text-white">
                  {burstCount}
                </span>
              )}
            </button>

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              title={isPlaying ? "Pause Crackers" : "Resume Crackers"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary active:scale-90"
            >
              <span className="material-symbols-outlined text-[19px]">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>

            {/* Sound Toggle (Web Audio API Synthesized) */}
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState) {
                  playCrackerSound("burst");
                }
              }}
              title={soundEnabled ? "Mute Cracker Sound" : "Enable Cracker Sound"}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors active:scale-90 ${
                soundEnabled
                  ? "bg-amber-100 text-amber-900 font-bold"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">
                {soundEnabled ? "volume_up" : "volume_off"}
              </span>
            </button>

            {/* Minimize Pill */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              title="Minimize"
              className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant/70 transition-colors hover:text-on-surface active:scale-90"
            >
              <span className="material-symbols-outlined text-[17px]">close</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
