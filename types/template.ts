export interface WeddingTemplateData {
  couple: { groom: string; bride: string } | undefined;
  coupleString: string | undefined;
  title: string | undefined;
  date: string | undefined; // ISO string
  time: string | undefined;
  quote: string | undefined;
  hero: string | undefined;
  heroImage: string | undefined;
  song: string | undefined;
  events: events[] | [];
  wishes: wish[] | [];
  gallery: string[] | [];
  album: string[] | [];
  streamUrl: string | undefined;
  rsvpUrl: string | undefined;
  mapUrl: string | undefined;
  location: string | undefined;
}

export interface events {
  title: string;
  date: string;
  time: string;
  mapUrl: string;
}

export interface wish {
  wish: string;
}