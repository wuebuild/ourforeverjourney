import { Couple, CoupleInfo } from "@/types/invitation";
import moment from "moment";

const COUPLES: Record<string, CoupleInfo> = {
  "irawangohan-cindy": {
    slug: "irawangohan-cindy",
    names: "Irawan Gohan & Cindy",
    dateISO: "2025-11-17",
    summary: "Undangan pernikahan Irawan & Cindy. Join us for a day of love and celebration.",
    couple: { 
      groom: { 
        image: "https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/uploads/irawan-cindy/1759040505643-SAM_5204.webp",
        name: "Irawan Gohan",
      }, 
      bride: {
        image: "https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/uploads/irawan-cindy/1759040505631-IMG_9271.webp",
        name: "Cindy",
      }
    },
    coupleString: "Irawan Gohan & Cindy",
    quote: "Creating memories is a priceless gift.",
    hero: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gallery: ["https://images.unsplash.com/photo-1708209851731-4ebd7d5729f1?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1755810392532-775744d427bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1755810392482-3f1d4ea988f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1755810392485-963085b812f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
    ],
    date: moment(new Date()).add(2, "days").format('YYYY-MM-DDTHH:mm:ss'),
    events: [
      {
        title: "Akad Nikah",
        eventType: "wedding",
        location: "",
        locationAddress: "",
        dateTime: "",
        date: "April 28, 2025",
        time: "09:00 AM",
        mapUrl: "https://maps.app",
      },
      {
        title: "Akad Nikah",
        eventType: "wedding",
        location: "",
        locationAddress: "",
        dateTime: "",
        date: "April 28, 2025",
        time: "09:00 AM",
        mapUrl: "https://maps.app",
      },
    ],
    coverImage: "https://ourforeverjourney.s3.ap-southeast-1.amazonaws.com/uploads/irawan-cindy/1759040505917-SAM_4924.webp",
    templateType: 'fpfantasy_1'
  },
  // add more couples here...
};

export async function listCoupleSlugs(): Promise<string[]> {
  // swap with DB fetch later
  return Object.keys(COUPLES);
}

export async function getCoupleBySlug(slug: string): Promise<CoupleInfo | null> {
  // normalize to kebab just in case
  const norm = slug.trim().toLowerCase();
  return COUPLES[norm] ?? null;
}