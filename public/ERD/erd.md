//1
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone_kpay text unique,
  avatar_url text,
  updated_at timestamptz default now()
);

//2
create type transaction_type as enum (
  'pay',
  'receive'
);

create type transaction_status as enum (
  'pending',
  'completed',
  'cancelled'
);

create type transaction_category as enum (
  'wishlist',
  'debt',
  'other'
);



create table transactions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  creator_id uuid not null references profiles(id) on delete cascade,
  friend_id uuid not null references profiles(id) on delete cascade,

  amount numeric(14,2) not null check (amount > 0),
  description text,

  category transaction_category default '',
  type transaction_type not null, -- RELATIVE TO creator_id
  status transaction_status default 'pending'
);


alter publication supabase_realtime
add table public.transactions;

alter table profiles enable row level security;
alter table transactions enable row level security;

create policy "profiles readable"
on profiles for select
using (true);

create policy "transactions readable"
on transactions for select
using (true);

create policy "transactions insertable"
on transactions for insert
with check (true);

