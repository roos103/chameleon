-- Project Chameleon: database setup.
-- Paste this whole file into Supabase → SQL Editor → New query, then click "Run".

create table if not exists public.profiles (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  consent       boolean     not null default false,
  basics        jsonb       not null default '{}'::jsonb,
  answers       jsonb       not null default '{}'::jsonb,
  step          text        not null default 'basics',
  question_page integer     not null default 0,
  completed     boolean     not null default false,
  updated_at    timestamptz not null default now()
);

-- Row Level Security: every student can only see and change their own row.
-- Nobody else (other students, schools) can read individual answers.
alter table public.profiles enable row level security;

drop policy if exists "Students read own profile" on public.profiles;
create policy "Students read own profile" on public.profiles
  for select using (auth.uid() = user_id);

drop policy if exists "Students create own profile" on public.profiles;
create policy "Students create own profile" on public.profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "Students update own profile" on public.profiles;
create policy "Students update own profile" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Students delete own profile" on public.profiles;
create policy "Students delete own profile" on public.profiles
  for delete using (auth.uid() = user_id);
