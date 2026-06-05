'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { photos } from '../config/photos';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => 
      prev === null ? null : (prev + 1) % photos.length
    );
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => 
      prev === null ? null : (prev - 1 + photos.length) % photos.length
    );
  };

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const getColorBorder = (color: string) => {
    switch (color) {
      case 'pink': return 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-500/30';
      case 'purple': return 'hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-500/30';
      case 'gold': return 'hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:border-amber-500/30';
      case 'blue':
      default:
        return 'hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-cyan-500/30';
    }
  };

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-neon-gradient overflow-hidden">
      {/* Background neon dots */}
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 select-none">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-pink-400 font-semibold mb-2 block font-outfit"
          >
            Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold font-comfortaa bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)] mb-4"
          >
            Antima Through My Eyes ❤️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-purple-200/60 font-outfit max-w-md mx-auto italic"
          >
            Har Photo Ek Yaad Nahi, Ek Feeling Hai ❤️
          </motion.p>
        </div>

        {/* Premium Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`break-inside-avoid glass-panel border border-white/5 rounded-2xl overflow-hidden cursor-pointer p-3.5 transition-all duration-300 group ${getColorBorder(photo.color)}`}
            >
              {/* Image Container with Hover zoom */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3.5 bg-[#140e24]">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 3}
                />
                {/* Floating sparkle icon on top of image cards */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-amber-300">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Caption text */}
              <div className="px-2 pb-1 text-center font-outfit text-sm font-medium text-purple-200/80 group-hover:text-white transition-colors duration-300">
                {photo.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox full-screen modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080312]/95 backdrop-blur-xl p-4 select-none"
          >
            {/* Ambient glows behind the lightbox */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fullscreen Photo Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl max-h-[80vh] flex flex-col items-center justify-center p-3 rounded-3xl glass-panel border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              {/* Active Image */}
              <div className="relative w-full aspect-[4/5] max-h-[70vh] rounded-2xl overflow-hidden bg-[#0d081c]">
                <Image
                  src={selectedPhoto!.url}
                  alt={selectedPhoto!.caption}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Captions inside lightbox */}
              <div className="mt-4 px-4 text-center font-comfortaa text-white font-medium text-base md:text-lg filter drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]">
                {selectedPhoto!.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
