"use client";

import { useState } from "react";
import { BasicsSummary } from "@/components/BasicsSummary";
import { answerLabel, QUESTION_PAGES, QUESTIONS, QUESTIONS_PER_PAGE } from "@/lib/questions";
import type { Profile } from "@/lib/types";

export function ReviewStep({
  profile,
  onEditBasics,
  onEditPage,
  onFinish,
}: {
  profile: Profile;
  onEditBasics: () => void;
  onEditPage: (page: number) => void;
  onFinish: () => Promise<void>;
}) {
  const [finishing, setFinishing] = useState(false);
  const answered = QUESTIONS.filter((q) => typeof profile.answers[q.id] === "number").length;

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="font-display text-3xl font-bold">Almost there! 🎉</h1>
        <p className="mt-1 text-muted">
          Take a quick look. You answered {answered} of {QUESTIONS.length} questions. Change anything you like, then see your
          results.
        </p>
      </div>

      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">About you</h2>
          <button onClick={onEditBasics} className="cursor-pointer text-sm font-semibold text-leaf-dark hover:underline">
            Edit
          </button>
        </div>
        <BasicsSummary basics={profile.basics} />
      </div>

      {Array.from({ length: QUESTION_PAGES }, (_, page) => (
        <div key={page} className="card">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Questions, page {page + 1}</h2>
            <button onClick={() => onEditPage(page)} className="cursor-pointer text-sm font-semibold text-leaf-dark hover:underline">
              Edit
            </button>
          </div>
          <ul className="divide-y divide-ink/5">
            {QUESTIONS.slice(page * QUESTIONS_PER_PAGE, (page + 1) * QUESTIONS_PER_PAGE).map((q) => {
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
      ))}

      <div className="flex justify-end pt-2">
        <button
          disabled={finishing}
          onClick={async () => {
            setFinishing(true);
            await onFinish();
          }}
          className="btn-primary text-lg"
        >
          {finishing ? "Building your page…" : "Looks good, show my topics ✨"}
        </button>
      </div>
    </div>
  );
}
