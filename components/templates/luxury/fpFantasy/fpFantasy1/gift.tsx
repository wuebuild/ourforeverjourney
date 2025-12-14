"use client";
import { GiftBankAccount } from "@/types/api";
import React, { useMemo, useState } from "react";
import bca_logo from "@/public/bankAssets/bca_logo.png";
import Image from "next/image";

export type WeddingGiftCardProps = {
  bgImage?: string;
  title?: string;
  lead?: string;
  ctaText?: string;
  accounts?: GiftBankAccount[];
  className?: string;
  theme?: string;
  defaultOpen?: boolean;
};

export default function WeddingGiftCard({
  bgImage = "https://images.unsplash.com/photo-1523661149972-0bedfd3bd8c5?q=80&w=1600&auto=format&fit=crop",
  title = "Wedding Gift",
  lead = "For beloved ones who may want to show your sincere love by sending a gift, please kindly tap the button below",
  ctaText = "Click Here",
  accounts,
  className = "",
  theme = "",
  defaultOpen = false
}: WeddingGiftCardProps) {
  const [showAccounts, setShowAccounts] = useState(defaultOpen);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const cardShell = useMemo(() => {
    const base =
      "relative overflow-hidden rounded-[28px] ring-1 ring-white/15 " +
      "shadow-[0_28px_80px_-28px_rgba(0,0,0,.55)]";

    if (theme === "pink") {
      return base + " bg-[#B23A48]";
    }

    return base + " bg-[#0D1730]/90";
  }, [theme]);


  const floralOverlay = useMemo(
    () =>
      "absolute inset-0 opacity-[0.22] mix-blend-lighten " +
      "[mask-image:linear-gradient(to_top,transparent,black_18%,black_82%,transparent)]",
    []
  );


  async function copyToClipboard(text: string, i: number) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } finally {
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1500);
    }
  }

  return (
    <article className={[cardShell, className].join(" ")}>
      {/* texture */}
      <div
        aria-hidden
        className={floralOverlay}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* content */}
      <div className="relative rounded-[24px] p-6 sm:p-8 ring-1 ring-white/10">
        <h2 className="text-center font-serif text-4xl sm:text-[40px] text-white drop-shadow">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-center text-[13px] sm:text-[14px] leading-6 text-white/80">
          {lead}
        </p>

        {
          (accounts && accounts.length > 0 && !defaultOpen) &&
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setShowAccounts((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-[#C4AA74] px-5 py-2.5 text-[13px] font-semibold text-[#1B1A17] shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <GiftIcon className="h-4 w-4" />
              {ctaText}
            </button>
          </div>
        }

        {(accounts && showAccounts) && (
          <div className="mt-6 rounded-[22px] bg-white/95 p-5 text-center text-[#1B1A17] shadow-inner">
            {accounts.map((acc, i) => (
              <div
                key={i}
                className="pb-6 mb-6 border-b border-black/10 last:pb-0 last:mb-0 last:border-0"
              >
                {/* {acc.bankLogo ?? <BcaLogo className="h-8 w-auto mx-auto text-[#1A4BA1]" />} */}

                <div className="mt-1 space-y-1 text-[13px] sm:text-[14px]">
                  {/* <div className="font-medium">{acc.bankName}</div> */}
                  <div className="flex justify-center items-center">
                    {acc.bankName == "BCA" && <Image src={bca_logo} width={90} height={90} alt={acc.bankName} />}
                  </div>
                  <div>No. Rekening {acc.accountNumber}</div>
                  <div>
                    a.n <span className="font-semibold">{acc.accountName}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => copyToClipboard(acc.accountNumber, i)}
                    className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm font-medium shadow hover:bg-black/90"
                  >
                    <CopyIcon className="h-4 w-4" />
                    {copiedIndex === i ? "Tersalin!" : "Salin Nomor Rekening"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
    </article>
  );
}

/* Icons (inline – replace with your own if you like) */
function GiftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 7h-3.2A3 3 0 0012 4a3 3 0 00-4.8 3H4a1 1 0 000 2h1v10a2 2 0 002 2h10a2 2 0 002-2V9h1a1 1 0 000-2zM9 5.5A1.5 1.5 0 1110.5 7H9a1.5 1.5 0 010-1.5zM14.5 7A1.5 1.5 0 1116 5.5 1.5 1.5 0 0114.5 7zM7 9h4v11H7zm6 11V9h4v11z" />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 1H8a2 2 0 00-2 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2h1a2 2 0 002-2V3a2 2 0 00-2-2zm-2 19H5V7h9zM19 5h-1v10h1z" />
    </svg>
  );
}