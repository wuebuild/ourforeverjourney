import { clientFetch } from "../http/client";
import type { Invitation, InvitationBody } from "@/types/api";
import type { CoupleInfo } from "@/types/invitation";

export function getMyInvitations() {
  return clientFetch<Invitation[]>("/invitation/mine");
}
export function getInvitation(id: string) {
  return clientFetch<Invitation>(`/invitation/${id}`);
}
export function getInvitationGuest(id: string) {
  return clientFetch<CoupleInfo>(`/invitation-guest/${id}`);
}
export function updateInvitation(id: string, body: unknown) {
  return clientFetch<InvitationBody>(`/invitation/update-invitation/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
export function deleteInvitation(id: string) {
  return clientFetch<Invitation>(`/invitation-guest/delete/${id}`);
}