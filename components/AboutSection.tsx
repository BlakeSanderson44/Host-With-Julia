import ComparisonToggle from './ComparisonToggle';
import Section from './ui/Section';
import SmoothAnchorLink from './ui/SmoothAnchorLink';

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

        <div className="mt-12">
          <ComparisonToggle comparisonRows={comparisonRows} />
        </div>

        <div className="mt-12 text-center">
          <SmoothAnchorLink
            href="/#contact"
            aria-label="Contact Julia to save time and stress"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-base font-semibold text-white shadow-medium transition hover:bg-forest-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            See How Much Time &amp; Stress You Could Save → Contact Julia
          </SmoothAnchorLink>
        </div>
      </div>
    </Section>
  );
}
