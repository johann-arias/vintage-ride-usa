import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motorcycle Rental Rapid City & Black Hills | Vintage Rides USA",
  description:
    "Rent a Royal Enfield Himalayan 450 in Rapid City, SD. Explore the Black Hills, Badlands, and Sturgis on a world-class adventure motorcycle. Daily rentals available May–September.",
  keywords: [
    "motorcycle rental Rapid City",
    "motorcycle rental Black Hills",
    "bike rental Rapid City SD",
    "Royal Enfield rental South Dakota",
    "Himalayan 450 rental",
    "Black Hills motorcycle rental",
    "Badlands motorcycle rental",
    "Sturgis motorcycle rental",
    "adventure motorcycle rental South Dakota",
  ],
  openGraph: {
    title: "Motorcycle Rental in Rapid City & Black Hills | Vintage Rides USA",
    description:
      "Rent a Royal Enfield Himalayan 450 in Rapid City and ride the Black Hills. $130/day + tax.",
    siteName: "Vintage Rides USA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
