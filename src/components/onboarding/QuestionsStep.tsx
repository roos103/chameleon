"use client";

import { QUESTION_PAGES, QUESTIONS, QUESTIONS_PER_PAGE, SCALE } from "@/lib/questions";
import type { Answer, Profile, ProfilePatch } from "@/lib/types";

export function QuestionsStep({
  profile,
  onChange,
  onBack,
  onDone,
  fromReview,
}: {
  profile: Profile;
  onChange: (patch: ProfilePatch) => void;
  onBack: () => void;
  onDone: () => void;
  fromReview: boolean;
}) {
  const page = Math.min(profile.questionPage, QUESTION_PAGES - 1);
  const start = page * QUESTIONS_PER_PAGE;
  const pageQuestions = QUESTIONS.slice(start, start + QUESTIONS_PER_PAGE);
  const isLast = page === QUESTION_PAGES - 1;

  const setAnswer = (id: string, a: Answer) => onChange((p) => ({ answers: { ...p.answers, [id]: a } }));

  // Anything left blank on this page counts as skipped when moving on.
  function next() {
    onChange((p) => {
      const answers = { ...p.answers };
      for (const q of pageQuestions) if (answers[q.id] === undefined) answers[q.id] = "skip";
      return { answers, questionPage: isLast || fromReview ? page : page + 1 };
    });
    if (isLast || fromReview) onDone();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    if (page === 0) onBack();
    else onChange({ questionPage: page - 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-4">
      <div className="card !pb-4">
        <p className="text-sm font-bold text-grape">
          Page {page + 1} of {QUESTION_PAGES}
        </p>
        <h1 className="font-display text-2xl font-bold">How much do you agree?</h1>
        <p className="text-muted">
          Think about how you usually feel at school. There are no right answers, and you can skip anything.
        </p>
      </div>

      {pageQuestions.map((q, i) => {
        const current = profile.answers[q.id];
        return (
          <fieldset key={q.id} className="card">
            <legend className="sr-only">Question {start + i + 1}</legend>
            <p className="font-display text-lg font-semibold">
              <span className="mr-2 text-muted">{start + i + 1}.</span>
              {q.text}
            </p>
            <div className="mt-4 grid grid-cols-5 gap-1.5 sm:gap-2">
              {SCALE.map((s) => {
                const selected = current === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setAnswer(q.id, s.value)}
                    className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 px-1 py-2.5 text-xs font-semibold transition sm:text-sm ${
                      selected
                        ? "scale-[1.03] border-grape bg-grape-light text-grape"
                        : "border-ink/10 bg-white text-ink/80 hover:border-grape/40"
                    }`}
                  >
                    <span className="text-2xl">{s.short}</span>
                    <span className="leading-tight">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => setAnswer(q.id, "skip")}
                className={`cursor-pointer text-sm font-semibold ${current === "skip" ? "text-grape" : "text-muted hover:text-ink"}`}
              >
                {current === "skip" ? "Skipped ✓" : "Skip this question"}
              </button>
            </div>
          </fieldset>
        );
      })}

      <div className="flex items-center justify-between pt-2">
        <button onClick={back} className="btn-secondary">
          ← Back
        </button>
        <button onClick={next} className="btn-primary">
          {isLast || fromReview ? "Review my answers →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
