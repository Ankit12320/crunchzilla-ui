"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WindowRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  type?: "section" | "card";
  as?: "div" | "section" | "article";
}

export default function WindowReveal({
  children,
  className,
  delay = 0,
  threshold = 0.08,
  type = "section",
  as: Component = "div",
}: WindowRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animClass =
    type === "card" ? "animate-window-card" : "animate-window-reveal";

  return (
    <Component
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      style={{
        animationDelay: isVisible && delay ? `${delay}ms` : undefined,
      }}
      className={cn(
        "transition-opacity duration-700 ease-out",
        isVisible
          ? `${animClass} opacity-100`
          : "opacity-0 translate-y-5 scale-[0.98]",
        className
      )}
    >
      {children}
    </Component>
  );
}
