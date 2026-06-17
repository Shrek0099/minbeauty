"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PetalTone = "soft" | "bloom" | "deep";

type PetalConfig = {
  id: number;
  x: number;
  startY: number;
  size: number;
  opacity: number;
  blur: number;
  rotation: number;
  duration: number;
  delay: number;
  tone: PetalTone;
  alt: boolean;
};

const TONE_COLORS: Record<PetalTone, { light: string; mid: string; deep: string }> = {
  soft: { light: "#FFF0F4", mid: "#FFC2D1", deep: "#F08FA8" },
  bloom: { light: "#FFFFFF", mid: "#FF9EB8", deep: "#E86B8A" },
  deep: { light: "#FFE4EC", mid: "#FF7DA0", deep: "#D65378" },
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function lerp(min: number, max: number, t: number) {
  return min + (max - min) * t;
}

function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function isMobileViewport(width: number) {
  return width < 768;
}

function getPetalCount(width: number) {
  if (isMobileViewport(width)) return randomInt(6, 8);
  if (width < 1024) return randomInt(14, 18);
  return randomInt(20, 26);
}

function generatePetals(count: number): PetalConfig[] {
  const tones: PetalTone[] = ["soft", "bloom", "deep"];

  return Array.from({ length: count }, (_, i) => {
    const depth = lerp(0.45, 1.35, seededRandom(i + 1));
    const size = lerp(18, 42, seededRandom(i + 11)) * lerp(0.92, 1.18, depth / 1.35);
    const opacity = lerp(0.55, 0.92, depth / 1.35) * lerp(0.9, 1, seededRandom(i + 9));
    const blur = Math.max(0, lerp(1.2, 0, depth / 1.35));
    const duration = lerp(16, 28, 1 - depth / 1.35) + seededRandom(i + 21) * 5;
    const tone = tones[Math.floor(seededRandom(i + 91) * tones.length)];

    return {
      id: i,
      x: seededRandom(i + 51) * 100,
      startY: -8,
      size,
      opacity: Math.min(0.82, opacity),
      blur,
      rotation: lerp(-50, 50, seededRandom(i + 61)),
      duration,
      delay: -seededRandom(i + 31) * duration,
      tone,
      alt: seededRandom(i + 81) > 0.5,
    };
  });
}

function SakuraPetalSvg({
  id,
  size,
  tone,
  opacity,
  blur,
}: {
  id: number;
  size: number;
  tone: PetalTone;
  opacity: number;
  blur: number;
}) {
  const colors = TONE_COLORS[tone];
  const gradientId = `sakura-grad-${id}`;

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 28 32"
      fill="none"
      aria-hidden="true"
      style={{ opacity, filter: blur > 0 ? `blur(${blur}px)` : undefined }}
    >
      <defs>
        <linearGradient id={gradientId} x1="8" y1="4" x2="22" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.light} />
          <stop offset="0.45" stopColor={colors.mid} />
          <stop offset="1" stopColor={colors.deep} />
        </linearGradient>
      </defs>
      <path
        d="M14 1.8C19 8.5 24.5 16 14 30.2C3.5 16 9 8.5 14 1.8Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M14 1.8C11.2 6.2 9.8 10.8 14 16.2C18.2 10.8 16.8 6.2 14 1.8Z"
        fill="rgba(255,255,255,0.35)"
      />
      <path
        d="M14 7V23.5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const MOUSE_RADIUS = 170;
const MOUSE_FORCE = 85;
const MOUSE_IDLE_MS = 700;

export function SakuraPetals() {
  const [petals, setPetals] = useState<PetalConfig[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const scrollEndTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const applyCount = () => {
      const width = window.innerWidth;
      hostRefs.current = [];
      setIsMobile(isMobileViewport(width));
      setPetals(generatePetals(getPetalCount(width)));
    };

    const initTimer = window.setTimeout(() => {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      applyCount();
    }, 0);
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applyCount, 200);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(initTimer);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    if (petals.length === 0 || !isMobile || reducedMotion) return;

    const layer = layerRef.current;
    if (!layer) return;

    const onScroll = () => {
      layer.classList.add("sakura-layer--scrolling");

      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(() => {
        layer.classList.remove("sakura-layer--scrolling");
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      layer.classList.remove("sakura-layer--scrolling");
    };
  }, [petals.length, isMobile, reducedMotion]);

  useEffect(() => {
    if (petals.length === 0 || reducedMotion) return;

    const clearBurst = (host: HTMLDivElement) => {
      host.style.transform = "";
      host.querySelector(".sakura-petal-inner")?.classList.remove("is-burst");
    };

    const applyHostBurst = (
      host: HTMLDivElement,
      x: number,
      y: number,
      rotate: number,
      scale: number,
    ) => {
      host.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      host.querySelector(".sakura-petal-inner")?.classList.add("is-burst");
    };

    const resetAllBursts = () => {
      hostRefs.current.forEach((host) => {
        if (host) clearBurst(host);
      });
    };

    const scheduleMouseReset = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        mouseRef.current.active = false;
        resetAllBursts();
      }, MOUSE_IDLE_MS);
    };

    const runMouseFrame = () => {
      rafRef.current = null;
      if (!mouseRef.current.active) return;

      const { x: mouseX, y: mouseY } = mouseRef.current;

      hostRefs.current.forEach((host) => {
        if (!host) return;

        const rect = host.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < MOUSE_RADIUS) {
          const force = ((MOUSE_RADIUS - distance) / MOUSE_RADIUS) * MOUSE_FORCE;
          applyHostBurst(host, (dx / distance) * force, (dy / distance) * force, (dx + dy) * 0.28, 1);
        } else {
          clearBurst(host);
        }
      });
    };

    const queueMouseFrame = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(runMouseFrame);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isMobileViewport(window.innerWidth)) return;
      mouseRef.current = { x: event.clientX, y: event.clientY, active: true };
      queueMouseFrame();
      scheduleMouseReset();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, [petals.length, reducedMotion]);

  const petalElements = useMemo(
    () =>
      petals.map((petal, index) => (
        <div
          key={petal.id}
          ref={(node) => {
            hostRefs.current[index] = node;
          }}
          className="sakura-petal-host"
          style={{ left: `${petal.x}%`, top: `${petal.startY}vh` }}
        >
          <div
            className={`sakura-petal-inner${petal.alt ? " sakura-petal-inner--alt" : ""}${reducedMotion ? " sakura-petal-inner--static" : ""}`}
            style={{
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div style={{ transform: `rotate(${petal.rotation}deg)` }}>
              <SakuraPetalSvg
                id={petal.id}
                size={petal.size}
                tone={petal.tone}
                opacity={petal.opacity}
                blur={petal.blur}
              />
            </div>
          </div>
        </div>
      )),
    [petals, reducedMotion],
  );

  if (petals.length === 0) return null;

  return (
    <div
      ref={layerRef}
      className={`sakura-layer${isMobile ? " sakura-layer--mobile" : ""}`}
      aria-hidden="true"
    >
      {petalElements}
    </div>
  );
}
