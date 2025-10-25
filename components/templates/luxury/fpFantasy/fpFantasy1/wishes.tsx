"use client";
import React, { useMemo, useState } from "react";
import { Wish } from "@/types/invitation";

export default function BestWishesCard({
  initialWishes = [],
  title = "Best Wishes",
  subtitle = "Sampaikan doa dan ucapan terbaik Anda",
  onSubmitWish,
  className = "",
}: {
  initialWishes?: Wish[];
  title?: string;
  subtitle?: string;
  onSubmitWish?: (data: { name: string; message: string }) => Promise<Wish> | Promise<void> | void;
  className?: string;
}) {
  const [wishes, setWishes] = useState<Wish[]>(
    [...initialWishes].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  );
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardShell = useMemo(
    () =>
      "relative overflow-hidden rounded-[22px] bg-[#0D1730]/90 ring-1 ring-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]",
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !message.trim()) {
      setError("Nama dan ucapan wajib diisi.");
      return;
    }
    try {
      setBusy(true);
      const maybe = await onSubmitWish?.({ name: name.trim(), message: message.trim() });
      const newWish: Wish =
        (maybe as Wish) ??
        ({ _id: crypto.randomUUID(), name: name.trim(), message: message.trim(), createdAt: new Date() } as Wish);
      setWishes((w) => [newWish, ...w]);
      setName("");
      setMessage("");
    } catch {
      setError("Gagal mengirim. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={["px-0", className].join(" ")}>
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl">
        <article className={cardShell}>
          <div className="rounded-[18px] p-4 sm:p-6 ring-1 ring-white/10">
            {/* Header */}
            <header className="text-center">
              <h2 className="font-serif text-4xl sm:text-5xl text-white">{title}</h2>
              <p className="mt-1 text-[13px] text-white/70">{subtitle}</p>
            </header>

            {/* Card body */}
            <div className="mt-4 rounded-xl bg-white text-[#0E1524] ring-1 ring-black/10 overflow-hidden">
              {/* Count */}
              <div className="border-b border-black/10 px-4 py-3 text-center text-[13px] font-semibold">
                {wishes.length} Comments
              </div>

              {/* Form (fixed above the scrollable list) */}
              <form onSubmit={handleSubmit} className="space-y-3 px-4 py-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama"
                  className="w-full rounded-md bg-white px-3 py-2 text-sm ring-1 ring-black/15 outline-none focus:ring-2 focus:ring-[#C4AA74]"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ucapan"
                  rows={3}
                  className="w-full rounded-md bg-white px-3 py-2 text-sm ring-1 ring-black/15 outline-none focus:ring-2 focus:ring-[#C4AA74]"
                />
                {error && <p className="text-[12px] text-rose-600">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex rounded-md bg-[#1F2A44] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 disabled:opacity-60"
                >
                  {busy ? "Mengirim..." : "Kirim"}
                </button>
              </form>

              {/* Scrollable wishes list */}
              <div className="max-h-[60vh] sm:max-h-[68vh] overflow-y-auto overscroll-y-auto">
                <ul className="divide-y divide-black/15">
                  {wishes.map((w) => (
                    <li key={w._id} className="px-4 py-4">
                      <div className="mb-1 font-semibold">{w.name}</div>
                      <p className="whitespace-pre-line text-[14px] leading-6 text-[#2B3142]">
                        {w.message}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[12px] text-[#667085]">
                        <ClockIcon className="h-4 w-4" />
                        <span>{timeAgo(w.createdAt)}</span>
                        <button
                          type="button"
                          className="rounded px-1.5 py-0.5 text-[#0E1524] hover:bg-black/5"
                          onClick={() => alert("Reply clicked (stub)")}
                        >
                          Reply
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------ Utils ------------------------------ */
function timeAgo(input: Date | string | number) {
  const d = new Date(input);
  const diff = Math.max(0, Date.now() - d.getTime());
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const dAy = Math.floor(h / 24);
  const mo = Math.floor(dAy / 30);
  const y = Math.floor(mo / 12);

  if (y > 0) return `${y} tahun lalu`;
  if (mo > 0) return `${mo} bulan lalu`;
  if (dAy > 0) return `${dAy} hari lalu`;
  if (h > 0) return `${h} jam lalu`;
  if (m > 0) return `${m} menit lalu`;
  return `${s} detik lalu`;
}

/* ------------------------------ Icons ------------------------------ */
function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}

// /* -------------------------- Demo Seed Data -------------------------- */
// const demoWishes: Wish[] = [
//   {
//     _id: "1",
//     name: "AW",
//     message:
//       "Happy Wedding Irawan and Cindy",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 52 * 1 - 1000 * 60 * 60 * 24 * 9),
//   },
//   {
//     _id: "5",
//     name: "AW",
//     message:
//       "Happy Wedding Irawan and Cindy",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 52 * 1 - 1000 * 60 * 60 * 24 * 9),
//   },
//   {
//     _id: "2",
//     name: "Albert",
//     message:
//       "Happy Wedding Irawan and Cindy",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 52 * 1 - 1000 * 60 * 60 * 24 * 9),
//   },
//   {
//     _id: "3",
//     name: "Testing",
//     message:
//       "Happy Wedding Irawan and Cindy",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 52 * 1 - 1000 * 60 * 60 * 24 * 9),
//   },
//   {
//     _id: "4",
//     name: "AW",
//     message:
//       "Happy Wedding Irawan and Cindy",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 52 * 1 - 1000 * 60 * 60 * 24 * 9),
//   },
// ];
