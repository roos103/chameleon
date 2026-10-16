"use client";

import { useEffect, useState } from "react";
import { destinationLabel, levelLabel } from "@/lib/places";
import { loadProfile } from "@/lib/store";
import type { Basics, Destination, Level } from "@/lib/types";
import { useAuth } from "./AuthProvider";

/** Shows the destination/level notes for this student, or all of them for visitors. */
export function PersonalNotes({
  destination,
  level,
}: {
  destination?: Partial<Record<Destination, string>>;
  level?: Partial<Record<Level, string>>;
}) {
  const { user } = useAuth();
  const [basics, setBasics] = useState<Basics | null>(null);

  useEffect(() => {
    if (!user) return;
    loadProfile(user.id)
      .then((p) => setBasics(p?.basics ?? null))
      .catch(() => setBasics(null));
  }, [user]);

  const notes: { title: string; text: string }[] = [];
  for (const [k, text] of Object.entries(destination ?? {}) as [Destination, string][]) {
    if (!basics?.destination || basics.destination === k) notes.push({ title: `In ${destinationLabel(k)}`, text });
  }
  for (const [k, text] of Object.entries(level ?? {}) as [Level, string][]) {
    if (!basics?.level || basics.level === k) notes.push({ title: `For ${levelLabel(k).toLowerCase()} students`, text });
  }
  if (!notes.length) return null;

  return (
    <section className="card">
      <h2 className="font-display text-2xl font-semibold">📍 {basics ? "For you specifically" : "Depends on where you are"}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {notes.map((n) => (
          <div key={n.title} className="rounded-2xl bg-sky-light/60 p-4">
            <p className="text-xs font-bold text-sky uppercase">{n.title}</p>
            <p className="mt-1">{n.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
