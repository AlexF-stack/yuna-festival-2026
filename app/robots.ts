import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/lab/", "/api/", "/confirmation/"],
      },
    ],
    sitemap: "https://yunafestival.com/sitemap.xml",
  };
}
