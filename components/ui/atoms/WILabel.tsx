import React from "react";
import {cn} from "@/lib/utils";
import { Playfair_Display, Geist, Poppins } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-heading",
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["400","600"],
  variable: "--font-body",
});

const scriptFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

type LabelProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color? : "pink" | "gray" | "purple" | "white";
  bgColor?: "transparent" | "pink" | "gray" | "purple";
  font?: "heading" | "script" | "body"; // new font option
  className?: string;
};

export default function WILabel({
  children,
  size = "md",
  color = "pink",
  bgColor = "transparent",
  font = "body", // default to body font
  className = "",
}: LabelProps) {
        
    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-lg px-4 py-1.5",
    } as const;

    const colorClasses = {
        pink: "text-pink-800",
        gray: "text-gray-800",
        purple: "text-purple-800",
        white: "text-white-800"
    } as const;

    const bgColorClasses = {
        transparent: "bg-transparent",
        pink: "bg-pink-100 text-pink-800",
        gray: "bg-gray-100 text-gray-800",
        purple: "bg-purple-100 text-purple-800",
    } as const;

    const fontClasses = {
        heading: headingFont.className,
        script: scriptFont.className,
        body: bodyFont.className,
    } as const;

    return (
        <span
        className={cn(
            "inline-block rounded-full font-semibold",
            sizeClasses[size],
            colorClasses[color],
            bgColorClasses[bgColor],
            fontClasses[font],
            className
        )}
        >
        {children}
        </span>
    );
}