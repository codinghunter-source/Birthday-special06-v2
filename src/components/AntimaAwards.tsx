'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Heart, Clock, MessagesSquare, Smile, ShieldAlert } from 'lucide-react';

interface AwardItem {
  id: number;
  title: string;
  reason: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'gold' | 'pink' | 'purple' | 'blue';
}

const awardsList: AwardItem[] = [
  {
    id: 1,
    title: 'Best Listener Award',
    reason: 'Pata nahi tum kaise meri ghanto lambi aur ajeeb baatein bina bore hue sun leti ho! You are officially the best listener on this planet. 🎧💖',
    badge: 'Category: Patience Champion',
    icon: Star,
    color: 'purple',
  },
  {
    id: 2,
    title: 'Future Wife Award ❤️',
    reason: 'An official nomination and permanent booking from my side! Ready to lock this award for the rest of our lives. 💍✨',
    badge: 'Category: Permanent Lifetime achievement',
    icon: Heart,
    color: 'pink',
  },
  {
    id: 3,
    title: 'Professional Reply Delayer Award 😆',
    reason: 'For taking exactly 3-5 working days to reply to a simple text. Still, your reply is always worth the wait! ⏳🐢',
    badge: 'Category: Speed Breaker of Chats',
    icon: Clock,
    color: 'gold',
  },
  {
    id: 4,
    title: 'Most Memorable Chat Partner Award',
    reason: 'For making ordinary typing conversations feel like full-blown cinematic experiences. Tumse baat karna never gets boring! 💬🎬',
    badge: 'Category: Content Writer of My Life',
    icon: MessagesSquare,
    color: 'blue',
  },
  {
    id: 5,
    title: 'Certified Mood Improver Award',
    reason: 'For instantly transforming a bad, tiring day into a smiling, happy one just with a single notification banner. ☀️🌻',
    badge: 'Category: Emotional Sunshine',
    icon: Smile,
    color: 'pink',
  },
  {
    id: 6,
    title: 'Rohit Ki Favourite Person Award',
    reason: 'No arguments allowed on this! A highly biased, 100% genuine award that belongs only to you, today and forever. 🏆❤️',
    badge: 'Category: Grand Prix of My Heart',
    icon: Award,
    color: 'gold',
  },
];

export default function AntimaAwards() {
  const getGlowStyle = (color: string) => {
    switch (color) {
      case 'pink':
        return 'group-hover:border-pink-500/50 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] border-pink-500/10';
      case 'purple':
        return 'group-hover:border-purple-500/50 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] border-purple-500/10';
      case 'blue':
        return 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] border-cyan-500/10';
      case 'gold':
      default:
        return 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] border-amber-500/10';
    }
  };

  const getBadgeBg = (color: string) => {
    switch (color) {
      case 'pink': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'blue': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'gold':
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-neon-gradient overflow-hidden select-none">
      {/* Decorative stars */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-pink-400 font-semibold mb-2 block font-outfit"
          >
            Special Achievements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          >
            Official Antima Awards 😂❤️
          </motion.h2>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awardsList.map((award, index) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`glass-panel border rounded-2xl p-6 md:p-8 flex flex-col justify-between relative transition-all duration-300 group shadow-[0_4px_30px_rgba(0,0,0,0.2)] ${getGlowStyle(award.color)}`}
              >
                {/* Shiny reflex overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/1 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div>
                  {/* Category Tag */}
                  <div className={`inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border mb-6 ${getBadgeBg(award.color)} font-outfit`}>
                    {award.badge}
                  </div>

                  {/* Award Icon & Title Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-600/20 border border-amber-500/20 text-amber-300">
                      <Icon className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold font-comfortaa text-white leading-tight">
                      {award.title}
                    </h3>
                  </div>

                  {/* Award Reason */}
                  <p className="text-sm font-outfit text-purple-200/80 leading-relaxed mt-2">
                    {award.reason}
                  </p>
                </div>

                {/* Plaque visual stamp */}
                <div className="flex justify-end items-center mt-6 pt-4 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 text-amber-400 font-comfortaa text-xs font-bold">
                    <span>Approved by Rohit</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
