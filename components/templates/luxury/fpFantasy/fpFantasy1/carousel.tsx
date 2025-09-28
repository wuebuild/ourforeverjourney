import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";

export default function WeddingGalleryCarousel({
  images,
  rounded = true,
  showMasonry = true,
  className = "",
  host = "",
  masonry
}: {
  images: string[];
  rounded?: boolean;
  showMasonry?: boolean;
  className?: string;
  host?: string;
  masonry: string[]
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const mainAutoplay = useRef(
    Autoplay({ delay: 4000, playOnInit: true, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: false },
    [mainAutoplay.current]
  );
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // Sync thumbs with main
  const onSelect = useCallback((api?: EmblaCarouselType) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    thumbsApi?.scrollTo(api.selectedScrollSnap());
  }, [thumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
      if (e.key.toLowerCase() === "f") setIsLightboxOpen(true);
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [emblaApi]);

  // Guard
  if (!images || images.length === 0) return null;

  return (
    <section className={"w-full " + className}>
      {/* HERO + THUMBS */}
      <div className="mx-auto max-w-5xl">
        <div
          className={[
            "relative overflow-hidden bg-white/5 ring-1 ring-black/5",
            rounded ? "rounded-2xl" : "rounded-none",
            "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)]",
          ].join(" ")}
        >
          {/* Main carousel */}
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {images.map((src, i) => (
                <div
                  className="embla__slide relative min-w-0 flex-[0_0_100%]"
                  key={i}
                >
                  <button
                    className="group block w-full focus:outline-none"
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label="Open image in fullscreen"
                  >
                    <div className="aspect-[3/4] sm:aspect-[10/12] w-full overflow-hidden">
                      <img
                        src={`${host}${src}`}
                        alt={`Gallery ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Subtle gradient edge hint */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent"/>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/10 to-transparent"/>

          {/* Controls */}
          {/* <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-3 sm:px-4">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full bg-white/80 px-3 py-2 text-gray-900 backdrop-blur transition hover:bg-white"
            >
              ◀
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full bg-white/80 px-3 py-2 text-gray-900 backdrop-blur transition hover:bg-white"
            >
              ▶
            </button>
          </div> */}
        </div>

        {/* src={`${host}${src}`} */}
        {/* Thumbnails */}
        <div className="mt-3 embla overflow-hidden" ref={thumbsRef}>
            <div className="embla__container flex">
                {images.map((src, i) => (
                <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={[
                    // Each thumb is a slide with fixed basis so Embla can measure correctly
                    "embla__slide flex-[0_0_auto] mr-2 relative h-20 w-16 sm:h-24 sm:w-20 overflow-hidden",
                    "rounded-xl ring-1 transition",
                    selectedIndex === i
                        ? "ring-rose-400"
                        : "ring-black/10 hover:ring-black/20",
                    ].join(" ")}
                    aria-label={`Go to slide ${i + 1}`}
                >
                    <img
                        src={`${host}${src}`}
                        alt={`Thumb ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                    {selectedIndex === i && (
                        <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-inset ring-rose-400/60" />
                    )}
                </button>
                ))}
            </div>
        </div>
      </div>

      {/* Optional Masonry Section */}
      {showMasonry && (
        <div className="mx-auto mt-10 max-w-6xl">
            {/* 2-column grid (1 col on xs, 2 cols from sm+) */}
            <div className="grid grid-cols-2 gap-4">
            {masonry.map((src, i) => (
                <div key={i} className="relative">
                <button
                    onClick={() => {
                    setSelectedIndex(i);
                    setIsLightboxOpen(true);
                    }}
                    className="group relative block w-full overflow-hidden rounded-2xl ring-1 ring-black/5"
                >
                    <img
                    src={`${host}${src}`}
                    alt={`Masonry ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    />

                    {/* dark overlay on hover */}
                    <span className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </button>
                </div>
            ))}
            </div>
        </div>
        )}

      {/* LIGHTBOX */}
      {isLightboxOpen && (
        <Lightbox
          images={images}
          startIndex={selectedIndex}
          onClose={() => setIsLightboxOpen(false)}
          host={host}
        />)
      }
    </section>
  );
}

/* ------------------------- Lightbox Component ------------------------- */
function Lightbox({
  images,
  startIndex = 0,
  onClose,
  host,
}: {
  images: string[];
  startIndex?: number;
  host?: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const backdropRef = useRef<HTMLDivElement>(null);

  const goPrev = () => setIndex((p) => (p - 1 + images.length) % images.length);
  const goNext = () => setIndex((p) => (p + 1) % images.length);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  // Close when clicking the shadow (but not the image)
  const onShadowClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onShadowClick}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      aria-modal
      role="dialog"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-white backdrop-blur hover:bg-white/20"
      >
        Close ✕
      </button>

      <div className="relative w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            className="rounded-full bg-white/10 px-3 py-2 text-white backdrop-blur transition hover:bg-white/20"
          >
            ◀
          </button>
          <div className="mx-3 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img
              src={`${host}${images[index]}`}
              alt={`Fullscreen ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
          <button
            onClick={goNext}
            className="rounded-full bg-white/10 px-3 py-2 text-white backdrop-blur transition hover:bg-white/20"
          >
            ▶
          </button>
        </div>
        <div className="mt-3 text-center text-sm text-white/70">
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}