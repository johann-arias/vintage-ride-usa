import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PICKUP_LOCATION,
  PICKUP_DIRECTIONS_URL,
  PICKUP_MAP_EMBED_URL,
} from "@/lib/location";
import { DESTINATIONS, type Destination } from "@/lib/destinations";

const SITE_URL = "https://www.vintageridesusa.com";

interface Props {
  destination: Destination;
}

export default function DestinationPage({ destination: d }: Props) {
  const related = d.relatedSlugs
    .map((slug) => DESTINATIONS[slug])
    .filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: d.eyebrow,
        item: `${SITE_URL}/${d.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] bg-[#111110] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url('${d.heroImage}')` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/60 to-transparent"
            aria-hidden
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              {d.eyebrow}
            </p>
            <h1 className="text-white text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-6">
              {d.h1}
              <br />
              <span className="italic text-[#c8a45a]">{d.h1Accent}</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              {d.intro}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#1a1a18] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {d.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[#c8a45a] text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                  {s.label}
                </div>
                <div className="text-white text-lg font-light">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why a Himalayan */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              The bike for the job
            </p>
            <h2 className="text-[#111110] text-3xl md:text-4xl font-light mb-8">
              {d.whyHimalayan.title}
            </h2>
            <p className="text-[#2a2a28] text-base md:text-lg leading-relaxed mb-8">
              {d.whyHimalayan.body}
            </p>
            <ul className="space-y-3">
              {d.whyHimalayan.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm md:text-base text-[#2a2a28]"
                >
                  <span className="text-[#c8a45a] mt-1 shrink-0">—</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link
                href="/fleet"
                className="text-[#c8a45a] hover:text-[#111110] text-sm font-semibold tracking-wider transition-colors"
              >
                See full bike specs →
              </Link>
            </div>
          </div>
        </section>

        {/* Routes */}
        <section className="bg-[#f8f6f0] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Routes
            </p>
            <h2 className="text-[#111110] text-3xl md:text-4xl font-light mb-12">
              {d.routesTitle}
            </h2>
            <div className="space-y-8">
              {d.routes.map((r, i) => (
                <article
                  key={r.name}
                  className="bg-white border border-[#e8e6e0] p-8 md:p-10"
                >
                  <div className="flex items-baseline justify-between flex-wrap gap-4 mb-3">
                    <h3 className="text-[#111110] text-xl md:text-2xl font-medium">
                      <span className="text-[#c8a45a] mr-3 font-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {r.name}
                    </h3>
                    <div className="text-[#6b6b6b] text-xs tracking-wider uppercase">
                      {r.miles} · {r.ridingTime}
                    </div>
                  </div>
                  <div className="text-[#c8a45a] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
                    {r.highlights}
                  </div>
                  <p className="text-[#2a2a28] text-sm md:text-base leading-relaxed">
                    {r.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Know before */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Practical info
            </p>
            <h2 className="text-[#111110] text-3xl md:text-4xl font-light mb-12">
              {d.knowBefore.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-1">
              {d.knowBefore.items.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-4 py-4 border-b border-[#e8e6e0]"
                >
                  <span className="text-[#6b6b6b] text-xs tracking-wider uppercase pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-[#111110] text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#f8f6f0] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              FAQ
            </p>
            <h2 className="text-[#111110] text-3xl md:text-4xl font-light mb-12">
              Common questions
            </h2>
            <div className="space-y-8">
              {d.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="text-[#111110] text-lg md:text-xl font-medium mb-3">
                    {f.q}
                  </h3>
                  <p className="text-[#2a2a28] text-sm md:text-base leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related destinations */}
        {related.length > 0 && (
          <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
              <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                More rides
              </p>
              <h2 className="text-[#111110] text-3xl md:text-4xl font-light mb-12">
                You might also like
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group block bg-[#f8f6f0] border border-[#e8e6e0] hover:border-[#c8a45a] transition-colors overflow-hidden"
                  >
                    <div
                      className="aspect-[4/3] bg-cover bg-center"
                      style={{ backgroundImage: `url('${r.heroImage}')` }}
                      aria-hidden
                    />
                    <div className="p-6">
                      <div className="text-[#c8a45a] text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
                        {r.eyebrow}
                      </div>
                      <h3 className="text-[#111110] text-lg font-medium mb-2 group-hover:text-[#c8a45a] transition-colors">
                        {r.h1Accent}
                      </h3>
                      <p className="text-[#6b6b6b] text-sm leading-relaxed line-clamp-3">
                        {r.intro}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pickup */}
        <section className="bg-[#1a1a18] py-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Pickup location
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light mb-10">
              Start your ride at {PICKUP_LOCATION.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-white text-lg font-medium mb-2">
                  {PICKUP_LOCATION.name}
                </div>
                <div className="text-white/70 text-base mb-6">
                  {PICKUP_LOCATION.street}
                  <br />
                  {PICKUP_LOCATION.city}, {PICKUP_LOCATION.state}{" "}
                  {PICKUP_LOCATION.zip}
                </div>
                <div className="text-white/60 text-sm mb-6">
                  Pickup at{" "}
                  <strong className="text-white">9:00 AM</strong> · Return by{" "}
                  <strong className="text-white">9:00 AM</strong>
                </div>
                <a
                  href={PICKUP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#c8a45a] hover:text-white text-sm font-semibold tracking-wider transition-colors"
                >
                  Get directions →
                </a>
              </div>
              <div className="aspect-[4/3] bg-[#2a2a28] overflow-hidden">
                <iframe
                  src={PICKUP_MAP_EMBED_URL}
                  className="w-full h-full"
                  loading="lazy"
                  title="Vintage Rides USA pickup location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#111110] py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-[#c8a45a] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Ready to ride
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-light mb-6">
              Your bike is waiting in Rapid City
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-10 max-w-2xl mx-auto">
              $130/day. Brand-new 2025 Royal Enfield Himalayan 450. Custer State
              Park + Black Hills National Forest passes included. Available May 1
              through September 30.
            </p>
            <Link
              href="/book"
              className="bg-[#c8a45a] hover:bg-[#e8c98a] text-[#111110] font-semibold tracking-wider px-12 py-5 rounded-sm transition-colors text-sm uppercase inline-block"
            >
              Check availability
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
