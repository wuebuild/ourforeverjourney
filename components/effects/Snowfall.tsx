"use client";
import { useMemo } from "react";

export default function Snowfall({ count = 20 }: { count?: number }) {
  const flakes = useMemo(
    () => Array.from({ length: count }, (_, i) => i),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {flakes.map((flake) => (
        <span
          key={flake}
          className="snowflake absolute text-white text-xl select-none"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${12 + Math.random() * 18}px`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}