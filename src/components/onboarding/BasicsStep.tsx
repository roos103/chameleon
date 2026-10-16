"use client";

import {
  COUNTRIES,
  DESTINATIONS,
  LANGUAGES,
  LEVELS,
  OTHER_LANGUAGE,
  PREFER_NOT_TO_SAY,
  STAGES,
} from "@/lib/places";
import type { Basics, Profile, ProfilePatch } from "@/lib/types";
import { Choice } from "./Choice";

export function BasicsStep({
  profile,
  onChange,
  onNext,
}: {
  profile: Profile;
  onChange: (patch: ProfilePatch) => void;
  onNext: () => void;
}) {
  const b = profile.basics;
  const set = (patch: Partial<Basics>) => onChange((p) => ({ basics: { ...p.basics, ...patch } }));
  const complete = profile.consent && b.country && b.language && b.destination && b.level && b.stage;

  return (
    <div className="card space-y-7">
      <div>
        <h1 className="font-display text-3xl font-bold">Let&apos;s get to know you 👋</h1>
        <p className="mt-1 text-muted">Five quick questions about where you&apos;re from and where you&apos;re going.</p>
      </div>

      <div className="rounded-2xl bg-sky-light/70 p-4 text-sm">
        <p className="font-semibold">🔒 Before we start</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink/80">
          <li>We&apos;ll ask about your background, your school, and how you like to communicate.</li>
          <li>We use it only to suggest topics for you. Schools and other students never see your answers.</li>
          <li>You can skip any self-assessment question, and edit or delete everything later.</li>
        </ul>
        <label className="mt-3 flex cursor-pointer items-center gap-2 font-semibold">
          <input
            type="checkbox"
            checked={profile.consent}
            onChange={(e) => onChange({ consent: e.target.checked })}
            className="h-5 w-5 accent-leaf"
          />
          Sounds good, I understand how my answers are used.
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="label">
            🌍 Where are you from?
          </label>
          <select id="country" value={b.country} onChange={(e) => set({ country: e.target.value })} className="input">
            <option value="">Choose a country…</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
            <option value={PREFER_NOT_TO_SAY}>Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="language" className="label">
            🗣️ Preferred language
          </label>
          <select id="language" value={b.language} onChange={(e) => set({ language: e.target.value })} className="input">
            <option value="">Choose a language…</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
            <option value={OTHER_LANGUAGE}>Another language</option>
          </select>
        </div>
      </div>

      <Field label="📍 Where are you studying?">
        <Choice name="Destination" options={DESTINATIONS} value={b.destination} onChange={(v) => set({ destination: v as Basics["destination"] })} />
      </Field>
      <Field label="🏫 School level">
        <Choice name="School level" options={LEVELS} value={b.level} onChange={(v) => set({ level: v as Basics["level"] })} />
      </Field>
      <Field label="🗓️ Where are you in your journey?">
        <Choice name="Academic stage" options={STAGES} value={b.stage} onChange={(v) => set({ stage: v as Basics["stage"] })} />
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-ink/5 pt-5">
        {!complete && <span className="text-sm text-muted">Fill in everything above to continue</span>}
        <button onClick={onNext} disabled={!complete} className="btn-primary">
          Continue →
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label">{label}</p>
      {children}
    </div>
  );
}
