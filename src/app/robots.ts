import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/booking/confirmation"],
    },
    sitemap: "https://www.vintageridesusa.com/sitemap.xml",
    host: "https://www.vintageridesusa.com",
  };
}
