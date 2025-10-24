export const apiBase = process.env.API_BASE!.replace(/\/$/, "");

export async function serverFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    // inject secrets here if needed
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.MY_API_KEY ?? "",
      ...(init.headers || {}),
    },
    cache: "no-store",
    ...init,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data.data as T;
}
