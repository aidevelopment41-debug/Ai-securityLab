"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function AnimLogo({ className = "", size = 350 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // 1. Correctly scale the canvas for high-DPI screens
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    
    // Scale the context so we can draw in "logical" pixels (0 to size)
    ctx.scale(dpr, dpr);

    const spacing = 8; // Reduced density for better performance
    const maxSize = 3.2;
    const minSize = 0.8;
    const particles = [];
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 10;
    const pinch = radius / 4;
    const maxParticles = 1000; // Limit total particles

    // --- Gemini logo path ---
    const path = new Path2D();
    path.moveTo(cx, cy - radius);
    path.bezierCurveTo(cx, cy - pinch, cx + pinch, cy, cx + radius, cy);
    path.bezierCurveTo(cx + pinch, cy, cx, cy + pinch, cx, cy + radius);
    path.bezierCurveTo(cx, cy + pinch, cx - pinch, cy, cx - radius, cy);
    path.bezierCurveTo(cx - pinch, cy, cx, cy - pinch, cx, cy - radius);
    path.closePath();

    // --- Create particles with optimized iteration ---
    for (let y = 0; y < size && particles.length < maxParticles; y += spacing) {
      for (let x = 0; x < size && particles.length < maxParticles; x += spacing) {
        if (ctx.isPointInPath(path, x, y)) {
          const dist = Math.hypot(x - cx, y - cy);
          const t = Math.max(0, 1 - dist / radius);
          particles.push({
            x,
            y,
            ox: x,
            oy: y,
            base: minSize + t * (maxSize - minSize),
            scale: 1,
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    const animation = anime({
      targets: particles,
      scale: [1, 1.3],
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true,
      delay: anime.stagger(12, { from: "center" }),
    });

    const mouse = { x: -999, y: -999 };

    const moveHandler = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Calculate mouse position relative to the canvas CSS size
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const leaveHandler = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseleave", leaveHandler);

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, size, size);

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 80) {
          p.vx += dx * 0.002;
          p.vy += dy * 0.002;
        }

        p.vx += (p.ox - p.x) * 0.05;
        p.vy += (p.oy - p.y) * 0.05;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.base * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,40,0.95)`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseleave", leaveHandler);
      cancelAnimationFrame(animationFrame);
      animation.pause();
    };
  }, [size]);

  return (
    <div className="flex items-center justify-center w-full">
      <canvas
        ref={canvasRef}
        className={`${className} block`}
      />
    </div>
  );
}