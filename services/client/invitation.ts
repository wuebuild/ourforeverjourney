// services/client/invitations.ts
import { clientFetch } from "../http/client";
import type { Invitation, InvitationBody } from "@/types/api";
import type { CoupleInfo } from "@/types/invitation";

export function getMyInvitations() {
  return clientFetch<Invitation[]>("/invitations/mine");
}
export function getInvitation(id: string) {
  return clientFetch<Invitation>(`/invitations/${id}`);
}
export function getInvitationGuest(id: string) {
  return clientFetch<CoupleInfo>(`/invitation-guest/${id}`);
}
export function updateInvitation(id: string, body: any) {
  return clientFetch<InvitationBody>(`/invitations/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}