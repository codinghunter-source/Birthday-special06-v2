'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, Sparkles, Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

// ── Floating particle background (lightweight, CSS-only) ─────────────────────
function GateParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
      dur: 3 + Math.random() * 5,
      color: ['#ec4899', '#a855f7', '#eab308', '#06b6d4', '#f43f5e'][
        Math.floor(Math.random() * 5)
      ],
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Sparkle burst on unlock ───────────────────────────────────────────────────
function SparkBurst({ active }: { active: boolean }) {
  const sparks = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const dist  = 80 + Math.random() * 60;
      return {
        id: i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        color: ['#ec4899', '#a855f7', '#eab308', '#f9a8d4', '#fde68a', '#c4b5fd'][i % 6],
      };
    });
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
      {sparks.map(s => (
        <motion.div
          key={s.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: s.tx, y: s.ty, opacity: [0, 1, 1, 0], scale: [0, 1.5, 1.2, 0] }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        />
      ))}
    </div>
  );
}

// ── Main Password Gate ────────────────────────────────────────────────────────
export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const PASSWORD = 'ANTIMA';

  const [value, setValue]       = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [status, setStatus]     = useState<'idle' | 'wrong' | 'unlocking'>('idle');
  const [shaking, setShaking]   = useState(false);
  const [sparks, setSparks]     = useState(false);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const attempt = () => {
    if (status === 'unlocking') return;
    const trimmed = value.trim().toUpperCase();

    if (trimmed === PASSWORD) {
      // ── Correct ──
      setStatus('unlocking');
      setSparks(true);
      setTimeout(() => {
        onUnlock();
      }, 1800);
    } else {
      // ── Wrong ──
      setStatus('wrong');
      setShaking(true);
      setTimeout(() => { setShaking(false); setStatus('idle'); }, 700);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') attempt();
  };

  const isUnlocking = status === 'unlocking';
  const isWrong     = status === 'wrong';

  return (
    <AnimatePresence>
      <motion.div
        key="password-gate"
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
        style={{ background: '#080312' }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-[15%] left-[20%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[15%] right-[15%] w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)' }} />
        <div className="absolute top-[45%] right-[25%] w-[240px] h-[240px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)' }} />

        {/* Floating particles */}
        <GateParticles />

        {/* ── CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md mx-4"
        >
          {/* Spark burst (centred on card) */}
          <SparkBurst active={sparks} />

          {/* Glass card */}
          <motion.div
            animate={shaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden p-8 md:p-10 text-center"
            style={{
              background: 'rgba(13,8,28,0.72)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: isWrong
                ? '1px solid rgba(239,68,68,0.5)'
                : isUnlocking
                  ? '1px solid rgba(168,85,247,0.6)'
                  : '1px solid rgba(255,255,255,0.08)',
              boxShadow: isUnlocking
                ? '0 0 60px rgba(168,85,247,0.35), 0 0 120px rgba(236,72,153,0.2)'
                : '0 20px 60px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.05) inset',
              transition: 'border 0.3s, box-shadow 0.5s',
            }}
          >
            {/* Top neon edge */}
            <div
              className="absolute top-0 left-0 w-full h-[2px]"
              style={{
                background: isUnlocking
                  ? 'linear-gradient(90deg, transparent, #a855f7, #ec4899, #eab308, transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
                transition: 'background 0.5s',
                boxShadow: isUnlocking ? '0 0 14px rgba(168,85,247,0.7)' : 'none',
              }}
            />

            {/* ── Lock icon ── */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="relative flex items-center justify-center w-20 h-20 rounded-2xl"
                style={{
                  background: isUnlocking
                    ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))'
                    : 'rgba(168,85,247,0.12)',
                  border: isUnlocking
                    ? '1px solid rgba(168,85,247,0.6)'
                    : '1px solid rgba(168,85,247,0.2)',
                  boxShadow: isUnlocking
                    ? '0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(236,72,153,0.2)'
                    : 'none',
                  transition: 'all 0.5s',
                }}
                animate={isUnlocking ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {isUnlocking ? (
                    <motion.div
                      key="unlocked"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Unlock className="w-9 h-9 text-purple-300" />
                    </motion.div>
                  ) : (
                    <motion.div key="locked">
                      <Lock
                        className="w-9 h-9"
                        style={{ color: isWrong ? '#ef4444' : '#c084fc', transition: 'color 0.3s' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sparkle dots on lock icon */}
                {!isUnlocking && (
                  <>
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-amber-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                  </>
                )}
              </motion.div>
            </div>

            {/* ── Headings ── */}
            <motion.h1
              className="font-comfortaa font-bold mb-3"
              style={{
                fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
                background: 'linear-gradient(135deg, #e879f9, #c084fc, #f9a8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 14px rgba(168,85,247,0.45))',
              }}
            >
              🔒 Private Birthday Surprise
            </motion.h1>

            <p className="font-outfit text-purple-200/70 text-sm md:text-base mb-1 leading-relaxed">
              This surprise was made especially for
            </p>
            <p
              className="font-playfair italic font-semibold mb-6"
              style={{
                fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
                background: 'linear-gradient(90deg, #f9a8d4, #fde68a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(249,168,212,0.4))',
              }}
            >
              Antima ❤️
            </p>

            <p className="font-outfit text-purple-300/60 text-xs md:text-sm mb-6 tracking-wide">
              Enter Password To Continue ❤️
            </p>

            {/* ── Password Input ── */}
            <div className="relative mb-4">
              <input
                ref={inputRef}
                id="password-input"
                type={showPw ? 'text' : 'password'}
                value={value}
                onChange={e => { setValue(e.target.value); setStatus('idle'); }}
                onKeyDown={handleKey}
                placeholder="Enter password..."
                disabled={isUnlocking}
                className="w-full px-5 py-4 pr-12 rounded-2xl font-outfit font-bold text-center text-white text-lg outline-none transition-all placeholder:font-normal placeholder:text-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: isWrong
                    ? '1.5px solid rgba(239,68,68,0.7)'
                    : isUnlocking
                      ? '1.5px solid rgba(168,85,247,0.7)'
                      : '1.5px solid rgba(255,255,255,0.1)',
                  boxShadow: isWrong
                    ? '0 0 18px rgba(239,68,68,0.2)'
                    : isUnlocking
                      ? '0 0 20px rgba(168,85,247,0.3)'
                      : '0 2px 12px rgba(0,0,0,0.3)',
                  letterSpacing: showPw ? '0.05em' : '0.25em',
                  transition: 'border 0.3s, box-shadow 0.3s',
                }}
              />
              {/* Show/hide toggle */}
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300/50 hover:text-purple-200 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showPw
                  ? <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />
                }
              </button>
            </div>

            {/* ── Error message ── */}
            <AnimatePresence>
              {isWrong && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-red-400 text-xs font-outfit mb-3"
                >
                  ❌ Galat password! Dobara try karo...
                </motion.p>
              )}
            </AnimatePresence>

            {/* ── Success message ── */}
            <AnimatePresence>
              {isUnlocking && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-purple-300 text-xs font-outfit mb-3"
                >
                  ✨ Sahi password! Surprise kholne ja raha hai...
                </motion.p>
              )}
            </AnimatePresence>

            {/* ── Unlock Button ── */}
            <motion.button
              id="unlock-btn"
              onClick={attempt}
              disabled={isUnlocking || value.trim() === ''}
              whileHover={!isUnlocking ? { scale: 1.03 } : {}}
              whileTap={!isUnlocking ? { scale: 0.97 } : {}}
              className="w-full py-4 rounded-2xl font-comfortaa font-bold text-white text-base md:text-lg cursor-pointer overflow-hidden relative"
              style={{
                background: isUnlocking
                  ? 'linear-gradient(135deg, #a855f7, #ec4899, #eab308)'
                  : 'linear-gradient(135deg, #9333ea, #db2777)',
                boxShadow: isUnlocking
                  ? '0 0 40px rgba(168,85,247,0.55), 0 0 80px rgba(236,72,153,0.3)'
                  : '0 0 20px rgba(147,51,234,0.3)',
                opacity: value.trim() === '' ? 0.5 : 1,
                transition: 'all 0.4s',
              }}
            >
              {/* Shine sweep */}
              {!isUnlocking && (
                <div className="absolute top-0 -inset-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                {isUnlocking ? (
                  <>
                    <Unlock className="w-5 h-5 animate-bounce" />
                    Unlocking Surprise...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Open Surprise ❤️
                  </>
                )}
              </span>
            </motion.button>

            {/* ── Hint ── */}
            <p className="mt-5 text-purple-400/35 text-[11px] font-outfit tracking-wider">
              Hint: Tumhara naam hi password hai 😊
            </p>

            {/* ── Bottom heart row ── */}
            <div className="flex justify-center gap-2 mt-5">
              {['❤️', '💜', '💛', '💙'].map((em, i) => (
                <motion.span
                  key={i}
                  className="text-sm select-none"
                  animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {em}
                </motion.span>
              ))}
            </div>

            {/* Unlock glow overlay */}
            <AnimatePresence>
              {isUnlocking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Made with love badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-5 text-purple-400/30 text-[11px] font-outfit tracking-widest uppercase flex items-center justify-center gap-1"
          >
            Made with <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> by Rohit
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
