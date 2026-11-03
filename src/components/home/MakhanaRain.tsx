"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/images";

interface MakhanaParticle {
  id: number;
  image: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
  animationName: "makhanaFall1" | "makhanaFall2" | "makhanaFall3";
  blur?: boolean;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

const PARTICLES: MakhanaParticle[] = [
  // Primary stream (visible on all screens including mobile)
  {
    id: 1,
    image: IMAGES.effects.makhana1,
    left: "6%",
    size: 34,
    duration: "11s",
    delay: "0s",
    animationName: "makhanaFall1",
  },
  {
    id: 2,
    image: IMAGES.effects.makhana2,
    left: "22%",
    size: 26,
    duration: "13s",
    delay: "3.5s",
    animationName: "makhanaFall2",
    blur: true,
  },
  {
    id: 3,
    image: IMAGES.effects.makhana3,
    left: "48%",
    size: 38,
    duration: "10s",
    delay: "1.2s",
    animationName: "makhanaFall3",
  },
  {
    id: 4,
    image: IMAGES.effects.makhana4,
    left: "68%",
    size: 28,
    duration: "14s",
    delay: "5.5s",
    animationName: "makhanaFall1",
  },
  {
    id: 5,
    image: IMAGES.effects.makhana1,
    left: "84%",
    size: 40,
    duration: "12s",
    delay: "2.4s",
    animationName: "makhanaFall2",
  },
  {
    id: 6,
    image: IMAGES.effects.makhana2,
    left: "93%",
    size: 24,
    duration: "15s",
    delay: "7s",
    animationName: "makhanaFall3",
    blur: true,
  },

  // Secondary stream (desktop & tablet only to keep mobile uncluttered)
  {
    id: 7,
    image: IMAGES.effects.makhana3,
    left: "14%",
    size: 44,
    duration: "11.5s",
    delay: "6s",
    animationName: "makhanaFall3",
    desktopOnly: true,
  },
  {
    id: 8,
    image: IMAGES.effects.makhana4,
    left: "34%",
    size: 24,
    duration: "16s",
    delay: "8.5s",
    animationName: "makhanaFall1",
    blur: true,
    desktopOnly: true,
  },
  {
    id: 9,
    image: IMAGES.effects.makhana1,
    left: "58%",
    size: 36,
    duration: "12.5s",
    delay: "4.2s",
    animationName: "makhanaFall2",
    desktopOnly: true,
  },
  {
    id: 10,
    image: IMAGES.effects.makhana2,
    left: "76%",
    size: 46,
    duration: "10.5s",
    delay: "9.2s",
    animationName: "makhanaFall1",
    desktopOnly: true,
  },
  {
    id: 11,
    image: IMAGES.effects.makhana3,
    left: "3%",
    size: 28,
    duration: "14.5s",
    delay: "11s",
    animationName: "makhanaFall2",
    desktopOnly: true,
  },
  {
    id: 12,
    image: IMAGES.effects.makhana4,
    left: "41%",
    size: 32,
    duration: "13.2s",
    delay: "10s",
    animationName: "makhanaFall3",
    desktopOnly: true,
  },
];

export default function MakhanaRain() {
  return (
    <div
      aria-hidden="true"
      className="makhana-rain-layer pointer-events-none select-none absolute inset-0 overflow-hidden z-10"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.desktopOnly ? "hidden md:block" : "block"}`}
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationName: p.animationName,
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            willChange: "top, transform, opacity",
            filter: p.blur ? "blur(0.8px)" : undefined,
          }}
        >
          <Image
            src={p.image}
            alt=""
            width={p.size * 2}
            height={p.size * 2}
            className="h-full w-full object-contain drop-shadow-[0_4px_8px_rgba(45,30,15,0.08)]"
            loading="lazy"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
