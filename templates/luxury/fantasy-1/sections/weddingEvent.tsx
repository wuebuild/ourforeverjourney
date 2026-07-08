"use client";
import React, { useEffect, useRef } from "react";
import { Event } from "@/shared/types/api";
import { MapPinned } from "lucide-react";

const fmtWeekday = new Intl.DateTimeFormat("en-EN", { weekday: "long" });
const fmtDay = new Intl.DateTimeFormat("id-ID", { day: "2-digit" });
const fmtMonth = new Intl.DateTimeFormat("id-ID", { month: "2-digit" });
const fmtYear = new Intl.DateTimeFormat("id-ID", { year: "numeric" });

export default function WeddingEventCards({
  events,
  className = "",
  bgImage = "https://images.unsplash.com/photo-1523661149972-0bedfd3bd8c5?q=80&w=1200&auto=format&fit=crop",
  theme = ""
}: {
  events: Event[];
  className?: string;
  bgImage?: string;
  theme?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // One-shot animation trigger (no hidden start state)
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18 }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  if (!events?.length) return null;

  return (
    <section className={"w-full " + className}>
      {/* Local animation keyframes (default state remains visible) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes cardIn {
            from { opacity: .001; transform: translateY(16px) scale(.995) }
            to   { opacity: 1;    transform: none }
          }
          .reveal-in {
            animation: cardIn .45s cubic-bezier(.2,.8,.2,1) both;
          }
          @media (prefers-reduced-motion: reduce) {
            .reveal-in { animation: none; }
          }
        `,
        }}
      />
      <div ref={containerRef} className="mx-auto grid max-w-md gap-6 sm:max-w-xl md:max-w-2xl">
        {events.map((ev, i) => (
          <article
            key={i}
            data-card
            // Default: visible. On enter, .reveal-in animates.
            className={`relative overflow-hidden rounded-[24px] ${theme ? theme : 'bg-[rgba(13,23,48,0.9)]'} backdrop-blur-[2px] p-5 shadow-[0_16px_40px_-20px_rgba(0,0,0,.45)] ring-1 ring-white/10`}
          >
            {/* Light foliage texture */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.14] [mask-image:linear-gradient(to_top,transparent,black_20%,black_80%,transparent)]"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Content */}
            <div className="relative grid gap-4 rounded-[18px] p-4 sm:p-6">
              <h3 className="text-center font-serif text-[24px] tracking-[0.2em] text-white/90">
                {ev.title}
              </h3>

              <p className="mt-1 text-center text-[12px] text-white/70">
                The ceremony will be held on:
              </p>

              <DateRow date={ev.date || ''} />

              {ev.time && (
                <p className="text-center font-serif text-[20px] tracking-wide text-white/80">
                  at {ev.time}
                </p>
              )}

              {/* Venue */}
              <div className="mt-2 flex flex-col items-center gap-2 text-center">
                {/* <PinIcon className="h-6 w-6 text-white" /> */}
                <div className="text-[13px] leading-6 text-white/85">
                  <div>📍 Venue:</div>
                  <div className="font-medium text-[16px]">{ev.location}</div>
                  {ev.locationAddress && <div className="text-white/90">{ev.locationAddress}</div>}
                </div>
              </div>

              {/* CTA */}
              {ev.mapUrl && (
                <div className="mt-3 flex justify-center">
                  <a
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#C4AA74] px-5 py-2 text-[13px] font-medium text-[#1B1A17] shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <MapPinned className="h-4 w-4" />
                    OPEN MAPS
                  </a>
                </div>
              )}
            </div>

            {/* Soft ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10" />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------- Date row ---------------------- */
function DateRow({ date }: { date: string | Date }) {
  const d = new Date(date);
  const dayName = fmtWeekday.format(d).toUpperCase();
  const day = fmtDay.format(d);
  const month = fmtMonth.format(d);
  const year = fmtYear.format(d);

  return (
    <div className="text-center text-white">
      <div className="text-[20px] font-serif">
        {dayName} <span className="mx-1">|</span> {day} <span className="mx-1">.</span> {month}{" "}
        <span className="mx-1">.</span> {year}
      </div>
    </div>
  );
}

/* ------------------------------ Icons ------------------------------ */
function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}
function MapIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M15 6l-6 3-6-3v12l6 3 6-3 6 3V9l-6-3zM9 9v9" />
    </svg>
  );
}
