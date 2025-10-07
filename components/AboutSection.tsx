export interface ValuePillar {
  title: string;
  description: string;
}

export interface TimeSaving {
  task: string;
  ownerManaged: string;
  withJulia: string;
  description: string;
}

export interface ComparisonRow {
  label: string;
  ownerManaged: string;
  withJulia: string;
}

export interface AboutSectionProps {
  valuePillars: ValuePillar[];
  timeSavings: TimeSaving[];
  comparisonRows: ComparisonRow[];
}

export default function AboutSection({
  valuePillars,
  timeSavings,
  comparisonRows,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-forest">Why Work With Julia</h2>
          <p className="mx-auto max-w-3xl text-lg text-slate">
            Boutique, hands-on management that protects your revenue and gives you back your time.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {valuePillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-forest">{pillar.title}</h3>
              <p className="mt-2 text-sm text-slate">{pillar.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="space-y-6 rounded-3xl border border-sand bg-white p-8 shadow-sm">
            <div>
              <h3 className="text-xl font-semibold text-forest">Time Julia Gives Back</h3>
              <p className="mt-2 text-sm text-slate">
                Owners typically claw back whole evenings and weekends once Julia owns the day-to-day.
              </p>
            </div>
            <ul className="space-y-5">
              {timeSavings.map((item) => (
                <li key={item.task} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-base font-medium text-forest">{item.task}</span>
                    <span className="rounded-full bg-lake/10 px-3 py-1 text-sm font-semibold text-lake">
                      {item.withJulia}
                    </span>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate/80">
                    Owner-managed: {item.ownerManaged}
                  </div>
                  <p className="text-sm text-slate">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-sand bg-white shadow-sm">
            <div className="border-b border-sand bg-sand/60 px-6 py-4">
              <h3 className="text-lg font-semibold text-forest">What Julia Manages For You</h3>
            </div>
            <table className="w-full text-left text-sm text-slate">
              <thead className="bg-sand/40 text-xs uppercase tracking-wide text-forest/80">
                <tr>
                  <th className="px-6 py-3">Area</th>
                  <th className="px-6 py-3">Owner-Managed</th>
                  <th className="px-6 py-3">With Julia</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-sand/70">
                    <td className="px-6 py-4 font-medium text-forest">{row.label}</td>
                    <td className="px-6 py-4 align-top">{row.ownerManaged}</td>
                    <td className="px-6 py-4 align-top text-forest">{row.withJulia}</td>
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
