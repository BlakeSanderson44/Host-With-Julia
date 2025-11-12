import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const baseUrl = 'https://hostwithjulia.com';
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Lake Chelan', href: '/locations/lake-chelan' },
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
  title: 'Lake Chelan Vacation Rental Management | Host with Julia',
  description:
    'Hospitality-forward Lake Chelan Airbnb management with concierge guest care, wine country itineraries, and revenue strategy for waterfront and hillside homes.',
};

export default function LakeChelanPage() {
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
              <h1 className="text-4xl font-semibold tracking-tight text-forest">Lake Chelan</h1>
              <p className="mt-4 text-lg text-slate-700">
                Lake Chelan hosts multi-generational families, lake-life friend getaways, and wine
                trail explorers seeking high-touch support and curated itineraries between downtown
                Chelan, Manson, and the north shore.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-forest/90"
                >
                  Get a Free Property Review
                </Link>
                <Link
                  href="/#properties"
                  className="rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest transition hover:bg-forest/5"
                >
                  View Properties
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/locations/lake_chelan.jpeg"
                alt="Sunrise over Lake Chelan with vineyards and hills in the background"
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
          Owners partner with us to showcase the best of lake living — from hot tub setups and dock
          access to premium welcome gifts that match each guest segment. We sync rates with festival
          calendars, marina bookings, and seasonal wine releases to deliver confident occupancy and
          revenue.
        </p>
        <p>
          Summer and early fall remain anchor seasons, yet we intentionally program shoulder stays
          around quiet tasting itineraries, remote work escapes, and adventure packages that leverage
          ski and snowshoe access in nearby mountains.
        </p>
        <p>
          Expect concierge-level guest messaging, clean coordination with trusted local crews, and
          monthly reporting that surfaces insights on stay length, ancillary service uptake, and
          pricing opportunities.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-forest">Service area highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Waterfront condos, hillside estates, and downtown retreats throughout Chelan and Manson.</li>
            <li>Boat-friendly amenities, dock safety checklists, and lake toy rentals on standby.</li>
            <li>Insider recommendations on wineries, dining, and private chef partners.</li>
            <li>Flexible cleaning teams to handle quick turnarounds between back-to-back stays.</li>
            <li>Year-round marketing aligned with events like Winterfest and Crush.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
