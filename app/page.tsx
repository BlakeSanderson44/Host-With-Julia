import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Header, { type NavItem } from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LocationsSection from '@/components/LocationsSection';
import PropertiesSection, { type PropertyItem } from '@/components/PropertiesSection';
import ServicesSection from '@/components/ServicesSection';
import SiteFooter from '@/components/SiteFooter';
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
  { name: 'Brennan', description: 'Boutique stays off the Hood Canal.' },
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

const features = [
  { title: 'Faster Responses', description: '24/7 guest messaging under one hour.' },
  { title: 'Optimized Pricing', description: 'Dynamic rates tuned to demand.' },
  { title: 'Quality Control', description: 'Checklists and photo proof for every turnover.' },
];

const timeComparisons = [
  { label: 'Owner-managed', value: '~25h', barClassName: 'bg-forest' },
  { label: 'With Julia', value: '~2h', barClassName: 'bg-lake' },
];

const quickStats = ['🕒 Late-night calls: 4–6 → 0', '💬 Guest messages: handled', '🧹 Turnovers: managed'];

const comparisonTable = [
  { label: 'Guest Messaging', ownerManaged: 'Delayed', withJulia: '24/7 <1 hr' },
  { label: 'Pricing', ownerManaged: 'Static', withJulia: 'Dynamic' },
  { label: 'Guidebook', ownerManaged: 'None', withJulia: 'Touch Stay add-on' },
  { label: 'Cleaning QC', ownerManaged: 'Inconsistent', withJulia: 'Checklists + photo proof' },
  { label: 'Reviews/Ranking', ownerManaged: 'Hit-or-miss', withJulia: 'Superhost focus' },
  { label: 'Reporting', ownerManaged: 'Ad-hoc', withJulia: 'Monthly summaries' },
];

const testimonials = [
  { quote: '“Julia keeps our rental booked and stress-free. Best decision we made.”' },
  { quote: '“Professional, responsive, and worth every penny.”' },
  { quote: '“Our cabin stays booked and stress-free.”' },
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
        <AboutSection
          features={features}
          timeComparisons={timeComparisons}
          quickStats={quickStats}
          comparisonTable={comparisonTable}
        />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>
      <SiteFooter navItems={navItems} />
    </>
  );
}
