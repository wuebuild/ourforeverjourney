import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@heroui/react";

type PhoneMockupProps = {
  /** Screenshot to display; falls back to `children`, then to a built-in mock screen. */
  src?: string | null;
  alt?: string;
  children?: ReactNode;
  className?: string;
};

/** CSS-built phone frame used by the hero and template showcase. */
export default function PhoneMockup({
  src,
  alt = "Our Forever Journey app preview",
  children,
  className,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-64 rounded-[2.6rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl shadow-rose-900/20 md:w-72",
        className
      )}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-ivory">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 18rem, 16rem"
            className="rounded-[2rem] object-cover"
            priority
          />
        ) : (
          children ?? <MockInvitationScreen />
        )}
      </div>
    </div>
  );
}

/** Placeholder screen shown until a real app screenshot is provided. */
function MockInvitationScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-between bg-gradient-to-b from-ivory via-blush/60 to-champagne px-6 py-10 text-center">
      <p className="text-[0.6rem] uppercase tracking-[0.35em] text-rose-900/60">
        The Wedding Of
      </p>
      <div>
        <p className="font-script text-5xl leading-tight text-rose-900">
          Aiden <span className="text-rosegold">&</span> Cindy
        </p>
        <p className="mt-4 font-heading text-xs tracking-[0.25em] text-rose-900/70">
          12 · 12 · 2026
        </p>
      </div>
      <div className="w-full space-y-3">
        <div className="rounded-full bg-rose-900 px-4 py-2.5 text-xs font-medium text-ivory">
          Open Invitation
        </div>
        <p className="text-[0.6rem] text-rose-900/50">
          #OurForeverJourney
        </p>
      </div>
    </div>
  );
}
