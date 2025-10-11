import Image from 'next/image';
import { defaultSizes, requireAlt } from '@/lib/image';
import Button from './Button';

const HERO_IMAGE_SRC = process.env.NEXT_PUBLIC_HERO_IMAGE ?? '/images/echo-house.avif';

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-forest text-white">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt={requireAlt('Echo House living room with warm natural wood and a stone fireplace')}
          fill
          sizes={defaultSizes}
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjMDA2MTQzJy8+PC9zdmc+"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-forest/80 via-forest/55 to-forest/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center sm:px-10">
        <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-sm">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span aria-hidden="true">⭐</span>
            Superhost
          </span>
          <span aria-hidden="true" className="text-white/60">
            •
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span aria-hidden="true">🕒</span>
            Avg response: &lt; 1 hour
          </span>
          <span aria-hidden="true" className="text-white/60">
            •
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span aria-hidden="true">📍</span>
            Washington
          </span>
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight text-white drop-shadow-sm text-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
          Boutique Airbnb management rooted in warm Pacific Northwest hospitality.
        </h1>

        <p className="mx-auto mb-4 max-w-3xl text-lg text-white/80 text-shadow-sm sm:text-xl">
          Thoughtful guest care, local expertise, and steady returns for homeowners who want a partner they can trust.
        </p>
        <p className="mx-auto mb-12 max-w-2xl text-base uppercase tracking-[0.2em] text-white/70">
          Washington
        </p>

        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#contact" variant="primary" className="text-lg px-8 py-4 shadow-glow">
            Get a Free Property Review
          </Button>
          <Button
            href="#how"
            variant="secondary"
            className="text-lg px-8 py-4 border-white/40 text-white/90 hover:text-white"
          >
            See How It Works
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {[
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
          ].map((item) => (
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
