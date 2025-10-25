import { clientFetch } from "../http/client";
import type { DefaultResponse, Invitation, InvitationBody } from "@/types/api";
import type { CoupleInfo, Wish } from "@/types/invitation";

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
export function getWishes(slug: string) {
  return clientFetch<Wish[]>(`/invitation-guest/get-wishes/${slug}`);
}
export function postWishes(body: unknown) {
  return clientFetch<Wish>(`/invitation-guest/send-wishes`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
export function postRSVP(body: unknown) {
  return clientFetch<Wish>(`/invitation-guest/confirm-rsvp`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}