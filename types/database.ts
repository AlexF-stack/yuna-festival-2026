/**
 * Types Supabase — à régénérer via `supabase gen types` une fois le projet lié.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type ArtistsTable = {
  Row: {
    id: string;
    name: string;
    role: string;
    is_headliner: boolean;
    is_revealed: boolean;
    order: number;
    bio_short: string | null;
    portrait_url: string | null;
    created_at: string;
  };
  Insert: {
    id?: string;
    name: string;
    role: string;
    is_headliner?: boolean;
    is_revealed?: boolean;
    order: number;
    bio_short?: string | null;
    portrait_url?: string | null;
    created_at?: string;
  };
  Update: {
    id?: string;
    name?: string;
    role?: string;
    is_headliner?: boolean;
    is_revealed?: boolean;
    order?: number;
    bio_short?: string | null;
    portrait_url?: string | null;
    created_at?: string;
  };
  Relationships: [];
};

type ScheduleTable = {
  Row: {
    id: string;
    day: number;
    time: string;
    title: string;
    description: string | null;
    order: number;
    artist_id: string | null;
    created_at: string;
  };
  Insert: {
    id?: string;
    day: number;
    time: string;
    title: string;
    description?: string | null;
    order: number;
    artist_id?: string | null;
    created_at?: string;
  };
  Update: {
    id?: string;
    day?: number;
    time?: string;
    title?: string;
    description?: string | null;
    order?: number;
    artist_id?: string | null;
    created_at?: string;
  };
  Relationships: [];
};

type RegistrationsTable = {
  Row: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    registration_type: string;
    idempotency_key: string;
    created_at: string;
    qr_code: string;
    checked_in_at: string | null;
    checked_in_by: string | null;
    party_id: string | null;
    notify_status: string | null;
    notify_channel: string | null;
    notified_at: string | null;
    notify_error: string | null;
    bus_wanted: boolean;
    bus_location: string | null;
    source: string | null;
  };
  Insert: {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    registration_type?: string;
    idempotency_key: string;
    created_at?: string;
    qr_code: string;
    checked_in_at?: string | null;
    checked_in_by?: string | null;
    party_id?: string | null;
    notify_status?: string | null;
    notify_channel?: string | null;
    notified_at?: string | null;
    notify_error?: string | null;
    bus_wanted?: boolean;
    bus_location?: string | null;
    source?: string | null;
  };
  Update: {
    id?: string;
    name?: string;
    phone?: string;
    email?: string | null;
    registration_type?: string;
    idempotency_key?: string;
    created_at?: string;
    qr_code?: string;
    checked_in_at?: string | null;
    checked_in_by?: string | null;
    party_id?: string | null;
    notify_status?: string | null;
    notify_channel?: string | null;
    notified_at?: string | null;
    notify_error?: string | null;
    bus_wanted?: boolean;
    bus_location?: string | null;
    source?: string | null;
  };
  Relationships: [];
};

type ProductsTable = {
  Row: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price_fcfa: number;
    tag_label: string;
    tag_variant: string;
    is_featured: boolean;
    flag_label: string | null;
    visual_key: string;
    order: number;
    created_at: string;
  };
  Insert: {
    id?: string;
    name: string;
    slug: string;
    description: string;
    price_fcfa: number;
    tag_label: string;
    tag_variant: string;
    is_featured?: boolean;
    flag_label?: string | null;
    visual_key: string;
    order: number;
    created_at?: string;
  };
  Update: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    price_fcfa?: number;
    tag_label?: string;
    tag_variant?: string;
    is_featured?: boolean;
    flag_label?: string | null;
    visual_key?: string;
    order?: number;
    created_at?: string;
  };
  Relationships: [];
};

type NewsletterSubscribersTable = {
  Row: {
    id: string;
    email: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    email: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    email?: string;
    created_at?: string;
  };
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      artists: ArtistsTable;
      schedule: ScheduleTable;
      registrations: RegistrationsTable;
      products: ProductsTable;
      newsletter_subscribers: NewsletterSubscribersTable;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
