// /app/myinvitation/page.tsx
// import { dbConnect } from "@/lib/db";
// import Invitation from "@/models/Invitation";
import Link from "next/link";
import { cookies } from "next/headers"; // or getServerSession if using NextAuth
import { redirect } from "next/navigation";

function formatDate(d: Date) {
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "-";
  }
}

// Replace this with your real user session getter
async function getUserIdFromSession(): Promise<string | null> {
  // Generic cookie example; switch to NextAuth if you use it:
  const jar = cookies();
  const userId = (await jar).get("userId")?.value || null; // set this at login
  return userId;
}

export default async function MyInvitationPage() {
  const userId = await getUserIdFromSession();
  // Middleware should’ve redirected already, but double-guard:
  if (!userId) {
    redirect(`/login?next=${encodeURIComponent("/myinvitation")}`);
  }

//   await dbConnect();
//   const items = await Invitation
//     .find({ userId })
//     .sort({ createdAt: -1 })
//     .lean();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My Invitations</h1>
            <p className="text-sm text-gray-600 mt-1">Create and manage your wedding invitations.</p>
          </div>

          <Link
            href="/invitations/new"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-white shadow-sm hover:bg-indigo-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            New Invitation
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {[].length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-indigo-50 text-indigo-700 grid place-content-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <h2 className="text-lg font-medium">No invitations yet</h2>
            <p className="text-sm text-gray-600 mt-1">Start by creating your first invitation.</p>
            <Link
              href="/invitations/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-white shadow-sm hover:bg-indigo-700"
            >
              Create Invitation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[].map((inv: any) => {
              const id = String(inv._id);
              const dt = formatDate(inv.dateTime);
              const guestsCount = (inv.guests || []).length;

              return (
                <div key={id} className="group rounded-2xl bg-white ring-1 ring-gray-200 hover:ring-indigo-200 shadow-sm transition">
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700 ring-1 ring-indigo-200 capitalize">
                          {inv.eventType || "both"}
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2">
                          {inv.location}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">{dt}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{guestsCount}</span> guest{guestsCount === 1 ? "" : "s"}
                      </div>
                      <div className="text-xs text-gray-500">
                        Created {formatDate(inv.createdAt)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-between gap-2">
                      <Link
                        href={`/myinvitation/${id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        Manage
                      </Link>

                      {/* Optional: quick open guest page if you keep public landing at /invite/[id] */}
                      <Link
                        href={`/invite/${id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        Public Page
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
