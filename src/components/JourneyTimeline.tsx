'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Sun, Layers, Moon, Heart, Gift, ChevronDown } from 'lucide-react';

interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  details: string;
  color: 'purple' | 'pink' | 'gold' | 'blue';
  icon: React.ComponentType<{ className?: string }>;
}

const milestones: Milestone[] = [
  {
    id: 1,
    date: 'May 2024',
    title: 'Pehli baar baat hui',
    description: 'A simple start to something beautiful...',
    details: 'Vo ek simple si conversation thi, par tab kisne socha tha ki hum yahan tak pahunchenge? It was the start of something beautiful. Ek simple message se shuru hua ye safar aaj meri life ka sabse pyaara hissa ban chuka hai. ✨',
    color: 'blue',
    icon: Calendar,
  },
  {
    id: 2,
    date: 'Simple Conversations',
    title: 'Roz ki routine ka part ban gayi',
    description: 'Seamlessly fitting into daily life...',
    details: 'Chhoti-chhoti baatein share karna, daily updates dena aur ek dusre ke routines ko samajhna—sab kuch kitna natural lagne laga. Har din tumse baat karna meri routine ban gayi, jiske bina din adhura lagta tha. 💬',
    color: 'purple',
    icon: MessageCircle,
  },
  {
    id: 3,
    date: 'Good Morning Messages',
    title: 'Daily habit ban gaye',
    description: 'Starting the day with your name...',
    details: 'Din ki shuruat tumhare text se hone lagi. Agar kabhi message late ho jaye toh lagta tha din shuru hi nahi hua. Ek pyaara sa message aur meri face par aane wali smile—ye din ka sabse best start ban gaya. ☀️',
    color: 'pink',
    icon: Sun,
  },
  {
    id: 4,
    date: 'Random Chats',
    title: 'Yaadon mein convert ho gaye',
    description: 'Inside jokes and teasing...',
    details: 'Memes, screenshot shares, teasing, aur na jaane kitne silly topics! Hum dono ki silly talks ne na jaane kitni beautiful memories create kar di hain. Ye random chats hi hamara connection strong banati gayi. 📂❤️',
    color: 'gold',
    icon: Layers,
  },
  {
    id: 5,
    date: 'Late Night Conversations',
    title: 'Kuch special lagne lagi',
    description: 'Deep talks when the world sleeps...',
    details: 'Jab duniya so jati hai tab hamari baatein shuru hoti thin. Deep chats, sharing secrets, and realizing we are there for each other. Hum dono ke late-night thoughts aur feelings ne humein ek dusre ke aur kareeb laya. 🌙',
    color: 'purple',
    icon: Moon,
  },
  {
    id: 6,
    date: 'Countless Smiles',
    title: 'Bina mile bhi connection strong hota gaya',
    description: 'Distance is just a number...',
    details: 'Screen dekhkar muskurana, distance hote hue bhi paas feel karna. Hum physically door hain aur abhi tak mile nahi hain, par conversations ne distance ko khatam kar diya. Connection dillon ka hota hai, distance ka nahi! 😊💞',
    color: 'pink',
    icon: Heart,
  },
  {
    id: 7,
    date: 'Today',
    title: 'Tumhara Birthday 🎉',
    description: 'Celebrating the main character...',
    details: 'And here we are! A day to celebrate you. Aaj main bahut khush hu ki tum meri life ka hissa ho. Main dil se chahta hu ki tumhare aane wale saare saal khushiyon se bhare hon. Happy Birthday, my favourite person! 🎂❤️',
    color: 'gold',
    icon: Gift,
  },
];

export default function JourneyTimeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
          border: 'border-purple-500/30 hover:border-purple-400',
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          dot: 'bg-purple-500',
        };
      case 'pink':
        return {
          glow: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]',
          border: 'border-pink-500/30 hover:border-pink-400',
          text: 'text-pink-400',
          bg: 'bg-pink-500/10',
          dot: 'bg-pink-500',
        };
      case 'gold':
        return {
          glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]',
          border: 'border-amber-500/30 hover:border-amber-400',
          text: 'text-amber-400',
          bg: 'bg-amber-500/10',
          dot: 'bg-amber-500',
        };
      case 'blue':
      default:
        return {
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
          border: 'border-cyan-500/30 hover:border-cyan-400',
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          dot: 'bg-cyan-500',
        };
    }
  };

  return (
    <section id="journey" className="relative min-h-screen w-full py-24 px-4 bg-neon-gradient overflow-hidden">
      {/* Title */}
      <div className="max-w-4xl mx-auto text-center mb-16 select-none">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-pink-400 font-semibold mb-2 block"
        >
          Our Story
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
        >
          Hamari Journey ❤️
        </motion.h2>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline Central Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500/30 via-purple-500/30 via-pink-500/30 to-amber-500/30 -translate-x-1/2" />

        {/* Timeline Milestones */}
        <div className="space-y-12">
          {milestones.map((m, index) => {
            const Icon = m.icon;
            const style = getColorClasses(m.color);
            const isExpanded = expandedId === m.id;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-start md:items-center`}
              >
                {/* Node Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.button
                    onClick={() => toggleExpand(m.id)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-10 h-10 rounded-full ${style.bg} border-2 ${style.border} flex items-center justify-center text-white cursor-pointer transition-all duration-300 ${style.glow}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Content Area */}
                <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'
                }`}>
                  <div
                    onClick={() => toggleExpand(m.id)}
                    className="glass-panel rounded-2xl p-6 border border-white/5 cursor-pointer hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-300 select-none relative group"
                  >
                    {/* Glowing background hint on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent to-${m.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Date badge */}
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${style.bg} ${style.text} mb-3 font-outfit`}>
                      {m.date}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold font-comfortaa text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {m.title}
                    </h3>

                    {/* Quick description */}
                    <p className="text-sm text-purple-200/60 font-outfit mb-4">
                      {m.description}
                    </p>

                    {/* Expand indicator */}
                    <div className={`flex items-center gap-1 text-xs font-semibold ${style.text} mt-2`}>
                      <span>{isExpanded ? 'Kahani Close Karo' : 'Yaad Open Karo'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Deeper expandable message details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.1 } } }}
                          exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.2 }, opacity: { duration: 0.1 } } }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/5 text-purple-200/90 text-sm font-outfit leading-relaxed text-left md:text-justify">
                            {m.details}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Visual balance placeholder for desktop grid */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Heartfelt Footer Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl mx-auto text-center mt-20 select-none px-6"
      >
        <div className="glass-panel rounded-2xl p-6 border border-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.03)] relative overflow-hidden">
          {/* Top light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
          
          <p className="font-outfit text-purple-200/80 text-base md:text-lg leading-relaxed italic">
            {"\"Hum shayad abhi tak properly mile nahi hain, lekin itni saari yaadein bana chuke hain ki kabhi kabhi distance bhi chhota lagta hai. ❤️\""}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
