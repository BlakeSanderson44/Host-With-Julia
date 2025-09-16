export default function ServicesSection() {
  return (
    <section id="services" className="bg-sand py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-forest text-center mb-10">Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
            <div className="text-2xl">🏡</div>
            <h3 className="font-semibold mt-4">STR Management</h3>
            <p className="text-slate mt-2">
              Dynamic pricing, pro listings, and 24/7 guest messaging — full service, no stress.
            </p>
          </div>
          <div className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
            <div className="text-2xl">📱</div>
            <h3 className="font-semibold mt-4">Touch Stay Guidebooks</h3>
            <p className="text-slate mt-2">
              Digital guidebooks with rules, tips, and arrival info to delight guests.
            </p>
          </div>
          <div className="border border-forest rounded-lg p-6 bg-white hover:shadow-lg transition">
            <div className="text-2xl">🕵️</div>
            <h3 className="font-semibold mt-4">Consulting &amp; Optimization</h3>
            <p className="text-slate mt-2">60–90 min audit with a custom action plan in 48 hours.</p>
          </div>
        </div>
        <p className="mt-8 text-center text-slate">
          I stay on top of Airbnb policy and algorithm changes so your listing stays compliant and competitive.
        </p>
      </div>
    </section>
  );
}
