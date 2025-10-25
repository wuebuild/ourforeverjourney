import { serverFetch } from "../http/server";

export function login(body: any) {
  return serverFetch<string>(`/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
