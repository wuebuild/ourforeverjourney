"use client";

import Link from "next/link";
import { Chip, cn } from "@heroui/react";
import { APP_SECTION, type AppStoreBadge } from "../constants/content";
import PhoneMockup from "./PhoneMockup";
import Reveal from "./Reveal";

export default function AppSection() {
  return (
    <section id="app" className="bg-blush/30 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Copy */}
        <Reveal className="text-center lg:text-left">
          <p className="font-script text-3xl text-rosegold" aria-hidden>
            {APP_SECTION.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {APP_SECTION.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted lg:mx-0">
            {APP_SECTION.description}
          </p>

          <ul className="mt-8 space-y-5">
            {APP_SECTION.pillars.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-4 text-left">
                <span className="mt-0.5 shrink-0 rounded-xl bg-surface p-2.5 text-accent shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {APP_SECTION.stores.map((badge) => (
              <StoreBadge key={badge.store} badge={badge} />
            ))}
          </div>
        </Reveal>

        {/* App preview */}
        <Reveal delay={0.15} className="flex justify-center">
          <PhoneMockup className="-rotate-2">
            <MockAppHomeScreen />
          </PhoneMockup>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Store badge — disabled with a "Coming soon" chip until its `href` is set in
 * features/landing/constants/content.ts.
 */
function StoreBadge({ badge }: { badge: AppStoreBadge }) {
  const live = Boolean(badge.href);
  const content = (
    <>
      {badge.store === "app-store" ? <AppleLogo /> : <PlayLogo />}
      <span className="text-left leading-tight">
        <span className="block text-[0.65rem] text-ivory/70">
          {live ? "Download on" : "Soon on"}
        </span>
        <span className="block text-sm font-semibold">{badge.name}</span>
      </span>
    </>
  );
  const baseClass =
    "inline-flex items-center gap-2.5 rounded-xl bg-neutral-900 px-4 py-2.5 text-ivory";

  if (live) {
    return (
      <Link
        href={badge.href!}
        className={cn(baseClass, "transition-opacity hover:opacity-85")}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className="relative inline-flex">
      <span aria-disabled className={cn(baseClass, "cursor-not-allowed opacity-60 select-none")}>
        {content}
      </span>
      <Chip
        color="accent"
        size="sm"
        className="absolute -top-2.5 -right-3 shadow-sm"
      >
        Coming soon
      </Chip>
    </span>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M3.61 1.81a1.5 1.5 0 0 0-.61 1.2v17.98a1.5 1.5 0 0 0 .61 1.2l.09.06L13.79 12.2v-.4L3.7 1.75l-.09.06zm11.5 11.71 2.87 2.87-3.6 2.05a1.5 1.5 0 0 1-1.48.02l-6.83 3.89 9.04-8.83zm4.2-2.99 2.09 1.19c.99.56.99 1.99 0 2.55l-2.09 1.19-3.18-2.46 3.18-2.47zm-13.24-8.4 6.83 3.89a1.5 1.5 0 0 1 1.48.02l3.6 2.05-2.87 2.87-9.04-8.83z" />
    </svg>
  );
}

/** Mock of the mobile app's home screen, shown until real store screenshots exist. */
function MockAppHomeScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-gradient-to-b from-ivory to-blush/50 px-4 pt-10 pb-6">
      <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-accent">
        Our Space
      </p>
      <p className="font-heading text-xl font-semibold leading-tight text-rose-950">
        Hi, love
      </p>
      <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
        <p className="text-[0.65rem] font-semibold text-rose-950">Today in your journey</p>
        <p className="mt-1 text-[0.6rem] text-rose-950/60">Wedding date: 12 Dec 2026</p>
      </div>
      {["Add Memory", "Add Bucket List", "Add Vendor Payment"].map((label) => (
        <div key={label} className="flex items-center gap-2.5 rounded-2xl border border-rose-200/80 bg-white/90 p-2.5">
          <span className="h-7 w-7 rounded-xl bg-blush" />
          <span className="text-[0.65rem] font-semibold text-rose-950">{label}</span>
        </div>
      ))}
      <div className="mt-auto flex gap-2">
        {[
          ["12", "Memories"],
          ["5", "Completed"],
          ["2", "Due soon"],
        ].map(([value, label]) => (
          <div key={label} className="flex-1 rounded-xl bg-white/80 p-2">
            <p className="text-[0.7rem] font-bold text-rose-950">{value}</p>
            <p className="text-[0.5rem] text-rose-950/60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
