# 🦎 Project Chameleon

Helps international high school and university students adapt to classroom expectations and social norms in the US and Canada.

This first version implements the **Cultural Onboarding & Student Profile** feature from the PRD:

- Intro explaining what's collected and why
- Sign-in with Google or an email magic link (Supabase Auth)
- Basics: home country, language, destination, school level, academic stage
- 20 skippable self-assessment questions across 5 communication dimensions
- Review step, then a welcome page with a profile summary and 2–3 recommended topics
- Progress saved automatically; students can edit or delete everything
- Country-specific notes for 10 countries, with general guidance as the fallback
- 8 orientation topic guides, personalized by destination and school level

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase keys the app runs in **demo mode** (simulated sign-in, data in the browser).

To use real sign-in, copy `.env.example` to `.env.local` and fill in your Supabase keys. Full setup steps are in [SETUP.md](SETUP.md).

## Where things live

| Path | What |
|---|---|
| `src/lib/questions.ts` | Self-assessment questions and scoring |
| `src/lib/topics.ts` | Orientation topic content |
| `src/lib/countries.ts` | Country-specific notes |
| `src/lib/recommend.ts` | How the 2–3 topics are picked |
| `src/lib/store.ts` | Sign-in and saving (Supabase, or localStorage in demo mode) |
| `supabase/schema.sql` | Database table and privacy rules |
