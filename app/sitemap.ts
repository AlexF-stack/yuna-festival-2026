import type { MetadataRoute } from "next";

const LAST_DEPLOY = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://festivalyuna.com/",
      lastModified: LAST_DEPLOY,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://festivalyuna.com/mouvement",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://festivalyuna.com/vision",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://festivalyuna.com/artistes",
      lastModified: LAST_DEPLOY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://festivalyuna.com/journee",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://festivalyuna.com/lieu",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://festivalyuna.com/faq",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://festivalyuna.com/soutenir",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://festivalyuna.com/partenaires",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://festivalyuna.com/filtre",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://festivalyuna.com/flamme",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://festivalyuna.com/confidentialite",
      lastModified: LAST_DEPLOY,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://festivalyuna.com/mentions-legales",
      lastModified: LAST_DEPLOY,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
