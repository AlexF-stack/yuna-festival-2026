/**
 * Upsert des 3 affiches line-up dans Supabase (service role).
 * Usage: node --env-file=.env.local scripts/upsert-announced-artists.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const artists = [
  {
    name: "Valère Kouton",
    role: "Chantre · Bénin",
    is_headliner: false,
    is_revealed: true,
    order: 10,
    bio_short:
      "Louange et adoration. Moment fort pour les fils et filles du Royaume.",
    portrait_url: "/media/artists/valere-kouton.png",
  },
  {
    name: "Simiane Tatu",
    role: "Chantre · Adoration",
    is_headliner: false,
    is_revealed: true,
    order: 20,
    bio_short: "Temps fort d'adoration. Louange et impactation divine.",
    portrait_url: "/media/artists/simiane-tatu.png",
  },
  {
    name: "Dany Kasongo",
    role: "Chantre",
    is_headliner: false,
    is_revealed: true,
    order: 30,
    bio_short:
      "Louange, adoration et présence scénique pour la génération.",
    portrait_url: "/media/artists/dany-kasongo.png",
  },
];

async function main() {
  // Migration légère si besoin
  const { error: migErr } = await supabase.rpc("exec_sql", {
    query: "alter table public.artists add column if not exists portrait_url text",
  });
  if (migErr) {
    console.warn("rpc exec_sql indisponible (ok si migration déjà faite):", migErr.message);
  }

  // Renommer l'ancien libellé Simiane si présent
  await supabase
    .from("artists")
    .update({ name: "Simiane Tatu" })
    .eq("name", "Simiane Brahi Tatu");

  for (const artist of artists) {
    const { data: existing } = await supabase
      .from("artists")
      .select("id, portrait_url")
      .eq("name", artist.name)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await supabase
        .from("artists")
        .update({
          role: artist.role,
          is_revealed: true,
          is_headliner: false,
          order: artist.order,
          bio_short: artist.bio_short,
          portrait_url: artist.portrait_url,
        })
        .eq("id", existing.id);
      if (error) {
        // Sans colonne portrait_url
        if (error.message.includes("portrait_url")) {
          const { error: e2 } = await supabase
            .from("artists")
            .update({
              role: artist.role,
              is_revealed: true,
              is_headliner: false,
              order: artist.order,
              bio_short: artist.bio_short,
            })
            .eq("id", existing.id);
          if (e2) throw e2;
          console.log("updated (sans portrait_url)", artist.name);
        } else {
          throw error;
        }
      } else {
        console.log("updated", artist.name);
      }
    } else {
      const { error } = await supabase.from("artists").insert(artist);
      if (error) {
        if (error.message.includes("portrait_url")) {
          const { portrait_url: _p, ...rest } = artist;
          const { error: e2 } = await supabase.from("artists").insert(rest);
          if (e2) throw e2;
          console.log("inserted (sans portrait_url)", artist.name);
        } else {
          throw error;
        }
      } else {
        console.log("inserted", artist.name);
      }
    }
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
