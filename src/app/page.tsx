'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PasswordGate from '../components/PasswordGate';
import LoadingScreen from '../components/LoadingScreen';
import ParticleBackground from '../components/ParticleBackground';
import HeroSection from '../components/HeroSection';
import JourneyTimeline from '../components/JourneyTimeline';
import FriendshipStats from '../components/FriendshipStats';
import PhotoGallery from '../components/PhotoGallery';
import AppreciationWall from '../components/AppreciationWall';
import AntimaAwards from '../components/AntimaAwards';
import BirthdayQuiz from '../components/BirthdayQuiz';
import SecretLetter from '../components/SecretLetter';
import FinalSurprise from '../components/FinalSurprise';
import CelebrationEffects from '../components/CelebrationEffects';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCelebrationActive, setIsCelebrationActive] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#080312] text-white overflow-hidden">

      {/* ── 0. Password Gate — shown until correct password entered ── */}
      <AnimatePresence>
        {!isAuthenticated && (
          <PasswordGate onUnlock={() => setIsAuthenticated(true)} />
        )}
      </AnimatePresence>

      {/* ── Website (revealed after password) ── */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full"
        >
          {/* 1. Loading Screen */}
          <LoadingScreen onComplete={() => setIsLoading(false)} />

          {!isLoading && (
            <>
              {/* Ambient Particles in background */}
              <ParticleBackground />

              {/* Fireworks & Confetti Overlay */}
              <CelebrationEffects active={isCelebrationActive} />

              {/* 2. Hero Header Section */}
              <HeroSection onUnlock={() => setIsUnlocked(true)} />

              {/* Unlocked Surprises */}
              <AnimatePresence>
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full relative z-20 flex flex-col items-center"
                  >
                    {/* Timeline Journey */}
                    <JourneyTimeline />

                    {/* Animated Stats */}
                    <FriendshipStats />

                    {/* Photo Gallery Masonry */}
                    <PhotoGallery />

                    {/* Things I Like About You */}
                    <AppreciationWall />

                    {/* Plaque Awards */}
                    <AntimaAwards />

                    {/* Playful Hinglish Quiz */}
                    <BirthdayQuiz />

                    {/* Sealed Typewriter message */}
                    <SecretLetter />

                    {/* Grand Finale */}
                    <FinalSurprise onTriggerCelebration={setIsCelebrationActive} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      )}
    </main>
  );
}
