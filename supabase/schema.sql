-- Chill Path Supabase schema
-- Run this in Supabase SQL Editor before deploying the frontend.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.onboarding_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  goals text[] not null default '{}',
  blockers text[] not null default '{}',
  energy text,
  focus_minutes integer,
  daily_time text,
  tone text,
  created_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  day_index integer not null default 0,
  last_completed_date date,
  streak_count integer not null default 0,
  completed_lessons integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  day_index integer not null,
  lesson_key text not null,
  quiz_answer text,
  reflection text,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key)
);

create table if not exists public.daily_checkins (
  user_id uuid not null references auth.users(id) on delete cascade,
  checkin_date date not null default current_date,
  mood integer check (mood between 1 and 5),
  energy integer check (energy between 1 and 5),
  focus integer check (focus between 1 and 5),
  note text,
  created_at timestamptz not null default now(),
  primary key (user_id, checkin_date)
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  target_frequency text not null default 'daily',
  archived boolean not null default false,
  created_at timestamptz not null default now()
);


create table if not exists public.daily_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_date date not null default current_date,
  main_task text,
  first_step text,
  start_time time,
  duration_minutes integer,
  obstacle text,
  if_then text,
  done_enough text,
  low_energy_version text,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, plan_date)
);

create table if not exists public.parking_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  note text,
  status text not null default 'open' check (status in ('open', 'planned', 'done', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  worked text,
  stopped text,
  best_window text,
  next_adjustment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start)
);

create table if not exists public.habit_logs (
  habit_id uuid not null references public.habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  done boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (habit_id, log_date)
);

alter table public.profiles enable row level security;
alter table public.onboarding_answers enable row level security;
alter table public.user_progress enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.daily_checkins enable row level security;
alter table public.journal_entries enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;
alter table public.daily_plans enable row level security;
alter table public.parking_items enable row level security;
alter table public.weekly_reviews enable row level security;

-- Drop policies before recreating them, so the script can be rerun safely.
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "onboarding_all_own" on public.onboarding_answers;
create policy "onboarding_all_own" on public.onboarding_answers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "progress_all_own" on public.user_progress;
create policy "progress_all_own" on public.user_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "lesson_completions_all_own" on public.lesson_completions;
create policy "lesson_completions_all_own" on public.lesson_completions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "daily_checkins_all_own" on public.daily_checkins;
create policy "daily_checkins_all_own" on public.daily_checkins for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "journal_entries_all_own" on public.journal_entries;
create policy "journal_entries_all_own" on public.journal_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "habits_all_own" on public.habits;
create policy "habits_all_own" on public.habits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "habit_logs_all_own" on public.habit_logs;
create policy "habit_logs_all_own" on public.habit_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


drop policy if exists "daily_plans_all_own" on public.daily_plans;
create policy "daily_plans_all_own" on public.daily_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "parking_items_all_own" on public.parking_items;
create policy "parking_items_all_own" on public.parking_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "weekly_reviews_all_own" on public.weekly_reviews;
create policy "weekly_reviews_all_own" on public.weekly_reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- Optional: auto-create a profile when a Supabase Auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
