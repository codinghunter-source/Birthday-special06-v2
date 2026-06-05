import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <title>Happy Birthday Antima 🎂❤️</title>
        <meta name="description" content="A premium interactive birthday surprise website for my fiancée Antima, made by Rohit with love." />
      </head>
      <body className="min-h-full flex flex-col bg-[#080312]">
        {children}
      </body>
    </html>
  );
}
