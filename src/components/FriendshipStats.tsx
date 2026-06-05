'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Laugh, Trophy, Bell, Hourglass, Sunrise } from 'lucide-react';

interface StatItemProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'purple' | 'pink' | 'gold' | 'blue';
  delay: number;
  finalString?: string; // If we want to flip to a string after count up
}

function StatCard({ title, value, subtext, icon: Icon, color, delay, finalString }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value !== 'number') return;
    
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(duration / end), 20); // ms per step
    
    // Stagger count start
    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        start += Math.ceil(end / 40); // larger steps for high numbers
        if (start >= end) {
          clearInterval(timer);
          setDisplayValue(finalString || end);
        } else {
          setDisplayValue(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [value, delay, finalString]);

  const getColorClasses = (c: string) => {
    switch (c) {
      case 'purple':
        return 'border-purple-500/10 hover:border-purple-500/30 text-purple-400 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.02)]';
      case 'pink':
        return 'border-pink-500/10 hover:border-pink-500/30 text-pink-400 bg-pink-500/5 shadow-[0_0_15px_rgba(236,72,153,0.02)]';
      case 'gold':
        return 'border-amber-500/10 hover:border-amber-500/30 text-amber-400 bg-amber-500/5 shadow-[0_0_15px_rgba(234,179,8,0.02)]';
      case 'blue':
      default:
        return 'border-cyan-500/10 hover:border-cyan-500/30 text-cyan-400 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.02)]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`glass-panel border rounded-2xl p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 group ${getColorClasses(color)}`}
    >
      {/* Top corner glow */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/2 rounded-full blur-xl pointer-events-none" />

      {/* Animated Icon Container */}
      <div className="p-4 rounded-full bg-white/3 border border-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
      </div>

      {/* Counter Value */}
      <div className="text-3xl md:text-4xl font-extrabold font-outfit mb-2 text-white tracking-tight">
        {displayValue}
      </div>

      {/* Stat Label */}
      <div className="text-xs uppercase tracking-widest text-purple-200/50 font-bold mb-2">
        {title}
      </div>

      {/* Subtext */}
      {subtext && (
        <div className="text-xs font-outfit text-purple-200/70 italic max-w-[150px] leading-relaxed">
          {subtext}
        </div>
      )}
    </motion.div>
  );
}

export default function FriendshipStats() {
  const [days, setDays] = useState(765); // Fallback: roughly from May 2024 to June 2026

  useEffect(() => {
    // Dynamically calculate days from May 1, 2024 to current local time
    const start = new Date('2024-05-01');
    const today = new Date();
    const diff = today.getTime() - start.getTime();
    const calculatedDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (calculatedDays > 0) {
      setTimeout(() => {
        setDays(calculatedDays);
      }, 0);
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-[#080312] overflow-hidden select-none">
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2 block font-outfit"
          >
            Fun Department
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          >
            Antima Statistics Department 😂
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <StatCard
            title="Days Connected"
            value={days}
            subtext="May 2024 se ab tak aur counting..."
            icon={Heart}
            color="pink"
            delay={0.1}
          />
          <StatCard
            title="Smiles Generated"
            value={99}
            finalString="∞"
            subtext="Bina mile bhi unlimited smiles"
            icon={Laugh}
            color="purple"
            delay={0.2}
          />
          <StatCard
            title="Arguments Won"
            value={99}
            finalString="Bahut Zyada"
            subtext="Rohit has zero chances 😆"
            icon={Trophy}
            color="gold"
            delay={0.3}
          />
          <StatCard
            title="Fav Notification"
            value="Antima"
            subtext="Screen pe aate hi mood fresh!"
            icon={Bell}
            color="blue"
            delay={0.4}
          />
          <StatCard
            title="Wait Skill"
            value="Expert Level"
            subtext="Reply ka ghanto wait karne ki pratha"
            icon={Hourglass}
            color="pink"
            delay={0.5}
          />
          <StatCard
            title="Morning Greetings"
            value={999}
            finalString="Countless"
            subtext="Har pyaari subah ka pyaara start"
            icon={Sunrise}
            color="gold"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}
