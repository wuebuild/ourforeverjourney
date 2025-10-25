import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const apiBase = process.env.API_BASE!.replace(/\/$/, "");

export async function serverFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const jar = cookies();
  const token = (await jar).get("token")?.value || null; // set this at login
  const res = await fetch(`${apiBase}${path}`, {
    // inject secrets here if needed
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.MY_API_KEY ?? "",
      ...(token ? {Authorization: token} : {}),
      ...(init.headers || {}),
    },
    cache: "no-store",
    ...init,
  });
  const data = await res.json().catch(() => null);
  if (data?.statusCode == 405) { redirect(`/login?next=${encodeURIComponent("/myinvitation")}`) }
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data.data as T;
}
