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
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
