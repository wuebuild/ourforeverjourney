import { redirect } from "next/navigation";

export const apiBase = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export async function clientFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${apiBase}${path}`, {
    credentials: "include",  // if your API uses cookies
    headers: { "Content-Type": "application/json", ...(init.headers || {}), ...(token ? {Authorization: token} : {}) },
    ...init,
  });
  const data = await res.json().catch(() => null);
  if (data?.statusCode == 405) { redirect(`/login?next=${encodeURIComponent("/myinvitation")}`); }
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data.data as T;
}
