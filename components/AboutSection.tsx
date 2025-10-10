import Section from './ui/Section';

export type ValuePillar = { title: string; description: string };
export type TimeSaving = { icon: string; label: string };
type ColumnContent = { icon?: 'check' | 'x'; text?: string };
export type ComparisonRow = {
  label: string;
  owner: ColumnContent;
  julia: ColumnContent;
};

export type AboutSectionProps = {
  valuePillars: ValuePillar[];
  timeSavings: TimeSaving[];
  comparisonRows: ComparisonRow[];
  className?: string;
};

function IconCheck({ className = 'h-4 w-4 text-forest' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconX({ className = 'h-4 w-4 text-rose-500' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ValueCard({ title, description }: ValuePillar) {
  return (
    <article className="h-full rounded-2xl border border-forest/15 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium">
      <h3 className="text-lg font-semibold text-forest">{title}</h3>
      <p className="mt-2 text-sm text-slate">{description}</p>
    </article>
  );
}

export default function AboutSection({ valuePillars, timeSavings, comparisonRows, className }: AboutSectionProps) {
  return (
    <Section id="about" className={`py-20${className ? ` ${className}` : ''}`}>
      <div className="mx-auto max-w-6xl px-4">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-forest sm:text-4xl">Why Work With Julia</h2>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {valuePillars.map((pillar) => (
            <ValueCard key={pillar.title} title={pillar.title} description={pillar.description} />
          ))}
        </div>

        <ul className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-center" aria-label="Time and stress savings">
          {timeSavings.map((item) => (
            <li
              key={item.label}
              className="flex flex-1 items-center justify-center gap-3 rounded-full border border-forest/20 bg-sand px-5 py-3 text-sm font-medium text-forest shadow-soft"
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 overflow-hidden rounded-2xl border border-forest/15 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of key services for owner-managed properties versus Host With Julia
              </caption>
              <thead className="bg-sand text-forest">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Owner-Managed
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    With Julia
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="transition hover:bg-sand/60">
                    <th scope="row" className="px-4 py-4 font-semibold text-forest">
                      {row.label}
                    </th>
                    <td className="px-4 py-4 text-slate">
                      <span className="sr-only">
                        Owner-managed {row.label}:{' '}
                        {row.owner.text ?? (row.owner.icon === 'x' ? 'Not included' : 'Included')}
                      </span>
                      <span aria-hidden="true" className="inline-flex items-center gap-2">
                        {row.owner.icon === 'x' && <IconX />}
                        {row.owner.icon === 'check' && <IconCheck />}
                        {row.owner.text && <span>{row.owner.text}</span>}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-forest">
                      <span className="sr-only">
                        With Julia {row.label}:{' '}
                        {row.julia.text ?? 'Included'}
                      </span>
                      <span aria-hidden="true" className="inline-flex items-center gap-2">
                        {row.julia.icon === 'check' && <IconCheck />}
                        {row.julia.icon === 'x' && <IconX />}
                        {row.julia.text && <span>{row.julia.text}</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="mailto:hello@hostwithjulia.com?subject=Inquiry%20from%20Host%20With%20Julia%20website"
            aria-label="Contact Julia to save time and stress"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-base font-semibold text-white shadow-medium transition hover:bg-forest-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            See How Much Time &amp; Stress You Could Save → Contact Julia
          </a>
        </div>
      </div>
    </Section>
  );
}
