import { Fragment } from 'react';
import Image from 'next/image';
import Button from './Button';

const credibilityHighlights = [
  { icon: '⭐', label: 'Superhost' },
  { icon: '🕒', label: 'Avg response: < 1 hour' },
  { icon: '📍', label: 'Western WA' },
] as const;

const serviceHighlights = [
  {
    icon: '🌲',
    title: 'Local care',
    description: 'Neighborhood insights and thoughtful touches that feel authentically PNW.',
  },
  {
    icon: '🤝',
    title: 'Full-service hosting',
    description: 'Guest messaging, turnovers, and vendor coordination handled start to finish.',
  },
  {
    icon: '📈',
    title: 'Performance clarity',
    description: 'Transparent pricing, monthly reporting, and payouts you can plan around.',
  },
] as const;

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1461966114269-a79de365c5d8?auto=format&fit=crop&w=1920&q=80"
          alt="Warm Pacific Northwest Airbnb living room with firelit hospitality touches"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-forest/70 via-forest/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" aria-hidden="true" />
      </div>

      <div
        className="absolute left-8 top-24 h-20 w-20 rounded-full bg-lake/20 blur-2xl md:left-16 md:top-28 md:h-24 md:w-24"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-36 right-10 h-28 w-28 rounded-full bg-forest/25 blur-3xl md:bottom-40 md:right-16 md:h-32 md:w-32"
        aria-hidden="true"
      />
      <div
        className="absolute right-1/4 top-1/3 h-16 w-16 rounded-full bg-cream/20 blur-lg md:h-20 md:w-20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 md:py-32">
        <div className="mb-6 flex justify-center">
          <ul className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
            {credibilityHighlights.map(({ icon, label }, index) => (
              <Fragment key={label}>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <span aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                </li>
                {index < credibilityHighlights.length - 1 && (
                  <li aria-hidden="true" className="px-1 text-white/60">
                    •
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>

        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-forest-light via-white to-lake bg-clip-text text-transparent drop-shadow">
            Boutique Airbnb care rooted in warm Pacific Northwest hospitality.
          </span>
        </h1>

        <p className="mt-6 text-lg text-white/85 sm:text-xl">
          Thoughtful guest experiences, local expertise, and steady returns for Western Washington homeowners who
          want a trusted partner.
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/70">Serving Western Washington</p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="#contact" variant="primary" className="px-8 py-4 text-lg shadow-glow">
            Get a Free Property Review
          </Button>
          <Button href="#how" variant="secondary" className="px-8 py-4 text-lg">
            See How It Works
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {serviceHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="mb-3 text-2xl" aria-hidden="true">
                {item.icon}
              </div>
              <p className="mb-1 text-base font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50">
          <div className="mt-2 h-3 w-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
