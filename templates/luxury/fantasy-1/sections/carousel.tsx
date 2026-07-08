import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";

/** Small helper that makes <img> cheap to render/paint */
function SmartImg({
  src,
  alt,
  className,
  sizes,
  eager = false,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  style?: React.CSSProperties;
}) {
   const isSafari = typeof navigator !== "undefined" && /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
  return (
    <img
      src={`//wsrv.nl/?url=${src}&w=1000`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      className={className}
      // content-visibility avoids layout/paint until scrolled into view
      style={{
        ...(isSafari ? { willChange: "transform", backfaceVisibility: "hidden" }
        : { contentVisibility: "auto", containIntrinsicSize: "600px 800px" }),
        ...style,
      }}
    />
  );
}

export default function WeddingGalleryCarousel({
  images,
  rounded = true,
  showMasonry = true,
  className = "",
  host = "",
  masonry,
}: {
  images: string[];
  rounded?: boolean;
  showMasonry?: boolean;
  className?: string;
  host?: string;
  masonry: string[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState({
    isOpen: false,
    images: images
  });

  const mainAutoplay = useRef(
    Autoplay({ delay: 4000, playOnInit: true, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: false,
      // Slip improves smoothness slightly under load
      // and lets Embla skip some heavy snap math.
      skipSnaps: true,
      containScroll: "trimSnaps",
    },
    [mainAutoplay.current]
  );

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // Only render a small window of slides around the current index
  const VIRTUAL_WINDOW = 2; // current ±2
  const visibleSet = useMemo(() => {
    if (!images?.length) return new Set<number>();
    const set = new Set<number>();
    for (let o = -VIRTUAL_WINDOW; o <= VIRTUAL_WINDOW; o++) {
      const idx = (selectedIndex + o + images.length) % images.length;
      set.add(idx);
    }
    return set;
  }, [selectedIndex, images?.length]);

  // Sync thumbs with main
  const onSelect = useCallback(
    (api?: EmblaCarouselType) => {
      if (!api) return;
      const idx = api.selectedScrollSnap();
      setSelectedIndex(idx);
      thumbsApi?.scrollTo(idx);
    },
    [thumbsApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
      // if (e.key.toLowerCase() === "f") setIsLightboxOpen({
      //   isOpen: true,
      //   images: images
      // });
      if (e.key === "Escape") setIsLightboxOpen({
        isOpen: false,
        images: images
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [emblaApi]);

  // Pause autoplay when the tab isn’t visible (saves work)
  useEffect(() => {
    const onVis = () => {
      if (!emblaApi) return;
      const api = mainAutoplay.current;
      if (document.hidden) api.stop();
      else api.play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [emblaApi]);

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
                  {visibleSet.has(i) ? (
                    <button
                      className="group block w-full focus:outline-none"
                      onClick={() => setIsLightboxOpen({
                        isOpen: true,
                        images: images
                      })}
                      aria-label="Open image in fullscreen"
                    >
                      <div className="aspect-[3/4] sm:aspect-[10/12] w-full overflow-hidden">
                        <SmartImg
                          src={`${host}${src}`}
                          alt={`Gallery ${i + 1}`}
                          eager={i === 0} // only the first one eager-loads
                          sizes="(max-width: 640px) 100vw, 768px"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          style={{ contentVisibility: "visible", containIntrinsicSize: undefined }}
                        />
                      </div>
                    </button>
                  ) : (
                    // lightweight placeholder preserves layout without mounting the <img>
                    <div className="aspect-[3/4] sm:aspect-[10/12] w-full bg-black/5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Subtle gradient edge hint */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/10 to-transparent" />
        </div>

        {/* Thumbnails */}
        <div className="mt-3 embla overflow-hidden" ref={thumbsRef}>
          <div className="embla__container flex">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={[
                  "embla__slide flex-[0_0_auto] mr-2 relative h-20 w-16 sm:h-24 sm:w-20 overflow-hidden",
                  "rounded-xl ring-1 transition",
                  selectedIndex === i
                    ? "ring-rose-400"
                    : "ring-black/10 hover:ring-black/20",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              >
                <SmartImg
                  src={`${host}${src}`}
                  alt={`Thumb ${i + 1}`}
                  sizes="64px"
                  className="h-full w-full object-cover"
                  style={{ contentVisibility: "visible", containIntrinsicSize: undefined }}
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
          <div className="grid grid-cols-2 gap-4">
            {masonry.map((src, i) => (
              <div key={i} className="relative">
                <button
                  onClick={() => {
                    setSelectedIndex(i);
                    setIsLightboxOpen({
                      isOpen: true,
                      images: masonry
                    });
                  }}
                  className="group relative block w-full overflow-hidden rounded-2xl ring-1 ring-black/5"
                >
                  <SmartImg
                    src={`${host}${src}`}
                    alt={`Masonry ${i + 1}`}
                    sizes="(max-width: 640px) 50vw, 600px"
                    className="w-full h-full object-cover"
                    style={{ contentVisibility: "visible", containIntrinsicSize: undefined }}
                  />
                  <span className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {isLightboxOpen.isOpen && (
        <Lightbox
          images={isLightboxOpen.images}
          startIndex={selectedIndex}
          onClose={() => setIsLightboxOpen({
            isOpen: false,
            images: images
          })}
          host={host}
        />
      )}
    </section>
  );
}

export function Lightbox({
  images,
  startIndex = 0,
  host = "",
  onClose,
}: {
  images: string[];
  startIndex?: number;
  host?: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const goPrev = () => setIndex((p) => (p - 1 + images.length) % images.length);
  const goNext = () => setIndex((p) => (p + 1) % images.length);

  // 🔒 prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ⌨️ keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // 💡 close when clicking shadow
  const onShadowClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onShadowClick}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-2 sm:p-6 transition-opacity duration-300"
      aria-modal
      role="dialog"
    >
      {/* ✕ Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-white backdrop-blur hover:bg-white/20"
      >
        Close ✕
      </button>

      {/* ◀ ▶ Navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="z-10 absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
      >
        ◀
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="z-10 absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
      >
        ▶
      </button>

      {/* 🖼️ Image Viewer */}
      <div className="relative w-full h-[80vh] flex items-center justify-center">
        <div className="relative w-[80%] h-[80%]">
          <Image
            alt={`Fullscreen ${index + 1}`}
            src={`${host}${images[index]}`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* 🧭 Counter */}
      <div className="absolute bottom-6 text-center text-sm text-white/80">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}