import type { SVGProps } from 'react';

type ServicesSectionProps = {
  className?: string;
};

function classNames(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(' ');
}

const CheckIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={classNames('h-5 w-5 shrink-0 text-forest', className)}
    {...props}
  >
    <path
      d="M20 6L9 17l-5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={classNames('h-5 w-5 shrink-0 text-lake', className)}
    {...props}
  >
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function ServicesSection({ className }: ServicesSectionProps) {
  return (
    <section id="services" className={classNames('bg-cream py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 className="text-3xl font-bold text-forest">Services</h2>
          <p className="mt-3 text-slate">
            Boutique full-service hosting for most owners, plus a curated set of add-ons when you want to go even
            further.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <article className="rounded-2xl border border-sand bg-white p-6 shadow sm:p-7">
            <h3 className="text-xl font-semibold text-charcoal">Boutique Full-Service Hosting</h3>
            <p className="mt-2 text-slate">
              Our standard package—comprehensive, hands-on management designed to deliver warm hospitality and steady
              returns.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-3">
                <CheckIcon />
                <div>
                  <strong className="text-charcoal">Dynamic pricing &amp; listing optimization</strong>
                  <p className="text-sm text-slate">
                    Professional photos, copywriting, SEO and rate adjustments based on demand.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <div>
                  <strong className="text-charcoal">Guest communications</strong>
                  <p className="text-sm text-slate">24/7 messaging, screening and house-rules enforcement.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <div>
                  <strong className="text-charcoal">Turnover coordination</strong>
                  <p className="text-sm text-slate">Cleaners, linens, consumables restocked and post-stay inspection.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <div>
                  <strong className="text-charcoal">Review &amp; ranking strategy</strong>
                  <p className="text-sm text-slate">Issue resolution, review responses and ranking improvements.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <div>
                  <strong className="text-charcoal">Monthly reporting</strong>
                  <p className="text-sm text-slate">Occupancy, revenue, expenses and clear action recommendations.</p>
                </div>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-sand bg-white p-6 shadow sm:p-7">
            <h3 className="text-xl font-semibold text-charcoal">Add-ons: Elevate Your Listing</h3>
            <p className="mt-2 text-slate">À-la-carte upgrades to tailor the experience to your goals.</p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-3">
                <PlusIcon />
                <div>
                  <strong className="text-charcoal">Digital guidebook creation</strong>
                  <p className="text-sm text-slate">
                    Interactive guest guide covering house rules, neighborhood tips and itineraries.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PlusIcon />
                <div>
                  <strong className="text-charcoal">Professional staging &amp; design</strong>
                  <p className="text-sm text-slate">Interior styling consults, furniture sourcing and décor upgrades.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PlusIcon />
                <div>
                  <strong className="text-charcoal">Direct booking website</strong>
                  <p className="text-sm text-slate">Standalone site for brand control and OTA independence.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PlusIcon />
                <div>
                  <strong className="text-charcoal">In-person welcome &amp; concierge</strong>
                  <p className="text-sm text-slate">Personal check-in, special-occasion setups and local coordination.</p>
                </div>
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-10 md:hidden">
          <h4 className="text-base font-semibold text-charcoal">At-a-glance</h4>
          <ul className="mt-4 divide-y divide-sand rounded-2xl border border-sand bg-white">
            {[
              ['Dynamic pricing & listing optimization', true],
              ['Guest communications', true],
              ['Turnover coordination', true],
              ['Review & ranking strategy', true],
              ['Monthly reporting', true],
              ['Digital guidebook creation', false],
              ['Professional staging & design', false],
              ['Direct booking website', false],
              ['In-person welcome & concierge', false],
            ].map(([label, included]) => (
              <li key={String(label)} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-charcoal">{label}</span>
                {included ? (
                  <span className="inline-flex items-center gap-1 text-sm text-forest">
                    <CheckIcon className="h-4 w-4" /> Included
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-lake">
                    <PlusIcon className="h-4 w-4" /> Add-on
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 hidden md:block">
          <div className="overflow-x-auto rounded-2xl border border-sand bg-white">
            <table className="min-w-full text-sm">
              <caption className="sr-only">Comparison of included services vs. optional add-ons</caption>
              <thead className="bg-cream/60 text-charcoal">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    Service
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    Full-Service
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    Add-on
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {[
                  ['Dynamic pricing & listing optimization', true, false],
                  ['Guest communications', true, false],
                  ['Turnover coordination', true, false],
                  ['Review & ranking strategy', true, false],
                  ['Monthly reporting', true, false],
                  ['Digital guidebook creation', false, true],
                  ['Professional staging & design', false, true],
                  ['Direct booking website', false, true],
                  ['In-person welcome & concierge', false, true],
                ].map(([label, core, addon]) => (
                  <tr key={String(label)}>
                    <th scope="row" className="px-4 py-3 font-medium text-charcoal">
                      {label}
                    </th>
                    <td className="px-4 py-3">
                      {core ? <CheckIcon className="h-5 w-5" /> : <span className="text-slate">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {addon ? <PlusIcon className="h-5 w-5" /> : <span className="text-slate">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
