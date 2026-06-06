"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PetalConfig = {
  id: number;
  x: number;
  size: number;
  depth: number;
  opacity: number;
  blur: number;
  rotation: number;
  duration: number;
  delay: number;
  drift: number;
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

function getPetalCount(width: number) {
  if (width < 768) return randomInt(8, 12);
  if (width < 1024) return randomInt(12, 16);
  return randomInt(18, 24);
}

function generatePetals(count: number): PetalConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = lerp(0.4, 1.4, seededRandom(i + 1));
    const baseSize = lerp(10, 34, seededRandom(i + 11));
    const size = baseSize * lerp(0.82, 1.08, depth / 1.4);
    const opacity = Math.min(0.22, Math.max(0.08, lerp(0.08, 0.14, 1 - depth / 1.4) + depth * 0.06));
    const blur = Math.max(0, lerp(1.8, 0, depth / 1.4));
    const duration = lerp(30, 14, depth / 1.4) + seededRandom(i + 21) * 4;
    const delay = -seededRandom(i + 31) * duration;
    const drift = lerp(-50, 50, seededRandom(i + 41));

    return {
      id: i,
      x: seededRandom(i + 51) * 100,
      size,
      depth,
      opacity,
      blur,
      rotation: lerp(-40, 40, seededRandom(i + 61)),
      duration,
      delay,
      drift,
    };
  });
}

const MOUSE_RADIUS = 160;
const MOUSE_FORCE = 72;
const MOUSE_IDLE_MS = 700;
const MOBILE_BURST_MS = 700;

export function SakuraPetals() {
  const [petals, setPetals] = useState<PetalConfig[]>([]);
  const hostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const mobileBurstTimerRef = useRef<number | null>(null);
  const touchScrollPendingRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) return;

    const applyCount = () => {
      hostRefs.current = [];
      setPetals(generatePetals(getPetalCount(window.innerWidth)));
    };
    applyCount();

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applyCount, 180);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    if (petals.length === 0 || reducedMotionRef.current) return;

    const clearBurst = (host: HTMLDivElement) => {
      host.style.transform = "";
      host.querySelector(".sakura-petal")?.classList.remove("is-burst");
    };

    const applyHostBurst = (
      host: HTMLDivElement,
      x: number,
      y: number,
      rotate: number,
      scale: number,
      pause = true,
    ) => {
      host.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      const inner = host.querySelector(".sakura-petal");
      if (pause) inner?.classList.add("is-burst");
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
          const burstX = (dx / distance) * force;
          const burstY = (dy / distance) * force;
          const burstRotate = (burstX + burstY) * 0.35;
          applyHostBurst(host, burstX, burstY, burstRotate, 1, true);
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
      if (window.innerWidth < 768) return;
      mouseRef.current = { x: event.clientX, y: event.clientY, active: true };
      queueMouseFrame();
      scheduleMouseReset();
    };

    const triggerMobileBurst = () => {
      hostRefs.current.forEach((host) => {
        if (!host) return;
        const burstX = randomInt(-80, 80);
        const burstY = randomInt(-60, 60);
        const burstRotate = randomInt(-90, 90);
        const burstScale = lerp(0.8, 1.25, Math.random());
        applyHostBurst(host, burstX, burstY, burstRotate, burstScale, true);
      });

      if (mobileBurstTimerRef.current) window.clearTimeout(mobileBurstTimerRef.current);
      mobileBurstTimerRef.current = window.setTimeout(resetAllBursts, MOBILE_BURST_MS);
    };

    const runTouchScrollFrame = () => {
      touchScrollPendingRef.current = false;
      if (window.innerWidth >= 768) return;
      triggerMobileBurst();
    };

    const queueTouchScrollBurst = () => {
      if (touchScrollPendingRef.current) return;
      touchScrollPendingRef.current = true;
      window.requestAnimationFrame(runTouchScrollFrame);
    };

    const onTouchMove = () => queueTouchScrollBurst();
    const onScroll = () => {
      if (window.innerWidth < 768) queueTouchScrollBurst();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      if (mobileBurstTimerRef.current) window.clearTimeout(mobileBurstTimerRef.current);
    };
  }, [petals.length]);

  const petalElements = useMemo(
    () =>
      petals.map((petal, index) => (
        <div
          key={petal.id}
          ref={(node) => {
            hostRefs.current[index] = node;
          }}
          className="sakura-petal-host"
          style={{
            left: `${petal.x}%`,
            ["--depth" as string]: String(petal.depth),
          }}
        >
          <span
            className="sakura-petal"
            style={{
              ["--size" as string]: `${petal.size}px`,
              ["--duration" as string]: `${petal.duration}s`,
              ["--delay" as string]: `${petal.delay}s`,
              ["--opacity" as string]: String(petal.opacity),
              ["--blur" as string]: `${petal.blur}px`,
              ["--drift" as string]: `${petal.drift}px`,
              ["--rotation" as string]: `${petal.rotation}deg`,
            }}
          />
        </div>
      )),
    [petals],
  );

  if (petals.length === 0) return null;

  return (
    <div className="sakura-layer" aria-hidden="true">
      {petalElements}
    </div>
  );
}
