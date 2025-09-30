import React from "react";

function StatPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-900/20 dark:text-emerald-100">
      {label}
    </span>
  );
}

function IconCheck({ className = "h-4 w-4 text-emerald-600" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconX({ className = "h-4 w-4 text-rose-600" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const comparisonRows = [
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

export default function WhyWorkWithJulia() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <header className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Why Work With Julia
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-gray-300">
          <h3 className="text-base font-semibold text-gray-900">Faster Responses</h3>
          <p className="mt-2 text-sm text-gray-600">24/7 guest messaging under one hour.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-gray-300">
          <h3 className="text-base font-semibold text-gray-900">Optimized Pricing</h3>
          <p className="mt-2 text-sm text-gray-600">Dynamic rates tuned to demand.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-gray-300">
          <h3 className="text-base font-semibold text-gray-900">Quality Control</h3>
          <p className="mt-2 text-sm text-gray-600">Standardized checklists with cleaner accountability.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center">
        <StatPill label="< 1 hr response time" />
        <StatPill label="0 missed turnovers in 12 mo" />
        <StatPill label="Serving Washington" />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">
              Comparison of Owner-Managed versus With Julia services and outcomes
            </caption>
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th scope="col" className="w-2/5 px-4 py-3 font-medium text-gray-700">
                  What’s Included
                </th>
                <th scope="col" className="w-3/12 px-4 py-3 font-semibold text-gray-900">
                  Owner-Managed
                </th>
                <th scope="col" className="w-3/12 px-4 py-3 font-semibold text-gray-900">
                  With Julia
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {comparisonRows.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-gray-50">
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900">
                    {row.label}
                  </th>
                  <td className="px-4 py-4">
                    <span className="sr-only">Owner-managed {row.label}: {row.owner}</span>
                    <span aria-hidden="true" className="inline-flex items-center gap-2 text-gray-700">
                      <IconX />
                      <span>{row.owner}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="sr-only">With Julia {row.label}: {row.julia}</span>
                    <span aria-hidden="true" className="inline-flex items-center gap-2 text-gray-900">
                      <IconCheck />
                      <span>{row.julia}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        Results based on recent properties managed in Washington; actual outcomes may vary by market, seasonality, and property type.
      </p>
    </section>
  );
}
