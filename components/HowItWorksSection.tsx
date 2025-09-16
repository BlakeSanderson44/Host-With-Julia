export default function HowItWorksSection() {
  return (
    <section id="how" className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-forest text-center mb-10">How It Works</h2>
      <div className="grid gap-8 md:grid-cols-4">
        <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-2">Walkthrough &amp; Strategy</h3>
          <p className="text-slate">On-site review and tailored plan.</p>
        </div>
        <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-2">Listing &amp; Pricing</h3>
          <p className="text-slate">Pro photos, copy, and dynamic rates.</p>
        </div>
        <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-2">Full-Service Hosting</h3>
          <p className="text-slate">Messaging, turnovers, and guest care.</p>
        </div>
        <div className="bg-cream p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="font-semibold mb-2">Reporting &amp; Payouts</h3>
          <p className="text-slate">Monthly summaries and clear payouts.</p>
        </div>
      </div>
    </section>
  );
}
