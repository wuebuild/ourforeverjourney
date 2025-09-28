import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Forever Journey",
  description: "We follow your journey",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/fairytale-video.mp4"
          type="video/mp4"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
