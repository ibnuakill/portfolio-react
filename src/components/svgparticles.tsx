"use client";

import { useEffect, useRef } from "react";

type ImageConfig = {
  image: string;
  mode?: "fit" | "fill";
  scale?: number;
};

type Transition = {
  duration?: number;
  ease?: string;
};

type HoverConfig = {
  hoverType?: "roam" | "repel" | "none";
  roamOpacity?: number;
  transition?: Transition;
};

type RepulsionConfig = {
  repulsionForce?: number;
  repulsionRadius?: number;
};

type Props = {
  width?: number | string;
  height?: number | string;
  particleCount?: number;
  particleSize?: number;
  imageConfig: ImageConfig;
  hoverConfig?: HoverConfig;
  repulsionConfig?: RepulsionConfig;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

const ACCENT = "#10b981";
const ACCENT_2 = "#34d399";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ParticleImage({
  width = "100%",
  height = "100%",
  particleCount = 160,
  particleSize = 3.6,
  imageConfig,
  hoverConfig,
  repulsionConfig,
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const reducedMotion = useRef(false);

  const hoverType = hoverConfig?.hoverType ?? "roam";
  const roamOpacity = hoverConfig?.roamOpacity ?? 1;
  const repulsionForce = repulsionConfig?.repulsionForce ?? 4;
  const repulsionRadius = repulsionConfig?.repulsionRadius ?? 48;
  const scale = imageConfig.scale ?? 8;
  const mode = imageConfig.mode ?? "fit";

  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
    };

    const sampleImage = (img: HTMLImageElement) => {
      const off = document.createElement("canvas");
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [] as { x: number; y: number; a: number }[];
      const cw = Math.max(1, Math.floor(canvas.width / dpr));
      const ch = Math.max(1, Math.floor(canvas.height / dpr));
      off.width = cw;
      off.height = ch;
      octx.fillStyle = "#0a0a0a";
      octx.fillRect(0, 0, cw, ch);

      const ratio = img.width / img.height;
      const boxRatio = cw / ch;
      let dw = cw;
      let dh = ch;
      if (mode === "fit") {
        if (ratio > boxRatio) {
          dh = cw / ratio;
        } else {
          dw = ch * ratio;
        }
      } else {
        if (ratio > boxRatio) {
          dw = ch * ratio;
        } else {
          dh = cw / ratio;
        }
      }
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      octx.imageSmoothingEnabled = true;
      octx.drawImage(img, dx, dy, dw, dh);

      let data: ImageData;
      try {
        data = octx.getImageData(0, 0, cw, ch);
      } catch {
        return [];
      }
      const px = data.data;
      const step = Math.max(1, Math.floor(Math.sqrt((cw * ch) / 2400)));
      const pts: { x: number; y: number; a: number }[] = [];
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          const i = (y * cw + x) * 4;
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const a = px[i + 3];
          if (a < 30) continue;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum < 40) continue;
          const weight = Math.min(1, (lum - 40) / 180);
          pts.push({ x, y, a: weight });
        }
      }
      return pts;
    };

    const buildParticles = (pts: { x: number; y: number; a: number }[]) => {
      const list: Particle[] = [];
      const total = Math.max(1, Math.min(particleCount, pts.length));
      for (let i = 0; i < total; i++) {
        const p = pts[i] ?? pts[Math.floor(Math.random() * pts.length)];
        const size = particleSize * (0.6 + (p?.a ?? 0.5) * 0.8);
        list.push({
          x: p?.x ?? 0,
          y: p?.y ?? 0,
          baseX: p?.x ?? 0,
          baseY: p?.y ?? 0,
          vx: 0,
          vy: 0,
          size,
          alpha: 0.4 + (p?.a ?? 0.5) * 0.6,
        });
      }
      return list;
    };

    let currentImage: HTMLImageElement | null = null;

    const rebuild = () => {
      if (!currentImage || !currentImage.complete || !currentImage.naturalWidth)
        return;
      const pts = sampleImage(currentImage);
      if (pts.length === 0) {
        particlesRef.current = [];
        return;
      }
      particlesRef.current = buildParticles(pts);
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      currentImage = img;
      resize();
    };
    img.onerror = () => {
      currentImage = null;
    };
    img.src = imageConfig.image;

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      mouseRef.current.active = true;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    const start = performance.now();
    const tick = (now: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const pts = particlesRef.current;
      if (pts.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = (now - start) / 1000;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const seed = i * 0.13;
        const driftX = Math.sin(t * 0.6 + seed) * 4;
        const driftY = Math.cos(t * 0.5 + seed) * 4;
        let tx = p.baseX + driftX;
        let ty = p.baseY + driftY;
        let alpha = p.alpha;

        if (hoverType === "repel" || hoverType === "roam") {
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const d2 = dx * dx + dy * dy;
            const r2 = repulsionRadius * repulsionRadius;
            if (d2 < r2) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / repulsionRadius) * repulsionForce;
              tx += (dx / d) * f;
              ty += (dy / d) * f;
              alpha = Math.min(1, alpha + (1 - d / repulsionRadius) * 0.4);
            }
          }
        }

        p.vx += (tx - p.x) * 0.12;
        p.vy += (ty - p.y) * 0.12;
        p.vx *= 0.7;
        p.vy *= 0.7;
        p.x += p.vx;
        p.y += p.vy;

        const color = i % 2 === 0 ? ACCENT : ACCENT_2;
        ctx.globalAlpha = reducedMotion.current ? alpha : alpha * roamOpacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reducedMotion.current) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [
    imageConfig.image,
    imageConfig.mode,
    imageConfig.scale,
    particleCount,
    particleSize,
    hoverType,
    roamOpacity,
    repulsionForce,
    repulsionRadius,
    mode,
    scale,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width, height, position: "relative" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
