import { clientFetch } from "../http/client";

export function login(body: any) {
  return clientFetch<string>(`/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}