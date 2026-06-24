create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  plan text default 'free' check (plan in ('free', 'pro', 'agency')),
  monthly_trip_limit integer default 3,
  monthly_trip_count integer default 0,
  created_at timestamptz default now()
);

create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  destination text not null,
  start_date date not null,
  end_date date not null,
  travelers integer not null,
  budget numeric not null,
  travel_style text not null,
  language text not null,
  itinerary_json jsonb not null,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plan text not null check (plan in ('free', 'pro', 'agency')),
  status text not null check (status in ('active', 'canceled', 'expired')),
  started_at timestamptz default now(),
  expires_at timestamptz
);

create index if not exists profiles_email_idx on profiles (email);
create index if not exists profiles_plan_idx on profiles (plan);
create index if not exists trips_user_created_at_idx on trips (user_id, created_at desc);
create index if not exists trips_destination_idx on trips (destination);
create index if not exists subscriptions_user_status_idx on subscriptions (user_id, status);
create index if not exists subscriptions_plan_status_idx on subscriptions (plan, status);

alter table profiles enable row level security;
alter table trips enable row level security;
alter table subscriptions enable row level security;

drop policy if exists "Users can select own profile" on profiles;
create policy "Users can select own profile"
on profiles for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
on profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile"
on profiles for insert
with check (auth.uid() = id);

drop policy if exists "Users can select own trips" on trips;
create policy "Users can select own trips"
on trips for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own trips" on trips;
create policy "Users can insert own trips"
on trips for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own trips" on trips;
create policy "Users can delete own trips"
on trips for delete
using (auth.uid() = user_id);

drop policy if exists "Users can select own subscriptions" on subscriptions;
create policy "Users can select own subscriptions"
on subscriptions for select
using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (
    id,
    full_name,
    email,
    plan,
    monthly_trip_limit,
    monthly_trip_count
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.email,
    'free',
    3,
    0
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into profiles (id, full_name, email, plan, monthly_trip_limit, monthly_trip_count)
select
  id,
  coalesce(raw_user_meta_data ->> 'full_name', email),
  email,
  'free',
  3,
  0
from auth.users
where id not in (select id from profiles);

notify pgrst, 'reload schema';
