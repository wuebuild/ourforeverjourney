"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Chip, buttonVariants } from "@heroui/react";
import { templateCatalog } from "@/templates/catalog";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import PhoneMockup from "./PhoneMockup";

export default function TemplateShowcase() {
  return (
    <section id="templates" className="bg-blush/30 px-4 py-20 md:px-6 md:py-28">
      <SectionHeading
        eyebrow="The collection"
        title="Choose your style"
        description="Cinematic, hand-crafted templates — pick one and make it yours."
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        {templateCatalog.map((tpl, i) => (
          <Reveal key={tpl.id} delay={i * 0.12} className="flex flex-col items-center text-center">
            <PhoneMockup src={null} className="w-56 md:w-64">
              {tpl.previewVideo ? (
                <InViewVideo src={tpl.previewVideo} label={`${tpl.name} template preview`} />
              ) : undefined}
            </PhoneMockup>
            <div className="mt-6 flex items-center gap-2">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {tpl.name}
              </h3>
              <Chip color="accent" size="sm" className="capitalize">
                {tpl.tier}
              </Chip>
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted">{tpl.description}</p>
            {tpl.demoSlug && (
              <Link
                href={`/${tpl.demoSlug}`}
                className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-4`}
              >
                View live demo
              </Link>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <Link
          href="/register"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Start with a template
        </Link>
      </Reveal>
    </section>
  );
}

/** Plays only while visible; downloads nothing until near the viewport. */
function InViewVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="h-full w-full object-cover"
    />
  );
}
