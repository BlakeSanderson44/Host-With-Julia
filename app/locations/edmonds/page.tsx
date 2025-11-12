import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import SmoothAnchorLink from '../../../components/ui/SmoothAnchorLink';

const baseUrl = 'https://hostwithjulia.com';
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Edmonds', href: '/locations/edmonds' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${baseUrl}${item.href}`,
  })),
};

export const metadata: Metadata = {
  title: 'Edmonds Vacation Rental Management | Host with Julia',
  description:
    'Premium Airbnb and short-term rental hosting in Edmonds, Washington with concierge guest care, pricing strategy, and owner reporting tailored to coastal stays.',
};

export default function EdmondsPage() {
  return (
    <div className="bg-white pb-16 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-forest/5">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbItems.map((item, index) => (
                <li key={item.href} className="flex items-center gap-2">
                  <Link href={item.href} className="transition hover:text-forest">
                    {item.label}
                  </Link>
                  {index < breadcrumbItems.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-forest">Edmonds</h1>
              <p className="mt-4 text-lg text-slate-700">
                Edmonds draws Seattle-area couples, ferry day-trippers, and business travelers who
                want a relaxed Puget Sound base with boutique dining and arts within walking
                distance.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <SmoothAnchorLink
                  href="/#contact"
                  className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest/90"
                >
                  Get a Free Property Review
                </SmoothAnchorLink>
                <SmoothAnchorLink
                  href="/#properties"
                  className="rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest transition hover:bg-forest/5"
                >
                  View Properties
                </SmoothAnchorLink>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/locations/edmonds.jpeg"
                alt="Coastal shoreline and ferry dock in Edmonds, Washington"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-12 max-w-4xl space-y-6 px-4 text-base leading-relaxed text-slate-700">
        <p>
          Our hosting support resonates with design-focused owners who value thoughtful guest
          amenities, personalized communication, and consistent review growth. We highlight the
          neighborhood charm of Edmonds while protecting your calendar with strategic minimum-night
          settings that reflect ferry schedules and commuter demand.
        </p>
        <p>
          Peak stays track the summer waterfront season and fall arts calendar, yet off-season
          weekends thrive with Edmonds Center for the Arts programming and quick light-rail access.
          We smooth the curve by orchestrating shoulder-season packages aimed at remote workers and
          small families who value the ease of walkable brunch spots and marine views.
        </p>
        <p>
          You will receive transparent owner updates, monthly pricing insights, and on-call support
          for maintenance partners, so your home stays guest-ready without you needing to manage
          messaging threads or turnovers.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-forest">Service area highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Walkable downtown blocks near the Kingston ferry and waterfront parks.</li>
            <li>Business traveler appeal with Sounder rail and highway access minutes away.</li>
            <li>Seasonal festivals, markets, and art walks that keep calendars full year-round.</li>
            <li>Trusted local partners for cleaning, maintenance, and boutique guest services.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
