'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQProps {
  items: FAQItem[];
}

type PreparedFAQItem = FAQItem & {
  slug: string;
  id: string;
};

function slugify(value: string, fallback: string) {
  const baseSlug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return baseSlug || fallback;
}

export default function FAQ({ items }: FAQProps) {
  const validItems = useMemo<PreparedFAQItem[]>(() => {
    const seen = new Map<string, number>();

    return items.reduce<PreparedFAQItem[]>((acc, item, index) => {
      if (!item?.q?.trim() || !item?.a?.trim()) {
        console.warn(
          `FAQ: Skipping item at index ${index} because question and/or answer is missing.`,
        );
        return acc;
      }

      const baseSlug = slugify(item.q, `item-${index + 1}`);
      const nextCount = (seen.get(baseSlug) ?? 0) + 1;
      seen.set(baseSlug, nextCount);
      const slug = nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`;

      acc.push({ ...item, slug, id: `faq-q-${slug}` });
      return acc;
    }, []);
  }, [items]);

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const detailsRefs = useRef<Record<string, HTMLDetailsElement | null>>({});

  useEffect(() => {
    setOpenItems((prev) => {
      const next: Record<string, boolean> = {};
      for (const item of validItems) {
        next[item.id] = prev[item.id] ?? false;
      }
      return next;
    });
  }, [validItems]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) {
        return;
      }
      const target = detailsRefs.current[hash];
      if (target) {
        target.open = true;
        setOpenItems((prev) => ({ ...prev, [hash]: true }));
        const summary = target.querySelector('summary');
        summary?.focus();
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [validItems]);

  const jsonLd = useMemo(() => {
    const mainEntity = validItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }));

    if (!mainEntity.length) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity,
    } as const;
  }, [validItems]);

  if (!validItems.length) {
    return null;
  }

  return (
    <div className="relative">
      <div className="lg:grid lg:grid-cols-[minmax(200px,240px)_1fr] lg:gap-12">
        <aside className="sticky top-24 hidden h-fit lg:block">
          <ol className="space-y-3 border-l border-forest/20 pl-4 text-sm font-medium text-forest/80">
            {validItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="transition hover:text-forest focus-visible:outline-none focus-visible:ring focus-visible:ring-forest/40"
                >
                  {item.q}
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <div className="space-y-4">
          {validItems.map((item) => {
            const isOpen = openItems[item.id] ?? false;
            return (
              <details
                key={item.id}
                id={item.id}
                ref={(node) => {
                  detailsRefs.current[item.id] = node;
                }}
                open={isOpen}
                data-analytics={isOpen ? 'faq-open' : 'faq-close'}
                className="group rounded-2xl border border-forest/15 bg-white p-6 shadow-soft transition hover:border-forest/30 focus-within:border-forest/40"
                onToggle={(event) => {
                  const open = event.currentTarget.open;
                  setOpenItems((prev) => ({ ...prev, [item.id]: open }));
                }}
              >
                <summary
                  className="cursor-pointer list-none text-lg font-semibold text-forest outline-none transition focus-visible:ring focus-visible:ring-forest/40"
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-content`}
                >
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-base text-forest/60">
                      {isOpen ? '−' : '+'}
                    </span>
                  </span>
                </summary>
                <div
                  id={`${item.id}-content`}
                  className="mt-3 text-base leading-relaxed text-slate"
                  aria-live="polite"
                >
                  <p>{item.a}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </div>
  );
}
