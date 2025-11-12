import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import SmoothAnchorLink from '../../../components/ui/SmoothAnchorLink';

const baseUrl = 'https://hostwithjulia.com';
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Mt. Rainier / Ashford', href: '/locations/mt-rainier' },
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
  title: 'Mt. Rainier & Ashford Vacation Rental Management | Host with Julia',
  description:
    'Full-service vacation rental management near Mt. Rainier with adventure-ready guest support, seasonal rate strategy, and trusted local vendor coordination.',
};

export default function MtRainierPage() {
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
              <h1 className="text-4xl font-semibold tracking-tight text-forest">Mt. Rainier / Ashford</h1>
              <p className="mt-4 text-lg text-slate-700">
                Cabins near the Nisqually entrance attract adventure duos, family reunions, and
                national park travelers searching for hot tubs, gear storage, and quick access to
                trailheads year-round.
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
                src="/images/locations/mt_rainier.jpeg"
                alt="Mt. Rainier behind evergreen trees near Ashford, Washington"
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
          We specialize in park-adjacent stays that balance rustic charm with thoughtful amenities —
          think boot dryers, s’mores stations, and detailed arrival guides for winter conditions.
          Our guest messaging runs 24/7, ensuring hikers arrive prepared and respectful of house
          rules.
        </p>
        <p>
          Demand spikes for wildflower season, summer summit attempts, and peak snowshoe weekends.
          We manage rate cadence around permit releases and regional events while cultivating steady
          midweek occupancy from remote workers and elopement parties.
        </p>
        <p>
          Owners receive proactive maintenance notes, local vendor coordination, and monthly
          performance recaps so you can focus on long-term property vision instead of logistics.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-forest">Service area highlights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Cabins and A-frames in Ashford, Elbe, and along the Nisqually River corridor.</li>
            <li>Emergency preparedness plans for winter storms and power interruptions.</li>
            <li>Adventure-forward welcome guides covering hikes, outfitters, and dining.</li>
            <li>Trusted hot tub, snow removal, and maintenance partners on call.</li>
            <li>Guest screening workflows tuned for high-demand peak seasons.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
