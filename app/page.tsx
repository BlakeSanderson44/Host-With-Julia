import dynamic from 'next/dynamic';

import Header, { type NavItem } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LocationsSection from '@/components/LocationsSection';
import ServicesSection from '@/components/ServicesSection';
import SiteFooter from '@/components/SiteFooter';
import StickyCTA from '@/components/StickyCTA';

import type { AboutSectionProps } from '@/components/AboutSection';
import type { PropertyItem } from '@/components/PropertiesSection';

function SectionHeadingSkeleton({ align = 'center' }: { align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'flex justify-center' : 'flex'}>
      <div className="h-8 w-40 rounded bg-forest/20" />
    </div>
  );
}

function SectionParagraphSkeleton({ lines = 2 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 w-full rounded bg-forest/10" />
      ))}
    </div>
  );
}

function PropertiesSectionSkeleton() {
  return (
    <section id="properties" className="bg-sand py-20">
      <div className="mx-auto max-w-7xl px-4 animate-pulse space-y-8">
        <SectionHeadingSkeleton />
        <div className="mx-auto w-3/4">
          <SectionParagraphSkeleton />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-72 rounded-2xl bg-white shadow-soft" />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSectionSkeleton() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 animate-pulse space-y-10">
        <SectionHeadingSkeleton />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-5 w-32 rounded bg-forest/20" />
              <SectionParagraphSkeleton lines={3} />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <SectionHeadingSkeleton />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-4 w-full rounded bg-forest/10" />
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-16 rounded bg-forest/10" />
          ))}
        </div>
        <div className="overflow-hidden rounded-lg border border-sand">
          <div className="h-10 bg-sand" />
          <div className="space-y-3 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-4 w-full rounded bg-forest/10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSectionSkeleton() {
  return (
    <section id="faqs" className="bg-sand py-20">
      <div className="mx-auto max-w-6xl px-4 animate-pulse space-y-8">
        <SectionHeadingSkeleton />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 rounded bg-white shadow" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSectionSkeleton() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto grid max-w-4xl gap-8 px-4 md:grid-cols-2">
        <div className="space-y-4 animate-pulse">
          <SectionHeadingSkeleton align="left" />
          <SectionParagraphSkeleton />
          <div className="h-5 w-40 rounded bg-forest/20" />
        </div>
        <div className="space-y-4 animate-pulse">
          {['h-10', 'h-10', 'h-10', 'h-24'].map((heightClass, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 rounded bg-forest/20" />
              <div className={`w-full rounded border border-forest/30 bg-white ${heightClass}`} />
            </div>
          ))}
          <div className="h-12 w-32 rounded bg-forest/60" />
        </div>
      </div>
    </section>
  );
}

const PropertiesSection = dynamic(() => import('@/components/PropertiesSection'), {
  loading: () => <PropertiesSectionSkeleton />,
  ssr: false,
});

const AboutSection = dynamic<AboutSectionProps>(() => import('@/components/AboutSection'), {
  loading: () => <AboutSectionSkeleton />,
});

const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => <TestimonialsSectionSkeleton />,
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <ContactSectionSkeleton />,
  ssr: false,
});

const navItems: NavItem[] = [
  { href: '#how', label: 'How' },
  { href: '#services', label: 'Services' },
  { href: '#locations', label: 'Locations' },
  { href: '#properties', label: 'Properties' },
  { href: '#about', label: 'Why Me' },
  { href: '#faqs', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const aboutSectionContent = {
  valuePillars: [
    {
      title: 'Faster Responses',
      description: '24/7 guest messaging under one hour',
    },
    {
      title: 'Optimized Pricing',
      description: 'Dynamic rates powered by PriceLabs',
    },
    {
      title: 'Stress-Free Hosting',
      description: 'Custom support that adapts to your property setup',
    },
  ],
  timeSavings: [
    { icon: '💬', label: 'Guest messages handled' },
    { icon: '⏰', label: 'Late-night calls reduced: 4–6 → 0' },
    { icon: '🛏', label: 'Turnovers coordinated with your local cleaning team' },
  ],
  comparisonRows: [
    {
      label: '24/7 Guest Messaging (<1 hr)',
      owner: { icon: 'x' },
      julia: { icon: 'check' },
    },
    {
      label: 'Dynamic Pricing (via PriceLabs)',
      owner: { text: 'Manual or static' },
      julia: { icon: 'check', text: 'Automated & optimized' },
    },
    {
      label: 'Touch Stay Digital Guidebook (Add-On)',
      owner: { icon: 'x' },
      julia: { icon: 'check', text: 'Available' },
    },
    {
      label: 'Turnover Coordination',
      owner: { text: 'On owner' },
      julia: { icon: 'check', text: 'Managed with your team' },
    },
    {
      label: 'Review & Ranking Strategy',
      owner: { text: 'Hit-or-miss' },
      julia: { icon: 'check', text: 'Superhost Focus' },
    },
    {
      label: 'Reporting',
      owner: { text: 'Ad-hoc' },
      julia: { icon: 'check', text: 'Monthly Summaries' },
    },
  ],
} satisfies AboutSectionProps;

const howItWorksSteps = [
  { title: 'Walkthrough & Strategy', description: 'On-site review and tailored plan.' },
  { title: 'Listing & Pricing', description: 'Pro photos, copy, and dynamic rates.' },
  { title: 'Full-Service Hosting', description: 'Messaging, turnovers, and guest care.' },
  { title: 'Reporting & Payouts', description: 'Monthly summaries and clear payouts.' },
];

const services = [
  {
    icon: '🏡',
    title: 'STR Management',
    description: 'Dynamic pricing, pro listings, and 24/7 guest messaging — full service, no stress.',
  },
  {
    icon: '📱',
    title: 'Touch Stay Guidebooks',
    description: 'Digital guidebooks with rules, tips, and arrival info to delight guests.',
  },
  {
    icon: '🕵️',
    title: 'Consulting & Optimization',
    description: '60–90 min audit with a custom action plan in 48 hours.',
  },
];

const locations = [
  { name: 'Edmonds', description: 'Urban coastal stays with quick Seattle access.' },
  { name: 'Chelan', description: 'Lake country specialists for seasonal demand.' },
  { name: 'Ashford (Mt. Rainier)', description: 'Cabins at the gateway to Mt. Rainier.' },
];

const properties: PropertyItem[] = [
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
    rating: 5,
    price: 175,
    image: '/images/edmonds-retreat.avif',
    airbnbUrl: 'https://www.airbnb.com/rooms/1393839318692128596',
  },
  {
    id: '3-bed-chelan',
    name: '2 Bedroom, 3 Bed Chelan Condo',
    description: 'Lake escape retreat • 2BR • 3 Beds • Sleeps 6',
    location: 'Chelan, WA',
    rating: 5,
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

const testimonials = [
  {
    id: 'testimonial-1',
    quote: '“Julia keeps our rental booked and stress-free. Best decision we made.”',
  },
  { id: 'testimonial-2', quote: '“Professional, responsive, and worth every penny.”' },
  { id: 'testimonial-3', quote: '“Our cabin stays booked and stress-free.”' },
];

export default function Home() {
  return (
    <>
      <Header navItems={navItems} />
      <main id="main" className="pt-16">
        <HeroSection />
        <HowItWorksSection steps={howItWorksSteps} />
        <ServicesSection services={services} />
        <LocationsSection locations={locations} />
        <PropertiesSection properties={properties} />
        <AboutSection {...aboutSectionContent} />
        <div className="mb-24 md:mb-0">
          <TestimonialsSection testimonials={testimonials} />
        </div>
        <ContactSection />
        <StickyCTA />
      </main>
      <SiteFooter navItems={navItems} />
    </>
  );
}
