import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vintage Rides USA",
    short_name: "Vintage Rides USA",
    description:
      "Royal Enfield Himalayan 450 motorcycle rentals in Rapid City — Black Hills, Badlands, Sturgis.",
    start_url: "/",
    display: "standalone",
    background_color: "#111110",
    theme_color: "#111110",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
