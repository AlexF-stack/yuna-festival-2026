-- products : boutique tee-shirts LED YUNA

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  price_fcfa integer not null check (price_fcfa >= 0),
  tag_label text not null,
  tag_variant text not null check (tag_variant in ('led', 'sound', 'pro')),
  is_featured boolean not null default false,
  flag_label text,
  visual_key text not null check (visual_key in ('basic', 'sound', 'programmable')),
  "order" integer not null,
  created_at timestamptz not null default now(),
  constraint products_order_positive check ("order" >= 0)
);

comment on table public.products is 'Boutique officielle — tee-shirts LED.';

create index if not exists products_order_idx on public.products ("order");

alter table public.products enable row level security;

create policy "products_public_read"
  on public.products
  for select
  to anon, authenticated
  using (true);
