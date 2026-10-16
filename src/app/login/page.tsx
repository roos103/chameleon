"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { isDemo, signInDemo, signInWithEmail, signInWithGoogle } from "@/lib/store";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) router.replace("/onboarding");
  }, [loading, user, router]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (isDemo) {
      signInDemo(email);
      return;
    }
    setStatus("sending");
    try {
      await signInWithEmail(email);
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  async function handleGoogle() {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-md pt-10">
      <div className="card">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-3xl bg-leaf-light text-4xl">🦎</div>
          <h1 className="font-display text-3xl font-bold">Welcome!</h1>
          <p className="mt-1 text-muted">Sign in so we can save your progress and keep your answers private.</p>
        </div>

        {status === "sent" ? (
          <div className="rounded-2xl bg-leaf-light p-5 text-center">
            <p className="text-3xl">📬</p>
            <p className="mt-2 font-display text-lg font-semibold">Check your inbox</p>
            <p className="text-sm text-muted">
              We sent a sign-in link to <strong>{email}</strong>. Open it on this device to continue.
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogle}
              disabled={isDemo}
              title={isDemo ? "Available once Supabase is connected" : undefined}
              className="btn-secondary w-full"
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-xs font-semibold text-muted uppercase">
              <span className="h-px flex-1 bg-ink/10" /> or use your email <span className="h-px flex-1 bg-ink/10" />
            </div>

            <form onSubmit={handleEmail} className="space-y-3">
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className="input"
              />
              <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
                {isDemo ? "Continue (demo)" : status === "sending" ? "Sending…" : "Email me a magic link ✨"}
              </button>
            </form>
          </>
        )}

        {error && <p className="mt-4 rounded-xl bg-coral-light p-3 text-sm text-red-700">{error}</p>}

        <p className="mt-6 text-center text-xs text-muted">
          No passwords needed. By continuing you confirm you&apos;re 13 or older. If you&apos;re under 18, please check with a parent or
          guardian first.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
