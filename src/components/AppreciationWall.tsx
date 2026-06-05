'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, CheckCircle2, HelpingHand, Laugh, Hourglass, Sparkles } from 'lucide-react';

interface AppreciationItem {
  id: number;
  title: string;
  subtitle: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'purple' | 'pink' | 'gold' | 'blue';
}

const appreciationList: AppreciationItem[] = [
  {
    id: 1,
    title: 'Tumhari Kindness',
    subtitle: 'A heart of pure gold',
    details: 'Tum sabse kitne pyaare tarike aur respect se baat karti ho, ye dekh kar dil khush ho jata hai. Your kind nature shows how beautiful you are from inside. ❤️',
    icon: Heart,
    color: 'pink',
  },
  {
    id: 2,
    title: 'Tumhara Nature',
    subtitle: 'Calm, caring & comforting',
    details: 'Caring, understanding, and always so positive! Tumhara peaceful aur warm nature mere stress aur worries ko instantly gayab kar deta hai. 🌸',
    icon: Sparkles,
    color: 'purple',
  },
  {
    id: 3,
    title: 'Tumhari Honesty',
    subtitle: 'Transparent & genuine',
    details: 'Tumhare dimag mein jo hota hai, wahi tumhare lips pe hota hai. Koi fake behaviors nahi, bas tumhara real, pure, aur honest self. It is so rare to find! 🌟',
    icon: ShieldCheck,
    color: 'blue',
  },
  {
    id: 4,
    title: 'Tumhara Support',
    subtitle: 'Always there, no matter what',
    details: 'Distance ke baad bhi, jab bhi main low feel karta hu, you stand strong by my side. Hum door hain par tumhara silent support mere saath hamesha rehta hai. 🤝',
    icon: HelpingHand,
    color: 'gold',
  },
  {
    id: 5,
    title: 'Tumhari Smile',
    subtitle: 'The ultimate mood improver',
    details: 'Hamare chats aur memories ka sabse beautiful output. Tumhare smiles aur cute giggles meri routine ka sabse pyaara hissa hain. Hamesha haste raha karo! 😊',
    icon: Laugh,
    color: 'pink',
  },
  {
    id: 6,
    title: 'Tumhari Patience',
    subtitle: 'Expert at handling Rohit',
    details: 'Meri late replies, teasing habits aur ajeeb jokes ko tum jis patience aur sweet smiles ke saath tolerate karti ho... sach mein, tum award deserving ho! 🏆😆',
    icon: Hourglass,
    color: 'purple',
  },
  {
    id: 7,
    title: 'Tumhari Presence',
    subtitle: 'Making life infinitely better',
    details: 'Hum mile nahi hain properly, but tumhari virtual presence ne meri life ko better, organized aur khushnuma bana diya hai. You are my favourite place. 🏡💖',
    icon: CheckCircle2,
    color: 'blue',
  },
];

export default function AppreciationWall() {
  const getGlowShadow = (color: string) => {
    switch (color) {
      case 'pink': return 'group-hover:shadow-[0_0_25px_rgba(236,72,153,0.25)] group-hover:border-pink-500/40';
      case 'purple': return 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] group-hover:border-purple-500/40';
      case 'gold': return 'group-hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] group-hover:border-amber-500/40';
      case 'blue':
      default:
        return 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] group-hover:border-cyan-500/40';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'pink': return 'text-pink-400';
      case 'purple': return 'text-purple-400';
      case 'gold': return 'text-amber-400';
      case 'blue':
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-[#080312] overflow-hidden select-none">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-2 block font-outfit"
          >
            Admiring You
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
          >
            Things I Like About You
          </motion.h2>
        </div>

        {/* Appreciation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {appreciationList.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`glass-panel border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group ${getGlowShadow(item.color)}`}
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-purple-300/40 font-bold font-outfit">
                      {item.subtitle}
                    </span>
                    <Icon className={`w-6 h-6 ${getIconColor(item.color)}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold font-comfortaa text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Descriptions */}
                  <p className="text-sm font-outfit text-purple-200/70 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                {/* Subtle border bottom glow */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent group-hover:via-purple-500/40 transition-colors" />
              </motion.div>
            );
          })}
        </div>

        {/* Emotional appreciation quote block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="glass-panel border border-purple-500/15 rounded-3xl p-8 md:p-12 shadow-[0_0_35px_rgba(168,85,247,0.04)] relative">
            {/* Top gold sparkle design */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0c0716] border border-amber-500/25 p-3 rounded-full text-amber-300 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>

            <p className="font-outfit text-purple-100 text-lg md:text-2xl leading-relaxed font-light mb-6">
              "Kabhi kabhi log special isliye nahi hote kyunki wo perfect hote hain. <br className="hidden md:inline" />
              Wo special isliye hote hain kyunki unki presence life ko better bana deti hai." ❤️
            </p>
            
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
