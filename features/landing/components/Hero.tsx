"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { buttonVariants } from "@heroui/react";
import { HERO, SOCIAL_PROOF } from "../constants/content";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Soft gradient backdrop — pure CSS, GPU-friendly */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blush/70 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-champagne/80 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 md:px-6 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center lg:text-left"
        >
          <p className="font-script text-3xl text-rosegold md:text-4xl" aria-hidden>
            {HERO.eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
            {HERO.titleLead}{" "}
            <span className="text-accent italic">{HERO.titleScript}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted lg:mx-0">
            {HERO.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href={HERO.primaryCta.href}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              {HERO.primaryCta.label}
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <div className="flex items-center gap-0.5" aria-label={`${SOCIAL_PROOF.rating} star rating`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rosegold text-rosegold" />
              ))}
            </div>
            <p className="text-sm text-muted">{SOCIAL_PROOF.line}</p>
          </div>
        </motion.div>

        {/* App preview */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex justify-center"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <PhoneMockup src={HERO.appScreenshot} className="rotate-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
