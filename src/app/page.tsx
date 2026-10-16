import Link from "next/link";
import { Flag } from "@/components/Flag";
import { StartButton } from "@/components/StartButton";

const STEPS = [
  { emoji: "🧭", title: "Tell us about you", text: "Where you're from, where you're headed, and where you are in your journey.", color: "bg-leaf-light" },
  { emoji: "💭", title: "Answer 20 quick questions", text: "About how you like to communicate. No right or wrong answers, and you can skip any.", color: "bg-grape-light" },
  { emoji: "🎁", title: "Get your starter topics", text: "A profile summary and 2–3 guides picked for you, like speaking up in class or making friends.", color: "bg-sun-light" },
];

const COLLECT = [
  { what: "Home country & preferred language", why: "So we can add notes relevant to where you're coming from." },
  { what: "Destination, school level & stage", why: "Advice for a first-year university student in Canada differs from a high schooler in the US." },
  { what: "Your communication preferences", why: "So we can suggest topics that fit you, instead of guessing from your passport." },
];

export default function Home() {
  return (
    <div className="space-y-16 pt-6">
      <section className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-leaf-dark ring-1 ring-leaf/30">
            For international students in the <Flag code="US" /> US & <Flag code="CA" /> Canada
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            Adapt like a <span className="bg-gradient-to-r from-leaf via-sky to-grape bg-clip-text text-transparent">chameleon</span>, stay
            totally you.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            New school, new country, new unwritten rules. Chameleon helps you decode classroom expectations and social norms, with
            guidance based on <em>your</em> answers, not stereotypes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StartButton />
            <Link href="/topics" className="btn-secondary">
              Browse topics
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted">⏱️ Takes about 8–10 minutes · your progress is saved automatically</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 animate-[spin_30s_linear_infinite] rounded-[40%] bg-gradient-to-br from-leaf via-sky to-grape opacity-90" />
          <div className="absolute inset-6 grid place-items-center rounded-[38%] bg-background text-[9rem]">🦎</div>
          <span className="absolute top-4 -left-2 rotate-[-8deg] rounded-2xl bg-white px-3 py-2 text-sm font-semibold shadow">
            🙋 Speak up in class
          </span>
          <span className="absolute right-0 bottom-10 rotate-[6deg] rounded-2xl bg-white px-3 py-2 text-sm font-semibold shadow">
            ☕ Make new friends
          </span>
          <span className="absolute -bottom-2 left-6 rotate-[-4deg] rounded-2xl bg-white px-3 py-2 text-sm font-semibold shadow">
            📧 Email a professor
          </span>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card">
              <div className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl text-2xl ${s.color}`}>{s.emoji}</div>
              <p className="text-sm font-bold text-muted">Step {i + 1}</p>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="font-display text-2xl font-bold">🔒 What we&apos;ll ask, and why</h2>
        <ul className="mt-4 divide-y divide-ink/5">
          {COLLECT.map((c) => (
            <li key={c.what} className="grid gap-1 py-3 sm:grid-cols-[1fr_1.4fr] sm:gap-6">
              <span className="font-semibold">{c.what}</span>
              <span className="text-muted">{c.why}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          We never ask for your name, birthday, or school. Your answers are private: schools and other students can&apos;t see
          them, and you can edit or delete them any time. <Link href="/privacy" className="font-semibold text-leaf-dark underline">Read more</Link>
        </p>
      </section>
    </div>
  );
}
