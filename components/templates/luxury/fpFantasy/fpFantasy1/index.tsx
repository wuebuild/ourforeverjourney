"use client";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { Play, Pause, Calendar, CalendarIcon, CalendarClockIcon } from "lucide-react";
import Image from "next/image";
import { Couple, CoupleInfo, WeddingData } from "@/types/invitation";
import WILabel from "../../../../ui/atoms/WILabel";
import { AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import moment, { duration } from "moment";
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from 'embla-carousel-autoplay'
import { useSearchParams } from "next/navigation";

import fairytalebg from "./assets/fairy-tale-bg.jpg";
import fairytalecover from "./assets/fairy-tale-cover.jpg";
import fairytaleframe from "./assets/fairy-tale-frame.jpg";
import bgcream1 from "./assets/bg-cream-1.jpg";
import bgcream2 from "./assets/bg-cream-2.jpg";
import flower from './assets/flower-moon.png';
import WeddingGalleryCarousel from "./carousel";
import WeddingInviteEndingCard from "./end";
import LoveStoryOnboarding from "./loveStory";
import WeddingEventCards from "./weddingEvent";
import WeddingGiftCard from "./gift";
import RSVPCard from "./rsvp";
import BestWishesCard from "./wishes";


interface diffTime {
  ds: number,
  hs: number,
  ms: number,
  ss: number
}

const colorHex = {
  mdBlue: "#0B1A2B",
  indigo: "#1C2B3A",
  whitePearl: "#F8F8F6",
  mutedGold: "#C9A24E",
  floralPink: "#E9AEB5",
  roseRed: "#B23A48",
  lavender: "#A39BD6",
  green: "#88A17D",
  textWhite: "#FFFFFF",
  textSecondary: "#C4C7CC"
}

const images = [
  "uploads/irawan-cindy/1759040505878-SAM_4827.webp",
  "uploads/irawan-cindy/1759040505657-SAM_5187.webp",
  "uploads/irawan-cindy/1759040506146-SAM_5139.webp",
  "uploads/irawan-cindy/1759040505901-SAM_5197.webp",
  "uploads/irawan-cindy/569050899_18537775153055426_6010142526291825036_n.webp",
  "uploads/irawan-cindy/1759040506195-SAM_5295.webp",
  // "uploads/irawan-cindy/565560539_18537775375055426_7299414695406161832_n.webp",
]

const chapter = [
  // black dress
  "uploads/irawan-cindy/1759040505647-SAM_5070.webp",
  "uploads/irawan-cindy/1759040506170-SAM_5322.webp",
  "uploads/irawan-cindy/1759040505925-SAM_4927.webp",
]

const cover = [
  // "uploads/irawan-cindy/1759040506175-SAM_5503.webp",
  // "uploads/irawan-cindy/1759040505912-SAM_4985.webp",
  // "uploads/irawan-cindy/1759040505917-SAM_4924.webp",
  // "uploads/irawan-cindy/1759040506447-SAM_5529.webp",
  "uploads/irawan-cindy/1759040506432-SAM_5441.webp",
  "uploads/irawan-cindy/1759040506421-SAM_5424.webp",
  "uploads/irawan-cindy/1759040505892-SAM_5480.webp",
]

const quotesImages = [
  "uploads/irawan-cindy/1759040505917-SAM_4924.webp",
  // "uploads/irawan-cindy/568639122_18537775414055426_4437316235932282748_n.webp",
  // "uploads/irawan-cindy/1759040505901-SAM_5197.webp",
  // "uploads/irawan-cindy/569050899_18537775153055426_6010142526291825036_n.webp",
  // "uploads/irawan-cindy/1759040506195-SAM_5295.webp",
]

const galleries = [
  // "uploads/irawan-cindy/1759040505647-SAM_5070.webp",
  "uploads/irawan-cindy/1759040505654-SAM_4768.webp",
  "uploads/irawan-cindy/1759040505651-SAM_5028.webp",
  "uploads/irawan-cindy/1759040506175-SAM_5503.webp",
  "uploads/irawan-cindy/1759040505912-SAM_4985.webp",
  "uploads/irawan-cindy/1759040506447-SAM_5529.webp",
  // "uploads/irawan-cindy/1759040506162-SAM_4980.webp",
  // "uploads/irawan-cindy/565560539_18537775375055426_7299414695406161832_n.webp",
  // "uploads/irawan-cindy/566176234_18537775360055426_8047079165145294821_n.webp",
  // "uploads/irawan-cindy/567632355_18537775174055426_3916455664815506615_n.webp",
  // "uploads/irawan-cindy/567704089_18537775423055426_6542266019012211843_n.webp",
  // "uploads/irawan-cindy/568098456_18537775402055426_5854995356824183491_n.webp",
  // "uploads/irawan-cindy/568254366_18537775432055426_4165810283871033002_n.webp",
  // "uploads/irawan-cindy/568559583_18537775393055426_4288120486608324863_n.webp",
  // "uploads/irawan-cindy/568639122_18537775414055426_4437316235932282748_n.webp",
  // "uploads/irawan-cindy/568678684_18537775384055426_4480191052523691071_n.webp",
  // "uploads/irawan-cindy/569050899_18537775153055426_6010142526291825036_n.webp",
  // "uploads/irawan-cindy/1759040505654-SAM_4768.webp",
  // "uploads/irawan-cindy/1759040505657-SAM_5187.webp",
  // "uploads/irawan-cindy/1759040505901-SAM_5197.webp",
  // "uploads/irawan-cindy/1759040505912-SAM_4985.webp",
  // "uploads/irawan-cindy/1759040505917-SAM_4924.webp",
  // "uploads/irawan-cindy/1759040505925-SAM_4927.webp",
  // "uploads/irawan-cindy/1759040506146-SAM_5139.webp",
  // "uploads/irawan-cindy/1759040506162-SAM_4980.webp",
  // "uploads/irawan-cindy/1759040506175-SAM_5503.webp",
  // "uploads/irawan-cindy/1759040506170-SAM_5322.webp",
  // "uploads/irawan-cindy/1759040506195-SAM_5295.webp",
  // "uploads/irawan-cindy/1759040505878-SAM_4827.webp",
  // "uploads/irawan-cindy/1759040506432-SAM_5441.webp",
  // "uploads/irawan-cindy/1759040506447-SAM_5529.webp",
  "uploads/irawan-cindy/1759040506156-SAM_5232.webp",
  "uploads/irawan-cindy/1759040506441-SAM_5591.webp",
  "uploads/irawan-cindy/SAM_4928.webp",
  "uploads/irawan-cindy/SAM_4942.webp",
  "uploads/irawan-cindy/SAM_5087.webp",
  // "uploads/irawan-cindy/1759040505901-SAM_5197.webp",
]

const masonry = [
  "uploads/irawan-cindy/1759040506162-SAM_4980.webp",
  // "uploads/irawan-cindy/1759040505892-SAM_5480.webp",
  "uploads/irawan-cindy/565560539_18537775375055426_7299414695406161832_n.webp",
]

export default function FPFantasy1 ({data} : {data:CoupleInfo}) {
    const [openInvitation, setOpenInvitation] = useState(false);
    const formattedDate = moment(data.date).format('DD MMMM YYYY')
    return (
      <section className="min-h-screen w-full flex flex-col md:flex-row">
        <div 
          className="hidden md:block overflow-hidden md:w-2/3 md:max-w-[calc(100vw-500px)] md:h-[100vh] bg-cover bg-center sticky top-0" 
          style={{
            backgroundImage: `url(${fairytalebg.src})`
            // backgroundImage: `url(https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${'uploads/irawan-cindy/569050899_18537775153055426_6010142526291825036_n.webp'})`
          }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/0"></div>
            <div className="absolute bottom-20 left-20 text-white">
              <p className="uppercase text-sm tracking-widest">{data.secondTitle}</p>
              <h1 className="text-4xl md:text-5xl font-serif">{data.coupleString}</h1>
              <p className="mt-2 text-lg">{formattedDate}</p>
            </div>
        </div>
        <div className="md:w-1/3 md:min-w-[500px]">
          <AnimatePresence mode="wait">
            {
                !openInvitation &&
                <motion.div
                    key="cover"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.5}}
                >
                    <InvitationCover 
                        cover={''} 
                        title={data.title}
                        date={data.date || ''} 
                        coupleString={data.coupleString || ''}
                        setOpenInvitation={setOpenInvitation}/>
                </motion.div>
            }
            {
                openInvitation && 
                <motion.div
                    key="body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                  <InvitationBody data={data}/>
                </motion.div>
            }
          </AnimatePresence>
        </div>
      </section>
    )
}

function InvitationCover ({setOpenInvitation, cover, title, date, coupleString} : {setOpenInvitation: Dispatch<SetStateAction<boolean>>, cover: string, title: string, date: string, coupleString: string}) {
  const weddingDate = new Date(date); // 🎯 change to actual date
  const [timeLeft, setTimeLeft] = useState<{d:number,h:number,m:number,s:number}>({
    d: 0, h: 0, m: 0, s: 0,
  });
  const formattedDate = moment(date).format('DD MMMM YYYY')
  const params = useSearchParams();
  const to = params.get("to") || ""; 
  const invited = to

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
    <div 
        className="relative flex w-full h-screen items-center justify-center bg-cover bg-center" 
        style={{
          backgroundImage: `url(${fairytalecover.src})`
        }}>
        <div className="bg-black/40 md:bg-transparent absolute inset-0 md:hidden"></div>
        
        <div className="relative text-center p-8 md:p-16">
          <Image 
            src={flower.src}
            alt="Floral" 
            width={100}
            height={100}
            className="mx-auto w-28 md:w-60 mb-6" />
          <p className="uppercase text-sm tracking-widest text-white md:text-white-800">
            {title}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white md:text-white-800 mt-2">
            {coupleString}
          </h2>
          <p className="mt-16 text-white md:text-white-800">
            Kepada Yth.
          </p>
          <p className="mt-2 text-xl md:text-2xl font-serif text-white md:text-white-800">
            {invited || "Tamu Undangan"}
          </p>
          
          <motion.a
            onClick={() => { setOpenInvitation(true) }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 shadow cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.7 0 6 2.7 6 6c0 4.2 6 12 6 12s6-7.8 6-12c0-3.3-2.7-6-6-6zM12 8.2c-1.2 0-2.2-1-2.2-2.2S10.8 3.8 12 3.8s2.2 1 2.2 2.2S13.2 8.2 12 8.2z"/></svg>
              Open Invitation
            </span>
          </motion.a>
        </div>
    </div>
  );
}

function InvitationBody({data} : {data: CoupleInfo}) {
  const [ended, setEnded] = useState(false)
  const params = useSearchParams();
  const to = params.get("to") || ""; 
  const invited = to

  return (
    <div className="bg-fixed bg-contain bg-center" style={{ 
      // backgroundImage: `url(${fairytalebg.src})` 
      backgroundImage: `url(https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${"uploads/irawan-cindy/567704089_18537775423055426_6542266019012211843_n.webp"})` 
      // uploads/irawan-cindy/1759040506447-SAM_5529.webp
    }}>
      {/* <motion.div ref={videoRef} style={{ opacity }}></motion.div> */}
      <div className="relative w-full h-screen">
        <motion.video
            autoPlay
            muted
            loop={false}
            playsInline
            className="w-full h-full object-cover"
            onEnded={() => setEnded(true)}
            initial={{ opacity: 1 }}
            animate={{ opacity: ended ? 0 : 1 }}
          >
            <source src="/videos/fairytale-video.mp4" type="video/mp4" />
        </motion.video>
        {/* After video ends, show FirstPage */}
        <motion.div
          key="carousel" 
          initial={{ opacity: 0 }}
          animate={{ opacity: ended ? 1 : 0 }}
          // transition={{ duration: 1.2, ease: 'easeOut' }} // smooth fade
          className="absolute inset-0"
        >
          <CarouselandInfo data={data} />
        </motion.div>
      </div>
      <div style={{ backgroundImage: `url(${bgcream2.src})` }}>
        <InformationAndCountdown data={data}/>
      </div>
      <div className="px-6 sm:px-12 py-6 sm:py-6 pb-0">
        <WeddingEventCards events={data.events}/>
      </div>
      <div>
        <GroomAndBride data={data.couple!} />
      </div>
      <div style={{ backgroundImage: `url(${bgcream1.src})` }}>
        <LoveStoryOnboarding
          accent="rose"
          steps={[
            {
              title: "First Hello",
              caption: `It all began with something simple a glance, a smile, a feeling that felt so familiar.
                In that fleeting moment, the world seemed to pause.
                That very first hello became the beginning of our journey.`,
              date: "",
              image: `https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${chapter[0]}`,
            },
            {
              title: "When Forever Feels Right",
              caption: `There wasn’t a grand moment,
                just a love that kept growing stronger every day.
                In every laugh and quiet moment,
                we realized home is wherever our love resides.`,
              date: "",
              image: `https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${chapter[1]}`,
            },
            {
              title: "The Promise",
              caption: `And now, we stand surrounded by love and blessings two souls, one promise.
                For today, tomorrow, and forever.`,
              date: "",
              image: `https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/${chapter[2]}`,
            },
          ]}
        />
      </div>
      <div className="px-6 sm:px-12 py-6 sm:py-6" style={{ backgroundImage: `url(${bgcream1.src})` }}>
        <h1 className="py-6 text-4xl md:text-5xl font-serif text-black">{"Our Gallery"}</h1>
        <WeddingGalleryCarousel 
          images={images} host={'https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/'} rounded={false} 
          masonry={galleries}
        />
      </div>
      <div className="px-6 sm:px-12 py-6 sm:py-6">
        <WeddingGiftCard
          accounts={data.gifts}
        />
        {
          !data.hideRSVP &&
          <>
            <div className="p-4"/>
            <RSVPCard
              slug={data.slug}
              guestName={invited}
              onSubmit={async (data) => {
                // TODO: send to your endpoint
                console.log("RSVP received:", data);
              }}
            />
          </>
        }
      </div>
      <div className="px-6 sm:px-12 py-6 sm:py-6">
        <BestWishesCard slug={data.slug}/>
      </div>
      <div style={{ backgroundImage: `url(${bgcream1.src})` }}>
        <WeddingInviteEndingCard heroImages={masonry} couple={data.coupleString} bgImage={`url(${fairytalebg.src})`} />
      </div>
      <MusicPlayerFAB/>
    </div>
  );
}

function CarouselandInfo ({data}: {data: CoupleInfo}) {
  const autoplayOptions = { speed: 1, stopOnInteraction: true } 
  const [emblaRef] = useEmblaCarousel({ duration: 50, loop: true, slidesToScroll: 1 }, [Autoplay(autoplayOptions)])
  const [ slides, setSlides ] = useState<string[]>(cover)
  const formattedDate = moment(data.date).format('DD MMMM YYYY')
  return (
    <div className="relative w-full h-screen">
      {/* Background Frame */}
      <Image
        src={fairytaleframe.src}
        alt="Fairytale cover"
        fill
        className="object-cover"
      />
    
      {/* Overlay content */}
      <div className="absolute mt-[-120px] md:mt-[-120px] inset-0 flex flex-col items-center justify-center text-white space-y-8">
        {/* Carousel */}
        <div className="embla overflow-hidden w-[60%] [@media(min-height:800px)]:w-[300px] max-w-[90%] h-[40%] [@media(min-height:800px)]:h-[380px] [@media(min-height:950px)]:h-[400px] 
          rounded-t-[150px] md:rounded-t-[150px]
          border-[5px] border-[#F8F8F6]" ref={emblaRef}>
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
    
        {/* Label */}
        <div className="absolute top-1/2 [@media(min-height:300px)]:mt-[120px] [@media(min-height:600px)]:mt-[150px] [@media(min-height:700px)]:mt-[160px] [@media(min-height:800px)]:mt-[180px] [@media(min-height:950px)]:mt-[200px] [@media(min-height:1000px)]:mt-[220px] text-white text-center">
          <p className="uppercase text-sm tracking-widest">{data.secondTitle}</p>
          <h1 className="text-2xl [@media(min-height:800px)]:text-4xl font-serif">{data.couple?.groom.name}</h1>
          <h1 className="text-1xl [@media(min-height:800px)]:text-2xl font-serif">{'&'}</h1>
          <h1 className="text-2xl [@media(min-height:800px)]:text-4xl font-serif">{data.couple?.bride.name}</h1>
          <p className="mt-1 text-md">{formattedDate}</p>
          <h1 className="text-sm md:text-sm font-serif">{data.tags}</h1>
        </div>
      </div>
    </div>
  )
}

function InformationAndCountdown ({data}: {data:CoupleInfo}) {
  const [diff, setDiff] = useState(getDiff());
  const autoplayOptions = { speed: 1, stopOnInteraction: true } 
  const [emblaRef] = useEmblaCarousel({ axis:'y', duration: 50, loop: true, slidesToScroll: 1, watchDrag: false, watchFocus: false }, [Autoplay(autoplayOptions)])

  const [ slides, setSlides ] = useState<string[]>(quotesImages)

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
              "Bound together through past lives, and united once more by virtue in this lifetime.
            </div>
            <div className="mt-4 text-white">
              Love blossoms like a lotus upon the water through shared moments, gentle glances, and tender smiles, love arises between a man and a woman.
            </div>
            <div className="mt-4 text-white">
              When love enters the mind, the heart is filled with joy.”
            </div>
            <div className="mt-8 text-white">
              (The Buddha, Mahavastu Avadana)
            </div>
          </div>
        </div>
        <CountdownSection data={data} diff={diff}/>
    </section>
  )
}

function GroomAndBride({ data }: { data: Couple }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle counter-parallax for a premium feel
  const yGroom = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const yBride = useTransform(scrollYProgress, [0, 1], [-30, 20]);
  
  return (
    <section
      ref={ref}
      className="
        relative w-full bg-transparent
        px-6 sm:px-12 py-12 sm:py-16
        flex justify-center
        font-body bg-cover bg-center
      "
    >
      {/* white outer frame */}
      <div
        className="
          w-full max-w-4xl lg:max-w-5xl
          rounded-[28px] bg-white/90 p-[2px]
          shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]
        "
      >
        {/* dark inner panel */}
        <div
          className="
            relative overflow-hidden rounded-[28px]
            bg-[#112A48]/90 backdrop-blur-sm
            px-6 sm:px-10 pt-10 sm:pt-14 pb-24
            text-white
          "
        >
          {/* soft vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

          {/* Heading */}
          <h2 className="text-4xl md:text-4xl font-serif text-white md:text-white-800 text-center">
            Bride &amp; Groom
          </h2>

          {/* Intro (optional – edit or remove) */}
          <div className="font-body relative z-10 mx-auto mt-5 max-w-[60ch] text-center text-white/90 text-base leading-relaxed">
            By the love and grace of God, we cordially request the honour of your presence at the marriage of our beloved son and daughter
          </div>

          {/* People */}
          <div
            className="
              relative z-10 mt-2 grid grid-cols-1 gap-8 md:gap-10
              items-start
            "
          >

            {/* Groom */}
            <motion.div style={{ y: yGroom }} className="text-center">
              <div
                className="
                  mx-auto mt-10 h-100 w-60 sm:h-100 sm:w-60 rounded-full overflow-hidden
                  ring-2 ring-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)]
                "
              >
                <Image
                  src={data.groom.image}
                  alt={data.groom.name || "The Groom"}
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/70">
                The Groom
              </div>
              <div className="mt-1 font-imperial text-[50px]">
                {data.groom.name}
              </div>

              <p className="font-serif text-[24px] text-white/85">
                Irawan Gohan, S.E.
              </p>
              <p className="mt-2 text-sm text-white/85">
                  The Son of Mr. Sukrisno Gohan & 
              </p>
              <p className="text-sm text-white/85">
                  Mrs. Lisa (†)
              </p>

              {(data.groom.title || data.groom.parent) && (
                <p className="mt-2 text-sm text-white/85">
                  {data.groom.title}
                  {data.groom.title && data.groom.parent ? " · " : ""}
                  {data.groom.parent && <>Putra dari {data.groom.parent}</>}
                </p>
              )}

              {data.groom.instagram && (
                <a
                  href={`https://instagram.com/${data.groom.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-[#E9AEB5] hover:underline"
                >
                  @{data.groom.instagram.replace("@", "")}
                </a>
              )}
            </motion.div>

            <div className="mt-1 text-center font-imperial text-[30px]">
                dengan
            </div>

            {/* Bride */}
            <motion.div style={{ y: yBride }} className="text-center">
              <div
                className="
                  mx-auto h-100 w-60 sm:h-100 sm:w-60 rounded-full overflow-hidden
                  ring-2 ring-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)]
                "
              >
                <Image
                  src={data.bride.image}
                  alt={data.bride.name || "The Bride"}
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/70">
                The Bride
              </div>
              <div className="mt-1 font-imperial text-[50px]">
                {data.bride.name}
              </div>

              <p className="font-serif text-[24px] text-white/85">
                Cindy, S.E.
              </p>
              <p className="mt-2 text-sm text-white/85">
                  The Daughter of Mr. Tjoa Sui Thin &
              </p>
              <p className="text-sm text-white/85">
                  Mrs. Sarini Salim
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownSection({ data, diff }: { data: CoupleInfo, diff: diffTime }) {
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
            <CalendarClockIcon/>
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
}

export function GalleryType1 ({ images }: {images: [string]}) {
  return (
    <div>
      Here images list
    </div>
  )
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
        <source src="/songs/kinagrannis_canthelpfallinginlove.mp3" type="audio/mpeg" />
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