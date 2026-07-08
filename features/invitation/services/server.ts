import { serverFetch } from "@/shared/http/server";
import type { Invitation, InvitationBody } from "@/shared/types/api";
import type { CoupleInfo } from "@/features/invitation/types";

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
