'use client';

type AnyRecord = Record<string, unknown>;

type LocationsSectionProps = {
  locations: AnyRecord[] | undefined;
};

const getString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const getArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

export default function LocationsSection({ locations }: LocationsSectionProps) {
  const safeLocations = Array.isArray(locations) ? locations : [];

  const normalized = safeLocations.map((loc, index) => {
    const name = getString(loc['name'] ?? loc['title'], `Location ${index + 1}`);
    const image = getString(loc['image'] ?? loc['img'] ?? loc['photo']);

    const altText =
      getString(loc['alt'], '') ||
      (name ? `${name} — scenic view` : 'Scenic Pacific Northwest view');

    const blurb =
      getString(loc['blurb'], '') ||
      getString(loc['description'], '') ||
      getString(loc['summary'], '');

    const highlightSources: unknown[][] = [
      getArray(loc['highlights']),
      getArray(loc['bullets']),
      getArray(loc['features']),
    ];

    const highlights = highlightSources
      .flat()
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean)
      .slice(0, 3);

    return { name, image, altText, blurb, highlights };
  });

  return (
    <section id="locations" aria-labelledby="locations-heading" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 id="locations-heading" className="text-3xl font-bold text-forest">
            Locations
          </h2>
          <p className="mt-3 text-slate">
            Based in Western Washington — proudly serving homeowners across the state, from the Puget Sound region to Lake Chelan and other parts of Central Washington.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {normalized.map(({ name, image, altText, blurb, highlights }, idx) => (
            <article
              key={`${name}-${idx}`}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-cream/40 shadow"
            >
              {image ? (
                <img
                  src={image}
                  alt={altText}
                  className="h-44 w-full object-cover"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding={idx === 0 ? 'sync' : 'async'}
                />
              ) : (
                <div className="h-44 w-full bg-cream" aria-hidden="true" />
              )}

              <div className="flex grow flex-col gap-4 p-6 sm:p-7">
                <h3 className="text-lg font-semibold text-charcoal">{name}</h3>
                <p className="text-sm text-slate">
                  {blurb || `Trusted hosting, local partnerships, and guest-loved stays in ${name}.`}
                </p>

                {highlights.length > 0 && (
                  <ul className="mt-1 space-y-2">
                    {highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className="flex items-start gap-2 text-sm text-charcoal"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-forest"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-2">
                  <a
                    href="#contact"
                    className="inline-flex justify-center rounded-xl bg-forest px-4 py-2 font-semibold text-white shadow transition-[transform,opacity] duration-200 active:scale-95"
                  >
                    Ask about {name}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
