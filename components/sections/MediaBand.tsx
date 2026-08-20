"use client";

import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { FESTIVAL } from "@/lib/festival";

/**
 * Bande média pleine largeur — pattern HERNA SiteMediaBand.
 */
export function MediaBand() {
  return (
    <section
      className="relative isolate min-h-[48svh] overflow-hidden md:min-h-[56svh]"
      data-tone="charbon"
      data-nav-tone="charbon"
      aria-labelledby="media-band-title"
    >
      <div className="absolute inset-0">
        <Image
          src="/media/title-benin-debout.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={72}
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-encre/92 via-bleu-fonce/75 to-encre/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-encre/90 via-transparent to-encre/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[48svh] max-w-[1240px] items-end px-5 pb-14 pt-24 md:min-h-[56svh] md:px-6 md:pb-20">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.28em] text-feu">
            {FESTIVAL.datesShort}
          </p>
          <h2
            id="media-band-title"
            className="mt-3 font-display text-[clamp(2.4rem,7vw,4rem)] font-extrabold uppercase leading-[0.92] text-papier"
          >
            Bénin Debout
          </h2>
          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-papier/80">
            Une génération non ordinaire se lève. Joseph, Daniel, David. À toi
            maintenant, à Midombo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
