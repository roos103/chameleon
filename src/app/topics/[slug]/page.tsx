import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonalNotes } from "@/components/PersonalNotes";
import { COLOR_CLASSES, topicBySlug, TOPICS } from "@/lib/topics";

// Every topic is pre-rendered at build time, so waiting on the slug is fine.
export const instant = false;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps<"/topics/[slug]">) {
  const { slug } = await props.params;
  return { title: `${topicBySlug(slug)?.title ?? "Topic"} | Chameleon` };
}

export default async function TopicPage(props: PageProps<"/topics/[slug]">) {
  const { slug } = await props.params;
  const topic = topicBySlug(slug);
  if (!topic) notFound();
  const c = COLOR_CLASSES[topic.color];

  return (
    <article className="mx-auto max-w-3xl space-y-6 pt-4">
      <Link href="/topics" className="text-sm font-semibold text-muted hover:text-ink">
        ← All topics
      </Link>

      <header className={`card ${c.bg} !ring-0`}>
        <div className="text-6xl">{topic.emoji}</div>
        <h1 className="mt-3 font-display text-4xl font-bold">{topic.title}</h1>
        <p className="mt-2 text-lg text-ink/80">{topic.blurb}</p>
      </header>

      {topic.sections.map((s) => (
        <section key={s.heading} className="card">
          <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
          <ul className="mt-3 space-y-3">
            {s.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${c.bg} ring-4 ${c.ring}`} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {topic.phrases && (
        <section className="card">
          <h2 className="font-display text-2xl font-semibold">🗨️ Handy phrases</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {topic.phrases.map((p) => (
              <div key={p.say} className="rounded-2xl bg-background p-4">
                <p className="font-display text-lg font-semibold">&ldquo;{p.say}&rdquo;</p>
                <p className="mt-1 text-xs font-bold text-muted uppercase">{p.when}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <PersonalNotes destination={topic.destination} level={topic.level} />

      <section className="card border-2 border-dashed border-leaf bg-leaf-light/40">
        <h2 className="font-display text-xl font-semibold">🎯 Try this</h2>
        <p className="mt-1">{topic.tryThis}</p>
      </section>
    </article>
  );
}
