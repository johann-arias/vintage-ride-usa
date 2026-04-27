import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PICKUP_LOCATION,
  PICKUP_ADDRESS_INLINE,
  PICKUP_DIRECTIONS_URL,
  PICKUP_MAP_EMBED_URL,
} from "@/lib/location";

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 bg-[#f8f6f0] min-h-screen">
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <div className="text-6xl mb-6">🏍</div>
          <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Booking Confirmed
          </div>
          <h1 className="text-[#111110] text-3xl md:text-4xl font-light mb-4">
            You&apos;re all set.
          </h1>
          <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8">
            Your booking is confirmed. A confirmation email is on its way with your booking reference.
          </p>

          <div className="bg-white border border-[#e8e6e0] rounded-sm overflow-hidden text-left mb-6">
            <div className="p-6 pb-4">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#c8a45a] mb-2">Pickup location</p>
              <p className="text-[#111110] font-semibold text-base">{PICKUP_LOCATION.name}</p>
              <p className="text-[#2a2a28] text-sm mt-1">{PICKUP_LOCATION.street}</p>
              <p className="text-[#2a2a28] text-sm">{PICKUP_LOCATION.city}, {PICKUP_LOCATION.state} {PICKUP_LOCATION.zip}</p>
              <a
                href={PICKUP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-[#c8a45a] hover:text-[#a07e3a] font-medium"
              >
                Get directions →
              </a>
            </div>
            <iframe
              title="Pickup location map"
              src={PICKUP_MAP_EMBED_URL}
              className="w-full h-64 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="bg-white border border-[#e8e6e0] rounded-sm p-6 text-left mb-8 space-y-3">
            <h2 className="text-[#111110] font-semibold mb-4">What&apos;s next</h2>
            {[
              "Check your inbox for your confirmation email — your booking reference is your check-in code.",
              `Pickup is at ${PICKUP_ADDRESS_INLINE} on your start date — directions above.`,
              "Request GPX routes or route suggestions for the Black Hills, Badlands, or Needles Highway by replying to your confirmation.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#2a2a28]">
                <span className="text-[#c8a45a] font-bold shrink-0">{i + 1}.</span>
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="border border-[#2a2a28] text-[#111110] font-medium tracking-wider px-6 py-3 rounded-sm hover:bg-[#111110] hover:text-white transition-colors text-sm uppercase"
            >
              Back to Home
            </Link>
            <Link
              href="https://www.vintagerides.com"
              target="_blank"
              className="bg-[#c8a45a] hover:bg-[#e8c98a] text-[#111110] font-semibold tracking-wider px-6 py-3 rounded-sm transition-colors text-sm uppercase"
            >
              Explore Guided Tours
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
