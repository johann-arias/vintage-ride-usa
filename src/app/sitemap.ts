import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.vintageridesusa.com";
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/fleet`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/book`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
