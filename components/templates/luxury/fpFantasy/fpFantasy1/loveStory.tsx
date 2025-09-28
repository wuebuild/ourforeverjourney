"use client";
import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export type LoveStep = {
  title: string;
  caption?: string;
  date?: string;
  image?: string;
};

export default function LoveStoryOnboarding({
  steps,
  accent = "rose",
  className = "",
}: {
  steps: LoveStep[];
  accent?: string;
  className?: string;
}) {
  const pinRef = useRef<HTMLDivElement>(null);

  // Total scroll distance = steps * viewport height
  const totalVh = Math.max(1, (steps?.length ?? 0)) * 100;

  // Scroll progress across the whole pinned section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"], // start when top reaches top; end when bottom reaches bottom
  });

  // Dynamic Tailwind (safelist these in tailwind.config if accent is dynamic)
  const pillBgClass = useMemo(() => `bg-${accent}-50`, [accent]);
  const pillTextClass = useMemo(() => `text-${accent}-700`, [accent]);
  const pillRingClass = useMemo(() => `ring-${accent}-100`, [accent]);
  const glowClass = useMemo(() => `bg-${accent}-500/10`, [accent]);

  if (!steps?.length) return null;

  return (
    <section className={"relative pb-8 -mb-1" + className}>
      {/* Outer scroller: its height defines how long we stay pinned */}
      <div ref={pinRef} style={{ height: `${totalVh}vh` }}>
        {/* Sticky viewport that stays fixed while we scroll the outer div */}
        <div className="sticky top-0 h-screen">
          <div className="relative mx-auto flex h-full max-w-5xl items-stretch">
            {/* Slides layer (stacked) */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-transparent">
              {steps.map((s, i) => (
                <Slide
                  key={i}
                  index={i}
                  total={steps.length}
                  step={s}
                  progress={scrollYProgress}
                  pillBgClass={pillBgClass}
                  pillTextClass={pillTextClass}
                  pillRingClass={pillRingClass}
                  glowClass={glowClass}
                  accent={accent}
                />
              ))}
            </div>

            {/* Right rail progress (optional) */}
            <aside className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block">
              <ul className="flex flex-col gap-2">
                {steps.map((_, i) => {
                  const segSize = 1 / steps.length;
                  const center = (i + 0.5) * segSize;
                  const scale = useTransform(
                    scrollYProgress,
                    [center - segSize / 3, center, center + segSize / 3],
                    [0.6, 1, 0.6]
                  );
                  return (
                    <motion.li key={i} style={{ scale }}>
                      <span className="block h-2 w-2 rounded-full bg-gray-300 shadow-[0_0_0_2px_rgba(0,0,0,0.06)]" />
                    </motion.li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------- Single pinned slide --------------------- */
function Slide({
  index,
  total,
  step,
  progress,
  pillBgClass,
  pillTextClass,
  pillRingClass,
  glowClass,
  accent,
}: {
  index: number;
  total: number;
  step: LoveStep;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  pillBgClass: string;
  pillTextClass: string;
  pillRingClass: string;
  glowClass: string;
  accent: string;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = (index + 1) * seg;

  // ---- Opacity/Y curves with special handling for first & last slides ----
  // First slide: visible at 0, then fades out near the end of its segment.
  const isFirst = index === 0;
  // Last slide: fades in near the start of its segment and stays visible at 1.
  const isLast = index === total - 1;

  let opacity: any;
  let y: any;

  if (isFirst) {
    // Keep visible at very start (progress = 0)
    opacity = useTransform(
      progress,
      [0, seg * 0.5, seg * 0.8, seg],
      [1, 1, 0.6, 0] // fade out toward end of first segment
    );
    y = useTransform(progress, [0, seg * 0.5, seg], [0, 0, -24]);
  } else if (isLast) {
    // Fade in toward last segment and remain visible at 1
    opacity = useTransform(
      progress,
      [1 - seg, 1 - seg * 0.8, 1 - seg * 0.2, 1],
      [0, 0.6, 1, 1]
    );
    y = useTransform(progress, [1 - seg, 1], [24, 0]);
  } else {
    // Middle slides: fade/translate in their own segment
    opacity = useTransform(
      progress,
      [start, start + seg * 0.25, end - seg * 0.25, end],
      [0, 1, 1, 0]
    );
    y = useTransform(progress, [start, start + seg * 0.25, end], [24, 0, -24]);
  }

  return (
    <motion.section
      className="absolute inset-0 grid grid-rows-[auto_1fr_auto] p-4 sm:p-6"
      style={{ opacity, y }}
    >
      {/* No forced white background, stays transparent at very start & end */}
      {/* Top meta */}
      <div className="flex items-center justify-between">
        <span
          className={[
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
            pillBgClass,
            pillTextClass,
            pillRingClass,
          ].join(" ")}
        >
          Chapter {index + 1} of {total}
        </span>
        {step.date && <span className="text-xs text-gray-500">{step.date}</span>}
      </div>

      {/* Content */}
      <div className="mt-6 grid items-center gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-imperial text-[42px] tracking-tight text-gray-900">{step.title}</h3>
          {step.caption && <p className="mt-3 text-gray-600 leading-relaxed">{step.caption}</p>}
        </div>

        <div className="relative">
          <div className={["absolute -inset-2 rounded-3xl blur-2xl", glowClass].join(" ")} aria-hidden />
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5">
            <img
              src={
                step.image ??
                "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
              }
              alt={step.title}
              className="w-full max-h-[56vh] object-cover"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Bottom helper */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
        <MouseWheelIcon className={`h-4 w-4 text-${accent}-500`} />
        <span>Scroll to continue</span>
      </div>
    </motion.section>
  );
}

/* ------------------------------ Icons ------------------------------ */
function MouseWheelIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="7" y="2" width="10" height="20" rx="5" />
      <line x1="12" y1="6" x2="12" y2="10" />
    </svg>
  );
}
