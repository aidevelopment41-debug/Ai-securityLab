"use client";

import { useEffect, useRef } from "react";

// MOVE CLASS OUTSIDE COMPONENT
class Threat {
    constructor(mapPoints) {
        this.mapPoints = mapPoints;
        this.start = mapPoints[Math.floor(Math.random() * mapPoints.length)];
        this.end = mapPoints[Math.floor(Math.random() * mapPoints.length)];
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.005;
        this.color = Math.random() > 0.5 ? "#f97316" : "#ef4444"; // Orange or Red
        this.isMitigated = false;
    }

    update() {
        this.progress += this.speed;
        if (this.progress > 0.5 && !this.isMitigated && Math.random() > 0.9) {
            this.isMitigated = true;
            this.color = "#22c55e"; // Green
        }
    }

    draw(ctx, mapPoints) {
        // Draw Arc
        ctx.beginPath();
        const midX = (this.start.x + this.end.x) / 2;
        const midY = (this.start.y + this.end.y) / 2 - 50;

        ctx.moveTo(this.start.x, this.start.y);
        ctx.quadraticCurveTo(midX, midY, this.end.x, this.end.y);

        const gradient = ctx.createLinearGradient(
            this.start.x, this.start.y,
            this.end.x, this.end.y
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(this.progress, this.color);
        gradient.addColorStop(Math.min(1, this.progress + 0.1), "rgba(0,0,0,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Impact ring on completion
        if (this.progress >= 1) {
            ctx.beginPath();
            ctx.arc(this.end.x, this.end.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Reset
            this.start = mapPoints[Math.floor(Math.random() * mapPoints.length)];
            this.end = mapPoints[Math.floor(Math.random() * mapPoints.length)];
            this.progress = 0;
            this.isMitigated = false;
            this.color = Math.random() > 0.5 ? "#f97316" : "#ef4444";
        }
    }
}

export function ThreatMap() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = (canvas.width = canvas.parentElement.offsetWidth);
        let height = (canvas.height = canvas.parentElement.offsetHeight);

        // Generate map points
        const mapPoints = [];
        const rows = 30;
        const cols = 60;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = (c / cols) * width;
                const y = (r / rows) * height;

                const nx = (c / cols) * 4 * Math.PI;
                const ny = (r / rows) * 2 * Math.PI;

                if (Math.sin(nx) * Math.cos(ny) > 0.1 || Math.random() > 0.95) {
                    mapPoints.push({ x, y, active: Math.random() > 0.9 });
                }
            }
        }

        // Create threats
        const threats = [];
        for (let i = 0; i < 8; i++) threats.push(new Threat(mapPoints));

        // Animation loop
        function animate() {
            ctx.fillStyle = "rgba(2, 2, 2, 0.2)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "rgba(50, 50, 80, 0.3)";
            mapPoints.forEach((p) => {
                ctx.fillRect(p.x, p.y, 2, 2);
            });

            threats.forEach((t) => {
                t.update();
                t.draw(ctx, mapPoints);
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative w-full h-[400px] bg-black/50 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-red-500 uppercase">
                        Active Threats
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-mono text-green-500 uppercase">
                        AI Neutralized
                    </span>
                </div>
            </div>

            <canvas ref={canvasRef} className="w-full h-full" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        </div>
    );
}
