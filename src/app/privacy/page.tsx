export const metadata = { title: "Privacy | Chameleon" };

const ITEMS = [
  {
    q: "What do you collect?",
    a: "Your email address (to sign you in), your home country, preferred language, destination country, school level, academic stage, and your answers to the self-assessment. We don't ask for your name, birthday, school, or location.",
  },
  {
    q: "Who can see my answers?",
    a: "Only you. Your individual responses are never shown to schools, teachers, or other students. The database enforces this: each account can only read its own row.",
  },
  {
    q: "What do you use it for?",
    a: "Only to personalize your profile summary and recommended topics. We don't sell data or show ads.",
  },
  {
    q: "Can I change or delete my data?",
    a: "Yes. Go to your Profile page to review or edit any answer, or to delete everything permanently.",
  },
  {
    q: "What about students under 18?",
    a: "Chameleon is for students aged 13 and older. If you're under 18, please check with a parent or guardian before signing up. We collect the minimum information needed and never use it for advertising.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl pt-4">
      <h1 className="font-display text-4xl font-bold">Privacy, in plain words 🔒</h1>
      <p className="mt-2 text-muted">This is a course prototype. Here&apos;s exactly how your information is handled.</p>
      <div className="mt-6 space-y-4">
        {ITEMS.map((i) => (
          <section key={i.q} className="card">
            <h2 className="font-display text-xl font-semibold">{i.q}</h2>
            <p className="mt-1 text-ink/80">{i.a}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
