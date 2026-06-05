'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  { threshold: 0, text: 'Connecting to Antima\'s heart... 📶❤️' },
  { threshold: 20, text: 'May 2024 se lekar aaj tak ke chats scan ho rahe hain... 📱✨' },
  { threshold: 45, text: 'Teasing levels check kar rahe hain... 😆' },
  { threshold: 70, text: 'Kuch sweet memories aur feelings ko code mein wrap kar rahe hain... 💻💖' },
  { threshold: 90, text: 'Almost ready! Birthday surprise launch hone wala hai... 🚀🎂' }
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [activeText, setActiveText] = useState(loadingTexts[0].text);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const intervalTime = 40; // Total loading time approx 4 seconds

    const timer = setInterval(() => {
      const increment = Math.floor(Math.random() * 4) + 1;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      // Update description text based on progress
      const match = [...loadingTexts].reverse().find(t => currentProgress >= t.threshold);
      if (match) {
        setActiveText(match.text);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Allow fade animation to complete
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080312] text-white select-none px-6"
        >
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Animated Glowing Heart */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: 1
            }}
            transition={{
              scale: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
              opacity: { duration: 0.5 }
            }}
            className="text-7xl mb-8 relative flex items-center justify-center"
          >
            <span className="relative z-10 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">🎂</span>
            <div className="absolute w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
          </motion.div>

          <div className="w-full max-w-md text-center">
            {/* Title */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold font-comfortaa mb-2 tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-gold-400 bg-clip-text text-transparent"
            >
              Happy Birthday Antima
            </motion.h1>

            {/* Percentage Indicator */}
            <motion.div 
              className="text-4xl font-extrabold text-white/90 font-outfit my-4 neon-glow-pink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.div>

            {/* Simulated Progress Bar */}
            <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden border border-white/10 relative p-[1px]">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Simulated Hinglish Progress Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-sm md:text-base font-outfit text-purple-200/80 min-h-[40px] leading-relaxed px-4"
              >
                {activeText}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
