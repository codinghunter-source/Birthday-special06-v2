import React from 'react';
import Link from 'next/link';

// not-found.tsx must be a Server Component — no 'use client', no framer-motion
export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#080312] text-white flex flex-col items-center justify-center p-4 select-none">
      <div
        className="glass-panel border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-md w-full shadow-[0_10px_40px_rgba(168,85,247,0.1)]"
        style={{
          animation: 'fadeInUp 0.8s ease forwards',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="text-5xl mb-6">🧭</div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
          Kuch Ghalat Raasta Chun Liya!
        </h2>
        <p className="text-sm text-purple-200/60 mb-8 leading-relaxed">
          Ye page hamari journey ka part nahi hai. Chalo wapas Rohit ke surprise page pe chalte hain.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer transition-all"
          style={{
            background: 'linear-gradient(135deg, #9333ea, #ec4899, #f59e0b)',
            boxShadow: '0 0 20px rgba(236,72,153,0.25)',
          }}
        >
          Ghar Wapas Chalo 🏠
        </Link>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
