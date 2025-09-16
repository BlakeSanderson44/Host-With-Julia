interface FeatureItem {
  title: string;
  description: string;
}

interface TimeComparison {
  label: string;
  value: string;
  barClassName: string;
}

interface ComparisonRow {
  label: string;
  ownerManaged: string;
  withJulia: string;
}

interface AboutSectionProps {
  features: FeatureItem[];
  timeComparisons: TimeComparison[];
  quickStats: string[];
  comparisonTable: ComparisonRow[];
}

export default function AboutSection({
  features,
  timeComparisons,
  quickStats,
  comparisonTable,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <h2 className="text-3xl font-bold text-forest text-center">Why Work With Julia</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate">{feature.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-center">Time &amp; Stress Savings</h3>
          <div className="mt-4 space-y-2">
            {timeComparisons.map((comparison) => (
              <div key={comparison.label} className="flex items-center">
                <span className="w-40">{comparison.label}</span>
                <div className={`flex-1 h-4 ${comparison.barClassName}`} />
                <span className="ml-2">{comparison.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3 text-center">
            {quickStats.map((stat) => (
              <div key={stat}>{stat}</div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Owner-Managed</th>
                <th className="p-2">With Julia</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.label} className="border-t">
                  <td className="p-2">{row.label}</td>
                  <td className="p-2">{row.ownerManaged}</td>
                  <td className="p-2">{row.withJulia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
