"use client";

import { useCallback, useState, type KeyboardEvent } from 'react';

import type { ComparisonRow } from './AboutSection';

type ViewOption = {
  id: 'owner' | 'julia';
  label: string;
};

const viewOptions = [
  { id: 'owner', label: 'Owner-Managed' },
  { id: 'julia', label: 'Host With Julia' },
] satisfies ReadonlyArray<ViewOption>;

function IconCheck({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconX({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type SegmentedToggleProps = {
  activeView: ViewOption['id'];
  onChange: (view: ViewOption['id']) => void;
};

function SegmentedToggle({ activeView, onChange }: SegmentedToggleProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!viewOptions.length) return;

      const rawIndex = viewOptions.findIndex((option) => option.id === activeView);
      const currentIndex = rawIndex >= 0 ? rawIndex : 0;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % viewOptions.length;
        const nextOption = viewOptions[nextIndex];
        if (nextOption) onChange(nextOption.id);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const nextIndex = (currentIndex - 1 + viewOptions.length) % viewOptions.length;
        const nextOption = viewOptions[nextIndex];
        if (nextOption) onChange(nextOption.id);
      }
    },
    [activeView, onChange],
  );

  return (
    <div
      role="group"
      aria-label="Comparison view"
      className="inline-flex items-center rounded-full border border-forest/15 bg-cream/70 p-1 shadow-inner"
    >
      {viewOptions.map((option) => {
        const isActive = option.id === activeView;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            onKeyDown={handleKeyDown}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              isActive
                ? 'bg-forest text-white shadow'
                : 'text-forest/80 hover:bg-forest/10'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

type FeatureCardProps = {
  row: ComparisonRow;
  viewLabel: string;
  activeView: ViewOption['id'];
};

function FeatureCard({ row, activeView, viewLabel }: FeatureCardProps) {
  const column = row[activeView];
  const isIncluded = column.icon === 'check';
  const isExcluded = column.icon === 'x';

  let primaryCopy = '';
  let secondaryCopy: string | null = null;

  if (column.icon === 'check') {
    primaryCopy = 'Included';
    secondaryCopy = column.text ?? null;
  } else if (column.icon === 'x') {
    primaryCopy = 'Not included';
    secondaryCopy = column.text ?? null;
  } else if (column.text) {
    primaryCopy = column.text;
  }

  const statusColor = isIncluded ? 'text-forest' : isExcluded ? 'text-rose-500' : 'text-slate';
  const badgeStyles = isIncluded
    ? 'bg-forest/10 text-forest'
    : isExcluded
      ? 'bg-rose-50 text-rose-500'
      : 'bg-white text-forest border border-forest/10';

  return (
    <li>
      <article className="flex items-start justify-between gap-4 rounded-2xl border border-forest/15 bg-cream/30 p-4 shadow-soft transition hover:border-forest/25 hover:shadow-medium md:p-5">
        <div>
          <h4 className="text-base font-semibold text-forest">{row.label}</h4>
          {primaryCopy && (
            <p className={`mt-2 text-sm font-medium ${statusColor}`}>{primaryCopy}</p>
          )}
          {secondaryCopy && (
            <p className="mt-1 text-sm text-slate">{secondaryCopy}</p>
          )}
        </div>
        <span
          className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${badgeStyles}`}
          aria-hidden="true"
        >
          {isIncluded ? <IconCheck /> : isExcluded ? <IconX /> : <span className="text-lg font-semibold leading-none">•</span>}
        </span>
        <span className="sr-only">
          {viewLabel} {row.label}: {primaryCopy || secondaryCopy || (isIncluded ? 'Included' : isExcluded ? 'Not included' : 'Details available')}
        </span>
      </article>
    </li>
  );
}

type ComparisonToggleProps = {
  comparisonRows: ComparisonRow[];
};

export default function ComparisonToggle({ comparisonRows }: ComparisonToggleProps) {
  const [activeView, setActiveView] = useState<ViewOption['id']>('julia');
  const viewLabel = activeView === 'julia' ? 'Host With Julia' : 'Owner-Managed';

  return (
    <section className="rounded-3xl border border-forest/15 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <header>
          <h3 className="text-2xl font-semibold text-forest">Owner-Managed vs. Host With Julia</h3>
          <p className="mt-2 text-sm text-slate">
            Compare what&apos;s handled in each approach. Use the toggle to switch views.
          </p>
        </header>
        <SegmentedToggle activeView={activeView} onChange={setActiveView} />
      </div>

      <ul className="mt-6 grid gap-4 md:gap-5" aria-label={`${viewLabel} feature list`}>
        {comparisonRows.map((row) => (
          <FeatureCard key={row.label} row={row} activeView={activeView} viewLabel={viewLabel} />
        ))}
      </ul>

      <p className="mt-6 text-xs text-slate">
        Viewing: <span className="font-semibold text-forest">{viewLabel}</span>. Switch the toggle above to see the other side.
      </p>
    </section>
  );
}
