"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRequireUser } from "@/components/AuthProvider";
import { Loading, LoadError } from "@/components/Loading";
import { BasicsStep } from "@/components/onboarding/BasicsStep";
import { QuestionsStep } from "@/components/onboarding/QuestionsStep";
import { ReviewStep } from "@/components/onboarding/ReviewStep";
import { QUESTION_PAGES } from "@/lib/questions";
import { loadProfile, saveProfile } from "@/lib/store";
import { emptyProfile, type Profile, type ProfilePatch } from "@/lib/types";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function OnboardingPage() {
  const { user } = useRequireUser();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [fromReview, setFromReview] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mirrors `profile` so quick successive edits always build on the newest version.
  const latest = useRef<Profile | null>(null);
  const show = useCallback((p: Profile) => {
    latest.current = p;
    setProfile(p);
  }, []);

  // Load saved progress (or start fresh). Finished profiles go to the welcome page unless editing.
  useEffect(() => {
    if (!user) return;
    loadProfile(user.id)
      .then((p) => {
        const editing = new URLSearchParams(window.location.search).has("edit");
        if (p?.completed && !editing) {
          router.replace("/welcome");
          return;
        }
        if (p?.completed && editing) {
          setFromReview(true);
          show({ ...p, step: "review" });
        } else {
          show(p ?? emptyProfile());
        }
      })
      .catch(() => setLoadError(true));
  }, [user, router, show]);

  const persist = useCallback(
    async (p: Profile) => {
      if (!user) return;
      setSaveState("saving");
      try {
        await saveProfile(user.id, p);
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    },
    [user],
  );

  // Every change is saved shortly after it happens, so students can leave and come back.
  const update = useCallback(
    (patch: ProfilePatch) => {
      const prev = latest.current;
      if (!prev) return;
      const next = { ...prev, ...(typeof patch === "function" ? patch(prev) : patch) };
      show(next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => persist(next), 400);
    },
    [persist, show],
  );

  if (loadError) return <LoadError />;
  if (!user || !profile) return <Loading />;

  const stageIndex = { basics: 0, questions: 1, review: 2, done: 2 }[profile.step];
  const progress =
    profile.step === "basics" ? 8 : profile.step === "questions" ? 15 + (profile.questionPage / QUESTION_PAGES) * 70 : 92;

  async function finish() {
    if (!profile) return;
    if (timer.current) clearTimeout(timer.current);
    const done: Profile = { ...profile, step: "done", completed: true };
    show(done);
    await persist(done);
    router.push("/welcome");
  }

  return (
    <div className="mx-auto max-w-2xl pt-4">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <div className="flex gap-4">
            {["About you", "Questions", "Review"].map((label, i) => (
              <span key={label} className={i === stageIndex ? "text-leaf-dark" : i < stageIndex ? "text-ink" : "text-muted/60"}>
                {i < stageIndex ? "✓ " : ""}
                {label}
              </span>
            ))}
          </div>
          <SaveBadge state={saveState} />
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white ring-1 ring-ink/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-leaf via-sky to-grape transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {profile.step === "basics" && (
        <BasicsStep
          profile={profile}
          onChange={update}
          onNext={() => update({ step: fromReview ? "review" : "questions" })}
        />
      )}
      {profile.step === "questions" && (
        <QuestionsStep
          profile={profile}
          onChange={update}
          onBack={() => update({ step: "basics" })}
          onDone={() => update({ step: "review" })}
          fromReview={fromReview}
        />
      )}
      {(profile.step === "review" || profile.step === "done") && (
        <ReviewStep
          profile={profile}
          onEditBasics={() => {
            setFromReview(true);
            update({ step: "basics" });
          }}
          onEditPage={(page) => {
            setFromReview(true);
            update({ step: "questions", questionPage: page });
          }}
          onFinish={finish}
        />
      )}
    </div>
  );
}

function SaveBadge({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  const map = {
    saving: { text: "Saving…", cls: "text-muted" },
    saved: { text: "✓ Progress saved", cls: "text-leaf-dark" },
    error: { text: "⚠ Couldn't save, check your connection", cls: "text-red-600" },
  } as const;
  return <span className={`text-xs ${map[state].cls}`}>{map[state].text}</span>;
}
