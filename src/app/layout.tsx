import React from "react";
import Script from "next/script";
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
        <meta
          name="description"
          content="A premium interactive birthday surprise website for my fiancée Antima, made by Rohit with love."
        />
      </head>

      <body className="min-h-full flex flex-col bg-[#080312]">
        {children}

        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x2ewt3jbg9");
          `}
        </Script>
      </body>
    </html>
  );
}