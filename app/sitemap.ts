import type { MetadataRoute } from "next";

const LAST_DEPLOY = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yunafestival.com/",
      lastModified: LAST_DEPLOY,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://yunafestival.com/don",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yunafestival.com/confidentialite",
      lastModified: LAST_DEPLOY,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://yunafestival.com/mentions-legales",
      lastModified: LAST_DEPLOY,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
