import type { Metadata } from "next";
import DestinationPage from "@/components/DestinationPage";
import { DESTINATIONS } from "@/lib/destinations";

const d = DESTINATIONS["sturgis-motorcycle-rental"];

export const metadata: Metadata = {
  title: d.metaTitle,
  description: d.metaDescription,
  alternates: { canonical: `/${d.slug}` },
  openGraph: {
    type: "article",
    url: `https://www.vintageridesusa.com/${d.slug}`,
    title: d.metaTitle,
    description: d.metaDescription,
    images: [{ url: d.ogImage, width: 1024, height: 768, alt: d.h1Accent }],
  },
  twitter: {
    card: "summary_large_image",
    title: d.metaTitle,
    description: d.metaDescription,
    images: [d.ogImage],
  },
};

export default function Page() {
  return <DestinationPage destination={d} />;
}
