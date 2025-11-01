"use client";
import { useEffect, useMemo, useState } from "react";
import { WIInput } from "@/components/ui/molecules/WIInput";
import { useParams } from "next/navigation";
import { deleteInvitation, getInvitation, updateInvitation } from "@/services/client/invitation";
import { CreatedGuest, Event, EventType, Gift, Guest, RSVP } from "@/types/api";
import { WISwitch } from "@/components/ui/atoms/WISwitch";

type RouteParams = { invitationid: string };

export default function InvitationInformationPage() {
  
  const { invitationid } = useParams<RouteParams>();

  function MapField() {
    const [raw, setRaw] = useState<string>("");

    const isUrl = /^https?:\/\//i.test(raw);
    const q = encodeURIComponent(raw);
    const embedSrc = raw ? `https://www.google.com/maps?q=${q}&output=embed` : "";
    const openHref = isUrl ? raw : raw ? `https://www.google.com/maps?q=${q}` : "";

    // expose for submit
    window.__mapsValue = raw; // quick-and-simple bridge to onSubmit

    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps (Address or Share URL)</label>
          <WIInput
            type="text"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="Paste share link or type full address"
            className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
          />
          <p className="mt-1 text-xs text-gray-500">You can paste the Share URL from Google Maps or just type the venue address.</p>
        </div>

        {raw && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-gray-200">
                <iframe
                  src={embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="md:col-span-1 flex md:items-start">
              {openHref && (
                <a
                  href={openHref}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Open in Google Maps
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function cryptoRandom() { return Math.random().toString(36).slice(2, 10); }

  // ---- form state
  const [eventType, setEventType] = useState<EventType>("both");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  // --- Multiple Events state (responsive-friendly)
  const [events, setEvents] = useState<Event[]>([
    { _id: cryptoRandom(), title: "Main Ceremony", eventType: "both", location: "", locationAddress: "", dateTime: "", mapUrl: "" },
  ]);

  const addEvent = () => {
    setEvents((prev) => [...prev, { id: cryptoRandom(), title: `Event ${prev.length + 1}`, eventType: "reception", location: "", locationAddress: "", dateTime: "", mapUrl: "" }]);
  };
  const removeEvent = (_id: string) => setEvents((prev) => prev.filter((e) => e._id !== _id));
  const setEventField = (_id: string, key: keyof Event, value: string) => {
    setEvents((prev) => prev.map((e) => (e._id === _id ? { ...e, [key]: value } : e)));
  };
  const [hideRSVP, setHideRSVP] = useState<boolean>(false);
  const [gifts, setGifts] = useState<Gift[]>([]);
  // { bankName: "", accountName: "", accountNumber: "" }
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestInputs, setGuestInputs] = useState<Guest[]>([{ name: "" }]);

  // ---- ui state
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // ---- result state
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [createdGuests, setCreatedGuests] = useState<CreatedGuest[] | null>(null);
  const [rsvp, setRSVP] = useState<RSVP[] | null>(null);

  // derived
  const isValid = useMemo(() => {
    return true;
  }, [location, dateTime]);

  // ---- helpers
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const syncGuestInputs = (count: number) => {
    const next = [...guestInputs];
    if (count > next.length) {
      for (let i = next.length; i < count; i++) next.push({ name: "" });
    } else {
      next.length = count;
    }
    setGuestInputs(next);
  };

  const incGuests = () => {
    const n = guestCount + 1;
    setGuestCount(n);
    syncGuestInputs(n);
  };

  const decGuests = () => {
    const n = Math.max(0, guestCount - 1);
    setGuestCount(n);
    syncGuestInputs(n);
  };

  const handleGiftChange = (idx: number, field: keyof Gift, value: string) => {
    const next = [...gifts];
    next[idx] = { ...next[idx], [field]: value };
    setGifts(next);
  };

  const addGiftRow = () => setGifts((g) => [...g, { bankName: "", accountName: "", accountNumber: "" }]);
  const removeGiftRow = (idx: number) => setGifts((g) => g.filter((_, i) => i !== idx));

  const handleGuestNameChange = (idx: number, value: string) => {
    const next = [...guestInputs];
    next[idx] = { name: value };
    setGuestInputs(next);
  };

  useEffect(() => {
    loadInvitation()
  }, [])

  const loadInvitation = async () => {
    const data = await getInvitation(invitationid)
    console.log("here data", data)
    setHideRSVP(data.hideRSVP)
    setEvents(data.event)
    setGifts(data.gifts)
    setCreatedGuests([...data.guests])
    setRSVP([...data.rsvp])
  }

  const copyToClipboard = async (text: string, guestName: string) => {
    try {
      // text
      let template = `Dear ${guestName},`
      template += `\n\nWe are so happy to invite you to share the joy and happiness of our engagement day.`
      template += `\n\nThe engagement of Irawan Gohan & Cindy`
      template += `\nDate: Monday, 10 November 2025`
      template += `\nTime: 12:00 PM - 13.30 PM`
      template += `\nPlace: Hai Kou Restaurant Wajir`
      template += `\nJl. Kol. Sugiono No. 14D`
      template += `\n\nWe'd love for you to be part of our big day!`
      template += `\nCheck out our engagement invitation here & We kindly request your response to confirm your attendance.❤️`
      template += `\n${text}`
      await navigator.clipboard.writeText(template);
      showToast("Link copied");
    } catch {
      prompt("Copy the link:", text);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please complete required fields.");
      return;
    }

    console.log('here on click save')

    setCreating(true);
    setError(null);

    try {
      // For backward compatibility with existing API, map the first event to top-level fields
      const first = events[0] || { location, dateTime, maps: "", eventType };

      const form = {
        // New shape
        events: events.map((ev) => ({
          title: ev.title,
          eventType: ev.eventType,
          location: ev.location.trim(),
          locationAddress: ev.locationAddress?.trim(),
          dateTime: ev.dateTime,
          mapUrl: ev.mapUrl,
        })),
        hideRSVP,
        // Legacy fields (can remove once API updated)
        eventType: first.eventType ?? eventType,
        location: first.location ?? location.trim(),
        dateTime: first.dateTime ?? dateTime,
        mapUrl: first.mapUrl ?? "",
        gifts: gifts
          .filter((g) => g.bankName || g.accountName || g.accountNumber)
          .map((g) => ({
            bankName: g.bankName.trim(),
            accountName: g.accountName.trim(),
            accountNumber: g.accountNumber.trim(),
          })),
        guests: guestInputs.filter((g) => g.name.trim()).map((g) => ({ name: g.name.trim() })),
      };
      const newBody = {
        ...form,
        date: form.dateTime?.split('T')[0],
        time: form.dateTime?.split('T')[1]
      }
      console.log('here form', newBody)

      // const res = await fetch("/api/invitations-update", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      const data = await updateInvitation(
        invitationid,  
        newBody
      )

      loadInvitation()

      // const data = await res.json();
      // if (!res.ok) throw new Error(data?.error || "Failed to create");

      // setCreatedId(data._id);
      // setCreatedGuests(data.guests);
      showToast("Invitation created");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Something went wrong");
    } finally {
      setCreating(false);
    }
  };

  const deleteGuest = async (_id: string) => {
    if (_id) { 
      await deleteInvitation(_id)
      loadInvitation()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-2xl font-semibold tracking-tight">Wedding Invitation Information</h1>
          <p className="text-sm text-gray-600 mt-1">Fill the event details, gift info, and guest list. We’ll generate unique links for each guest.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        {/* Section: Event Details */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-medium">Event Details</h2>
              <p className="text-sm text-gray-600">Add one or more events (e.g., Akad, Reception). Each event supports its own location, date/time, and Google Maps URL.</p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-1 ring-1 ring-indigo-200">Required</span>
          </div>

          <div className="space-y-5">
            {events.map((ev, idx) => (
              <div key={ev._id} className="rounded-2xl border border-gray-200 p-4">
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => removeEvent(ev._id || '')}
                    className="self-end inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    aria-label="Remove event"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WIInput
                      type="text"
                      label="Title"
                      value={ev.title}
                      onChange={(e) => setEventField(ev._id || '', "title", e.target.value)}
                      placeholder={`Event ${idx + 1} (e.g., Akad / Reception)`}
                      className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    />
                    <div className="flex-1 md:w-48">
                      <label className="block text-xs text-gray-500">Type</label>
                      <select
                        value={ev.eventType}
                        onChange={(e) => setEventField(ev._id || '', "eventType", e.target.value)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 mt-2 px-3 py-3 capitalize"
                      >
                        <option value="other">Other</option>
                        <option value="wedding">Wedding</option>
                        <option value="reception">Reception</option>
                      </select>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-rose-600">*</span></label>
                    <WIInput
                      type="text"
                      value={ev.location}
                      onChange={(e) => setEventField(ev._id || '', "location", e.target.value)}
                      placeholder="e.g., The Westin Jakarta, Ballroom A"
                      className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Address<span className="text-rose-600">*</span></label>
                    <WIInput
                      type="text"
                      value={ev.locationAddress}
                      onChange={(e) => setEventField(ev._id || '', "locationAddress", e.target.value)}
                      placeholder="e.g., The Westin Jakarta, Ballroom A"
                      className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                      // required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time <span className="text-rose-600">*</span></label>
                    <WIInput
                      type="datetime-local"
                      value={ev.dateTime}
                      onChange={(e) => setEventField(ev._id || '', "dateTime", e.target.value)}
                      className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                      required
                    />
                  </div>
                </div>

                {/* Google Maps URL */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps URL / Address</label>
                  <WIInput
                    type="text"
                    value={ev.mapUrl}
                    onChange={(e) => setEventField(ev._id || '', "mapUrl", e.target.value)}
                    placeholder="Paste a Google Maps share link or type the full address"
                    className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                  />
                  {ev.mapUrl && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-gray-200">
                          <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(ev.mapUrl)}&output=embed`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-full w-full"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-1 flex md:items-start">
                        <a
                          href={/^https?:\/\//i.test(ev.mapUrl) ? ev.mapUrl : `https://www.google.com/maps?q=${encodeURIComponent(ev.mapUrl)}`}
                          target="_blank"
                          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEvent}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
            >
              Add Another Event
            </button>
          </div>
        </section>

        {/* Hide RSVP */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <WISwitch
            checked={hideRSVP}
            onChange={setHideRSVP}
            label="Hide guest RSVP"
          />
        </section>

        {/* Section: Wedding Gifts */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium">Wedding Gifts (Bank Transfer)</h2>
              <p className="text-sm text-gray-600">Add one or more bank accounts for optional gifts.</p>
            </div>
            <button
              type="button"
              onClick={addGiftRow}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M12 5v14M5 12h14"/></svg>
              Add Account
            </button>
          </div>

          <div className="space-y-4">
            {gifts.map((g, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-xl border border-gray-200 p-4">
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <WIInput
                    type="text"
                    value={g.bankName}
                    onChange={(e) => handleGiftChange(idx, "bankName", e.target.value)}
                    className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    placeholder="e.g., BCA / Mandiri"
                  />
                </div>
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                  <WIInput
                    type="text"
                    value={g.accountName}
                    onChange={(e) => handleGiftChange(idx, "accountName", e.target.value)}
                    className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    placeholder="e.g., Aditya & Sinta"
                  />
                </div>
                <div className="lg:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <WIInput
                    type="text"
                    value={g.accountNumber}
                    onChange={(e) => handleGiftChange(idx, "accountNumber", e.target.value)}
                    className="w-full rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    placeholder="e.g., 1234567890"
                  />
                </div>
                <div className="lg:col-span-2 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeGiftRow(idx)}
                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/></svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Guests */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-medium">Guests</h2>
              <p className="text-sm text-gray-600">Set the number of guests and input their names. We’ll generate unique links.</p>
            </div>
          </div>

          {/* Counter */}
          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium text-gray-700">How many guests?</label>
            <div className="inline-flex items-center rounded-xl border border-gray-300 overflow-hidden">
              <button type="button" onClick={decGuests} className="px-3 py-2 hover:bg-gray-50">−</button>
              <input
                type="number"
                min={0}
                value={guestCount}
                onChange={(e) => {
                  const n = Math.max(0, parseInt(e.target.value || "0", 10));
                  setGuestCount(n);
                  syncGuestInputs(n);
                }}
                className="w-20 text-center border-x border-gray-300 py-2 focus:outline-none"
              />
              <button type="button" onClick={incGuests} className="px-3 py-2 hover:bg-gray-50">＋</button>
            </div>
          </div>

          {/* Guest inputs */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guestInputs.map((g, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 p-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Guest Name #{idx + 1}</label>
                <WIInput
                  type="text"
                  value={g.name}
                  onChange={(e) => handleGuestNameChange(idx, e.target.value)}
                  placeholder="e.g., Andrew Pratama"
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                />
              </div>
            ))}
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800">{error}</div>
        )}

        {/* Result list */}
        {createdGuests && (
          <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
            <h2 className="text-lg font-medium mb-4">Guest Links</h2>
            <p className="text-sm text-gray-600 mb-4">Invitation ID: <span className="font-mono text-gray-800">{createdId}</span></p>
            <div className="space-y-3">
              {createdGuests.map((g, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl border border-gray-200 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{g.name || `Guest #${i + 1}`}</div>
                    <div className="text-xs text-gray-600 break-all mt-0.5">{g.inviteUrl}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={g.inviteUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(g.inviteUrl, g.name)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteGuest(g._id || '')}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {
          (rsvp && !hideRSVP) && (
          <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
            <h2 className="text-lg font-medium mb-4">Reservation</h2>
            <p className="text-sm text-gray-600 mb-4">Invitation ID: <span className="font-mono text-gray-800">{createdId}</span></p>
            <div className="space-y-3">
              {rsvp.map((g, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl border border-gray-200 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{g.name || `Guest #${i + 1}`}</div>
                    <div className="text-xs text-gray-600 break-all mt-0.5">Total Guest : {g.guestTotal}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sticky action bar */}
        <div className="sticky bottom-0 inset-x-0 border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {createdGuests ? (
                <span>
                  Created <span className="font-medium">{createdGuests.length}</span> guest link{createdGuests.length === 1 ? "" : "s"}.
                </span>
              ) : (
                <span>Ready to generate unique links for your guests.</span>
              )}
            </div>
            <button
              type="submit"
              disabled={creating || !isValid}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
            >
              {creating && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
              )}
              {creating ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="rounded-xl bg-gray-900 text-white px-4 py-2 shadow-lg text-sm">{toast}</div>
        </div>
      )}
    </div>
  );
}