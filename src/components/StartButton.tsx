"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export function StartButton() {
  const { user } = useAuth();
  return (
    <Link href={user ? "/onboarding" : "/login"} className="btn-primary text-lg">
      {user ? "Continue where I left off →" : "Get started →"}
    </Link>
  );
}
