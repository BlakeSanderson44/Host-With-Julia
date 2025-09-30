import React from "react";

const VALUE_PROPS = [
  {
    title: "Faster Responses",
    description: "24/7 guest messaging under one hour.",
  },
  {
    title: "Optimized Pricing",
    description: "Dynamic rates tuned to demand.",
  },
  {
    title: "Quality Control",
    description: "Standardized checklists with cleaner accountability.",
  },
];

const STAT_PILLS = [
  "< 1 hr response time",
  "0 missed turnovers in 12 mo",
  "Serving Washington",
];

const COMPARISON_ROWS = [
  { label: "Guest Messaging", owner: "Delayed", julia: "24/7 < 1 hr" },
  { label: "Pricing", owner: "Static", julia: "Dynamic" },
  { label: "Guidebook", owner: "None", julia: "Touch Stay add-on" },
  {
    label: "Cleaning QC",
    owner: "Inconsistent",
    julia: "Standardized checklists & spot checks",
  },
  { label: "Reviews/Ranking", owner: "Hit-or-miss", julia: "Superhost focus" },
  { label: "Reporting", owner: "Ad-hoc", julia: "Monthly summaries" },
];

function ValueCard({ title, description }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md focus-within:border-emerald-300">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </article>
  );
}

function StatPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-900/20 dark:text-emerald-100">
      {label}
    </span>
  );
}

function IconCheck({ className = "h-4 w-4 text-emerald-600" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconX({ className = "h-4 w-4 text-rose-500" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function WhyWorkWithJulia() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Why Work With Julia</h2>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VALUE_PROPS.map((item) => (
          <ValueCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center">
        {STAT_PILLS.map((pill) => (
          <StatPill key={pill} label={pill} />
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of Owner-Managed versus With Julia services and outcomes
            </caption>
            <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3">What’s Included</th>
                <th scope="col" className="px-4 py-3 text-slate-900">Owner-Managed</th>
                <th scope="col" className="px-4 py-3 text-slate-900">With Julia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-emerald-50/40">
                  <th scope="row" className="px-4 py-4 font-medium text-slate-900">
                    {row.label}
                  </th>
                  <td className="px-4 py-4 text-slate-700">
                    <span className="inline-flex items-center gap-2">
                      <IconX />
                      <span className="sr-only">{row.label} when owner-managed:</span>
                      <span>{row.owner}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-900">
                    <span className="inline-flex items-center gap-2">
                      <IconCheck />
                      <span className="sr-only">{row.label} with Julia:</span>
                      <span>{row.julia}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Results based on recent properties managed in Washington; actual outcomes may vary by market, seasonality, and property type.
      </p>
    </section>
  );
}
