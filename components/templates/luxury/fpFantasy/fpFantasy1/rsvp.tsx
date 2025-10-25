"use client";
import { postRSVP } from "@/services/client/invitation";
import React, { useMemo, useState } from "react";

export type RSVPPayload = {
  name: string;
  attendees: number;
  address: string;
};

export type RSVPCardProps = {
  slug?: string;
  bgImage?: string;
  title?: string;
  subtitle?: string;
  guestName?: string;
  onSubmit?: (data: RSVPPayload) => Promise<void> | void;
  className?: string;
};

export default function RSVPCard({
  slug = "",
  bgImage = "https://images.unsplash.com/photo-1523661149972-0bedfd3bd8c5?q=80&w=1600&auto=format&fit=crop",
  title = "Rsvp",
  subtitle = "Konfirmasi kehadiran Anda dengan mengisi form berikut",
  onSubmit,
  className = "",
  guestName = ""
}: RSVPCardProps) {
  const [name, setName] = useState(guestName);
  const [attendees, setAttendees] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // NEW: success state + last payload for summary
  const [success, setSuccess] = useState(false);
  const [lastPayload, setLastPayload] = useState<RSVPPayload | null>(null);

  const cardShell = useMemo(
    () =>
      "relative overflow-hidden rounded-[28px] bg-[rgba(13,23,48,0.85)] backdrop-blur-sm ring-1 ring-white/15 " +
      "shadow-[0_28px_80px_-28px_rgba(0,0,0,.55)]",
    []
  );
  const floralOverlay = useMemo(
    () =>
      "absolute inset-0 opacity-[0.22] mix-blend-lighten " +
      "[mask-image:linear-gradient(to_top,transparent,black_18%,black_82%,transparent)]",
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!name || !attendees || Number(attendees) <= 0 /* || !address */) {
      setMsg("Mohon lengkapi semua kolom yang diperlukan.");
      return;
    }

    try {
      setBusy(true);
      const payload: RSVPPayload = {
        name,
        attendees: Number(attendees),
        address, // empty if you keep the field commented
      };
      await onSubmit?.(payload);
      await postRSVP({
        name: name,
        guestTotal: Number(attendees),
        slug
      })

      // Save + show success view
      setLastPayload(payload);
      setSuccess(true);

      // clear form for next time
      setName("");
      setAttendees("");
      setAddress("");
      setMsg("Terima kasih! RSVP Anda sudah terkirim.");
    } catch {
      setMsg("Maaf, terjadi kesalahan. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className={[cardShell, className].join(" ")}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes popIn { from { transform: scale(.96); opacity: .001 } to { transform: none; opacity: 1 } }
          @keyframes drawCheck { to { stroke-dashoffset: 0 } }
        `,
        }}
      />
      <div
        aria-hidden
        className={floralOverlay}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative rounded-[24px] p-6 sm:p-8 ring-1 ring-white/10">
        <h2 className="text-center font-serif text-[40px] text-white drop-shadow">{title}</h2>
        <p className="mt-2 text-center text-[13px] text-white/75">{subtitle}</p>

        {/* ====== SUCCESS VIEW ====== */}
        {success ? (
          <SuccessPanel
            payload={lastPayload}
            onClose={() => setSuccess(false)}
            onSendAnother={() => {
              setSuccess(false);
              // keep form empty (already cleared)
            }}
          />
        ) : (
          /* ====== FORM VIEW ====== */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1 block text-[12px] text-white/85">Nama*</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full rounded-md bg-white/95 px-3 py-2 text-sm text-gray-900 outline-none ring-1 ring-black/15 focus:ring-2 focus:ring-[#C4AA74]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[12px] text-white/85">Jumlah Kehadiran*</span>
              <div className="relative">
                <select
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="w-full appearance-none rounded-md bg-white/95 px-3 py-2 text-sm text-gray-900 outline-none ring-1 ring-black/15 focus:ring-2 focus:ring-[#C4AA74]"
                >
                  <option value="">Pilih jumlah</option>
                  <option value="1">1 orang</option>
                  <option value="2">2 orang</option>
                  <option value="3">3 orang</option>
                  <option value="4">4 orang</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </label>

            {/*
            <label className="block">
              <span className="mb-1 block text-[12px] text-white/85">Alamat Domisili</span>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama Kota"
                className="w-full rounded-md bg-white/95 px-3 py-2 text-sm text-gray-900 outline-none ring-1 ring-black/15 focus:ring-2 focus:ring-[#C4AA74]"
              />
            </label>
            */}

            {msg && (
              <p
                className={[
                  "text-[12px]",
                  msg.startsWith("Terima") ? "text-emerald-300" : "text-rose-300",
                ].join(" ")}
                role="status"
                aria-live="polite"
              >
                {msg}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex items-center gap-2 rounded bg-white/90 px-5 py-2 text-sm font-bold text-[#0D1730] ring-1 ring-white/40 shadow hover:bg-white disabled:opacity-60"
            >
              {busy ? "Mengirim..." : "Submit"}
            </button>
          </form>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
    </article>
  );
}

/* ---------------- Success Panel ---------------- */
function SuccessPanel({
  payload,
  onClose,
  onSendAnother,
}: {
  payload: RSVPPayload | null;
  onClose: () => void;
  onSendAnother: () => void;
}) {
  return (
    <div
      className="mt-6 grid place-items-center rounded-2xl bg-white/90 p-6 text-center text-[#0D1730] ring-1 ring-black/10 animate-[popIn_.35s_cubic-bezier(.2,.8,.2,1)_both]"
      role="status"
      aria-live="polite"
    >
      {/* Animated checkmark */}
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" className="text-emerald-500/40" />
          <path
            d="M7 12l3 3 7-7"
            className="text-emerald-600"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: 24,
              animation: "drawCheck .6s .1s ease forwards",
            } as React.CSSProperties}
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold">Terima kasih! RSVP berhasil terkirim.</h3>
      {payload && (
        <p className="mt-1 text-sm text-gray-700">
          {payload.name} • {payload.attendees} {payload.attendees > 1 ? "orang" : "orang"}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={onSendAnother}
          className="rounded-full bg-[#0D1730] px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 shadow hover:brightness-110"
        >
          Kirim lagi
        </button>
        <button
          onClick={onClose}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0D1730] ring-1 ring-black/10 hover:bg-white/90"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

/* small inline icons */
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 01.94 1.17l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.4a.75.75 0 01.02-1.2z" />
    </svg>
  );
}
