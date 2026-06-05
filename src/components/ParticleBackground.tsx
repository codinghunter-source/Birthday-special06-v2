'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  type: 'particle' | 'heart' | 'balloon';
  swaySpeed?: number;
  swayOffset?: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const colors = [
      'rgba(168, 85, 247, 0.4)', // purple
      'rgba(236, 72, 153, 0.4)', // pink
      'rgba(234, 179, 8, 0.3)',  // gold
      'rgba(6, 182, 212, 0.4)',  // blue
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (initY = false): Particle => {
      const typeRand = Math.random();
      let type: 'particle' | 'heart' | 'balloon' = 'particle';
      if (typeRand > 0.93) {
        type = 'heart';
      } else if (typeRand > 0.87) {
        type = 'balloon';
      }

      const size = type === 'particle' 
        ? Math.random() * 6 + 2 
        : type === 'heart' 
          ? Math.random() * 12 + 8 
          : Math.random() * 16 + 12;

      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        x: Math.random() * canvas.width,
        y: initY ? Math.random() * canvas.height : canvas.height + size + 20,
        size,
        speedY: type === 'particle'
          ? -(Math.random() * 0.8 + 0.3)
          : type === 'heart'
            ? -(Math.random() * 0.6 + 0.4)
            : -(Math.random() * 0.5 + 0.3),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color,
        type,
        swaySpeed: Math.random() * 0.02 + 0.005,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize particles across the entire screen
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      c.moveTo(x, y + size / 4);
      c.bezierCurveTo(x, y - size / 2, x - size / 2, y - size / 2, x - size / 2, y + size / 4);
      c.bezierCurveTo(x - size / 2, y + size * 0.7, x, y + size * 1.0, x, y + size * 1.25);
      c.bezierCurveTo(x, y + size * 1.0, x + size / 2, y + size * 0.7, x + size / 2, y + size / 4);
      c.bezierCurveTo(x + size / 2, y - size / 2, x, y - size / 2, x, y + size / 4);
      c.closePath();
    };

    const drawBalloon = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      // String
      c.beginPath();
      c.moveTo(x, y + size * 1.25);
      c.bezierCurveTo(x - 5, y + size * 1.8, x + 5, y + size * 2.3, x, y + size * 3);
      c.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      c.lineWidth = 1.2;
      c.stroke();

      // Tie
      c.beginPath();
      c.moveTo(x, y + size * 1.25);
      c.lineTo(x - 3, y + size * 1.25 + 4);
      c.lineTo(x + 3, y + size * 1.25 + 4);
      c.closePath();
      c.fillStyle = color;
      c.fill();

      // Balloon body
      c.beginPath();
      c.ellipse(x, y, size * 0.9, size * 1.25, 0, 0, Math.PI * 2);
      c.fillStyle = color;
      c.fill();

      // Soft highlight on balloon
      c.beginPath();
      c.ellipse(x - size * 0.3, y - size * 0.4, size * 0.25, size * 0.35, Math.PI / 6, 0, Math.PI * 2);
      c.fillStyle = 'rgba(255, 255, 255, 0.2)';
      c.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update physics
        p.y += p.speedY;
        
        // Sway calculation for hearts and balloons
        if (p.type !== 'particle' && p.swaySpeed !== undefined && p.swayOffset !== undefined) {
          p.swayOffset += p.swaySpeed;
          p.x += Math.sin(p.swayOffset) * 0.4;
        } else {
          p.x += p.speedX;
        }

        // Mouse repelling force
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 120;
        
        if (distance < forceRadius) {
          const force = (forceRadius - distance) / forceRadius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          p.x -= directionX * force * 1.8;
          p.y -= directionY * force * 1.8;
        }

        // Wrap around limits
        if (p.x < -p.size * 2) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size * 2) p.x = -p.size;

        // Reset particle if it leaves the top screen
        if (p.y < -p.size * 2) {
          particles[i] = createParticle(false);
          continue;
        }

        // Render
        ctx.fillStyle = p.color;
        ctx.save();
        
        if (p.type === 'particle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
        } else if (p.type === 'heart') {
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          drawHeart(ctx, p.x, p.y, p.size);
          ctx.fill();
        } else if (p.type === 'balloon') {
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          drawBalloon(ctx, p.x, p.y, p.size, p.color);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
