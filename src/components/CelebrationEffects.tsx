'use client';

import React, { useEffect, useRef } from 'react';

interface CelebrationEffectsProps {
  active: boolean;
}

interface Confetti {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'heart';
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface FireworkSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  tx: number; // target X
  ty: number; // target Y
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number }[];
  trailLen: number;
}

export default function CelebrationEffects({ active }: CelebrationEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let confettis: Confetti[] = [];
    let rockets: Rocket[] = [];
    let sparks: FireworkSpark[] = [];

    const fireworkColors = [
      '#ec4899', // Pink
      '#a855f7', // Purple
      '#eab308', // Gold
      '#06b6d4', // Blue
      '#f43f5e', // Rose
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial Confetti Burst
    const createConfetti = (burst = false): Confetti => {
      const colors = ['#ec4899', '#a855f7', '#eab308', '#06b6d4', '#f43f5e', '#10b981', '#3b82f6'];
      const shapes: ('circle' | 'square' | 'heart')[] = ['circle', 'square', 'heart'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 8 + 6;
      
      const x = burst ? canvas.width / 2 + (Math.random() - 0.5) * 100 : Math.random() * canvas.width;
      const y = burst ? canvas.height * 0.75 + (Math.random() - 0.5) * 50 : -20;
      
      const angle = burst ? (Math.random() * Math.PI * 1.2) - Math.PI * 1.1 : Math.random() * Math.PI;
      const velocity = burst ? Math.random() * 15 + 5 : Math.random() * 3 + 2;

      return {
        x,
        y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        vx: Math.cos(angle) * velocity,
        vy: burst ? Math.sin(angle) * velocity : velocity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      };
    };

    // Initialize initial confetti burst
    for (let i = 0; i < 150; i++) {
      confettis.push(createConfetti(true));
    }

    // Launch a rocket
    const spawnRocket = () => {
      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      const startX = Math.random() * (canvas.width * 0.6) + canvas.width * 0.2;
      const startY = canvas.height;
      const targetX = startX + (Math.random() - 0.5) * 200;
      const targetY = Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;
      
      const steps = 60 + Math.random() * 30;
      const vx = (targetX - startX) / steps;
      const vy = (targetY - startY) / steps;

      rockets.push({
        x: startX,
        y: startY,
        tx: targetX,
        ty: targetY,
        vx,
        vy,
        color,
        trail: [],
        trailLen: 8,
      });
    };

    // Spawn 5 rockets initially
    for (let i = 0; i < 4; i++) {
      setTimeout(spawnRocket, i * 600);
    }

    const explodeRocket = (rx: number, ry: number, color: string) => {
      const sparkCount = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        sparks.push({
          x: rx,
          y: ry,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          size: Math.random() * 3 + 1.2,
          gravity: 0.08,
        });
      }
    };

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y + size / 4);
      c.bezierCurveTo(x, y - size / 2, x - size / 2, y - size / 2, x - size / 2, y + size / 4);
      c.bezierCurveTo(x - size / 2, y + size * 0.7, x, y + size * 1.0, x, y + size * 1.25);
      c.bezierCurveTo(x, y + size * 1.0, x + size / 2, y + size * 0.7, x + size / 2, y + size / 4);
      c.bezierCurveTo(x + size / 2, y - size / 2, x, y - size / 2, x, y + size / 4);
      c.closePath();
    };

    let time = 0;

    const animate = () => {
      time++;
      
      // Semi-transparent background clearing for fireworks light trail effect
      ctx.fillStyle = 'rgba(8, 3, 18, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Process Confetti
      for (let i = confettis.length - 1; i >= 0; i--) {
        const c = confettis[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.05; // gravity for confetti
        c.rotation += c.rotationSpeed;
        c.vx *= 0.99; // drag

        // Reset confetti or fade out
        if (c.y > canvas.height) {
          if (active && confettis.length < 180) {
            confettis[i] = createConfetti(false);
          } else {
            confettis.splice(i, 1);
          }
          continue;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.opacity;

        if (c.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (c.shape === 'square') {
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        } else if (c.shape === 'heart') {
          drawHeart(ctx, 0, -c.size / 2, c.size);
          ctx.fill();
        }

        ctx.restore();
      }

      // Add fresh falling confetti at random intervals if active
      if (active && confettis.length < 120 && Math.random() < 0.15) {
        confettis.push(createConfetti(false));
      }

      // 2. Process Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > r.trailLen) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;

        // Draw trail
        ctx.beginPath();
        if (r.trail.length > 0) {
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          for (let k = 1; k < r.trail.length; k++) {
            ctx.lineTo(r.trail[k].x, r.trail[k].y);
          }
        }
        ctx.lineTo(r.x, r.y);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Check if rocket has reached target altitude
        if (r.vy >= 0 || r.y <= r.ty) {
          explodeRocket(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Automatically spawn rockets at random intervals
      if (active && rockets.length < 5 && Math.random() < 0.03) {
        spawnRocket();
      }

      // 3. Process Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity; // Gravity pull
        s.vx *= 0.98; // Drag
        s.vy *= 0.98;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        // Glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-screen h-screen"
    />
  );
}
