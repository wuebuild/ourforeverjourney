export interface Invitation {
    _id: string,
    dateTime: Date,
    guests: string[],
    location: string,
    eventType: string,
    createdAt: Date
}

export interface InvitationBody {
    
}