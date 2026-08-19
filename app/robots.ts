import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/confirmation/", "/staff/", "/mon-pass", "/lab/"],
      },
    ],
    sitemap: "https://festivalyuna.com/sitemap.xml",
  };
}
