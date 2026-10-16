"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isDemo, signOut } from "@/lib/store";
import { useAuth } from "./AuthProvider";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-leaf via-sky to-grape text-2xl shadow-[0_3px_0_0_rgba(31,42,55,0.15)]">
        🦎
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Chameleon
      </span>
    </Link>
  );
}

export function Header() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      {isDemo && (
        <div className="bg-sun-light px-4 py-1.5 text-center text-xs font-semibold text-amber-800">
          Demo mode: sign-in is simulated and your answers stay in this browser only.
        </div>
      )}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-3">
          <Link href="/topics" className="rounded-full px-3 py-2 hover:bg-white">
            Topics
          </Link>
          {user ? (
            <>
              <Link href="/welcome" className="rounded-full px-3 py-2 hover:bg-white">
                My page
              </Link>
              <Link href="/profile" className="rounded-full px-3 py-2 hover:bg-white">
                Profile
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className="cursor-pointer rounded-full px-3 py-2 text-muted hover:bg-white"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-ink px-4 py-2 text-white hover:bg-ink/90">
              Sign in
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
