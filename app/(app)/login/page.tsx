"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WIInput } from "@/components/ui/molecules/WIInput";
import { WIPasswordInput } from "@/components/ui/molecules/WIPasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/myinvitation";
  const registered = params.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    startTransition(async () => {
      try {
        // await apiPost("/auth/login", { email, password }, { withCredentials: true });
        router.replace(next);
      } catch (e: any) {
        setErr(e.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back! Manage your invitations here.</p>
        {registered && (
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            Account created. Please sign in.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <WIInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            helperText="Use the email you registered with."
            // error={err && "Check your email/password"} // optional inline error
          />

          <WIPasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {err && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-pink-600 px-4 py-2.5 text-white shadow-sm hover:bg-pink-700 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
