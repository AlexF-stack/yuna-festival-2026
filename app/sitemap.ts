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
      url: "https://yunafestival.com/mouvement",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://yunafestival.com/vision",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yunafestival.com/artistes",
      lastModified: LAST_DEPLOY,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://yunafestival.com/journee",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yunafestival.com/lieu",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://yunafestival.com/faq",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://yunafestival.com/soutenir",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yunafestival.com/partenaires",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://yunafestival.com/filtre",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://yunafestival.com/flamme",
      lastModified: LAST_DEPLOY,
      changeFrequency: "monthly",
      priority: 0.75,
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
