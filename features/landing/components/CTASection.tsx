"use client";

import Link from "next/link";
import { buttonVariants, cn } from "@heroui/react";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="px-4 py-20 md:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900 via-rose-800 to-rosegold px-6 py-16 text-center md:py-20">
          <p className="font-script text-3xl text-champagne md:text-4xl" aria-hidden>
            Begin your journey
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-heading text-3xl font-semibold text-ivory md:text-4xl">
            Ready to create your wedding invitation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-rose-100">
            Join thousands of couples making their special day unforgettable with
            stunning digital invitations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "bg-ivory text-rose-900 hover:bg-champagne"
              )}
            >
              Get Started Free
            </Link>
            <Link
              href="#templates"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-ivory/60 text-ivory hover:bg-ivory/10"
              )}
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}