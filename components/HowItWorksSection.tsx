const headingId = 'how-it-works-heading';

const asString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' && value.trim().length > 0 ? value : fallback;

type StepObject = {
  title?: unknown;
  heading?: unknown;
  description?: unknown;
  copy?: unknown;
  [key: string]: unknown;
};

type StepLike = StepObject | null | undefined;

export interface HowItWorksSectionProps {
  className?: string;
  steps: ReadonlyArray<StepLike>;
}

const StepBadge = ({ number }: { number: number }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 48 48"
    className="h-10 w-10 flex-none"
  >
    <circle cx="24" cy="24" r="24" className="fill-forest" />
    <text
      x="24"
      y="26"
      textAnchor="middle"
      fontSize="18"
      fontWeight="600"
      className="fill-white"
    >
      {number}
    </text>
  </svg>
);

export default function HowItWorksSection({
  className,
  steps,
}: HowItWorksSectionProps) {
  const normalized = steps.map((step, index) => {
    const stepObject = (step && typeof step === 'object' ? step : {}) as StepObject;

    const title = asString(
      (stepObject.title ?? stepObject.heading) as unknown,
      `Step ${index + 1}`
    );
    const description = asString(
      (stepObject.description ?? stepObject.copy) as unknown,
      ''
    );

    return { title, description };
  });

  const sectionClasses = ['bg-white py-16 sm:py-24', className]
    .filter((token): token is string => Boolean(token && token.trim().length > 0))
    .join(' ');

  return (
    <section id="how-it-works" aria-labelledby={headingId} className={sectionClasses}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 id={headingId} className="text-3xl font-bold text-forest">
            How It Works
          </h2>
          <p className="mt-3 text-slate">
            A simple, owner-friendly process from preparation to five-star stays.
          </p>
        </header>

        <ol className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {normalized.map(({ title, description }, index) => (
            <li
              key={`${index}-${title}`}
              className="rounded-2xl border border-sand bg-cream/50 p-6 shadow-sm transition-colors hover:border-forest"
            >
              <div className="flex items-start gap-4">
                <StepBadge number={index + 1} />
                <div>
                  <span className="sr-only">Step {index + 1}</span>
                  <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
                  {description && (
                    <p className="mt-2 text-sm text-slate">{description}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
