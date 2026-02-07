"use client";

import { useRef, useEffect } from "react";
import { useMotionContext } from "./MotionProvider";

interface Star {
  x: number;
  y: number;
  z: number;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isReduced } = useMotionContext();
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const generateStars = () => {
      const area = window.innerWidth * window.innerHeight;
      const density = Math.min(220, Math.max(90, Math.round(area / 8000)));
      starsRef.current = Array.from({ length: density }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 0.7 + 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isReduced) return;

      ctx.fillStyle = "rgba(124, 252, 0, 0.9)";
      starsRef.current.forEach((star) => {
        const size = star.z * 1.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.z * 0.05 * 50;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
      });
    };

    const loop = () => {
      if (!isReduced) {
        draw();
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const handleResize = () => {
      resize();
      generateStars();
    };

    resize();
    generateStars();
    
    if (!isReduced) {
      rafRef.current = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  );
}
