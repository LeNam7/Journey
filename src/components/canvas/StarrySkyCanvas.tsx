"use client";
import React, { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth for parallax
  size: number;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Nebula {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
}

export function StarrySkyCanvas({
  scrollProgress = 0,
  tilt = { x: 0, y: 0 }
}: {
  scrollProgress?: number;
  tilt?: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  
  // Create refs to store dynamic scroll and tilt parameters to avoid tearing down the canvas loop
  const scrollProgressRef = useRef(scrollProgress);
  const tiltRef = useRef(tilt);

  // Sync props to refs
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    tiltRef.current = tilt;
  }, [tilt]);

  // Initialize stars and nebulas once
  useEffect(() => {
    const starColors = [
      "rgba(255, 255, 255,",
      "rgba(224, 242, 254,", // blue-50
      "rgba(254, 243, 199,", // amber-50
      "rgba(253, 242, 248,", // pink-50
      "rgba(236, 254, 238,"  // emerald-50
    ];

    const numStars = 200;
    const tempStars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      tempStars.push({
        x: Math.random() * 2000 - 1000, // wider than viewport to support parallax
        y: Math.random() * 2000 - 1000,
        z: Math.random() * 0.8 + 0.2, // z depth: 0.2 (far) to 1.0 (near)
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }
    starsRef.current = tempStars;

    // Generate Nebulas
    nebulasRef.current = [
      {
        x: 20,
        y: 20,
        targetX: 20,
        targetY: 20,
        radius: 500,
        color: "rgba(99, 102, 241, 0.15)" // indigo-500
      },
      {
        x: 80,
        y: 70,
        targetX: 80,
        targetY: 70,
        radius: 600,
        color: "rgba(167, 139, 250, 0.12)" // violet-400
      },
      {
        x: 50,
        y: 40,
        targetX: 50,
        targetY: 40,
        radius: 550,
        color: "rgba(34, 211, 238, 0.1)" // cyan-400
      }
    ];
  }, []);

  // One-time canvas loop setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const spawnShootingStar = (w: number, h: number) => {
      const x = Math.random() * w * 0.8;
      const y = Math.random() * h * 0.4;
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 12); // around 30 to 45 deg
      const speed = 10 + Math.random() * 15;
      const maxLife = 20 + Math.random() * 30;

      shootingStarsRef.current.push({
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 100,
        speed,
        opacity: 1.0,
        life: maxLife,
        maxLife
      });
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Deep Space Gradient Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#03020a");
      skyGrad.addColorStop(0.5, "#060515");
      skyGrad.addColorStop(1, "#020108");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw nebulas
      nebulasRef.current.forEach((nebula) => {
        if (Math.random() < 0.005) {
          nebula.targetX = 10 + Math.random() * 80;
          nebula.targetY = 10 + Math.random() * 80;
        }
        nebula.x += (nebula.targetX - nebula.x) * 0.002;
        nebula.y += (nebula.targetY - nebula.y) * 0.002;

        const nx = (nebula.x / 100) * w;
        const ny = (nebula.y / 100) * h;

        const radGrad = ctx.createRadialGradient(nx, ny, 10, nx, ny, nebula.radius);
        radGrad.addColorStop(0, nebula.color);
        radGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
      });

      // 3. Draw Twinkling & Parallax Stars
      starsRef.current.forEach((star) => {
        const driftX = tiltRef.current.x * 45 * star.z;
        // scrollProgressRef.current is 0 -> 1, let's map it to vertical scrolling
        const driftY = (tiltRef.current.y * 45 + scrollProgressRef.current * -300) * star.z;

        let sx = ((star.x + driftX) % (w + 400));
        let sy = ((star.y + driftY) % (h + 400));

        if (sx < -200) sx += w + 400;
        if (sy < -200) sy += h + 400;

        star.phase += star.twinkleSpeed;
        const currentOpacity = 0.2 + Math.abs(Math.sin(star.phase)) * 0.8;

        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentOpacity})`;
        
        if (star.size > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Update and Draw Shooting Stars
      if (Math.random() < 0.0025 && shootingStarsRef.current.length < 3) {
        spawnShootingStar(w, h);
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((ss) => {
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.life -= 1;
        ss.opacity = Math.max(0, ss.life / ss.maxLife);

        if (ss.life <= 0) return false;

        const trailGrad = ctx.createLinearGradient(
          ss.x,
          ss.y,
          ss.x - ss.dx * (ss.length / ss.speed),
          ss.y - ss.dy * (ss.length / ss.speed)
        );
        trailGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        trailGrad.addColorStop(0.2, `rgba(34, 211, 238, ${ss.opacity * 0.8})`);
        trailGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - ss.dx * (ss.length / ss.speed),
          ss.y - ss.dy * (ss.length / ss.speed)
        );
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 2.0;
        ctx.stroke();

        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
