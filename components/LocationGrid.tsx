"use client";

import Link from 'next/link';

import { LOCATIONS } from '@/data/locations';

const withBasePath = (p: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${p}`;
};

export default function LocationGrid() {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="mx-auto max-w-6xl px-4 py-12"
    >
      <header className="mb-8">
        <h2 id="locations-heading" className="text-3xl font-semibold tracking-tight">
          Where We Operate
        </h2>
        <p className="mt-3 text-slate-600">
          Based in Western Washington — proudly serving homeowners across the state and open to
          projects in other regions by request.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((loc) => (
          <article
            key={loc.slug}
            className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={withBasePath(loc.imageSrc)}
                alt={loc.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{loc.name}</h3>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="text-sm underline-offset-2 hover:underline"
                  aria-label={`Learn more about ${loc.name}`}
                >
                  Learn more
                </Link>
              </div>
              {loc.blurb && <p className="mt-2 text-sm text-slate-600">{loc.blurb}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
