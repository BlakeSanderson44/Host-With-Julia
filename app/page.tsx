'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useState } from 'react';

const navItems = [
  { href: '#how', label: 'How' },
  { href: '#services', label: 'Services' },
  { href: '#locations', label: 'Locations' },
  { href: '#properties', label: 'Properties' },
  { href: '#about', label: 'Why Me' },
  { href: '#faqs', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({ type: 'success', message: result.message });
        (e.target as HTMLFormElement).reset();
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
      <header className="fixed top-0 inset-x-0 z-50 bg-cream/90 backdrop-blur border-b border-sand">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <a href="#" className="font-bold text-forest">Host With Julia</a>
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-charcoal hover:text-lake">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button 
            className="md:hidden text-forest" 
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-cream border-t border-sand">
            <ul className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="text-charcoal hover:text-lake block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main id="main" className="pt-16">
        <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-14b4e5b4e4c3?auto=format&fit=crop&w=1920&q=80"
              alt="Pacific Northwest mountain landscape"
              fill
              className="object-cover scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/80 via-forest/60 to-lake-dark/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-lake/20 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-moss/30 rounded-full blur-lg animate-pulse delay-500" />
          
          <div className="relative z-10 max-w-4xl mx-auto p-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium">Superhost • Under 1hr Response</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
              <span className="block bg-gradient-to-r from-white via-cream to-accent-light bg-clip-text text-transparent">
                Boutique
              </span>
              <span className="block bg-gradient-to-r from-accent-light via-white to-lake-light bg-clip-text text-transparent">
                Airbnb Management
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-light mb-4 max-w-2xl mx-auto leading-relaxed">
              That feels <span className="text-accent font-semibold">hands-off</span> and pays off
            </p>
            <p className="text-lg text-slate-light/80 mb-12">Serving Western Washington</p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="#contact" variant="primary" className="text-lg px-8 py-4 shadow-glow hover:shadow-glow transform hover:scale-105 transition-all duration-300">
                Get a Free Property Review
              </Button>
              <Button href="#how" variant="secondary" className="text-lg px-8 py-4 border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300">
                See How It Works
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-semibold text-sm">Superhost Status</div>
                <div className="text-xs text-slate-light">Consistently maintained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-sm">Under 1 Hour</div>
                <div className="text-xs text-slate-light">Average response time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-semibold text-sm">Western WA</div>
                <div className="text-xs text-slate-light">Local expertise</div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        <section id="how" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-forest text-center mb-10">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold mb-2">Walkthrough & Strategy</h3>
              <p className="text-slate">On-site review and tailored plan.</p>
            </div>
            <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold mb-2">Listing & Pricing</h3>
              <p className="text-slate">Pro photos, copy, and dynamic rates.</p>
            </div>
            <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold mb-2">Full-Service Hosting</h3>
              <p className="text-slate">Messaging, turnovers, and guest care.</p>
            </div>
            <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold mb-2">Reporting & Payouts</h3>
              <p className="text-slate">Monthly summaries and clear payouts.</p>
            </div>
          </div>
        </section>

        <section id="services" className="bg-sand py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-forest text-center mb-10">
              Services
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
                <div className="text-2xl">🏡</div>
                <h3 className="font-semibold mt-4">STR Management</h3>
                <p className="text-slate mt-2">
                  Dynamic pricing, pro listings, and 24/7 guest messaging — full
                  service, no stress.
                </p>
              </div>
              <div className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
                <div className="text-2xl">📱</div>
                <h3 className="font-semibold mt-4">Touch Stay Guidebooks</h3>
                <p className="text-slate mt-2">
                  Digital guidebooks with rules, tips, and arrival info to delight
                  guests.
                </p>
              </div>
              <div className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
                <div className="text-2xl">🕵️</div>
                <h3 className="font-semibold mt-4">Consulting & Optimization</h3>
                <p className="text-slate mt-2">
                  60–90 min audit with a custom action plan in 48 hours.
                </p>
              </div>
            </div>
            <p className="mt-8 text-center text-slate">
              I stay on top of Airbnb policy and algorithm changes so your listing
              stays compliant and competitive.
            </p>
          </div>
        </section>

        <section id="locations" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-forest text-center">
              Serving Western Washington
            </h2>
            <p className="text-center text-slate mt-2">
              Starting with Edmonds, Chelan, Ashford (Mt. Rainier), and Brennan —
              expanding across the region.
            </p>
            <div className="grid gap-8 md:grid-cols-4 mt-10">
              <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
                <h3 className="font-semibold">Edmonds</h3>
                <p className="text-slate">
                  Urban coastal stays with quick Seattle access.
                </p>
              </div>
              <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
                <h3 className="font-semibold">Chelan</h3>
                <p className="text-slate">
                  Lake country specialists for seasonal demand.
                </p>
              </div>
              <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
                <h3 className="font-semibold">Ashford (Mt. Rainier)</h3>
                <p className="text-slate">
                  Cabins at the gateway to Mt. Rainier.
                </p>
              </div>
              <div className="border border-forest bg-sand p-6 rounded-lg hover:shadow-lg transition">
                <h3 className="font-semibold">Brennan</h3>
                <p className="text-slate">Boutique stays off the Hood Canal.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="properties" className="bg-sand py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-forest text-center mb-10">
              Properties
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Echo House - Mt. Rainier */}
              <div className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
                    alt="Echo House - Mt. Rainier cabin"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-forest">
                    ⭐ 4.9
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-white rounded-full px-3 py-1 text-xs font-semibold">
                    $180/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-charcoal mb-2">Echo House</h3>
                  <p className="text-sm text-slate mb-3">Mt. Rainier gateway cabin • 2BR • Sleeps 6</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-light">Ashford, WA</span>
                    <a 
                      href="https://www.airbnb.com/rooms/1385889129103005607" 
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

              {/* Edmonds Coastal */}
              <div className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                    alt="Edmonds Coastal retreat"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-forest">
                    ⭐ 4.8
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-white rounded-full px-3 py-1 text-xs font-semibold">
                    $220/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-charcoal mb-2">Edmonds Coastal</h3>
                  <p className="text-sm text-slate mb-3">Urban coastal retreat • 1BR • Sleeps 4</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-light">Edmonds, WA</span>
                    <a 
                      href="https://airbnb.com/rooms/plus/edmonds-waterfront-suite" 
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

              {/* Chelan Lake House 1BR */}
              <div className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                    alt="Chelan Lake House 1BR"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-forest">
                    ⭐ 4.9
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-white rounded-full px-3 py-1 text-xs font-semibold">
                    $160/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-charcoal mb-2">Chelan Lake House</h3>
                  <p className="text-sm text-slate mb-3">Lake country escape • 1BR • Sleeps 2</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-light">Chelan, WA</span>
                    <a 
                      href="https://airbnb.com/rooms/plus/chelan-lake-studio" 
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

              {/* Chelan Family Retreat 2BR */}
              <div className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1520637836862-4d197d17c0a8?auto=format&fit=crop&w=800&q=80"
                    alt="Chelan Family Retreat 2BR"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-forest">
                    ⭐ 4.7
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-white rounded-full px-3 py-1 text-xs font-semibold">
                    $240/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-charcoal mb-2">Chelan Family Retreat</h3>
                  <p className="text-sm text-slate mb-3">Family lake retreat • 2BR • Sleeps 6</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-light">Chelan, WA</span>
                    <a 
                      href="https://airbnb.com/rooms/plus/chelan-family-lakehouse" 
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
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="max-w-6xl mx-auto px-4 space-y-10">
            <h2 className="text-3xl font-bold text-forest text-center">
              Why Work With Julia
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-semibold mb-2">Faster Responses</h3>
                <p className="text-slate">24/7 guest messaging under one hour.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Optimized Pricing</h3>
                <p className="text-slate">Dynamic rates tuned to demand.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quality Control</h3>
                <p className="text-slate">
                  Checklists and photo proof for every turnover.
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-center">Time &amp; Stress Savings</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <span className="w-40">Owner-managed</span>
                  <div className="flex-1 h-4 bg-forest" />
                  <span className="ml-2">~25h</span>
                </div>
                <div className="flex items-center">
                  <span className="w-40">With Julia</span>
                  <div className="flex-1 h-4 bg-lake" />
                  <span className="ml-2">~2h</span>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3 text-center">
                <div>🕒 Late-night calls: 4–6 → 0</div>
                <div>💬 Guest messages: handled</div>
                <div>🧹 Turnovers: managed</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-sand">
                  <tr>
                    <th className="p-2"></th>
                    <th className="p-2">Owner-Managed</th>
                    <th className="p-2">With Julia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">Guest Messaging</td>
                    <td className="p-2">Delayed</td>
                    <td className="p-2">24/7 &lt;1 hr</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Pricing</td>
                    <td className="p-2">Static</td>
                    <td className="p-2">Dynamic</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Guidebook</td>
                    <td className="p-2">None</td>
                    <td className="p-2">Touch Stay add-on</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Cleaning QC</td>
                    <td className="p-2">Inconsistent</td>
                    <td className="p-2">Checklists + photo proof</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Reviews/Ranking</td>
                    <td className="p-2">Hit-or-miss</td>
                    <td className="p-2">Superhost focus</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2">Reporting</td>
                    <td className="p-2">Ad-hoc</td>
                    <td className="p-2">Monthly summaries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="faqs" className="bg-sand py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-forest text-center mb-10">
              Testimonials
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <blockquote className="bg-white p-6 rounded shadow">
                <p className="text-slate mb-2">
                  “Julia made hosting effortless and our reviews shot up.”
                </p>
                <div>⭐️⭐️⭐️⭐️⭐️</div>
              </blockquote>
              <blockquote className="bg-white p-6 rounded shadow">
                <p className="text-slate mb-2">
                  “Professional, responsive, and worth every penny.”
                </p>
                <div>⭐️⭐️⭐️⭐️⭐️</div>
              </blockquote>
              <blockquote className="bg-white p-6 rounded shadow">
                <p className="text-slate mb-2">
                  “Our cabin stays booked and stress-free.”
                </p>
                <div>⭐️⭐️⭐️⭐️⭐️</div>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-4 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-forest">Let&apos;s Talk</h2>
              <p className="text-slate">
                Tell me about your property and I&apos;ll reach out.
              </p>
              <div className="text-moss">🕒 Avg Airbnb response: under 1 hour.</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formStatus.type && (
                <div className={`p-3 rounded ${
                  formStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {formStatus.message}
                </div>
              )}
              <input
                required
                name="name"
                placeholder="Name"
                className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
              />
              <input
                name="city"
                placeholder="Property City/Area"
                className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full border border-forest p-3 rounded focus:ring-2 focus:ring-lake focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-forest text-white px-6 py-3 rounded-2xl hover:bg-lake transition shadow transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-forest text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <div className="font-bold text-xl">Host With Julia</div>
          <p>Boutique STR Management · Western WA.</p>
          <nav className="flex justify-center gap-4">
            <a href="#services" className="hover:text-moss">Services</a>
            <a href="#locations" className="hover:text-moss">Locations</a>
            <a href="#properties" className="hover:text-moss">Properties</a>
            <a href="#faqs" className="hover:text-moss">FAQs</a>
            <a href="#contact" className="hover:text-moss">Contact</a>
          </nav>
          <div className="flex justify-center gap-8">
            <span>Superhost</span>
            <span>Airbnb</span>
            <span>Touch Stay</span>
          </div>
          <p className="text-moss text-sm">
            Proudly serving Edmonds, Chelan, Ashford, and Brennan — expanding across Western Washington.
          </p>
          <a href="https://instagram.com/hostwithjulia" target="_blank" rel="noopener noreferrer" className="hover:text-moss">Instagram</a>
        </div>
      </footer>
    </>
  );
}
