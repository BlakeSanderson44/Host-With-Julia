"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import { TESTIMONIALS } from "@/data/testimonials";

import { focusVisibleRing } from "@/lib/a11y";

type TestimonialsSectionProps = {
  className?: string;
};

function classNames(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(" ");
}

function formatReviewDate(value: string) {
  if (!value) return value;
  const iso = value.length === 7 ? `${value}-01` : value;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(parsed);
}

function toDateTimeAttribute(value: string) {
  return value.length === 7 ? `${value}-01` : value;
}

const StarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={classNames("h-4 w-4", className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

function Stars({ value = 5 }: { value?: number }) {
  const rating = Math.round(Math.max(0, Math.min(5, value)));
  return (
    <div className="inline-flex items-center gap-1 text-amber-500" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className={index < rating ? "opacity-100" : "opacity-30"} />
      ))}
    </div>
  );
}

function ReviewBody({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 220;
  const needsTruncation = text.length > limit;
  const truncated = needsTruncation ? `${text.slice(0, limit).trimEnd()}…` : text;

  return (
    <p className="text-slate">
      {expanded || !needsTruncation ? text : truncated}{" "}
      {needsTruncation && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className={`rounded font-semibold text-forest underline-offset-2 transition hover:underline ${focusVisibleRing}`}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}

export default function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className={classNames("bg-cream py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <header className="mb-10 sm:mb-14">
          <h2 className="text-3xl font-bold text-forest">What Guests Say</h2>
          <p className="mt-3 max-w-2xl text-slate">
            Real five-star reviews from recent stays managed by Host With Julia.
          </p>
        </header>

        <div className="-mx-6 overflow-x-auto px-6 sm:hidden">
          <div className="flex snap-x snap-mandatory gap-4">
            {TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.id}
                className="min-w-[85%] snap-start rounded-2xl border border-sand bg-white p-5 shadow-soft"
              >
                <header className="flex items-start justify-between gap-3">
                  <Stars value={testimonial.rating ?? 5} />
                  {testimonial.date && (
                    <time
                      dateTime={toDateTimeAttribute(testimonial.date)}
                      className="text-xs font-medium uppercase tracking-wide text-slate-500"
                    >
                      {formatReviewDate(testimonial.date)}
                    </time>
                  )}
                </header>
                <h3 className="mt-4 text-base font-semibold text-charcoal">{testimonial.name}</h3>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  <span>{testimonial.property}</span>
                  {testimonial.location && (
                    <span className="text-slate-500"> • {testimonial.location}</span>
                  )}
                </p>
                <div className="mt-3 text-sm">
                  <ReviewBody text={testimonial.text} />
                </div>
                {testimonial.source && (
                  <cite className="mt-4 block text-xs uppercase tracking-wide text-slate-500">
                    {testimonial.source}
                  </cite>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <article key={testimonial.id} className="rounded-2xl border border-sand bg-white p-6 shadow-soft">
              <header className="flex items-start justify-between gap-3">
                <Stars value={testimonial.rating ?? 5} />
                {testimonial.date && (
                  <time
                    dateTime={toDateTimeAttribute(testimonial.date)}
                    className="text-xs font-medium uppercase tracking-wide text-slate-500"
                  >
                    {formatReviewDate(testimonial.date)}
                  </time>
                )}
              </header>
              <h3 className="mt-4 text-base font-semibold text-charcoal">{testimonial.name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-600">
                <span>{testimonial.property}</span>
                {testimonial.location && (
                  <span className="text-slate-500"> • {testimonial.location}</span>
                )}
              </p>
              <div className="mt-3 text-sm">
                <ReviewBody text={testimonial.text} />
              </div>
              {testimonial.source && (
                <cite className="mt-4 block text-xs uppercase tracking-wide text-slate-500">
                  {testimonial.source}
                </cite>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <a
            href="#contact"
            className={`inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-lg ${focusVisibleRing}`}
          >
            See How Much Time &amp; Stress You Could Save → Contact Julia
          </a>
        </div>
      </div>
    </section>
  );
}
