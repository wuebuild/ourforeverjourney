"use client";

import { Card } from "@heroui/react";
import { FEATURES } from "../constants/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 md:px-6 md:py-28">
      <SectionHeading
        eyebrow="Why couples choose us"
        title="Everything your invitation needs"
        description="Everything you need to create the perfect digital wedding invitation — no designer required."
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.1}>
            <Card className="h-full border-border/60 bg-surface/80 transition-shadow hover:shadow-lg hover:shadow-rose-900/5">
              <Card.Content className="flex flex-col items-start gap-4 p-6">
                <span className="rounded-xl bg-blush/70 p-3 text-accent">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </Card.Content>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}