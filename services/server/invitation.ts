import { serverFetch } from "../http/server";
import type { Invitation, InvitationBody } from "@/types/api";
import type { CoupleInfo } from "@/types/invitation";

export function getMyInvitations() {
  return serverFetch<Invitation[]>("/invitation/mine");
}
export function getInvitation(id: string) {
  return serverFetch<Invitation>(`/invitation/${id}`);
}
export function getInvitationGuest(id: string) {
    return serverFetch<CoupleInfo>(`/invitation-guest/${id}`);
}
export function updateInvitation(id: string, body: unknown) {
  return serverFetch<InvitationBody>(`/invitation/update-invitation/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
