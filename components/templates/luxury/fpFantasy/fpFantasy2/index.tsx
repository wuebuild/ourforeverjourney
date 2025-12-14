"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { Play, Pause, CalendarClockIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import background from "../fpFantasy2/assets/background.jpg";
import bg_1 from "../fpFantasy2/assets/bg_1.jpg";
import bg_2 from "../fpFantasy2/assets/bg_2.jpg";
import bg_cream_1 from "../fpFantasy2/assets/bg-cream-1.jpg";

import type { Couple, CoupleInfo } from "@/types/invitation";
import WeddingGiftCard from "../fpFantasy1/gift";
import moment from "moment";
import WILabel from "@/components/ui/atoms/WILabel";
import LoveStoryOnboarding from "../fpFantasy1/loveStory";
import WeddingGalleryCarousel from "../fpFantasy1/carousel";
import RSVPCard from "../fpFantasy1/rsvp";
import BestWishesCard from "../fpFantasy1/wishes";
import WeddingInviteEndingCard from "../fpFantasy1/end";
import WeddingEventCards from "../fpFantasy1/weddingEvent";

interface DiffTime {
  ds: number;
  hs: number;
  ms: number;
  ss: number;
}

function formatIDDate(isoOrStr?: string) {
  if (!isoOrStr) return "TBD";
  const d = new Date(isoOrStr);
  if (isNaN(d.getTime())) return "TBD";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(d);
}

function getCountdownDiff(toISO?: string): DiffTime {
  const target = toISO ? new Date(toISO).getTime() : Date.now();
  const delta = Math.max(0, target - Date.now());
  const ds = Math.floor(delta / 86400000);
  const hs = Math.floor((delta % 86400000) / 3600000);
  const ms = Math.floor((delta % 3600000) / 60000);
  const ss = Math.floor((delta % 60000) / 1000);
  return { ds, hs, ms, ss };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function pickPrimaryEvent(data: CoupleInfo) {
  const ev: any = data.events?.[0] ?? {};

  const dateISO = ev.dateISO || ev.date || data.dateISO || data.date;
  const venue = ev.venue || data.title || "Venue TBD";
  const address = ev.address || (data as any).location || "Address TBD";
  const mapsUrl = ev.mapUrl || (data as any).mapUrl || "";

  let dateText = "TBD";
  let timeText = "TBD";
  if (dateISO) {
    const d = new Date(dateISO);
    if (!isNaN(d.getTime())) {
      const fmtDate = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      });
      dateText = fmtDate.format(d);
      timeText =
        ev.time ||
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }).format(d) + " WIB";
    }
  }

  return { dateISO, venue, address, mapsUrl, dateText, timeText };
}

function buildGoogleCalLink(
  summary: string,
  startISO?: string,
  durationHours = 2,
  location = "",
  details = ""
) {
  const start = startISO ? new Date(startISO) : new Date();
  const end = new Date(start.getTime() + durationHours * 3600000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const text = encodeURIComponent(summary);
  const dates = `${fmt(start)}/${fmt(end)}`;
  const loc = encodeURIComponent(location);
  const det = encodeURIComponent(details);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${det}&location=${loc}`;
}


// https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/uploads/aris_dennis-fajar_hidayani/File_16.webp
const cover = [
  "uploads/aris_dennis-fajar_hidayani/File_17.webp",
  "uploads/aris_dennis-fajar_hidayani/File_21.webp",
  "uploads/aris_dennis-fajar_hidayani/File_4.webp",
]
const quotesImages = [
  "uploads/aris_dennis-fajar_hidayani/File_16.webp",
]
const galleryChapter = [
  "uploads/aris_dennis-fajar_hidayani/File_23.webp",
  "uploads/aris_dennis-fajar_hidayani/File_15.webp",
  "uploads/aris_dennis-fajar_hidayani/File_21.webp",
]
const galleries = [
  "uploads/aris_dennis-fajar_hidayani/File_23.webp",
  "uploads/aris_dennis-fajar_hidayani/File_15.webp",
  "uploads/aris_dennis-fajar_hidayani/File_21.webp",
]
const images = [
  "uploads/aris_dennis-fajar_hidayani/File_16.webp",
  "uploads/aris_dennis-fajar_hidayani/File_17.webp",
  "uploads/aris_dennis-fajar_hidayani/File_18.webp",
  "uploads/aris_dennis-fajar_hidayani/File_19.webp",
  "uploads/aris_dennis-fajar_hidayani/File_20.webp",
  "uploads/aris_dennis-fajar_hidayani/File_21.webp",
  "uploads/aris_dennis-fajar_hidayani/File_22.webp",
  "uploads/aris_dennis-fajar_hidayani/File_23.webp",
  "uploads/aris_dennis-fajar_hidayani/File_24.webp",
  "uploads/aris_dennis-fajar_hidayani/File_25.webp",
  "uploads/aris_dennis-fajar_hidayani/File_4.webp",
  "uploads/aris_dennis-fajar_hidayani/File_5.webp",
  "uploads/aris_dennis-fajar_hidayani/File_6.webp",
  "uploads/aris_dennis-fajar_hidayani/File_7.webp",
  "uploads/aris_dennis-fajar_hidayani/File_8.webp",
  "uploads/aris_dennis-fajar_hidayani/File_9.webp",
  "uploads/aris_dennis-fajar_hidayani/File_10.webp",
  "uploads/aris_dennis-fajar_hidayani/File_11.webp",
  "uploads/aris_dennis-fajar_hidayani/File_12.webp",
  "uploads/aris_dennis-fajar_hidayani/File_13.webp",
  "uploads/aris_dennis-fajar_hidayani/File_14.webp",
  "uploads/aris_dennis-fajar_hidayani/File_15.webp",
]
const masonry = [
  "uploads/aris_dennis-fajar_hidayani/File_17.webp",
  "uploads/aris_dennis-fajar_hidayani/File_16.webp",
  "uploads/aris_dennis-fajar_hidayani/File_18.webp",
  // "uploads/aris_dennis-fajar_hidayani/File_19.webp",
  // "uploads/aris_dennis-fajar_hidayani/File_20.webp",
  // "uploads/aris_dennis-fajar_hidayani/File_21.webp",
  "uploads/aris_dennis-fajar_hidayani/File_22.webp",
  "uploads/aris_dennis-fajar_hidayani/File_24.webp",
  "uploads/aris_dennis-fajar_hidayani/File_25.webp",
  "uploads/aris_dennis-fajar_hidayani/File_23.webp",
  "uploads/aris_dennis-fajar_hidayani/File_6.webp",
  "uploads/aris_dennis-fajar_hidayani/File_7.webp",
  "uploads/aris_dennis-fajar_hidayani/File_8.webp",
  // "uploads/aris_dennis-fajar_hidayani/File_9.webp",
  "uploads/aris_dennis-fajar_hidayani/File_10.webp",
  "uploads/aris_dennis-fajar_hidayani/File_11.webp",
  "uploads/aris_dennis-fajar_hidayani/File_12.webp",
  "uploads/aris_dennis-fajar_hidayani/File_13.webp",
  "uploads/aris_dennis-fajar_hidayani/File_14.webp",
  "uploads/aris_dennis-fajar_hidayani/File_15.webp",
]


export default function FPFantasy2({ data }: { data: CoupleInfo }) {
  const [openInvitation, setOpenInvitation] = useState(false);
  const formattedDate = formatIDDate(data.dateISO || data.date);

  const heroImage = background;

  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row bg-[#0f172a]">
      {/* Left: hero on desktop (Istanbul dusk vibes) */}
      <div className="hidden md:block overflow-hidden md:w-2/3 md:max-w-[calc(100vw-480px)] md:h-[100vh] sticky top-0">
        <div className="relative w-full h-full">
          <Image
            src={heroImage}
            alt={data.coupleString || "Wedding hero"}
            fill
            priority
            className="object-cover"
          />
          {/* Deep twilight overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-black/90" />
          {/* Warm sand mist at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f5f0e4]/90 via-[#f5f0e4]/40 to-transparent" />

          <div className="absolute bottom-16 left-14 text-white drop-shadow max-w-lg">
            <p className="uppercase text-[11px] tracking-[0.28em] mb-1 text-amber-200/90">
              {data.secondTitle || "Wedding in Turkiye"}
            </p>
            <h1 className="text-4xl md:text-5xl font-imperial leading-tight">
              {data.coupleString}
            </h1>
            <p className="mt-3 text-sm text-amber-100/90">{formattedDate}</p>
            {(data as any).location && (
              <p className="mt-1 text-xs text-amber-100/80">
                {(data as any).location}
              </p>
            )}
            {data.quote && (
              <p className="mt-4 text-sm text-amber-100/90 italic border-l border-amber-200/50 pl-3">
                “{data.quote}”
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right: cover / body card column */}
      <div className="md:w-[480px] w-full bg-[#f5f0e4] border-l border-[#e1d3c0]">
        <AnimatePresence mode="wait">
          {!openInvitation && (
            <motion.div
              key="cover"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <InvitationCover
                title={data.title}
                date={data.dateISO || data.date || ""}
                coupleString={data.coupleString || ""}
                heroImage={data.coverImage}
                setOpenInvitation={setOpenInvitation}
              />
            </motion.div>
          )}

          {openInvitation && (
            <motion.div
              key="body"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <InvitationBody data={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function InvitationCover({
  setOpenInvitation,
  title,
  date,
  coupleString,
  heroImage,
}: {
  setOpenInvitation: Dispatch<SetStateAction<boolean>>;
  title: string;
  date: string;
  coupleString: string;
  heroImage: string;
}) {
  const formattedDate = formatIDDate(date);
  const params = useSearchParams();
  const to = params.get("to") || "";
  const invited = to;

  const [diff, setDiff] = useState<DiffTime>(() => getCountdownDiff(date));
  useEffect(() => {
    const id = setInterval(() => setDiff(getCountdownDiff(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#0b1220] text-white overflow-hidden">
      {/* Background: blurred hero + tile-like overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Cover"
          fill
          className="object-cover blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/90" />
        {/* color blobs as subtle “tiles” */}
        <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_0_0,#facc15_0,transparent_40%),radial-gradient(circle_at_100%_0,#f97316_0,transparent_40%),radial-gradient(circle_at_0_100%,#38bdf8_0,transparent_40%),radial-gradient(circle_at_100%_100%,#22c55e_0,transparent_40%)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto text-center px-7">
        {/* Top pill */}
        <div className="inline-flex items-center justify-center rounded-full border border-amber-200/50 bg-black/30 px-4 py-1 text-[10px] uppercase tracking-[0.28em] mb-4 text-amber-100">
          {title || "Wedding Invitation"}
        </div>

        {/* Names */}
        <h2 className="text-3xl md:text-4xl font-imperial tracking-[0.12em]">
          {coupleString || "Bride & Groom"}
        </h2>
        <p className="mt-2 text-xs text-amber-100/90">{formattedDate}</p>

        {/* Greeting */}
        <div className="mt-8 text-sm text-amber-100/90">
          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-200/90">
            To our honoured guest
          </p>
          <p className="mt-3 text-[24px] font-serif">
            {invited || "Dear Guest"}
          </p>
          <p className="mt-2 text-[13px] text-amber-100/80">
            With hearts full of joy, we invite you to share an evening in the
            warm spirit of Türkiye, surrounded by family, friends, and prayers.
          </p>
        </div>

        {/* Countdown */}
        {/* <div className="mt-6 flex justify-center">
          <div className="grid grid-cols-4 gap-3 text-center text-amber-50 text-[10px]">
            {[
              { label: "Days", value: diff.ds }, // Days
              { label: "Hours", value: diff.hs }, // Hours
              { label: "Minutes", value: diff.ms }, // Minutes
              { label: "Seconds", value: diff.ss }, // Seconds
            ].map((u, i) => (
              <div key={i}>
                <div className="rounded-md bg-black/40 border border-amber-200/40 px-2 py-1">
                  <span className="font-semibold tabular-nums text-sm">
                    {u.label === "Days" ? u.value : pad2(u.value)}
                  </span>
                </div>
                <span className="uppercase tracking-[0.18em]">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Button */}
        <motion.button
          onClick={() => setOpenInvitation(true)}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-300 text-[#1f2933] text-sm font-medium shadow-[0_15px_40px_-20px_rgba(0,0,0,0.8)] hover:bg-amber-200"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1f2933] text-amber-200 text-xs">
            ✨
          </span>
          Open Invitation
        </motion.button>
      </div>
    </div>
  );
}

function InvitationBody({ data }: { data: CoupleInfo }) {
  const params = useSearchParams();
  const to = params.get("to") || "";
  const invited = to;

  const [ended, setEnded] = useState(false)
  const [start, setStart] = useState(false)

  const { dateText, timeText, venue, address } = pickPrimaryEvent(data);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement?.addEventListener("playing", () => {
      setStart(true)
    });
    return () => {
      if (videoElement) {
        videoElement?.removeEventListener("playing", () => {
          setStart(true)
        });
      }
    };
  }, [])

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const CUT_AT = 8; // seconds
    const onTime = () => {
      if (v.currentTime >= CUT_AT) {
        v.pause();
        setEnded(true);
      }
    };

    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e4] text-[#1f2933]">
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-[#eadfd2]">
        <div className="relative w-full h-screen">
          {/* <Image
            src={bg_1}
            alt="Couple"
            fill
            className="object-cover"
          /> */}
          {/* Carousel */}
          <div className="relative w-full h-screen overflow-hidden">
            <motion.video
              ref={videoRef}
              autoPlay
              muted
              loop={false}
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setEnded(true)}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: ended ? 0 : 1, scale: ended ? 1.02 : 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <source src="/videos/turkiyefantasy-video.mp4" type="video/mp4" />
            </motion.video>

            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: ended ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <CarouselandInfo data={data} />
            </motion.div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f5f0e4] to-transparent" />
        </div>
      </section>

      {/* Event details + countdown */}
      <InformationAndCountdown data={data} />

      <div style={{
        backgroundImage: `url(${background.src})`
      }}>
        <div className="px-6 sm:px-12 py-6 sm:py-6 pb-0">
          <WeddingEventCards events={data.events} theme="bg-[#020617]" />
        </div>
        {/* Couple section */}
        <div className="px-6 sm:px-12 py-6 sm:py-6 pb-0">
          <GroomAndBride data={data.couple} />
        </div>
      </div>

      <div style={{ backgroundImage: `url(${bg_cream_1.src})` }}>
        <LoveStoryOnboarding
          accent="rose"
          steps={[
            {
              title: "First Hello",
              caption: `It all began with something simple a glance, a smile, a feeling that felt so familiar.
                In that fleeting moment, the world seemed to pause.
                That very first hello became the beginning of our journey.`,
              date: "",
              image: `https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${galleryChapter[0]}`,
            },
            {
              title: "When Forever Feels Right",
              caption: `There wasn’t a grand moment,
                just a love that kept growing stronger every day.
                In every laugh and quiet moment,
                we realized home is wherever our love resides.`,
              date: "",
              image: `https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${galleryChapter[1]}`,
            },
            {
              title: "The Promise",
              caption: `And now, we stand surrounded by love and blessings two souls, one promise.
                For today, tomorrow, and forever.`,
              date: "",
              image: `https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${galleryChapter[2]}`,
            },
          ]}
        />
      </div>

      {/* Gifts */}
      {/* <GiftSection gifts={data.gifts as any[]} /> */}
      <section style={{ backgroundImage: `url(${bg_cream_1.src})` }} className="px-6 pt-6"><WeddingGiftCard accounts={data.gifts} theme={'pink'} defaultOpen={true} /></section>

      <div className="px-6 sm:px-12 py-6 sm:py-6 mt-8">
        <h1 className="py-6 text-4xl md:text-5xl font-imperial text-black font-bold">{"Our Gallery"}</h1>
        <WeddingGalleryCarousel
          images={images} host={'https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/'} rounded={false}
          masonry={masonry}
        />
      </div>

      <div className="px-6 sm:px-12 py-6 sm:py-6">
        {
          !data.hideRSVP &&
          <>
            <div className="p-4" />
            <RSVPCard
              slug={data.slug}
              guestName={invited}
              rsvpMax={data.rsvpMax}
              theme="pink"
              onSubmit={async (data) => {
                // TODO: send to your endpoint
                console.log("RSVP received:", data);
              }}
            />
          </>
        }
      </div>

      <div className="px-6 sm:px-12 py-6 sm:py-6">
        <BestWishesCard slug={data.slug} theme="pink" />
      </div>
      <div>
        {/* style={{ backgroundImage: `url(${bg_cream_1.src})` }} */}
        <WeddingInviteEndingCard heroImages={galleries} theme="pink" couple={data.coupleString} bgImage={`url(${bg_1.src})`} />
      </div>

      <MusicPlayerFAB />
    </div>
  );
}

function InformationAndCountdown({ data }: { data: CoupleInfo }) {
  const [diff, setDiff] = useState(getDiff());
  const autoplayOptions = { speed: 1, stopOnInteraction: true }
  const [emblaRef] = useEmblaCarousel({ axis: 'y', duration: 50, loop: true, slidesToScroll: 1, watchDrag: false, watchFocus: false }, [Autoplay(autoplayOptions)])

  const [slides, setSlides] = useState<string[]>(quotesImages)

  function getDiff() {
    const d = new Date(data.date || '').getTime() - Date.now();
    return {
      ds: Math.max(0, Math.floor(d / 86400000)),
      hs: Math.max(0, Math.floor((d % 86400000) / 3600000)),
      ms: Math.max(0, Math.floor((d % 3600000) / 60000)),
      ss: Math.max(0, Math.floor((d % 60000) / 1000)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setDiff(getDiff()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="min-h-screen px-6 py-6 sm:px-12 sm:py-12 text-center relative w-full bg-transparent">
      <div className="bg-[#B23A48] relative w-full min-h-screen rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
        {/* Floating Image inside box */}
        <div className="w-full max-w-2xl overflow-hidden rounded-t-2xl">
          {/* <img
              src={`https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/uploads/irawan-cindy/1758088772376-SAM_5232.jpg`}
              alt="Couple"
              className="w-full object-cover"
            /> */}
          {/* Carousel */}
          <div className="embla h-[400px] overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex flex-col h-[500px]">
              {slides.map((slide, index) => (
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
        </div>
        <div className="p-8">
          <div className="text-white">
            “And among His signs is that He created for you spouses from among yourselves,
          </div>
          <div className="mt-4 text-white">
            so that you may find tranquility in them; and He placed between you affection and mercy.
          </div>
          <div className="mt-4 text-white">
            Indeed, in that are signs for people who reflect.”
          </div>
          <div className="mt-8 text-white">
            (Qur’an, Ar-Rum 30:21)
          </div>
        </div>
      </div>
      <CountdownSection data={data} diff={diff} />
    </section>
  )
}

function GroomAndBride({ data }: { data: Couple }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yGroom = useTransform(scrollYProgress, [0, 1], [24, -16]);
  const yBride = useTransform(scrollYProgress, [0, 1], [-24, 16]);

  return (
    <section
      ref={ref}
    >
      <div className="max-w-xl mx-auto rounded-[28px] bg-gradient-to-br from-[#0f172a] to-[#1f2937] border border-amber-200/40 p-[1px] shadow-[0_24px_60px_-20px_rgba(15,23,42,0.8)]">
        <div className="rounded-[26px] bg-[#020617]/70 px-6 pt-10 pb-12 text-white relative overflow-hidden">
          {/* gold arcs like a Turkish arch */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-40 inset-x-[-20%] h-80 rounded-b-[50%] border border-amber-300/40" />
            <div className="absolute -top-32 inset-x-[-15%] h-72 rounded-b-[50%] border border-amber-200/30" />
          </div>

          <h2 className="text-3xl font-serif text-center relative z-10 tracking-[0.18em] uppercase text-amber-200">
            Bride &amp; Groom
          </h2>
          <p className="mt-3 text-[13px] text-center text-amber-100/80 relative z-10">
            Surrounded by the warmth of family and friends, under a sky of a
            thousand lights.
          </p>

          <div className="mt-8 space-y-10 relative z-10">
            {/* Groom */}
            <motion.div style={{ y: yGroom }} className="text-center">
              <div className="mx-auto h-64 w-64 rounded-full overflow-hidden ring-2 ring-amber-200/80 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]">
                <Image
                  src={data.groom.image}
                  alt={data.groom.name || "The Groom"}
                  width={280}
                  height={280}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-amber-200/90">
                The Groom
              </p>
              <h2 className="text-4xl md:text-4xl font-imperial text-white md:text-white-800 text-center">
                {data.groom.name}
              </h2>
              {data.groom.title && (
                <p className="text-sm text-amber-100/80">
                  {data.groom.name}, {data.groom.title}
                </p>
              )}
              {/* {data.groom.parent && (
                <p className="mt-1 text-[11px] text-amber-100/80">
                  Putra dari {data.groom.parent}
                </p>
              )} */}
              <p className="mt-2 text-sm text-white/85">
                The Son of Mr. Krisna Sami (†) &
              </p>
              <p className="text-sm text-white/85">
                Mrs. Patmini
              </p>
            </motion.div>

            {/* Divider */}
            <div className="text-center text-xl uppercase tracking-[0.25em] text-amber-200/70">
              &
            </div>

            {/* Bride */}
            <motion.div style={{ y: yBride }} className="text-center">
              <div className="mx-auto h-64 w-64 rounded-full overflow-hidden ring-2 ring-amber-200/80 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]">
                <Image
                  src={data.bride.image}
                  alt={data.bride.name || "The Bride"}
                  width={280}
                  height={280}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-amber-200/90">
                The Bride
              </p>
              <h2 className="text-4xl md:text-4xl font-imperial text-white md:text-white-800 text-center">
                {data.bride.name}
              </h2>
              {data.bride.title && (
                <p className="text-sm text-amber-100/80">
                  {data.bride.name}, {data.bride.title}
                </p>
              )}
              {/* {data.bride.parent && (
                <p className="mt-1 text-[11px] text-amber-100/80">
                  Putri dari {data.bride.parent}
                </p>
              )} */}
              <p className="mt-2 text-sm text-white/85">
                The Son of Mr. Waryani (†) &
              </p>
              <p className="text-sm text-white/85">
                Mrs. Nur Ida
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicPlayerFAB() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* The hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="/songs/rab_ne_bana_di_jodi.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Action Button */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#0B1A2B] shadow-lg flex items-center justify-center hover:bg-[#1C2B3A] transition`}
      >
        {isPlaying ? (
          <Pause className="text-white w-4 h-4" />
        ) : (
          <Play className="text-white w-4 h-4" />
        )}
      </button>
    </>
  );
}

function CarouselandInfo({ data }: { data: CoupleInfo }) {
  const params = useSearchParams();
  const to = params.get("to") || "";
  const invited = to;

  const autoplayOptions = { speed: 1, stopOnInteraction: true }
  const [emblaRef] = useEmblaCarousel({ duration: 50, loop: true, slidesToScroll: 1 }, [Autoplay(autoplayOptions)])
  const [slides, setSlides] = useState<string[]>(cover)
  const formattedDate = moment(data.date).format('DD MMMM YYYY');

  const { dateText, timeText, venue, address } = pickPrimaryEvent(data);
  return (
    <div className="relative w-full h-screen">
      {/* Background Frame */}
      <Image
        src={bg_1.src}
        alt="Fairytale cover"
        fill
        className="object-cover"
      />

      {/* Overlay content */}
      <div className="absolute mt-[-120px] md:mt-[-120px] inset-0 flex flex-col items-center justify-center text-white space-y-8">
        {/* Carousel */}
        <div className="embla overflow-hidden w-[60%] [@media(min-height:800px)]:w-[300px] max-w-[90%] h-[50%] [@media(min-height:800px)]:h-[380px] [@media(min-height:950px)]:h-[400px] 
          rounded-t-[150px] md:rounded-t-[150px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, #000 75%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, #000 75%, transparent 100%)",
          }}
          ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide, index) => (
              <div
                className="embla__slide flex-[0_0_auto] w-[100%] md:w-[300px] h-[400px] relative px-2 overflow-hidden"
                key={index}
              >
                <Image
                  src={`https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${slide}`}
                  alt="Fairytale cover"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-18 px-24 pb-12">
          {/* <div className="rounded-2xl bg-white/92 backdrop-blur-sm px-5 py-4 shadow-lg max-w-md border border-[#e1d3c0]"> */}
          <div className="text-center rounded-2xl backdrop-blur-sm px-5 py-4 shadow-lg max-w-md">
            <p className="text-[11px] uppercase tracking-[0.24em] font-bold text-gray-900">
              Wedding of
            </p>
            <p className="mt-1 text-xl font-serif text-gray-900">
              {data.coupleString}
            </p>
            <p className="mt-1 text-xs text-gray-600">
              {dateText} · {timeText}
            </p>
            <p className="mt-1 text-xs font-serif text-gray-600">
              {data.tags}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CountdownSection({ data, diff }: { data: CoupleInfo, diff: DiffTime }) {
  const handleSaveToCalendar = () => {
    // Google Calendar deep-link
    const start = "20251106T090000Z"; // <- set your real start/end
    const end = "20251106T120000Z";
    const text = encodeURIComponent("Our Wedding 💍");
    const details = encodeURIComponent("Join us for our special day!");
    const location = encodeURIComponent("The Grand Ballroom, City");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const timeUnits = [
    { label: "Days", value: diff.ds },
    { label: "Hours", value: diff.hs },
    { label: "Minutes", value: diff.ms },
    { label: "Seconds", value: diff.ss },
  ];

  return (
    <section className="flex justify-center py-8 sm:py-10">
      <div className="">
        {/* top: countdown */}
        <div className="pb-4">
          <div
            className="
              grid grid-cols-4 gap-3 sm:gap-6
              text-center text-[#E9AEB5]
            "
            aria-live="polite"
          >
            {timeUnits.map((u, index) => (
              <div key={index} className="text-center">
                <div
                  key={u.label}
                  className="
                    rounded-xl border border-[#1C2B3A]/10 bg-[#1C2B3A]/5 
                    py-2 sm:py-2
                  "
                >
                  <WILabel
                    className="
                      tabular-nums text-lg sm:text-lg md:text-lg font-bold
                      leading-none tracking-tight text-[#B23A48]
                    "
                  >
                    {u.label === "Days" ? u.value : pad2(u.value)}
                  </WILabel>
                </div>
                <WILabel className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#B23A48]">
                  {u.label}
                </WILabel>
              </div>
            ))}
          </div>
        </div>

        {/* divider (mobile horizontal, desktop vertical look) */}
        {/* <div className="border-t border-[#1C2B3A]/15" /> */}

        {/* bottom: save the date */}
        <div className="p-7 pt-4 flex flex-col items-center text-center w-full max-w-4xl rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]
          text-[#1C2B3A]">
          <p className="text-[#B23A48]/85 text-xs sm:text-sm tracking-[0.2em] uppercase">
            Save the Date
          </p>
          <p className="mt-1 sm:mt-2 text-[#B23A48] text-2xl sm:text-3xl font-medium tracking-widest">
            {moment(data.date).date()} <span className="opacity-60">·</span> {moment(data.date).month() + 1}{" "}
            <span className="opacity-60">·</span> {moment(data.date).year()}
          </p>

          <button
            onClick={handleSaveToCalendar}
            className="
              flex gap-3 mt-4 sm:mt-5 px-6 py-2.5 rounded-full 
              bg-[#B23A48] text-[#F8F8F6] font-medium
              shadow hover:shadow-md
              ring-1 ring-inset ring-[#F8F8F6]/10
              transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B23A48]
            "
          >
            <CalendarClockIcon />
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
}