"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRequireUser } from "@/components/AuthProvider";
import { BasicsSummary } from "@/components/BasicsSummary";
import { Loading, LoadError } from "@/components/Loading";
import { answerLabel, QUESTIONS } from "@/lib/questions";
import { deleteProfile, loadProfile, signOut } from "@/lib/store";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const { user } = useRequireUser();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [error, setError] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadProfile(user.id)
      .then(setProfile)
      .catch(() => setError(true));
  }, [user]);

  if (error) return <LoadError />;
  if (!user || profile === undefined) return <Loading />;

  async function handleDelete() {
    if (!user) return;
    setDeleting(true);
    try {
      await deleteProfile(user.id);
      router.replace("/");
      await signOut();
    } catch {
      setDeleting(false);
      setError(true);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 pt-4">
      <div>
        <h1 className="font-display text-4xl font-bold">Your profile</h1>
        <p className="mt-1 text-muted">
          Signed in as <strong>{user.email}</strong>. Only you can see this page.
        </p>
      </div>

      {!profile ? (
        <div className="card text-center">
          <p className="text-4xl">🌱</p>
          <p className="mt-2 font-semibold">You haven&apos;t started onboarding yet.</p>
          <Link href="/onboarding" className="btn-primary mt-4">
            Start now
          </Link>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">About you</h2>
              <Link href="/onboarding?edit=1" className="text-sm font-semibold text-leaf-dark hover:underline">
                Edit answers
              </Link>
            </div>
            <BasicsSummary basics={profile.basics} />
            {!profile.completed && (
              <p className="mt-3 rounded-xl bg-sun-light p-3 text-sm">
                You&apos;re partway through onboarding. <Link href="/onboarding" className="font-semibold underline">Pick up where you left off →</Link>
              </p>
            )}
          </div>

          <div className="card">
            <h2 className="font-display text-xl font-semibold">Your self-assessment</h2>
            <ul className="mt-2 divide-y divide-ink/5">
              {QUESTIONS.map((q) => {
                const a = profile.answers[q.id];
                return (
                  <li key={q.id} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <span className="text-sm">{q.text}</span>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        typeof a === "number" ? "bg-grape-light text-grape" : "bg-ink/5 text-muted"
                      }`}
                    >
                      {answerLabel(a)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}

      <div className="card border-2 border-coral/30">
        <h2 className="font-display text-xl font-semibold">🗑️ Delete my data</h2>
        <p className="mt-1 text-sm text-muted">
          This permanently removes all your answers and signs you out. You can always start over later.
        </p>
        {confirming ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-semibold">Are you sure?</span>
            <button onClick={handleDelete} disabled={deleting} className="btn-danger">
              {deleting ? "Deleting…" : "Yes, delete everything"}
            </button>
            <button onClick={() => setConfirming(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirming(true)} className="btn-secondary mt-4 !text-red-700">
            Delete my answers
          </button>
        )}
      </div>
    </div>
  );
}
