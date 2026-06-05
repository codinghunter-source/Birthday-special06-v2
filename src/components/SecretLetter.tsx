'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, MailOpen, ChevronsRight } from 'lucide-react';

const letterLines = [
  "Dear Antima ❤️,",
  "",
  "Happy Birthday 🎂",
  "",
  "Kabhi kabhi mujhe lagta hai ki May 2024 mein shuru hui ek simple si conversation meri life ka itna important part ban jayegi, ye maine kabhi socha nahi tha.",
  "",
  "Aaj bhi mujhe ye baat special lagti hai ki hum abhi tak properly mile nahi hain, lekin phir bhi tum meri daily life ka ek bahut important hissa ban chuki ho.",
  "",
  "Kuch log milkar special bante hain.",
  "",
  "Tum conversations ke through special ban gayi. ✨",
  "",
  "Hamari random chats, funny moments, good morning messages, teasing, aur chhoti chhoti baatein kab yaadon mein convert ho gayi pata hi nahi chala.",
  "",
  "Thank you mere saath itna time spend karne ke liye, meri baatein sunne ke liye, mujhe hasane ke liye aur ordinary days ko bhi thoda better banane ke liye.",
  "",
  "Sach kahu toh ab tumhare messages meri routine ka part ban chuke hain.",
  "",
  "Main dil se dua karta hu ki tumhari life mein hamesha khushiyan rahein, tumhare saare dreams poore ho aur tum hamesha isi tarah smile karti raho. ☀️",
  "",
  "Aur haan...",
  "",
  "Future mein hum dono saath milkar birthdays celebrate karein, ye wish bhi list mein add kar raha hu. ❤️",
  "",
  "Happy Birthday Antima 🎂❤️",
  "",
  "— Rohit"
];

export default function SecretLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play a beautiful synthesized bell chime when unlocking
  const playUnlockSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5 note
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // Slide to G5
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.8);
    } catch {
      // Audio block or unsupported
    }
  };

  const handleOpenLetter = () => {
    playUnlockSound();
    setIsOpen(true);
  };

  const handleSkipTyping = () => {
    setTypedLines(letterLines);
    setIsTypingComplete(true);
  };

  // Sequential Typewriter Logic
  useEffect(() => {
    if (!isOpen || isTypingComplete) return;

    if (currentLineIdx >= letterLines.length) {
      setTimeout(() => {
        setIsTypingComplete(true);
      }, 0);
      return;
    }

    const currentFullLine = letterLines[currentLineIdx];

    // If it's an empty line (paragraph break), jump immediately
    if (currentFullLine === "") {
      setTypedLines(prev => [...prev, ""]);
      setCurrentLineIdx(prev => prev + 1);
      setCurrentCharIdx(0);
      return;
    }

    const typingSpeed = 25; // ms per character
    const charTimer = setTimeout(() => {
      // Append character
      setTypedLines(prev => {
        const copy = [...prev];
        if (currentCharIdx === 0) {
          copy.push(currentFullLine[0]);
        } else {
          copy[copy.length - 1] = currentFullLine.substring(0, currentCharIdx + 1);
        }
        return copy;
      });

      // Advance cursor
      if (currentCharIdx < currentFullLine.length - 1) {
        setCurrentCharIdx(prev => prev + 1);
      } else {
        // Line complete, wait slightly then start next line
        setTimeout(() => {
          setCurrentLineIdx(prev => prev + 1);
          setCurrentCharIdx(0);
        }, 200);
      }
    }, typingSpeed);

    return () => clearTimeout(charTimer);
  }, [isOpen, currentLineIdx, currentCharIdx, isTypingComplete]);

  // Scroll to bottom of letter card as typing progresses
  useEffect(() => {
    if (containerRef.current && isOpen && !isTypingComplete) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [typedLines, isOpen, isTypingComplete]);

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-neon-gradient overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full select-none">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-pink-400 font-semibold mb-2 block font-outfit"
          >
             {"Rohit's Message"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          >
            Secret Letter ❤️
          </motion.h2>
        </div>

        {/* Envelope Container */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // LOCKED ENVELOPE CARD
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20, rotateX: 20 }}
                transition={{ duration: 0.5 }}
                className="glass-panel border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-[0_10px_50px_rgba(168,85,247,0.1)] relative overflow-hidden group cursor-pointer hover:border-pink-500/25 transition-all"
                onClick={handleOpenLetter}
              >
                {/* Neon envelope flap lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/20 via-pink-500/40 to-cyan-500/20" />
                
                {/* Glowing Wax Seal Container */}
                <div className="flex justify-center mb-8 relative">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center border-4 border-amber-400/30 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] z-10"
                  >
                    <Lock className="w-8 h-8" />
                  </motion.div>
                  {/* Seal outer shadow halo */}
                  <div className="absolute w-24 h-24 bg-pink-500/20 rounded-full blur-md animate-pulse top-[-8px]" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-comfortaa text-white mb-3">
                  This letter is locked
                </h3>
                <p className="text-xs md:text-sm text-purple-200/60 font-outfit mb-8 max-w-xs mx-auto leading-relaxed">
                  Rohit has written a personal letter expressing his raw feelings since May 2024. Tap below to unlock.
                </p>

                {/* Unlock Action Button */}
                <button
                  onClick={handleOpenLetter}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold font-outfit text-sm cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:shadow-[0_0_35px_rgba(236,72,153,0.5)] transition-all active:scale-98"
                >
                  ❤️ Secret Message Open Karo ❤️
                </button>
              </motion.div>
            ) : (
              // UNLOCKED TYPING LETTER CARD
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-panel border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_10px_50px_rgba(236,72,153,0.1)] relative overflow-hidden"
              >
                {/* Opened status indicator */}
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/5 font-outfit text-purple-300/40 text-xs font-semibold uppercase">
                  <span className="flex items-center gap-1.5">
                    <MailOpen className="w-3.5 h-3.5" />
                    <span>Unlocked Message</span>
                  </span>
                  {!isTypingComplete && (
                    <button
                      onClick={handleSkipTyping}
                      className="text-pink-400 hover:text-pink-300 hover:underline transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Skip Typing</span>
                      <ChevronsRight className="w-4.5 h-4.5" />
                    </button>
                  )}
                </div>

                {/* Typing content frame */}
                <div 
                  ref={containerRef}
                  className="max-h-[60vh] overflow-y-auto scroll-smooth font-outfit text-purple-100 text-sm md:text-base leading-relaxed pr-2 space-y-3.5 select-text"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {typedLines.map((line, idx) => {
                    if (line === "") {
                      return <div key={idx} className="h-3" />;
                    }
                    return (
                      <p key={idx} className={line.startsWith('—') ? 'text-right text-purple-300 font-semibold italic mt-4' : ''}>
                        {line}
                      </p>
                    );
                  })}

                  {/* Typewriter caret cursor */}
                  {!isTypingComplete && (
                    <span className="inline-block w-1.5 h-4.5 ml-1 bg-pink-500 animate-pulse" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
