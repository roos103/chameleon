import type { Answer } from "./types";

export type Dimension = "participation" | "help" | "directness" | "social" | "independence";

export const DIMENSIONS: Record<Dimension, { label: string; emoji: string; topic: string }> = {
  participation: { label: "Speaking up in class", emoji: "🙋", topic: "class-participation" },
  help: { label: "Asking for help", emoji: "🤝", topic: "asking-for-help" },
  directness: { label: "Direct communication", emoji: "💬", topic: "direct-communication" },
  social: { label: "Making new connections", emoji: "🎉", topic: "making-friends" },
  independence: { label: "Independent learning", emoji: "📚", topic: "academic-expectations" },
};

export type Question = {
  id: string;
  text: string;
  dimension: Dimension;
  /** When true, agreeing means the North American norm feels *less* familiar. */
  reverse?: boolean;
};

// Interleaved so a single page never feels like it's about just one thing.
export const QUESTIONS: Question[] = [
  { id: "p1", dimension: "participation", text: "I feel comfortable sharing my opinion in class, even when I'm not sure it's right." },
  { id: "h1", dimension: "help", text: "If I don't understand something, I would ask my teacher or professor about it." },
  { id: "d1", dimension: "directness", text: "When I disagree with someone, I usually tell them directly." },
  { id: "s1", dimension: "social", text: "I enjoy starting conversations with people I don't know yet." },
  { id: "i1", dimension: "independence", text: "I'm used to planning my own study schedule without reminders." },

  { id: "p2", dimension: "participation", reverse: true, text: "During a class discussion, I would rather listen than speak." },
  { id: "h2", dimension: "help", reverse: true, text: "Asking for help might make me look less capable." },
  { id: "d2", dimension: "directness", reverse: true, text: "I often hint at what I mean instead of saying it outright." },
  { id: "s2", dimension: "social", reverse: true, text: "Small talk (about the weather, weekends, sports) feels awkward or pointless to me." },
  { id: "i2", dimension: "independence", reverse: true, text: "I expect teachers to tell me exactly what will be on the exam." },

  { id: "p3", dimension: "participation", text: "Politely disagreeing with a teacher or classmate in class feels okay to me." },
  { id: "h3", dimension: "help", text: "I would feel comfortable going to office hours or staying after class to ask a question." },
  { id: "d3", dimension: "directness", text: "I'm comfortable saying “no” to a request from a classmate or teacher." },
  { id: "s3", dimension: "social", text: "I would join a club, team, or student group mainly to meet new people." },
  { id: "i3", dimension: "independence", text: "I know the local rules about citing sources and working with classmates on assignments." },

  { id: "p4", dimension: "participation", reverse: true, text: "I prefer to wait until I'm called on before I speak in class." },
  { id: "h4", dimension: "help", reverse: true, text: "I usually try to figure everything out on my own before asking anyone." },
  { id: "d4", dimension: "directness", text: "When someone gives me blunt feedback, I can take it as helpful rather than rude." },
  { id: "s4", dimension: "social", reverse: true, text: "I'd probably spend most of my free time with people who share my language." },
  { id: "i4", dimension: "independence", text: "Keeping track of lots of small assignments and deadlines at once feels manageable." },
];

export const QUESTIONS_PER_PAGE = 5;
export const QUESTION_PAGES = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

export const SCALE = [
  { value: 1, label: "Strongly disagree", short: "😬" },
  { value: 2, label: "Disagree", short: "🙁" },
  { value: 3, label: "Not sure", short: "😐" },
  { value: 4, label: "Agree", short: "🙂" },
  { value: 5, label: "Strongly agree", short: "😄" },
] as const;

export const answerLabel = (a: Answer | undefined) =>
  a === undefined ? "Not answered" : a === "skip" ? "Skipped" : SCALE[a - 1].label;

/**
 * Average comfort with the host-country norm, 1–5, per dimension.
 * `null` when every question in that dimension was skipped.
 */
export function scoreDimensions(answers: Record<string, Answer>): Record<Dimension, number | null> {
  const totals = {} as Record<Dimension, { sum: number; n: number }>;
  for (const d of Object.keys(DIMENSIONS) as Dimension[]) totals[d] = { sum: 0, n: 0 };

  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (a === undefined || a === "skip") continue;
    totals[q.dimension].sum += q.reverse ? 6 - a : a;
    totals[q.dimension].n += 1;
  }

  const scores = {} as Record<Dimension, number | null>;
  for (const d of Object.keys(totals) as Dimension[]) {
    scores[d] = totals[d].n ? totals[d].sum / totals[d].n : null;
  }
  return scores;
}

export function scoreLabel(score: number | null) {
  if (score === null) return { text: "Skipped", tone: "muted" as const };
  if (score >= 3.75) return { text: "Feeling ready", tone: "leaf" as const };
  if (score >= 2.75) return { text: "Getting there", tone: "sun" as const };
  return { text: "Worth exploring", tone: "grape" as const };
}
