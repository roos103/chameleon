export type Destination = "US" | "CA";
export type Level = "highschool" | "university";
export type Stage = "pre-arrival" | "first-term" | "returning";

export type Basics = {
  country: string; // ISO 3166 alpha-2 code
  language: string; // ISO 639-1 code
  destination: Destination | "";
  level: Level | "";
  stage: Stage | "";
};

/** 1–5 agreement, or "skip" when the student chose to skip. Missing = not seen yet. */
export type Answer = 1 | 2 | 3 | 4 | 5 | "skip";

export type Step = "basics" | "questions" | "review" | "done";

export type Profile = {
  consent: boolean;
  basics: Basics;
  answers: Record<string, Answer>;
  step: Step;
  questionPage: number;
  completed: boolean;
  updatedAt?: string;
};

/** A partial update, or a function computing one from the latest profile. */
export type ProfilePatch = Partial<Profile> | ((latest: Profile) => Partial<Profile>);

export const emptyProfile = (): Profile => ({
  consent: false,
  basics: { country: "", language: "", destination: "", level: "", stage: "" },
  answers: {},
  step: "basics",
  questionPage: 0,
  completed: false,
});
