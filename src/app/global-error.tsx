'use client'; // Error boundaries must be Client Components

import React from 'react';

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: '#080312',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'sans-serif',
          margin: 0,
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Oops! Kuch Toot Gaya 😅</h2>
        <p style={{ marginBottom: 24, color: 'rgba(200,150,255,0.7)', fontSize: 14 }}>
          Ek chhoti si technical problem — dobara try karo!
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #9333ea, #ec4899)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Dobara Try Karo 🔄
        </button>
      </body>
    </html>
  );
}
