import {
  Gift,
  Heart,
  Images,
  ListChecks,
  MailCheck,
  Palette,
  Share2,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const HERO = {
  eyebrow: "Our Forever Journey",
  titleLead: "Your love story,",
  titleScript: "beautifully told",
  subtitle:
    "Craft a stunning digital wedding invitation in minutes — cinematic templates, RSVP, photo gallery, and gifts, all in a single link your guests will adore.",
  primaryCta: { label: "Create your invitation", href: "/register" },
  secondaryCta: { label: "Explore templates", href: "#templates" },
  /**
   * Path to the mobile-app screenshot shown inside the hero phone frame.
   * Drop the capture at public/images/app-screenshot.png and set this to
   * "/images/app-screenshot.png" — until then a built-in mock screen renders.
   */
  appScreenshot: null as string | null,
} as const;

export const SOCIAL_PROOF = {
  rating: "5.0",
  line: "Loved by couples celebrating across Indonesia",
} as const;

export type Feature = { icon: LucideIcon; title: string; desc: string };

export const FEATURES: Feature[] = [
  {
    icon: Palette,
    title: "Beautiful Designs",
    desc: "Choose from modern, elegant, and traditional wedding invitation templates.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Your invitation looks stunning on any device — phone, tablet, or desktop.",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    desc: "Share with your guests instantly via link, QR code, or social media.",
  },
  {
    icon: MailCheck,
    title: "RSVP & Wishes",
    desc: "Collect attendance and heartfelt wishes from guests in one place.",
  },
  {
    icon: Images,
    title: "Photo Gallery",
    desc: "Tell your story with a gorgeous gallery of your favorite moments.",
  },
  {
    icon: Gift,
    title: "Digital Gifts",
    desc: "Let loved ones send wedding gifts easily with built-in bank details.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick a template",
    desc: "Browse our cinematic collection and choose the design that feels like you.",
  },
  {
    step: "02",
    title: "Personalize your story",
    desc: "Add your names, love story, event details, photos, and gift information.",
  },
  {
    step: "03",
    title: "Share with one link",
    desc: "Send your invitation to every guest and watch the RSVPs arrive.",
  },
] as const;

export type AppStoreBadge = {
  store: "app-store" | "google-play";
  name: string;
  /** Store listing URL — set when the app launches to turn the badge live. */
  href: string | null;
};

export const APP_SECTION = {
  eyebrow: "Beyond the big day",
  title: "Your journey, in your pocket",
  description:
    "The Our Forever Journey app is a private space for the two of you — capture memories, dream up your bucket list, and keep the wedding plans calm and on budget.",
  pillars: [
    {
      icon: Heart,
      title: "Memories timeline",
      desc: "A private photo journal of your favorite moments together.",
    },
    {
      icon: ListChecks,
      title: "Bucket list",
      desc: "Dream, plan, and check off adventures as a couple.",
    },
    {
      icon: Wallet,
      title: "Wedding budget",
      desc: "Track vendors, payments, and what's still due — stress-free.",
    },
  ] satisfies Feature[],
  stores: [
    { store: "app-store", name: "App Store", href: null },
    { store: "google-play", name: "Google Play", href: null },
  ] satisfies AppStoreBadge[],
} as const;

export type Plan = {
  name: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Regular",
    price: "IDR 50,000",
    features: ["1 Invitation", "Basic Templates", "Share via Link"],
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: "IDR 100,000",
    features: [
      "Unlimited Invitations",
      "All Templates",
      "Custom Domain",
      "Analytics",
    ],
    cta: "Go Premium",
    popular: true,
  },
  {
    name: "Luxury",
    price: "IDR 200,000",
    features: [
      "Unlimited Invitations",
      "All Templates",
      "Custom Domain",
      "Analytics",
    ],
    cta: "Go Luxury",
  },
];

export const FOOTER_LINKS = {
  quick: [
    { label: "Features", href: "/#features" },
    { label: "Templates", href: "/#templates" },
    { label: "Mobile App", href: "/#app" },
    { label: "Pricing", href: "/#pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Privacy", href: "/terms" },
  ],
} as const;
