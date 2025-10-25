export interface Invitation {
    _id: string,
    title: string,
    dateTime: Date,
    date: string,
    time: string,
    guests: CreatedGuest[],
    event: Event[],
    rsvp: RSVP[],
    location: string,
    eventType: string,
    createdDate: Date
}

export interface Guest {
    _id?: string | undefined,
    name: string
}

export type EventType = "reception" | "wedding" | "both";
export interface Event {
    _id?: string | undefined; 
    title: string; 
    eventType: EventType; 
    location: string; 
    locationAddress: string;
    mapUrl: string;
    dateTime: string; 
    date?: string;
    time?: string;
}

export interface Gift { 
    _id?: string | undefined,
    bankName: string; 
    accountName: string; 
    accountNumber: string 
}

export interface InvitationBody {
    _id: string,
    dateTime: Date,
    date: string,
    time: string,
    guests: Guest[],
    event: Event[],
    location: string,
    eventType: string,
    createdDate: Date
}

export interface CreatedGuest { 
    _id?: string,
    name: string,
    token: string,
    inviteUrl: string 
}

export interface GiftBankAccount {
    bankLogo?: React.ReactNode,
    bankName: string,
    accountNumber: string,
    accountName: string
}

export interface RSVP {
  name: string;
  guestTotal: number;
};

export interface DefaultResponse {
    response: boolean
}
