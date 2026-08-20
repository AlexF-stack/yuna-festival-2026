import { FESTIVAL, HERO_COPY } from "@/lib/festival";

/** Lien Google Calendar — fuseau Africa/Porto-Novo */
export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${FESTIVAL.brandFull} ${FESTIVAL.edition}, ${FESTIVAL.theme}`,
    dates: "20260905T180000/20260906T223000",
    ctz: "Africa/Porto-Novo",
    details: `${FESTIVAL.tagline} ${HERO_COPY.verseRef}`,
    location: `${FESTIVAL.venue}, ${FESTIVAL.city}, ${FESTIVAL.country}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getShareData(url: string) {
  return {
    title: `${FESTIVAL.brandFull} ${FESTIVAL.edition}, ${FESTIVAL.theme}`,
    text: `${FESTIVAL.tagline} ${FESTIVAL.datesShort} · ${FESTIVAL.venue}, ${FESTIVAL.city}. ${FESTIVAL.freeEntry}.`,
    url,
  };
}
