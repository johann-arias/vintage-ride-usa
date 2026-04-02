import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Motorcycle Rental in Rapid City & Black Hills | Vintage Ride USA",
  description:
    "Book your Royal Enfield Himalayan 450 rental in Rapid City, SD. Check availability, pick your dates, and ride the Black Hills. $130/day + tax.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
