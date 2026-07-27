import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yunafestival.com/",
      lastModified: new Date("2026-07-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://yunafestival.com/don",
      lastModified: new Date("2026-07-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
