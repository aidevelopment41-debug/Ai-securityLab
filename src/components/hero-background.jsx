"use client"

import React, { useEffect, useRef, useState } from 'react';
import AnimLogo from './animlogo';

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [logoSize, setLogoSize] = useState(350);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updateLogoSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setLogoSize(200);
      } else if (width < 1024) {
        setLogoSize(280);
      } else {
        setLogoSize(350);
      }
    };

    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, xC, yC;
    let particles = [];
    let grid = [];
    const gridSize = 12;
    const maxPop = 80; // Reduced particle count for better performance
    const lifespan = 1500;
    const spawnRate = 1.2; // Reduced for better performance
    let rows, cols; // Track grid dimensions

    let mouse = { x: -1000, y: -1000, active: false };

    const buildGrid = (w, h) => {
      grid = [];
      // Calculate how many columns and rows fit in the screen
      cols = Math.ceil(w / gridSize);
      rows = Math.ceil(h / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Centering logic: calculate position relative to screen center
          const xx = i * gridSize - w / 2;
          const yy = j * gridSize - h / 2;
          
          const r = Math.sqrt(xx * xx + yy * yy);
          const r0 = 200;
          let field;
          if (r < r0) field = (255 / r0) * r;
          else field = 255 - Math.min(255, (r - r0) / 1.5);

          grid.push({
            x: xx,
            y: yy,
            busyAge: 0,
            field: field,
            spotIndex: grid.length
          });
        }
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      xC = (width+50) / 2;
      yC = (height+50) / 2;
      
      // Clear particles on resize to prevent "target undefined" errors 
      // with old indices
      particles = []; 
      buildGrid(width, height);
    };

    const birth = () => {
      if (particles.length >= maxPop || grid.length === 0) return;
      const gridIndex = Math.floor(Math.random() * grid.length);
      const spot = grid[gridIndex];
    particles.push({
  x: spot.x, y: spot.y,
  xLast: spot.x, yLast: spot.y,
  vx: 0, vy: 0,
  age: 0, stuck: 0,
  gridIndex: gridIndex,
  color: Math.random() > 0.3 ? '#f97316' : '#3f3f46',
  id: Math.random(),
  trail: [] // 🔥 tail history
});

    };

    const move = () => {
      particles.forEach((p, index) => {
        p.xLast = p.x;
        p.yLast = p.y;
        
        // Safety check: ensure the grid index is still valid
        const currentSpot = grid[p.gridIndex];
        if (!currentSpot) {
          particles.splice(index, 1);
          return;
        }

        if (Math.random() < 0.6) {
          // Safer neighbor calculation based on rows/cols
          const neighbors = [
            p.gridIndex - 1,
            p.gridIndex + 1,
            p.gridIndex - rows,
            p.gridIndex + rows
          ];

          let bestSpot = currentSpot;
          let maxField = -1;

          neighbors.forEach(idx => {
            // Check if neighbor index exists and is within array bounds
            if (idx >= 0 && idx < grid.length && grid[idx]) {
              const dx = (grid[idx].x + xC) - mouse.x;
              const dy = (grid[idx].y + yC) - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const mouseInfluence = dist < 200 ? (200 - dist) * 1.5 : 0;
              const val = grid[idx].field + mouseInfluence + (Math.random() * 20);
              
              if (val > maxField) {
                maxField = val;
                bestSpot = grid[idx];
              }
            }
          });

          if (bestSpot.busyAge === 0 || bestSpot.busyAge > 10) {
            p.gridIndex = bestSpot.spotIndex;
            bestSpot.busyAge = 1;
            p.stuck = 0;
          } else {
            p.stuck++;
          }
        }

        const k = 0.08;
        const visc = 0.85;
        const target = grid[p.gridIndex];
        
        // Final safety check for target
        if (target) {
          const ax = (target.x - p.x) * k;
          const ay = (target.y - p.y) * k;
          p.vx = (p.vx + ax) * visc;
          p.vy = (p.vy + ay) * visc;
          p.x += p.vx;
          p.y += p.vy;
          p.age++;
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > 12) {
              p.trail.shift();
            }
        }

        if (p.age > lifespan || p.stuck > 20) {
          particles = particles.filter(item => item.id !== p.id);
        }
      });
    };
const draw = () => {
  // true black every frame
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    if (p.trail.length < 2) return;

    for (let i = 1; i < p.trail.length; i++) {
      const a = i / p.trail.length;

      ctx.beginPath();
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = a * 0.8;
      ctx.lineWidth = 1;

      ctx.moveTo(
        p.trail[i - 1].x + xC,
        p.trail[i - 1].y + yC
      );
      ctx.lineTo(
        p.trail[i].x + xC,
        p.trail[i].y + yC
      );
      ctx.stroke();
    }
  });

  ctx.globalAlpha = 1;
};








    const loop = () => {
      if (Math.random() < spawnRate) birth();
      move();
      draw();
      grid.forEach(g => { if (g.busyAge > 0) g.busyAge++ });
      requestRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

return (
<div className="absolute w-full -top-5 h-screen">
  {/* Background canvas */}
  <canvas
    ref={canvasRef}
    className="absolute inset-0 z-0 bg-black"
    style={{ touchAction: "none" }}
  />

  {/* Centered logo */}
  {isMounted && (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <AnimLogo size={logoSize} className="text-orange-500" />
    </div>
  )}
</div>
);

}