import Link from "next/link";
import { COLOR_CLASSES, type Topic } from "@/lib/topics";

export function TopicCard({ topic, why }: { topic: Topic; why?: string }) {
  const c = COLOR_CLASSES[topic.color];
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="card group flex flex-col transition hover:-translate-y-1 hover:shadow-[0_10px_0_0_rgba(31,42,55,0.08)]"
    >
      <div className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl text-3xl ${c.bg}`}>{topic.emoji}</div>
      <h3 className="font-display text-lg leading-snug font-semibold">{topic.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{topic.blurb}</p>
      {why && <p className={`mt-3 rounded-xl px-3 py-2 text-xs font-semibold ${c.bg} ${c.text}`}>✨ {why}</p>}
      <span className="mt-4 text-sm font-bold text-leaf-dark group-hover:underline">Read the guide →</span>
    </Link>
  );
}
