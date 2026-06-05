'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onUnlock: () => void;
}

export default function HeroSection({ onUnlock }: HeroSectionProps) {
  const handleOpenSurprise = () => {
    onUnlock();
    // Smooth scroll to journey timeline after unlocking
    setTimeout(() => {
      const journeySection = document.getElementById('journey');
      if (journeySection) {
        journeySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-hero-glow px-4 py-20 select-none">
      {/* Background Neon Elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[250px] h-[250px] bg-pink-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Sparkles & Decor items */}
      <motion.div 
        animate={{ 
          y: [-10, 15, -10],
          x: [0, 5, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-20 left-[15%] text-4xl opacity-50 hidden md:block"
      >
        🎈
      </motion.div>
      <motion.div 
        animate={{ 
          y: [15, -15, 15],
          x: [0, -8, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/3 right-[10%] text-5xl opacity-40 hidden md:block"
      >
        ✨
      </motion.div>
      <motion.div 
        animate={{ 
          y: [-8, 8, -8],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute bottom-32 left-[12%] text-3xl opacity-40 hidden md:block"
      >
        🌸
      </motion.div>
      <motion.div 
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, 12, 0]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute bottom-20 right-[15%] text-4xl opacity-50 hidden md:block"
      >
        💝
      </motion.div>

      {/* Main Glassmorphism container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-3xl rounded-3xl p-8 md:p-14 text-center z-20 relative shadow-[0_0_50px_rgba(168,85,247,0.1)] overflow-hidden"
      >
        {/* Subtle top borders */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent blur-[1px]" />

        {/* Happy Birthday Heading */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative inline-block mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-comfortaa leading-normal p-2">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              Happy Birthday Antima 🎂❤️
            </span>
          </h1>
        </motion.div>

        {/* Hinglish Poetry/Text lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-3 font-outfit text-purple-100 text-lg md:text-xl font-light mb-8 max-w-xl mx-auto leading-relaxed"
        >
          <p className="font-semibold text-purple-300">Ek chhota sa surprise...</p>
          <p className="italic text-purple-200">thodi si mehnat,</p>
          <p className="italic text-purple-200">thodi si coding,</p>
          <p className="font-medium text-pink-300">aur bahut saari feelings ke saath.</p>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-sm md:text-base text-purple-200/60 font-outfit mb-10 max-w-md mx-auto leading-relaxed"
        >
          May 2024 se lekar aaj tak... <br />
          tum meri life ka ek bahut important part ban chuki ho.
        </motion.p>

        {/* Made by Rohit Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-xs md:text-sm font-semibold text-purple-300 font-outfit mb-12 shadow-[0_2px_10px_rgba(168,85,247,0.05)]"
        >
          Made By Rohit ❤️
        </motion.div>

        {/* Main CTA Surprise Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="relative flex justify-center"
        >
          <button
            onClick={handleOpenSurprise}
            className="group relative px-8 py-4 md:px-10 md:py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 font-bold text-white text-base md:text-lg transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] active:scale-98 overflow-hidden"
          >
            {/* Gloss reflection shine */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
            
            <span className="relative z-10 flex items-center gap-2">
              ✨ Surprise Open Karo ✨
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
