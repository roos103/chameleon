import { DIMENSIONS, scoreDimensions, type Dimension } from "./questions";
import { topicBySlug, type Topic } from "./topics";
import type { Profile } from "./types";

export type Recommendation = { topic: Topic; why: string };

const STAGE_TOPIC: Record<string, { slug: string; why: string }> = {
  "pre-arrival": { slug: "everyday-life", why: "Handy to know before you land." },
  "first-term": { slug: "teachers-professors", why: "Great for your first weeks of classes." },
  returning: { slug: "group-work", why: "Useful as classes get more collaborative." },
};

const FALLBACK = ["class-participation", "making-friends", "asking-for-help"];

/** Picks 2–3 topics: the areas the student felt least sure about, plus one for where they are in their journey. */
export function recommend(profile: Profile): Recommendation[] {
  const scores = scoreDimensions(profile.answers);
  const picks: Recommendation[] = [];
  const add = (slug: string, why: string) => {
    const topic = topicBySlug(slug);
    if (topic && !picks.some((p) => p.topic.slug === slug)) picks.push({ topic, why });
  };

  (Object.entries(scores) as [Dimension, number | null][])
    .filter(([, s]) => s !== null && s < 3.5)
    .sort((a, b) => (a[1] as number) - (b[1] as number))
    .slice(0, 2)
    .forEach(([dim]) =>
      add(DIMENSIONS[dim].topic, `Based on your answers about ${DIMENSIONS[dim].label.toLowerCase()}.`),
    );

  const stage = STAGE_TOPIC[profile.basics.stage];
  if (stage) add(stage.slug, stage.why);

  for (const slug of FALLBACK) {
    if (picks.length >= 2) break;
    add(slug, "A favorite with students starting out.");
  }

  return picks.slice(0, 3);
}
