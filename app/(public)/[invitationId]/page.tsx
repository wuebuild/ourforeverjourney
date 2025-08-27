import { templates } from "@/lib/templates";
import { title } from "process";

const TemplateComponent = templates["example"];

export default function InvitationPage() {
  const data = {
    couple: { groom: "John Doe", bride: "Adinda"},
    coupleString: "Adinda & John Doe",
    quote: "Creating memories is a priceless gift.",
    hero: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gallery: ["https://images.unsplash.com/photo-1708209851731-4ebd7d5729f1?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1755810392532-775744d427bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1755810392482-3f1d4ea988f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      "https://images.unsplash.com/photo-1755810392485-963085b812f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
    ],
    date: "2025-04-30T17:00:00",
    events: [
      {
        title: "Akad Nikah",
        date: "April 28, 2025",
        time: "09:00 AM",
        mapUrl: "https://maps.app",
      },
      {
        title: "Resepsi",
        date: "April 30, 2025",
        time: "17:00 PM",
        mapUrl: "https://maps.app",
      },
    ],
    rsvpUrl: "/rsvp",
    streamUrl: "/stream",
    wishes: [
      {
        wish: "Congratulations! Wishing you a lifetime of love.",
      },
      {
        wish: "So happy for you both!",
      }
    ],
    title: "",
    time: "",
    heroImage: "",
    song: "",
    album: [],
    mapUrl: "",
    location: ""
  };

  return <TemplateComponent data={data} />;
}