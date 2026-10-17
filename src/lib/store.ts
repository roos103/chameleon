import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { emptyProfile, type Profile } from "./types";

// When Supabase keys aren't configured, the app runs in "demo mode":
// sign-in is simulated and data stays in this browser's localStorage.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If sign-in fails, Supabase sends the student back with the reason in the URL
// (e.g. #error_description=...). Grab it before anything else touches the URL so
// the login page can show it.
const AUTH_ERROR_KEY = "chameleon-auth-error";
if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.hash.slice(1) + "&" + window.location.search.slice(1));
  const message = params.get("error_description") ?? params.get("error");
  if (message) sessionStorage.setItem(AUTH_ERROR_KEY, message.replace(/\+/g, " "));
}

/** Returns (and forgets) the last sign-in error, if any. */
export function takeAuthError(): string | null {
  const message = sessionStorage.getItem(AUTH_ERROR_KEY);
  sessionStorage.removeItem(AUTH_ERROR_KEY);
  return message;
}

/** Turns Supabase's technical messages into something a student can act on. */
export function friendlyAuthError(message: string): string {
  if (/rate limit|too many|security purposes/i.test(message)) {
    return "Too many sign-in emails were sent recently. Please wait a few minutes, or use Continue with Google.";
  }
  return `Sign-in didn't work: ${message}`;
}

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, { auth: { flowType: "implicit", detectSessionInUrl: true, persistSession: true } })
    : null;

export const isDemo = !supabase;

export type AppUser = { id: string; email: string; name?: string };

const DEMO_USER_KEY = "chameleon-demo-user";
const demoProfileKey = (id: string) => `chameleon-profile-${id}`;

// ---------- Auth ----------

export async function getUser(): Promise<AppUser | null> {
  if (!supabase) {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    return raw ? (JSON.parse(raw) as AppUser) : null;
  }
  const { data } = await supabase.auth.getSession();
  const u = data.session?.user;
  return u ? toAppUser(u) : null;
}

export function onAuthChange(cb: (user: AppUser | null) => void): () => void {
  if (!supabase) {
    const handler = () => getUser().then(cb);
    window.addEventListener("chameleon-auth", handler);
    return () => window.removeEventListener("chameleon-auth", handler);
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user ? toAppUser(session.user) : null);
  });
  return () => data.subscription.unsubscribe();
}

function toAppUser(u: { id: string; email?: string; user_metadata?: Record<string, unknown> }): AppUser {
  const name = (u.user_metadata?.full_name ?? u.user_metadata?.name) as string | undefined;
  return { id: u.id, email: u.email ?? "", name };
}

const redirectTo = () => `${window.location.origin}/onboarding`;

export async function signInWithGoogle() {
  if (!supabase) throw new Error("Google sign-in needs Supabase to be configured.");
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: redirectTo() },
  });
  if (error) throw error;
}

export async function signInWithEmail(email: string) {
  if (!supabase) throw new Error("Email sign-in needs Supabase to be configured.");
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo() },
  });
  if (error) throw error;
}

export function signInDemo(email: string) {
  const user: AppUser = { id: `demo-${email.toLowerCase()}`, email };
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("chameleon-auth"));
}

export async function signOut() {
  if (!supabase) {
    localStorage.removeItem(DEMO_USER_KEY);
    window.dispatchEvent(new Event("chameleon-auth"));
    return;
  }
  await supabase.auth.signOut();
}

// ---------- Profile data ----------

type Row = {
  user_id: string;
  consent: boolean;
  basics: Profile["basics"];
  answers: Profile["answers"];
  step: Profile["step"];
  question_page: number;
  completed: boolean;
  updated_at: string;
};

export async function loadProfile(userId: string): Promise<Profile | null> {
  if (!supabase) {
    const raw = localStorage.getItem(demoProfileKey(userId));
    return raw ? { ...emptyProfile(), ...(JSON.parse(raw) as Profile) } : null;
  }
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle<Row>();
  if (error) throw error;
  if (!data) return null;
  return {
    consent: data.consent,
    basics: { ...emptyProfile().basics, ...data.basics },
    answers: data.answers ?? {},
    step: data.step,
    questionPage: data.question_page,
    completed: data.completed,
    updatedAt: data.updated_at,
  };
}

export async function saveProfile(userId: string, p: Profile): Promise<void> {
  const updatedAt = new Date().toISOString();
  if (!supabase) {
    localStorage.setItem(demoProfileKey(userId), JSON.stringify({ ...p, updatedAt }));
    return;
  }
  const row: Row = {
    user_id: userId,
    consent: p.consent,
    basics: p.basics,
    answers: p.answers,
    step: p.step,
    question_page: p.questionPage,
    completed: p.completed,
    updated_at: updatedAt,
  };
  const { error } = await supabase.from("profiles").upsert(row);
  if (error) throw error;
}

export async function deleteProfile(userId: string): Promise<void> {
  if (!supabase) {
    localStorage.removeItem(demoProfileKey(userId));
    return;
  }
  const { error } = await supabase.from("profiles").delete().eq("user_id", userId);
  if (error) throw error;
}
