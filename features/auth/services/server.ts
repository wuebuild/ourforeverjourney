import { serverFetch } from "@/shared/http/server";

export function login(body: unknown) {
  return serverFetch<string>(`/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
