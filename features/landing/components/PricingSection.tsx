"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Card, Chip, buttonVariants, cn } from "@heroui/react";
import { PLANS } from "../constants/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-champagne/25 px-4 py-20 md:px-6 md:py-28">
      <SectionHeading
        eyebrow="Simple pricing"
        title="One day, one price"
        description="Pay once for your celebration — no subscriptions, no surprises."
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.1}>
            <Card
              className={cn(
                "relative h-full border-border/60 bg-surface",
                plan.popular && "border-accent shadow-lg shadow-rose-900/10"
              )}
            >
              <Card.Content className="flex h-full flex-col p-7">
                {plan.popular && (
                  <Chip
                    color="accent"
                    size="sm"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Most popular
                  </Chip>
                )}
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-3 font-heading text-3xl font-semibold text-accent">
                  {plan.price}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    href="/register"
                    className={buttonVariants({
                      variant: plan.popular ? "primary" : "outline",
                      fullWidth: true,
                    })}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Card.Content>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}