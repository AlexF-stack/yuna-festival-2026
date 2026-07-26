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
    order: number;
    bio_short: string | null;
    created_at: string;
  };
  Insert: {
    id?: string;
    name: string;
    role: string;
    is_headliner?: boolean;
    order: number;
    bio_short?: string | null;
    created_at?: string;
  };
  Update: {
    id?: string;
    name?: string;
    role?: string;
    is_headliner?: boolean;
    order?: number;
    bio_short?: string | null;
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
    created_at: string;
  };
  Insert: {
    id?: string;
    day: number;
    time: string;
    title: string;
    description?: string | null;
    order: number;
    created_at?: string;
  };
  Update: {
    id?: string;
    day?: number;
    time?: string;
    title?: string;
    description?: string | null;
    order?: number;
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
    created_at: string;
    qr_code: string;
  };
  Insert: {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    created_at?: string;
    qr_code: string;
  };
  Update: {
    id?: string;
    name?: string;
    phone?: string;
    email?: string | null;
    created_at?: string;
    qr_code?: string;
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
