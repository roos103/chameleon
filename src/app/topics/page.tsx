import { TopicCard } from "@/components/TopicCard";
import { TOPICS } from "@/lib/topics";

export const metadata = { title: "Topics | Chameleon" };

export default function TopicsPage() {
  return (
    <div className="pt-4">
      <h1 className="font-display text-4xl font-bold">Orientation topics 📚</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Short, practical guides to the unwritten rules of school life in the US and Canada.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.map((t) => (
          <TopicCard key={t.slug} topic={t} />
        ))}
      </div>
    </div>
  );
}
