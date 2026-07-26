import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yunafestival.com/",
      lastModified: new Date("2026-07-26"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
