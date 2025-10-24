export const apiBase = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

export async function clientFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    credentials: "include",  // if your API uses cookies
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data.data as T;
}
