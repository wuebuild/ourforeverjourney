import type { Metadata } from "next";
import { Playfair_Display, Imperial_Script, Figtree } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-imperial-script",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

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
    <html
      lang="en"
      className={`${playfair.variable} ${imperialScript.variable} ${figtree.variable}`}
    >
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}
