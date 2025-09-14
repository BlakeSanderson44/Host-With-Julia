import Image from 'next/image';
import Button from '@/components/Button';

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
          <button className="md:hidden text-forest" aria-label="Menu">
            ☰
          </button>
        </nav>
      </header>

      <main id="main" className="pt-16">
        <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1501889088093-90b27410a9d8?auto=format&fit=crop&w=1600&q=80"
            alt="Pacific Northwest landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/70 to-transparent" />
          <div className="relative z-10 max-w-xl mx-auto p-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Boutique Airbnb Management That Feels Hands-Off (and Pays Off)
            </h1>
            <p className="mt-4 text-lg">Serving Western WA</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" variant="primary">
                Get a Free Property Review
              </Button>
              <Button href="#how" variant="secondary">
                See How It Works
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
              <span>⭐ Superhost</span>
              <span>🕒 Avg Airbnb response: under 1 hour</span>
              <span>📍 Serving Western WA</span>
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
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Echo House (Ashford)</h3>
                <a href="#" className="text-lake hover:underline">
                  View on Airbnb
                </a>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Edmonds</h3>
                <a href="#" className="text-lake hover:underline">
                  View on Airbnb
                </a>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Chelan 1BR</h3>
                <a href="#" className="text-lake hover:underline">
                  View on Airbnb
                </a>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Chelan 2BR</h3>
                <a href="#" className="text-lake hover:underline">
                  View on Airbnb
                </a>
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
              <h2 className="text-3xl font-bold text-forest">Let's Talk</h2>
              <p className="text-slate">
                Tell me about your property and I'll reach out.
              </p>
              <div className="text-moss">🕒 Avg Airbnb response: under 1 hour.</div>
            </div>
            <form action="/api/contact" method="post" className="space-y-4">
              <input
                required
                name="name"
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <input
                name="city"
                placeholder="Property City/Area"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-forest text-white px-4 py-2 rounded-2xl hover:bg-lake transition shadow transform hover:scale-105"
              >
                Send
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
          <a href="#" className="hover:text-moss">Instagram</a>
        </div>
      </footer>
    </>
  );
}
