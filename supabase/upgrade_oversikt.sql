-- Upgrade Chill Path with Dagens plan, Parkeringsliste and Oversikt tables.
-- Run this once in Supabase SQL Editor if you already created the original schema.

create extension if not exists pgcrypto;


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

alter table public.daily_plans enable row level security;
alter table public.parking_items enable row level security;
alter table public.weekly_reviews enable row level security;

drop policy if exists "daily_plans_all_own" on public.daily_plans;
create policy "daily_plans_all_own" on public.daily_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "parking_items_all_own" on public.parking_items;
create policy "parking_items_all_own" on public.parking_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "weekly_reviews_all_own" on public.weekly_reviews;
create policy "weekly_reviews_all_own" on public.weekly_reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
