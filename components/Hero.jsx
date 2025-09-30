import React from "react";

function BadgePill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur ring-1 ring-white/20">
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate min-h-[70vh]">
      <img
        src="/img/hero-a-frame.jpg"
        alt="Cozy A-frame cabin glowing in a Pacific Northwest forest at dusk"
        className="absolute inset-0 h-full w-full object-cover object-center [filter:brightness(0.65)] sm:[filter:brightness(0.7)]"
        loading="eager"
        fetchpriority="high"
        srcSet="/img/hero-a-frame-768.jpg 768w, /img/hero-a-frame-1280.jpg 1280w, /img/hero-a-frame-1920.jpg 1920w"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-[14vh] text-white sm:py-[16vh] lg:py-[18vh]">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <BadgePill>⭐ Superhost</BadgePill>
          <BadgePill>⏱ Avg response &lt; 1 hr</BadgePill>
          <BadgePill>📍 Western WA</BadgePill>
        </div>

        <h1 className="max-w-3xl font-semibold leading-tight [font-size:clamp(2rem,5vw,4rem)]">
          Boutique Airbnb management with warm Pacific Northwest hospitality.
        </h1>

        <p className="mt-4 max-w-2xl text-white/90 [font-size:clamp(1rem,2.2vw,1.25rem)]">
          Local expertise, happier guests, and stronger net returns—without the day-to-day stress.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            aria-label="Get a Free Property Review"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-white shadow-lg transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Get a Free Property Review
          </a>
          <span className="order-last w-full text-sm text-white/80 sm:order-none sm:w-auto sm:text-base sm:text-white/85">
            No pressure. 24–48h.
          </span>
          <a
            href="#how"
            aria-label="See how it works"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
