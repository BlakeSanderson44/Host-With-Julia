// FILE: <KEEP_SAME_PATH>
import React from "react";

const VALUE_PILLARS = [
  {
    title: "Faster Responses",
    description: "24/7 guest messaging under one hour",
  },
  {
    title: "Optimized Pricing",
    description: "Dynamic rates powered by PriceLabs",
  },
  {
    title: "Stress-Free Hosting",
    description: "Custom support that adapts to your property setup",
  },
];

const TIME_SAVINGS = [
  { icon: "💬", label: "Guest messages handled" },
  { icon: "⏰", label: "Late-night calls reduced: 4–6 → 0" },
  {
    icon: "🛏",
    label: "Turnovers coordinated with your local cleaning team",
  },
];

type ColumnContent = { icon?: "check" | "x"; text?: string };

const COMPARISON_ROWS: Array<{
  label: string;
  owner: ColumnContent;
  julia: ColumnContent;
}> = [
  {
    label: "24/7 Guest Messaging (<1 hr)",
    owner: { icon: "x" },
    julia: { icon: "check" },
  },
  {
    label: "Dynamic Pricing (via PriceLabs)",
    owner: { text: "Manual or static" },
    julia: { icon: "check", text: "Automated & optimized" },
  },
  {
    label: "Touch Stay Digital Guidebook (Add-On)",
    owner: { icon: "x" },
    julia: { icon: "check", text: "Available" },
  },
  {
    label: "Turnover Coordination",
    owner: { text: "On owner" },
    julia: { icon: "check", text: "Managed with your team" },
  },
  {
    label: "Review & Ranking Strategy",
    owner: { text: "Hit-or-miss" },
    julia: { icon: "check", text: "Superhost Focus" },
  },
  {
    label: "Reporting",
    owner: { text: "Ad-hoc" },
    julia: { icon: "check", text: "Monthly Summaries" },
  },
];

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md focus-within:border-emerald-300">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </article>
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

export default function WhyWorkWithJulia() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Why Work With Julia
        </h2>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VALUE_PILLARS.map((item) => (
          <ValueCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
        {TIME_SAVINGS.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 items-center gap-3 rounded-full border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-900/20 dark:text-emerald-100"
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of key services for owner-managed properties versus Host With Julia
            </caption>
            <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Feature
                </th>
                <th scope="col" className="px-4 py-3 text-slate-900">
                  Owner-Managed
                </th>
                <th scope="col" className="px-4 py-3 text-slate-900">
                  With Julia
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-emerald-50/40">
                  <th scope="row" className="px-4 py-4 font-medium text-slate-900">
                    {row.label}
                  </th>
                  <td className="px-4 py-4 text-slate-700">
                    <span className="sr-only">
                      Owner-managed {row.label}: {row.owner.text ?? (row.owner.icon === "x" ? "Not included" : "Included")}
                    </span>
                    <span aria-hidden="true" className="inline-flex items-center gap-2">
                      {row.owner.icon === "x" && <IconX />}
                      {row.owner.icon === "check" && <IconCheck className="h-4 w-4 text-emerald-600" />}
                      {row.owner.text && <span>{row.owner.text}</span>}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-900">
                    <span className="sr-only">
                      With Julia {row.label}: {row.julia.text ?? "Included"}
                    </span>
                    <span aria-hidden="true" className="inline-flex items-center gap-2">
                      {row.julia.icon === "check" && <IconCheck />}
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
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          See How Much Time &amp; Stress You Could Save → Contact Julia
        </a>
      </div>
    </section>
  );
}
