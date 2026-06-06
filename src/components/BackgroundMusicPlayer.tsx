'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Sparkles, Volume2, VolumeX, Disc3 } from 'lucide-react';

export default function BackgroundMusicPlayer() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Check localStorage preference
    const storedPref = localStorage.getItem('birthday_music_pref');
    if (!storedPref) {
      setShowWelcomeModal(true);
    } else if (storedPref === 'play') {
      // Setup autoplay on first user interaction due to browser constraints
      const startOnInteraction = () => {
        playMusic();
        window.removeEventListener('click', startOnInteraction);
        window.removeEventListener('touchstart', startOnInteraction);
      };
      window.addEventListener('click', startOnInteraction);
      window.addEventListener('touchstart', startOnInteraction);
      return () => {
        window.removeEventListener('click', startOnInteraction);
        window.removeEventListener('touchstart', startOnInteraction);
      };
    }
  }, []);

  // Handle cleanup of fader interval on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Smooth Volume Fader
  const fadeVolume = (target: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const step = 0.02;
    const targetVol = Math.max(0, Math.min(1, target));

    fadeIntervalRef.current = setInterval(() => {
      const currentVol = audio.volume;
      if (Math.abs(currentVol - targetVol) <= step) {
        audio.volume = targetVol;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        onComplete?.();
      } else {
        if (currentVol < targetVol) {
          audio.volume = Math.min(1, currentVol + step);
        } else {
          audio.volume = Math.max(0, currentVol - step);
        }
      }
    }, 60); // 1.5s total transition (approx 25 steps * 60ms)
  };

  const playMusic = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (audio.paused) {
      audio.volume = 0;
      audio.play().catch(err => console.log('Audio playback blocked/failed:', err));
    }
    
    setIsPlaying(true);
    fadeVolume(0.5);

    // Trigger memory toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  const pauseMusic = () => {
    setIsPlaying(false);
    fadeVolume(0, () => {
      audioRef.current?.pause();
    });
  };

  const handleChoosePlay = () => {
    localStorage.setItem('birthday_music_pref', 'play');
    setShowWelcomeModal(false);
    playMusic();
  };

  const handleChooseSkip = () => {
    localStorage.setItem('birthday_music_pref', 'skip');
    setShowWelcomeModal(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* HTML5 Audio element */}
      <audio ref={audioRef} src="/music/tum-se-hi.mp3" loop preload="auto" />

      {/* ── First Visit Welcome Dialog Modal ── */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#080312]/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md p-8 text-center rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(15, 10, 32, 0.85)',
                border: '1px solid rgba(236, 72, 153, 0.35)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 85, 247, 0.25)',
              }}
            >
              {/* Glow Accent Decorator */}
              <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full pointer-events-none bg-purple-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full pointer-events-none bg-pink-500/10 blur-3xl" />

              {/* Heart and Sparkle Icons */}
              <div className="relative flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/30 shadow-lg shadow-pink-500/10"
                >
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-1 right-[38%] text-amber-300"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Dialog Content */}
              <h2 className="font-comfortaa font-bold text-2xl md:text-3xl mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-amber-200 bg-clip-text text-transparent filter drop-shadow(0 0 10px rgba(168,85,247,0.3))">
                🎂 Welcome Antima ❤️
              </h2>
              <p className="font-outfit text-sm md:text-base text-purple-200/80 leading-relaxed mb-8">
                Your birthday surprise is ready.<br />
                Would you like some music while exploring it?
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleChoosePlay}
                  className="w-full py-4 rounded-2xl font-comfortaa font-bold text-white shadow-lg cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #db2777, #9333ea)',
                    boxShadow: '0 8px 25px rgba(219, 39, 119, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  Play Tum Se Hi 🎵
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleChooseSkip}
                  className="w-full py-3.5 rounded-2xl font-outfit font-medium text-purple-300 hover:text-white transition-colors bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                >
                  Continue Without Music
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast Effect Alert (When music starts) ── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-24 left-6 z-[90] pointer-events-none hidden md:block"
          >
            <div
              className="px-5 py-3 rounded-2xl font-outfit text-xs font-semibold text-pink-200 border border-pink-500/25 shadow-lg flex items-center gap-2"
              style={{
                background: 'rgba(15, 10, 32, 0.85)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 15px rgba(236,72,153,0.15)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>✨ Some memories are better with music.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Music Player UI ── */}
      <AnimatePresence>
        {!showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 z-[90] flex flex-col md:flex-row items-center gap-3"
          >
            <div
              className="flex items-center gap-4 px-4 py-3 rounded-full overflow-hidden"
              style={{
                background: isPlaying
                  ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.25), rgba(219, 39, 119, 0.25))'
                  : 'rgba(10, 6, 22, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: isPlaying
                  ? '1px solid rgba(219, 39, 119, 0.45)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isPlaying
                  ? '0 10px 30px rgba(147, 51, 234, 0.35), inset 0 0 10px rgba(219, 39, 119, 0.1)'
                  : '0 8px 30px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.4s ease',
              }}
            >
              {/* Disc Rotation Icon */}
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative flex items-center justify-center cursor-pointer w-9 h-9 rounded-full bg-white/5 border border-white/10"
              >
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={isPlaying ? { duration: 3.5, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Disc3 className={`w-5 h-5 ${isPlaying ? 'text-pink-400' : 'text-purple-300/60'}`} />
                </motion.div>
                
                {/* Visual Play / Pause Overlay Icon */}
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-full">
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-white fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-white fill-white translate-x-[0.5px]" />
                  )}
                </span>
              </motion.button>

              {/* Music details */}
              <div className="flex flex-col select-none pr-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold font-outfit text-white tracking-wide whitespace-nowrap"
                    style={{
                      textShadow: isPlaying ? '0 0 10px rgba(219, 39, 119, 0.4)' : 'none',
                    }}
                  >
                    Tum Se Hi
                  </span>
                  {/* Glowing heart animation */}
                  <motion.div
                    animate={isPlaying ? { scale: [1, 1.25, 1], filter: ['drop-shadow(0 0 2px #db2777)', 'drop-shadow(0 0 8px #db2777)', 'drop-shadow(0 0 2px #db2777)'] } : {}}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center"
                  >
                    <Heart className={`w-3 h-3 ${isPlaying ? 'fill-pink-500 text-pink-500' : 'text-purple-400/40'}`} />
                  </motion.div>
                </div>
                <span className="text-[10px] text-purple-300/60 font-outfit font-medium">
                  For Antima ❤️
                </span>
              </div>

              {/* Visualizer bars */}
              <div className="flex items-end gap-[3px] h-3.5 px-1.5 w-[36px]">
                {isPlaying ? (
                  [0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[2.5px] rounded-full"
                      style={{
                        background: 'linear-gradient(to top, #9333ea, #db2777)',
                        boxShadow: '0 0 3px #db2777',
                      }}
                      animate={{ scaleY: [h, 0.25, h * 0.7, 1.0, h] }}
                      transition={{
                        duration: 0.65 + i * 0.08,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.07,
                      }}
                      initial={{ scaleY: h }}
                    />
                  ))
                ) : (
                  [0.2, 0.2, 0.2, 0.2, 0.2].map((h, i) => (
                    <div
                      key={i}
                      className="w-[2.5px] rounded-full bg-purple-400/30"
                      style={{ height: '2px' }}
                    />
                  ))
                )}
              </div>

              {/* Quick Play/Pause trigger button */}
              <motion.button
                onClick={togglePlay}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full hover:bg-white/5 text-purple-200/70 hover:text-white cursor-pointer transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 translate-x-[0.5px]" />
                )}
              </motion.button>

              {/* Mute toggle button */}
              <motion.button
                onClick={toggleMute}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full hover:bg-white/5 text-purple-200/50 hover:text-white cursor-pointer transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-pink-400/70" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
