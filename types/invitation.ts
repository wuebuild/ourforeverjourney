export interface WeddingData {
  couple: Couple | undefined;
  coupleString: string | undefined;
  title: string | undefined;
  date: string | undefined; // ISO string
  time: string | undefined;
  quote: string | undefined;
  hero: string | undefined;
  cover: string | undefined;
  heroImage: string | undefined;
  song: string | undefined;
  events: Events[] | [];
  wishes: Wish[] | [];
  gallery: string[] | [];
  album: string[] | [];
  streamUrl: string | undefined;
  rsvpUrl: string | undefined;
  mapUrl: string | undefined;
  location: string | undefined;
  isTemplate: boolean | true;
}

export interface Couple {
  bride: CoupleObj;
  groom: CoupleObj;
}

export interface CoupleObj {
  image: string;
  name: string;
  title?: string;
  parent?: string;
  instagram?: string;
}

export interface Events {
  title: string;
  date: string;
  time: string;
  mapUrl: string;
}

export interface Wish {
  wish: string;
}