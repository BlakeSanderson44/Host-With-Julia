interface HowStep {
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: HowStep[];
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section id="how" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-forest text-center mb-10">How It Works</h2>
      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((step) => (
          <div key={step.title} className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-slate">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
