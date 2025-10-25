"use client";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { Play, Pause } from "lucide-react";
import Image from "next/image";
import { Couple, CoupleInfo, WeddingData } from "@/types/invitation";
import { Calendar } from "lucide-react";
import WILabel from "../../../ui/atoms/WILabel";
import { AnimatePresence, motion} from "framer-motion";

interface diffTime {
    ds: number,
    hs: number,
    ms: number,
    ss: number
}

export default function FPRomantic ({data} : {data:WeddingData}) {
    const [openInvitation, setOpenInvitation] = useState(false);
    return (
        <div className="relative bg-white text-gray-800 overflow-hidden">
            <AnimatePresence mode="wait">
                {
                    !openInvitation &&
                    <motion.div
                        key="cover"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <InvitationCover 
                            cover={data.cover || ''} date={data.date || ''} 
                            coupleString={data.coupleString || ''}
                            setOpenInvitation={setOpenInvitation}/>
                    </motion.div>
                }
                {
                    openInvitation && 
                    <motion.div
                        key="body"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <InvitationBody data={data}/>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

function InvitationCover ({setOpenInvitation, cover, date, coupleString} : {setOpenInvitation: Dispatch<SetStateAction<boolean>>, cover: string, date: string, coupleString: string}) {
  const weddingDate = new Date(date); // 🎯 change to actual date
  const [timeLeft, setTimeLeft] = useState<{d:number,h:number,m:number,s:number}>({
    d: 0, h: 0, m: 0, s: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ d, h, m, s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('${cover}')` }} // 📷 put your background in /public/cover.jpg
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <WILabel font="heading" color="white" className="text-3xl md:text-6xl font-heading">{coupleString}</WILabel>
        
        {/* Countdown */}
        <div className="mt-6 flex gap-6 text-lg md:text-2xl font-semibold">
          <div>{timeLeft.d} <span className="block text-sm font-normal">Days</span></div>
          <div>{timeLeft.h} <span className="block text-sm font-normal">Hours</span></div>
          <div>{timeLeft.m} <span className="block text-sm font-normal">Minutes</span></div>
          <div>{timeLeft.s} <span className="block text-sm font-normal">Seconds</span></div>
        </div>

        {/* Open Invitation Button */}
        <a
          href="#invitation"
          className="mt-10 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-lg font-medium shadow-lg transition"
          onClick={() =>setOpenInvitation(true)}
        >
          <WILabel font="heading" color="white">Open Invitation</WILabel>
        </a>
      </div>
    </section>
  );
}

function InvitationBody({data} : {data: WeddingData}) {
  const [diff, setDiff] = useState(getDiff());

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
    <div className="relative bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[100vh]">
        {data.hero &&
            <Image src={data.hero} alt="Couple" fill className="object-cover" />
        }
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
          {/* <h1 className="text-3xl md:text-6xl font-heading">{data.coupleString}</h1> */}
          <WILabel font="heading" color="white" className="text-3xl md:text-6xl font-heading">{data.coupleString}</WILabel>
          <p className="mt-2 text-sm md:text-lg">{data.quote}</p>
          <CountdownSection data={data} diff={diff} />
        </div>
      </div>

      {/* Countdown (stacked on mobile, inline on desktop) */}
      {/* <section className="pb-8 text-center">
        <CountdownSection diff={diff} />
      </section> */}
      {/*  The Groom and The Bride  */}
       {data?.couple ? <GroomAndBride data={data.couple} /> : null}
      {/* Gallery (2 cols mobile, 4 cols desktop) */}
      {/* <section className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4"> */}
      <section className="p-6">
        {/*  Our Love Story */}
        <div className="columns-2 md:columns-3 gap-4">
            {data.gallery.map((src, i) => (
                <img
                key={i}
                src={src}
                alt=""
                className="mb-4 w-full rounded-xl"
                />
            ))}
        </div>
        {/*  Precious Moment */}
      </section>

      {/* Marriage Contract and Reception */}
      {/* Bisa set location di gmaps ? */}
      {/* Events (stacked mobile, 2-column desktop) */}
      <section className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50">
        {data.events.map((e, i) => (
          <div key={i} className="rounded-lg p-6 bg-white shadow-md">
            <h3 className="text-lg md:text-xl font-heading">{e.title}</h3>
            <p className="mt-2 text-sm md:text-base">{e.date} at {e.time}</p>
            <a href={e.mapUrl} className="mt-4 inline-block text-pink-600 underline">See Location</a>
          </div>
        ))}
      </section>

      {/* RSVP & Live Buttons */}
      <section className="p-6 flex flex-col md:flex-row justify-center gap-4 md:gap-6">
        <a href={data.rsvpUrl} className="px-6 py-3 bg-pink-600 text-white rounded shadow-md text-center">RSVP Now</a>
        <a href={data.streamUrl} className="px-6 py-3 bg-gray-200 text-gray-800 rounded shadow-md text-center">Watch Live</a>
      </section>

      {/* Gift */}

      {/* Wishes */}
      <section className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-heading mb-4 text-center">Send Your Best Wishes</h2>
        <div className="space-y-4 max-w-lg mx-auto">
          {data.wishes.map((w, i) => (
            <p key={i} className="italic text-center">“{w.message}”</p>
          ))}
        </div>
        <form className="mt-6 flex flex-col items-center">
          <textarea placeholder="Your message" className="w-full md:w-2/3 p-4 rounded border mb-4" />
          <button className="px-6 py-3 bg-pink-600 text-white rounded">Send Wish</button>
        </form>
      </section>

      {/* End of Page */}

      <MusicPlayerFAB />
    </div>
  );
}

function GroomAndBride({ data }: { data: Couple }) {
  return (
    <section className="py-12 px-6 text-center">
      {/* Bride */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto mb-12"
      >
        <WILabel font="heading" className="text-base uppercase font-semibold tracking-wide text-gray-500">
          The Bride
        </WILabel>
        <div>
          <WILabel font="heading" className="mt-1 text-2xl md:text-3xl font-heading text-gray-900">
            {data.bride.name}
          </WILabel>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {/* {data.bride.title} */}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          {/* Daughter of {data.bride.parent} */}
        </p>
        {/* {data.bride.instagram && (
          <p className="mt-2 text-sm text-pink-600">
            @{data.bride.instagram}
          </p>
        )} */}
      </motion.div>

      {/* Groom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-md mx-auto"
      >
        <WILabel font="heading" className="text-base uppercase font-semibold tracking-wide text-gray-500">
          The Groom
        </WILabel>
        <div>
          <WILabel font="heading" className="mt-1 text-2xl md:text-3xl font-heading text-gray-900">
            {data.groom.name}
          </WILabel>
        </div>
        {/* <p className="mt-2 text-sm text-gray-600">
          {data.groom.title}
        </p> */}
        {/* <p className="mt-1 text-sm text-gray-600">
          Son of {data.groom.parent}
        </p>
        {data.groom.instagram && (
          <p className="mt-2 text-sm text-pink-600">
            @{data.groom.instagram}
          </p>
        )} */}
      </motion.div>
    </section>
  );
}

function CountdownSection({ data, diff }: { data: WeddingData,diff: diffTime}) {
  const handleSaveToCalendar = () => {
    // Example: Google Calendar link
    const start = "20250101T100000Z"; // YYYYMMDDTHHmmssZ
    const end = "20250101T130000Z";
    const text = encodeURIComponent("Our Wedding 💍");
    const details = encodeURIComponent("Join us for our special day!");
    const location = encodeURIComponent("The Grand Ballroom, City");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(url, "_blank");
  };

  return (
    <section className="flex justify-center py-6 px-4">
      <div className="w-full max-w-3xl flex justify-between items-center border-t border-b border-white/80 text-white">
        {/* Left side - countdown */}
        <div className="flex-1 flex justify-around py-4">
          <div className="text-center">
            <WILabel font="body" className="text-2xl font-bold">{diff.ds}</WILabel>
            <span className="text-sm">days</span>
          </div>
          <div className="text-center">
            <WILabel font="body" className="text-2xl font-bold">{diff.hs}</WILabel>
            <span className="text-sm">hours</span>
          </div>
          <div className="text-center">
            <WILabel font="body" className="text-2xl font-bold">{diff.ms}</WILabel>
            <span className="text-sm">minutes</span>
          </div>
          <div className="text-center">
            <WILabel font="body" className="text-2xl font-bold">{diff.ss}</WILabel>
            <span className="text-sm">seconds</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-full bg-white/70"></div>

        {/* Right side - save the date */}
        <div className="flex-1 text-center py-4">
          <p className="text-sm mb-1">Save The Date</p>
          <p className="text-xl font-semibold tracking-wide">
            x <b>.</b> x <b>.</b> x
          </p>
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
        <source src="/songs/song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Action Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-pink-600 shadow-lg flex items-center justify-center hover:bg-pink-700 transition"
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