"use client";

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { focusVisibleRing } from '@/lib/a11y';
import { defaultSizes, requireAlt } from '@/lib/image';

export interface PropertyItem {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  airbnbUrl: string;
}

interface PropertiesSectionProps {
  properties: PropertyItem[];
}

export default function PropertiesSection({ properties }: PropertiesSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0);
    const threshold = 1;

    setCanScrollLeft(scrollLeft > threshold);
    setCanScrollRight(maxScrollLeft - scrollLeft > threshold);
  }, []);

  const scrollCarousel = useCallback(
    (offset: number) => {
      const carousel = carouselRef.current;
      if (!carousel) {
        return;
      }

      carousel.scrollBy({ left: offset, behavior: 'smooth' });
      requestAnimationFrame(updateScrollState);
    },
    [updateScrollState],
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const cards = Array.from(carousel.querySelectorAll('[data-card-index]'));
    if (!cards.length) {
      return;
    }

    const getCardIndex = (target: Element): number => {
      const element = target as HTMLElement;
      const raw =
        element.dataset['cardIndex'] ??
        element.getAttribute('data-card-index') ??
        '0';
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    type BestEntry = { index: number; ratio: number };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let bestEntry: BestEntry | null = null;

        for (const entry of entries) {
          const index = getCardIndex(entry.target);
          const ratio = entry.intersectionRatio || 0;
          if (bestEntry === null || ratio > bestEntry.ratio) {
            bestEntry = { index, ratio };
          }
        }

        if (bestEntry && bestEntry.ratio > 0) {
          const nextIndex = bestEntry.index;
          setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
        }
      },
      {
        root: carousel,
        threshold: [0.25, 0.5, 0.75, 0.95],
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [properties]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const handleScroll = () => updateScrollState();

    updateScrollState();
    carousel.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScrollState);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  return (
    <section id="properties" className="bg-sand py-20" role="region" aria-labelledby="properties-heading">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center mb-4">Properties</h2>
        <p className="text-center text-slate mb-12 max-w-2xl mx-auto">
          Discover our carefully curated collection of boutique properties across Western Washington
        </p>
        <div className="relative" aria-live="polite">
          <button
            type="button"
            onClick={() => scrollCarousel(-400)}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-3 -ml-4 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white ${focusVisibleRing} ${
              canScrollLeft ? '' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous properties"
            aria-controls="property-carousel"
          >
            <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(400)}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-3 -mr-4 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white ${focusVisibleRing} ${
              canScrollRight ? '' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next properties"
            aria-controls="property-carousel"
          >
            <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            ref={carouselRef}
            id="property-carousel"
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
          >
            {properties.map((property, idx) => {
              const altText = requireAlt(
                [property.name, property.description].filter(Boolean).join(' – '),
              );

              return (
                <div
                  key={property.id}
                  data-card-index={idx}
                  id={`property-panel-${property.id}`}
                  className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex-shrink-0 w-80 snap-start"
                  role="tabpanel"
                  aria-roledescription="Slide"
                  aria-labelledby={`property-tab-${property.id}`}
                  aria-hidden={activeIndex !== idx}
                  tabIndex={activeIndex === idx ? 0 : -1}
                >
                  <div className="relative h-64 overflow-hidden">
                    {idx === 0 ? (
                      <Image
                        src={property.image}
                        alt={altText}
                        fill
                        loading="eager"
                        priority
                        sizes={defaultSizes}
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Image
                        src={property.image}
                        alt={altText}
                        fill
                        loading="lazy"
                        sizes={defaultSizes}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-forest">
                      ⭐ {property.rating.toFixed(2)}
                    </div>
                    <div className="absolute top-4 right-4 bg-accent text-white rounded-full px-3 py-1 text-xs font-semibold">
                      ${property.price}/night
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-charcoal mb-2">{property.name}</h3>
                    <p className="text-sm text-slate mb-4">{property.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-light">{property.location}</span>
                      <a
                        href={property.airbnbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-lake hover:text-lake-dark font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all rounded-full px-2 ${focusVisibleRing}`}
                        aria-label={`View ${property.name} on Airbnb (opens in a new tab)`}
                      >
                        <span aria-hidden="true">View on Airbnb</span>
                        <span className="sr-only"> for {property.name}</span>
                        <span className="group-hover:translate-x-1 transition-transform">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="flex justify-center mt-8 space-x-2"
          role="tablist"
          aria-label="Select featured property"
        >
          {properties.map((property, idx) => (
            <button
              key={property.id}
              type="button"
              id={`property-tab-${property.id}`}
              role="tab"
              aria-controls={`property-panel-${property.id}`}
              aria-label={`Show property ${idx + 1}: ${property.name}`}
              aria-selected={activeIndex === idx}
              tabIndex={activeIndex === idx ? 0 : -1}
              onClick={() => {
                const target = carouselRef.current?.querySelector<HTMLElement>(`[data-card-index="${idx}"]`);
                target?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
              }}
              className={`h-3 w-3 rounded-full transition-transform duration-200 ${
                activeIndex === idx
                  ? `bg-forest scale-110 ${focusVisibleRing}`
                  : `bg-forest/30 hover:bg-forest/50 ${focusVisibleRing}`
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
