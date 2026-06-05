'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { cherryLadyMusic } from './CherryLadyMusic';

interface BackgroundMusicPlayerProps {
  /** Only renders the player after the loading screen is gone */
  visible: boolean;
}

export default function BackgroundMusicPlayer({ visible }: BackgroundMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-start music after short delay when the page becomes visible
  useEffect(() => {
    if (!visible) return;
    const tid = setTimeout(() => {
      if (cherryLadyMusic && !cherryLadyMusic.playing) {
        cherryLadyMusic.play();
        setIsPlaying(true);
      }
    }, 1200); // small delay so the hero animation starts first
    return () => clearTimeout(tid);
  }, [visible]);

  const toggle = () => {
    if (!cherryLadyMusic) return;
    if (isPlaying) {
      cherryLadyMusic.stop();
      setIsPlaying(false);
    } else {
      cherryLadyMusic.play();
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-[60] flex items-center gap-3"
        >
          {/* Tooltip label */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-start"
              >
                <span
                  className="text-[10px] uppercase tracking-widest text-purple-300/60 font-outfit"
                >
                  Now Playing
                </span>
                <span
                  className="text-xs font-bold font-outfit text-white whitespace-nowrap"
                  style={{ textShadow: '0 0 10px rgba(168,85,247,0.5)' }}
                >
                  🎵 Cherry Cherry Lady
                </span>
                <span
                  className="text-[10px] text-purple-300/50 font-outfit italic"
                >
                  Modern Talking
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main pill button */}
          <motion.button
            id="cherry-music-toggle"
            onClick={toggle}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer overflow-hidden"
            style={{
              background: isPlaying
                ? 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25))'
                : 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(14px)',
              border: isPlaying
                ? '1px solid rgba(236,72,153,0.4)'
                : '1px solid rgba(255,255,255,0.1)',
              boxShadow: isPlaying
                ? '0 0 18px rgba(168,85,247,0.35), inset 0 0 12px rgba(236,72,153,0.08)'
                : '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {/* Spinning disc icon when playing */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying
                ? { duration: 3, repeat: Infinity, ease: 'linear' }
                : { duration: 0.3 }
              }
            >
              <Disc3
                className="w-5 h-5"
                style={{ color: isPlaying ? '#ec4899' : 'rgba(168,85,247,0.7)' }}
              />
            </motion.div>

            {/* Equaliser bars animation */}
            {isPlaying ? (
              <div className="flex items-end gap-[3px] h-4">
                {[0.4, 0.8, 0.55, 1, 0.65, 0.45, 0.7].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{ background: '#ec4899', boxShadow: '0 0 4px #ec4899' }}
                    animate={{ scaleY: [h, 0.2, h * 0.8, 1, h] }}
                    transition={{
                      duration: 0.7 + i * 0.08,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.09,
                    }}
                    initial={{ scaleY: h }}
                  />
                ))}
              </div>
            ) : (
              <Music2 className="w-4 h-4 text-purple-300" />
            )}

            {/* Text label */}
            <span
              className="text-xs font-bold font-outfit"
              style={{ color: isPlaying ? '#f9a8d4' : 'rgba(196,181,253,0.75)' }}
            >
              {isPlaying ? 'Music On' : 'Music Off'}
            </span>

            {/* Mute icon */}
            {isPlaying
              ? <Volume2 className="w-4 h-4 text-pink-300" />
              : <VolumeX className="w-4 h-4 text-purple-400/60" />
            }
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
