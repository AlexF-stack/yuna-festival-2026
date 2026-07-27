export type Artist = {
  id: string;
  name: string;
  role: string;
  is_headliner: boolean;
  is_revealed: boolean;
  order: number;
  bio_short: string | null;
};

/** Vue publique : jamais de nom/bio si non révélé. */
export type PublicArtist = {
  id: string;
  order: number;
  is_headliner: boolean;
  is_revealed: boolean;
  /** null si non révélé */
  name: string | null;
  role: string | null;
  bio_short: string | null;
};

export function toPublicArtist(artist: Artist): PublicArtist {
  if (!artist.is_revealed) {
    return {
      id: artist.id,
      order: artist.order,
      is_headliner: artist.is_headliner,
      is_revealed: false,
      name: null,
      role: null,
      bio_short: null,
    };
  }
  return {
    id: artist.id,
    order: artist.order,
    is_headliner: artist.is_headliner,
    is_revealed: true,
    name: artist.name,
    role: artist.role,
    bio_short: artist.bio_short,
  };
}
