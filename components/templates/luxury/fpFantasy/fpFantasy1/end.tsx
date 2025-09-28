"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { JSX } from "react";

/**
 * WeddingInviteHeroCard
 * -------------------------------------------------------------
 * Inspired by your reference: arched hero image, celestial/navy panel,
 * names, blessing message, and footer with social links.
 *
 * Drop-in for Next.js/React. Uses Tailwind only.
 */

export default function WeddingInviteEndingCard({
  couple = "",
  message = `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restunya untuk pernikahan kami.\n\nAtas doa & restunya,\nkami ucapkan terima kasih.`,
  heroImages,
  socials = [
    { label: "Website", href: "https://ourforeverjourney.com", icon: GlobeIcon },
    { label: "Instagram", href: "#", icon: InstagramIcon },
  ],
  className = "",
  bgImage
}: {
  couple?: string;
  message?: string;
  heroImages?: string[]; // absolute or /public path
  socials?: { label: string; href: string; icon: (p: IconProps) => JSX.Element }[];
  className?: string;
  bgImage?: string;
}) {
    const autoplayOptions = { speed: 1, stopOnInteraction: true } 
    const [emblaRef] = useEmblaCarousel({ axis:'y', duration: 50, loop: true, slidesToScroll: 1 }, [Autoplay(autoplayOptions)])

  return (
    <section className={"w-full flex justify-center py-6 sm:py-10 " + className}>
      <div className="max-w-[420px] w-full">
        {/* Card shell */}
        <div className="relative rounded-[28px] bg-[#F6EEDF] p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
          {/* Inner navy panel with subtle star texture */}
          <div className="relative rounded-[22px] pb-40 bg-[radial-gradient(80%_60%_at_50%_0%,#18233A_0%,#0D1730_40%,#0B1327_100%)] p-3 ring-1 ring-white/10 overflow-hidden">
            {/* Decorative foliage bg at the bottom (optional) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]"
              style={{
                backgroundImage: bgImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Arched hero frame */}
            <div className="relative mx-auto mt-2 w-[88%] overflow-hidden rounded-t-[110px] rounded-b-[14px] bg-white/10 p-2 ring-2 ring-white backdrop-blur-[1px]">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-t-[100px] rounded-b-[10px] ring-2 ring-white">
              {
                heroImages &&
                <div className="embla h-[400px] overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex flex-col h-[400px]">
                        {heroImages.map((slide, index) => (
                            <div
                                className="embla__slide relative flex-[0_0_100%] h-full w-full"
                                key={index}
                            >
                                <Image
                                    src={`https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${slide}`}
                                    alt="Fairytale Gallery"
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
              }
              {
                !heroImages &&
                <img
                  src={"https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop"}
                  alt="Couple"
                  className="h-full w-full object-cover"
                />
              }
              </div>
            </div>

            {/* Names */}
            <h1 className="mt-5 text-center font-imperial text-3xl tracking-wide text-white drop-shadow-sm">
              {couple}
            </h1>

            {/* Blessing / intro text */}
            <p className="mx-auto mt-3 max-w-[85%] whitespace-pre-line text-center text-[13px] leading-6 text-white">
              {message}
            </p>

            {/* Inset panel shadow like your reference */}
            <div className="absolute inset-x-3 bottom-3 top-24 rounded-[18px] shadow-[inset_0_-40px_60px_-30px_rgba(0,0,0,0.45)] pointer-events-none" />
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-4 py-6">
            <p className="text-center text-[12px] italic text-gray-700">
              Made with love by <span className="font-medium">ourforeverjourney.com</span>
              <br /> visit our instagram & website below :
            </p>

            <div className="flex items-center gap-5">
              {socials.map(({ label, href, icon: Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-900 ring-1 ring-black/10 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Icon className="h-6 w-6 transition group-hover:opacity-80" />
                </a>
              ))}
            </div>
          </div>

          {/* Floating assistant button (bottom-left) */}
          {/* <button
            aria-label="Assistant"
            className="absolute -bottom-5 left-4 grid h-12 w-12 place-items-center rounded-full bg-[#0B1327] text-white ring-4 ring-[#F6EEDF] shadow-lg"
          >
            <SparkleIcon className="h-6 w-6" />
          </button> */}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Icons (no external deps) ---------------- */
export type IconProps = { className?: string };
function GlobeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.9 2.5 14.1 0 18m6.5-15.6C17.6 7.5 16 9 12 9s-5.6-1.5-6.5-4.6m13 15.2C17.6 16.5 16 15 12 15s-5.6 1.5-6.5 4.6" />
    </svg>
  );
}
function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function SparkleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.1 4.8L19 9l-4.9 2.2L12 16l-2.1-4.8L5 9l4.9-2.2L12 2zm7 9l1.2 2.7L23 15l-2.8 1.3L19 19l-1.2-2.7L15 15l2.8-1.3L19 11zM4 13l1 2.2L7 16l-2 1-1 2-1-2-2-1 2-0.8L4 13z" />
    </svg>
  );
}
