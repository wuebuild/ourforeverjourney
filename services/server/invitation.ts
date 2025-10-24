// services/server/invitations.ts
import { serverFetch } from "../http/server";
import type { Invitation, InvitationBody } from "@/types/api";
import type { CoupleInfo } from "@/types/invitation";

export function getMyInvitations() {
  return serverFetch<Invitation[]>("/invitations/mine");
}
export function getInvitation(id: string) {
  return serverFetch<Invitation>(`/invitations/${id}`);
}
export function getInvitationGuest(id: string) {
    return serverFetch<CoupleInfo>(`/invitation-guest/${id}`);
}
export function updateInvitation(id: string, body: any) {
  return serverFetch<InvitationBody>(`/invitations/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
