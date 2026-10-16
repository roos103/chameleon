"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRequireUser } from "@/components/AuthProvider";
import { Loading, LoadError } from "@/components/Loading";
import { TopicCard } from "@/components/TopicCard";
import { COUNTRY_NOTES } from "@/lib/countries";
import { Flag } from "@/components/Flag";
import { countryName, destinationLabel, levelLabel, PREFER_NOT_TO_SAY, stageLabel } from "@/lib/places";
import { DIMENSIONS, scoreDimensions, scoreLabel, type Dimension } from "@/lib/questions";
import { recommend } from "@/lib/recommend";
import { loadProfile } from "@/lib/store";
import type { Profile } from "@/lib/types";

const TONE = {
  leaf: { bar: "bg-leaf", chip: "bg-leaf-light text-leaf-dark" },
  sun: { bar: "bg-sun", chip: "bg-sun-light text-amber-800" },
  grape: { bar: "bg-grape", chip: "bg-grape-light text-grape" },
  muted: { bar: "bg-ink/10", chip: "bg-ink/5 text-muted" },
};

export default function WelcomePage() {
  const { user } = useRequireUser();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadProfile(user.id)
      .then((p) => (p?.completed ? setProfile(p) : router.replace("/onboarding")))
      .catch(() => setError(true));
  }, [user, router]);

  if (error) return <LoadError />;
  if (!user || !profile) return <Loading />;

  const b = profile.basics;
  const picks = recommend(profile);
  const scores = scoreDimensions(profile.answers);
  const notes = COUNTRY_NOTES[b.country];
  const firstName = user.name?.split(" ")[0] ?? user.email.split("@")[0];
  const from = b.country === PREFER_NOT_TO_SAY ? "" : countryName(b.country);

  return (
    <div className="space-y-8 pt-4">
      <section className="card relative overflow-hidden bg-gradient-to-br from-leaf to-sky !p-8 text-white">
        <div className="absolute -top-6 -right-4 rotate-12 text-[8rem] opacity-30 select-none">🦎</div>
        <p className="font-semibold text-white/80">Your profile is ready</p>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Welcome, {firstName}!</h1>
        <p className="mt-3 text-lg">
          {from && (
            <>
              <Flag code={b.country} /> {from} →{" "}
            </>
          )}
          <Flag code={b.destination} /> {destinationLabel(b.destination)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-white/20 px-3 py-1">{levelLabel(b.level)}</span>
          <span className="rounded-full bg-white/20 px-3 py-1">{stageLabel(b.stage)}</span>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Your starter topics</h2>
        <p className="text-muted">Picked from your answers. Start with whichever sounds most useful.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {picks.map((p) => (
            <TopicCard key={p.topic.slug} topic={p.topic} why={p.why} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card">
          <h2 className="font-display text-xl font-bold">Your communication snapshot</h2>
          <p className="text-sm text-muted">How familiar local school norms feel to you right now. This isn&apos;t a grade, and it will change!</p>
          <ul className="mt-4 space-y-3">
            {(Object.keys(DIMENSIONS) as Dimension[]).map((d) => {
              const s = scores[d];
              const label = scoreLabel(s);
              return (
                <li key={d}>
                  <div className="mb-1 flex items-center justify-between text-sm font-semibold">
                    <span>
                      {DIMENSIONS[d].emoji} {DIMENSIONS[d].label}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs ${TONE[label.tone].chip}`}>{label.text}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink/5">
                    <div
                      className={`h-full rounded-full ${TONE[label.tone].bar}`}
                      style={{ width: s === null ? "0%" : `${((s - 1) / 4) * 85 + 15}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card">
          {notes ? (
            <>
              <h2 className="font-display text-xl font-bold">
                <Flag code={b.country} /> Things students from {from} sometimes notice
              </h2>
              <p className="text-sm text-muted">Everyone is different. Your own answers matter more than your passport.</p>
              <ul className="mt-4 space-y-3">
                {notes.notice.map((n) => (
                  <li key={n} className="flex gap-3 rounded-2xl bg-background p-3 text-sm">
                    <span>💡</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold">
                🌎 General tips for {levelLabel(b.level).toLowerCase()} students in {destinationLabel(b.destination)}
              </h2>
              <p className="text-sm text-muted">
                {from ? `We don't have notes specific to ${from} yet, so here's` : "Here's"} guidance that helps every new student.
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <GeneralTip href="/topics/everyday-life">Learn the everyday norms: tipping, time, and personal space.</GeneralTip>
                <GeneralTip href="/topics/teachers-professors">How to address and email your teachers.</GeneralTip>
                <GeneralTip href="/topics/academic-expectations">The unwritten (and written) rules of studying here.</GeneralTip>
              </ul>
            </>
          )}
        </section>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/topics" className="btn-primary">
          Browse all topics
        </Link>
        <Link href="/onboarding?edit=1" className="btn-secondary">
          Edit my answers
        </Link>
      </div>
    </div>
  );
}

function GeneralTip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="flex gap-3 rounded-2xl bg-background p-3 hover:ring-2 hover:ring-leaf/40">
        <span>👉</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
