'use client';

import Image from 'next/image';
import { useRef } from 'react';

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

  const scrollCarousel = (offset: number) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="properties" className="bg-sand py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center mb-4">Properties</h2>
        <p className="text-center text-slate mb-12 max-w-2xl mx-auto">
          Discover our carefully curated collection of boutique properties across Western Washington
        </p>
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel(-400)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -ml-4 transition-all duration-300 hover:scale-110"
            aria-label="Previous properties"
          >
            <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(400)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -mr-4 transition-all duration-300 hover:scale-110"
            aria-label="Next properties"
          >
            <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex-shrink-0 w-80"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={`${property.name} - ${property.description}`}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
                      className="text-lake hover:text-lake-dark font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      View on Airbnb
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {properties.map((property) => (
            <div key={property.id} className="w-2 h-2 bg-forest/30 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
