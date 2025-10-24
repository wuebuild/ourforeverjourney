"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WIInput } from "@/components/ui/molecules/WIInput";
// import { apiPost } from "@/lib/api-client";

function RegisterForm () {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (password !== confirm) {
      setErr("Passwords do not match");
      return;
    }

    // startTransition(async () => {
    //   try {
    //     await apiPost("/auth/register", { name, email, password });
    //     router.replace("/login?registered=1");
    //   } catch (e: any) {
    //     setErr(e.message || "Registration failed");
    //   }
    // });
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <WIInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <WIInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <WIInput
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border-gray-300 px-3 py-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Minimum 8 characters"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-2 my-1 rounded-lg px-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <WIInput
          type={show ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-xl border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Repeat password"
          required
          minLength={8}
        />
      </div>

      {err && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{err}</div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-pink-600 px-4 py-2.5 text-white shadow-sm hover:bg-pink-700 disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create account"}
      </button>
    </form>
  )
}


export default function RegisterPage() {

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">Start creating and sharing invitations.</p>

        <Suspense fallback={<div className="mt-6 text-sm text-gray-600">Loading…</div>}>
          <RegisterForm />
        </Suspense>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-pink-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}