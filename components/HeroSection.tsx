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
    title: 'Local touch',
    description: 'Neighborhood insights and welcome touches that feel authentically PNW.',
  },
  {
    icon: '🤝',
    title: 'Hands-on hosting',
    description: 'Guest messaging, turnovers, and reporting handled with grace and care.',
  },
  {
    icon: '📈',
    title: 'Performance clarity',
    description: 'Transparent pricing, monthly reports, and payouts you can plan around.',
  },
] as const;

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-forest text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1920&q=80"
          alt="Inviting Pacific Northwest Airbnb living room with warm hospitality touches"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-forest/70 via-forest/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 sm:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <ul className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
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

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
            Boutique Airbnb management rooted in warm Pacific Northwest hospitality.
          </h1>

          <p className="text-lg text-white/85 sm:text-xl">
            Thoughtful guest care, local expertise, and steady returns for homeowners who want a partner they can trust.
          </p>
          <p className="text-base uppercase tracking-[0.2em] text-white/70">Serving Western Washington</p>
        </div>

        <div className="mt-12 mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#contact" variant="primary" className="px-8 py-4 text-lg shadow-glow">
            Get a Free Property Review
          </Button>
          <Button
            href="#how"
            variant="secondary"
            className="px-8 py-4 text-lg text-white/90 hover:text-white"
          >
            See How It Works
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {serviceHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="mb-3 text-2xl" aria-hidden="true">
                {item.icon}
              </div>
              <p className="mb-2 text-base font-semibold text-white">{item.title}</p>
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
