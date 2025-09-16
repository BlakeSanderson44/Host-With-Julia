'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

import AboutSection from '@/components/AboutSection';
import ContactSection, { type FormStatus } from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header, { type NavItem } from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorksSection from '@/components/HowItWorksSection';
import LocationsSection from '@/components/LocationsSection';
import PropertiesSection, { type Property } from '@/components/PropertiesSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const navItems: NavItem[] = [
  { href: '#how', label: 'How' },
  { href: '#services', label: 'Services' },
  { href: '#locations', label: 'Locations' },
  { href: '#properties', label: 'Properties' },
  { href: '#about', label: 'Why Me' },
  { href: '#faqs', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const footerNavItems = [
  { href: '#services', label: 'Services' },
  { href: '#locations', label: 'Locations' },
  { href: '#properties', label: 'Properties' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
];

const properties: Property[] = [
  {
    id: 'echo-house',
    name: 'Echo House',
    description: 'Mt. Rainier gateway cabin • 2BR • Sleeps 4',
    location: 'Ashford, WA',
    rating: 4.98,
    price: 195,
    image: '/images/echo-house.avif',
    airbnbUrl: 'https://www.airbnb.com/rooms/1385889129103005607',
  },
  {
    id: 'edmonds-retreat',
    name: 'Edmonds Retreat',
    description: 'Urban coastal retreat • 2BR • Sleeps 4',
    location: 'Edmonds, WA',
    rating: 5.0,
    price: 175,
    image: '/images/edmonds-retreat.avif',
    airbnbUrl: 'https://www.airbnb.com/rooms/1393839318692128596',
  },
  {
    id: '3-bed-chelan',
    name: '2 Bedroom, 3 Bed Chelan Condo',
    description: 'Lake escape retreat • 2BR • 3 Beds • Sleeps 6',
    location: 'Chelan, WA',
    rating: 5.0,
    price: 175,
    image: '/images/3-bed-chelan-condo.avif',
    airbnbUrl: 'https://www.airbnb.com/rooms/1501613769254985414',
  },
  {
    id: '2-bed-chelan',
    name: '2 Bedroom, 2 Bed Chelan Condo',
    description: 'Family lake getaway • 2BR • 2 Beds • Sleeps 6',
    location: 'Chelan, WA',
    rating: 4.91,
    price: 175,
    image: '/images/2-bed-chelan-condo.avif',
    airbnbUrl: 'https://www.airbnb.com/rooms/1315478556100383819',
  },
  {
    id: '1-bed-chelan',
    name: '1 Bedroom + Den, 3 Bed Chelan Condo',
    description: 'Cozy condo w/ den • 1BR + Den • 3 Beds • Sleeps 5',
    location: 'Chelan, WA',
    rating: 4.92,
    price: 150,
    image: '/images/1-bedroom-condo.avif',
    airbnbUrl: 'https://www.airbnb.com/rooms/791580934465838010',
  },
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({ type: 'success', message: result.message });
        event.currentTarget.reset();
      } else {
        setFormStatus({ type: 'error', message: result.error || 'Something went wrong' });
      }
    } catch {
      setFormStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header navItems={navItems} />
      <main id="main" className="pt-16">
        <Hero />
        <HowItWorksSection />
        <ServicesSection />
        <LocationsSection />
        <PropertiesSection properties={properties} />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection onSubmit={handleSubmit} formStatus={formStatus} isSubmitting={isSubmitting} />
      </main>
      <Footer navItems={footerNavItems} />
    </>
  );
}
