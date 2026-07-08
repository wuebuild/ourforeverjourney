import { clientFetch } from "@/shared/http/client";

export function login(body: unknown) {
  return clientFetch<string>(`/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}