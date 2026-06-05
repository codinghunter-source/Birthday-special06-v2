'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { finalPhoto } from '../config/photos';
import { Gift } from 'lucide-react';

interface FinalSurpriseProps {
  onTriggerCelebration: (active: boolean) => void;
}

// ── Live fireworks canvas ──────────────────────────────────────────────────────
function FinaleFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    interface Spark {
      x: number; y: number; vx: number; vy: number;
      alpha: number; decay: number; size: number; color: string; glow: string;
    }
    interface Rocket {
      x: number; y: number; tx: number; ty: number;
      vx: number; vy: number; color: string; trail: { x: number; y: number }[];
    }

    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];

    const PALETTES = [
      { stroke: '#ec4899', glow: '#f472b6' }, // pink
      { stroke: '#a855f7', glow: '#d946ef' }, // purple
      { stroke: '#eab308', glow: '#fde047' }, // gold
      { stroke: '#06b6d4', glow: '#22d3ee' }, // cyan
      { stroke: '#f43f5e', glow: '#fb7185' }, // rose
      { stroke: '#ffffff', glow: '#e9d5ff' }, // white
    ];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const explode = (x: number, y: number, col: { stroke: string; glow: string }) => {
      const count = 90 + Math.random() * 50;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 1;
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.013 + 0.009,
          size: Math.random() * 2.8 + 0.8,
          color: col.stroke,
          glow: col.glow,
        });
      }
    };

    const spawn = () => {
      const col = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const sx  = canvas.width * 0.12 + Math.random() * canvas.width * 0.76;
      const tx  = sx + (Math.random() - 0.5) * 200;
      const ty  = canvas.height * 0.04 + Math.random() * canvas.height * 0.48;
      const steps = 55 + Math.random() * 30;
      rockets.push({
        x: sx, y: canvas.height,
        tx, ty,
        vx: (tx - sx) / steps,
        vy: (ty - canvas.height) / steps,
        color: col.stroke,
        trail: [],
      });
    };

    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 400);

    const draw = () => {
      ctx.fillStyle = 'rgba(8,3,18,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 10) r.trail.shift();
        r.x += r.vx;
        r.y += r.vy;

        if (r.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          r.trail.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.lineTo(r.x, r.y);
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 6;
          ctx.shadowColor = r.color;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        const col = PALETTES.find(c => c.stroke === r.color) ?? PALETTES[0];
        if (r.vy >= 0 || r.y <= r.ty) {
          explode(r.x, r.y, col);
          rockets.splice(i, 1);
        }
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x  += s.vx; s.y += s.vy;
        s.vy += 0.07;
        s.vx *= 0.98; s.vy *= 0.98;
        s.alpha -= s.decay;
        if (s.alpha <= 0) { sparks.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle   = s.color;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = s.glow;
        ctx.fill();
        ctx.restore();
      }

      if (rockets.length < 7 && Math.random() < 0.04) spawn();
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Floating hearts drifting upward ───────────────────────────────────────────
function FloatingHearts() {
  const hearts = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${4 + Math.random() * 92}%`,
    delay: Math.random() * 5,
    size: 13 + Math.random() * 20,
    dur: 5 + Math.random() * 7,
    opacity: 0.3 + Math.random() * 0.5,
    emoji: ['❤️','💜','💛','💙','🩷','🤍'][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute bottom-0 select-none"
          style={{ left: h.left, opacity: h.opacity }}
          initial={{ y: 0, opacity: h.opacity }}
          animate={{ y: '-115vh', opacity: 0 }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: 'easeOut' }}
        >
          <span style={{ fontSize: h.size }}>{h.emoji}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FinalSurprise({ onTriggerCelebration }: FinalSurpriseProps) {
  const [revealed, setRevealed] = useState(false);

  const handleLaunch = () => {
    setRevealed(true);
    onTriggerCelebration(true);
  };

  return (
    <section className="relative w-full bg-[#080312] overflow-hidden select-none">

      {/* ── PRE-REVEAL: photo card + CTA button ─────────────────────── */}
      {!revealed && (
        <div className="py-24 px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center">

            {/* Cinematic photo card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel border border-white/10 rounded-3xl p-5 md:p-8 w-full max-w-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden mb-16 group"
            >
              <div className="relative w-full aspect-[4/5] md:aspect-[16/10] rounded-2xl overflow-hidden bg-[#0d071c]">
                <Image
                  src={finalPhoto.url}
                  alt="Final Surprise — Antima"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover brightness-[0.4] transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-12 z-10">
                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-2xl md:text-4xl font-bold font-comfortaa text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-snug"
                  >
                    {finalPhoto.overlayText.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm md:text-lg text-purple-100/90 font-outfit max-w-md mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] whitespace-pre-line"
                  >
                    {finalPhoto.overlayText.subtitle}
                  </motion.p>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="mb-8 p-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
              >
                <Gift className="w-8 h-8" />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-bold font-comfortaa text-white mb-6">
                Ek Last Surprise Baaki Hai... 🎁
              </h3>

              <button
                id="finale-button"
                onClick={handleLaunch}
                className="group relative px-10 py-5 rounded-2xl font-bold text-white text-lg md:text-xl cursor-pointer overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #eab308 100%)',
                  boxShadow: '0 0 35px rgba(236,72,153,0.35)',
                  transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 60px rgba(236,72,153,0.65)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 35px rgba(236,72,153,0.35)')}
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                <span className="relative z-10">🎉 Surprise Dekhna Hai? 🎉</span>
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── POST-REVEAL: Full-screen Fireworks + Birthday Message ────── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: '100vh' }}
          >
            {/* Fireworks canvas (full backdrop) */}
            <FinaleFireworks />

            {/* Floating hearts */}
            <FloatingHearts />

            {/* ── BIRTHDAY MESSAGE — full centrepiece ── */}
            <div
              className="relative flex flex-col items-center justify-center text-center px-6 py-20 w-full"
              style={{ zIndex: 10 }}
            >
              {/* Soft radial glow behind text */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(168,85,247,0.2) 0%, rgba(236,72,153,0.12) 40%, transparent 75%)',
                }}
              />

              {/* 🎂 Cake icon — springs in */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.2 }}
                className="text-[6rem] md:text-[8rem] mb-4 leading-none"
                style={{ filter: 'drop-shadow(0 0 32px rgba(236,72,153,0.65))' }}
              >
                🎂
              </motion.div>

              {/* ── "Happy Birthday Antima 🎂❤️" ── */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-comfortaa font-extrabold leading-tight mb-6"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 5.2rem)',
                  background: 'linear-gradient(135deg, #f472b6 0%, #fde68a 45%, #a5b4fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter:
                    'drop-shadow(0 0 24px rgba(236,72,153,0.6)) drop-shadow(0 0 48px rgba(168,85,247,0.35))',
                }}
              >
                Happy Birthday Antima 🎂❤️
              </motion.h1>

              {/* ── Glowing divider ── */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.0 }}
                className="w-56 h-[2px] mb-10 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #ec4899, #a855f7, #eab308, transparent)',
                  boxShadow: '0 0 14px rgba(236,72,153,0.7)',
                }}
              />

              {/* ── Three message lines ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2 }}
                className="flex flex-col items-center gap-4 mb-12 max-w-2xl mx-auto"
              >
                {/* Line 1 */}
                <p
                  className="font-outfit font-semibold text-white"
                  style={{
                    fontSize: 'clamp(1.1rem, 3.5vw, 1.75rem)',
                    textShadow: '0 0 20px rgba(255,255,255,0.35)',
                  }}
                >
                  Thank You For Being
                </p>

                {/* Line 2 — italic golden */}
                <p
                  className="font-playfair italic font-bold"
                  style={{
                    fontSize: 'clamp(1.3rem, 4.5vw, 2.25rem)',
                    background: 'linear-gradient(90deg, #fde68a, #f9a8d4, #fde68a)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'goldShimmer 3s linear infinite',
                    filter: 'drop-shadow(0 0 14px rgba(249,168,212,0.5))',
                  }}
                >
                  A Beautiful Part Of My Life.
                </p>

                {/* Line 3 */}
                <p
                  className="font-outfit text-purple-200"
                  style={{
                    fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
                    textShadow: '0 0 14px rgba(216,180,254,0.5)',
                  }}
                >
                  May Your Smile Always Stay The Same. ❤️
                </p>
              </motion.div>

              {/* ── Signature ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="flex flex-col items-center gap-1 mb-12"
              >
                <span
                  className="uppercase tracking-[0.28em] font-outfit text-purple-300/50"
                  style={{ fontSize: '0.7rem' }}
                >
                  With Love,
                </span>
                <span
                  className="font-comfortaa font-bold text-white"
                  style={{
                    fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                    textShadow:
                      '0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(236,72,153,0.3)',
                  }}
                >
                  — Rohit
                </span>
              </motion.div>

              {/* ── Bouncing emoji hearts row ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.8 }}
                className="flex gap-3 md:gap-5 text-3xl md:text-4xl"
              >
                {['❤️', '💜', '💛', '💙', '🩷', '❤️'].map((em, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.55))' }}
                  >
                    {em}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold shimmer keyframe */}
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
